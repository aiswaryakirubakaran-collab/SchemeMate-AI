import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { sampleSchemes } from './src/data/schemes.ts';
import { Scheme } from './src/types.ts';

dotenv.config();

let liveSchemes: Scheme[] = [...sampleSchemes];

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    try {
      geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.error('Failed to initialize GoogleGenAI client:', e);
    }
  }
  return geminiClient;
}

async function startServer() {
  const app = express();
  // In development, the AI Studio dev environment routes external traffic to port 3000 via Nginx.
  // In production (Cloud Run), the service must listen on the port injected by Cloud Run via the PORT environment variable (default 8080).
  const isDev = process.env.NODE_ENV !== 'production' || Boolean(process.env.DEFAULT_APP_PORT || process.env.CONTROL_PLANE_PORT);
  const PORT = isDev ? 3000 : (process.env.PORT ? parseInt(process.env.PORT, 10) : 3000);

  app.use(express.json());

  // Health check
  app.get(['/health', '/api/health'], (req, res) => {
    res.json({
      status: 'ok',
      service: 'SchemeMate AI Engine',
      geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString()
    });
  });

  // Schemes CRUD endpoints for Admin Dashboard & Live Client
  app.get('/api/schemes', (req, res) => {
    res.json({
      success: true,
      count: liveSchemes.length,
      data: liveSchemes
    });
  });

  app.post('/api/schemes', (req, res) => {
    const newScheme: Scheme = req.body;
    if (!newScheme.id || !newScheme.name) {
      res.status(400).json({ success: false, error: 'Scheme ID and Name are required.' });
      return;
    }
    const existingIndex = liveSchemes.findIndex(s => s.id === newScheme.id);
    if (existingIndex >= 0) {
      liveSchemes[existingIndex] = newScheme;
    } else {
      liveSchemes.unshift(newScheme);
    }
    res.json({ success: true, message: 'Scheme saved successfully', data: newScheme });
  });

  app.put('/api/schemes/:id', (req, res) => {
    const { id } = req.params;
    const index = liveSchemes.findIndex(s => s.id === id);
    if (index === -1) {
      res.status(404).json({ success: false, error: 'Scheme not found' });
      return;
    }
    liveSchemes[index] = { ...liveSchemes[index], ...req.body };
    res.json({ success: true, message: 'Scheme updated', data: liveSchemes[index] });
  });

  app.delete('/api/schemes/:id', (req, res) => {
    const { id } = req.params;
    liveSchemes = liveSchemes.filter(s => s.id !== id);
    res.json({ success: true, message: 'Scheme deleted' });
  });

  // Reset schemes to seed defaults
  app.post('/api/schemes/reset', (req, res) => {
    liveSchemes = [...sampleSchemes];
    res.json({ success: true, message: 'Reset to verified sample database', data: liveSchemes });
  });

  // AI Chat Assistant endpoint powered by Gemini 3.8-flash with fallback
  app.post('/api/chat', async (req, res) => {
    const { message, language = 'en', profileContext } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Valid message string is required.' });
      return;
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are "SchemeMate AI" (திட்ட வழிகாட்டி), an empathetic, expert government schemes advisor for Indian micro, small, and marginalized entrepreneurs (especially women, rural artisans, SC/ST, and youth).
Your knowledge includes:
- Prime Minister Employment Generation Programme (PMEGP: up to ₹50L, 15-35% margin money subsidy)
- PM MUDRA Yojana (Shishu up to ₹50k, Kishore up to ₹5L, Tarun up to ₹20L)
- Stand-Up India (₹10L to ₹1Cr for SC/ST and Women greenfield units)
- Tamil Nadu NEEDS Scheme (25% capital subsidy up to ₹75L + 3% interest subvention for degree/diploma youth)
- PM Vishwakarma (₹15k toolkit voucher + ₹3L loan at 5% interest for 18 traditional artisan trades)
- Tamil Nadu AABCS (35% subsidy up to ₹35L + 6% interest subvention for SC/ST founders)
- CGTMSE (Collateral-free credit guarantee up to ₹5 Crores)
- UYEGP (25% subsidy for 8th pass youth in Tamil Nadu)
- PM SVANidhi (₹10k/₹20k/₹50k micro-credit for street vendors)
- PMFME (35% subsidy up to ₹10L for food processing & bakeries)

Guidelines:
1. Always respond in the requested language/dialect:
   - If language is 'ta': Respond in fluent, clear Tamil (தமிழ்).
   - If language is 'tanglish' or the user asks in Tanglish: Respond in natural, conversational Tanglish (Tamil written in English alphabet, e.g. "Ungalukku PMEGP scheme romba suit aagum...").
   - If language is 'en': Respond in professional, simple Indian English.
2. Be practical, step-by-step, and encouraging.
3. Explicitly list required documents and nearest official offices (like District Industries Centre / DIC, KVIC, or Bank branch).
4. MANDATORY DISCLAIMER: Always conclude with:
   ${language === 'ta' 
     ? '⚠️ குறிப்பு: இறுதி தகுதி சம்பந்தப்பட்ட அரசு அதிகாரிகளால் மட்டுமே சரிபார்க்கப்பட வேண்டும்.' 
     : (language === 'tanglish' 
        ? '⚠️ Note: Final eligibility-ai DTFC / Bank authority kitta confirm pannikonga.' 
        : '⚠️ Note: Final eligibility must be verified with the concerned government authority.')}
5. Keep explanations concise, scannable, and helpful.

${profileContext ? `Current User Profile Context: ${JSON.stringify(profileContext)}` : ''}`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
          ]
        });

        const reply = response.text || 'I could not generate an answer right now.';
        res.json({ success: true, reply, source: 'gemini-3.8-flash' });
        return;
      } catch (err: any) {
        console.error('Gemini call failed, switching to expert fallback:', err?.message || err);
      }
    }

    // Intelligent domain fallback
    const lower = message.toLowerCase();
    let fallbackReply = '';

    if (lower.includes('pmegp') || lower.includes('subsidy') || lower.includes('35%') || lower.includes('kvic')) {
      fallbackReply = language === 'ta'
        ? `PMEGP (பிரதம மந்திரி வேலைவாய்ப்பு உருவாக்கும் திட்டம்) வழிகாட்டுதல்:
1. உற்பத்தித் தொழிலுக்கு ₹50 லட்சம் வரையிலும், சேவைத் தொழிலுக்கு ₹20 லட்சம் வரையிலும் நிதி உதவி கிடைக்கும்.
2. கிராமப்புற பெண்கள், SC/ST, OBC பிரிவினருக்கு 35% நேரடி மூலதன மானியம் அரசு வழங்குகிறது.
3. உங்கள் சொந்த முதலீடு திட்ட மதிப்பீட்டில் வெறும் 5% மட்டுமே தேவை.
4. குறைந்தபட்ச கல்வித் தகுதி: ₹10 லட்சத்திற்கு மேற்பட்ட திட்டங்களுக்கு 8-ம் வகுப்பு தேர்ச்சி.
5. விண்ணப்பிக்க kviconline.gov.in தளத்தை அணுகவும்.

⚠️ குறிப்பு: இறுதி தகுதி சம்பந்தப்பட்ட அரசு அதிகாரிகளால் மட்டுமே சரிபார்க்கப்பட வேண்டும்.`
        : `Guidance on Prime Minister's Employment Generation Programme (PMEGP):
1. Financial support: Up to ₹50 Lakhs for Manufacturing and ₹20 Lakhs for Services.
2. Capital Subsidy: 35% margin money subsidy for women, SC/ST, OBC, and minorities in rural areas (25% in urban areas).
3. Promoter Contribution: Only 5% for special categories; 10% for general category.
4. Qualification: Minimum 8th class pass for projects above ₹10L in manufacturing and ₹5L in services.
5. Official portal to apply: kviconline.gov.in through your local District Industries Centre (DIC).

⚠️ Note: Final eligibility must be verified with the concerned government authority.`;
    } else if (lower.includes('needs') || lower.includes('tamil nadu') || lower.includes('தமிழ்நாடு')) {
      fallbackReply = language === 'ta'
        ? `தமிழ்நாடு NEEDS (புதிய தொழில்முனைவோர் மேம்பாட்டு திட்டம்) வழிகாட்டுதல்:
1. தமிழ்நாட்டில் வசிக்கும் பட்டதாரி அல்லது டிப்ளமோ முடித்த 21-45 வயதுக்குட்பட்டோருக்கு 25% மூலதன மானியம் (அதிகபட்சம் ₹75 லட்சம் வரை).
2. திட்ட முதலீடு: ₹10 லட்சம் முதல் ₹5 கோடி வரை.
3. கடன் காலம் முழுவதும் 3% வட்டி மானியம் கிடைக்கும்.
4. சென்னை மற்றும் மாவட்டங்களில் EDII மூலமாக 1 மாத இலவச தொழில் பயிற்சி வழங்கப்படும்.
5. விண்ணப்பிக்க: msmeonline.tn.gov.in தளத்தை அணுகவும்.

⚠️ குறிப்பு: இறுதி தகுதி சம்பந்தப்பட்ட அரசு அதிகாரிகளால் மட்டுமே சரிபார்க்கப்பட வேண்டும்.`
        : `Guidance on Tamil Nadu NEEDS Scheme:
1. Eligibility: Educated youth with Degree/Diploma/ITI residing in Tamil Nadu (Age 21-45 for women/SC/ST/BC/MBC).
2. Subsidy: 25% state capital subsidy capped at ₹75 Lakhs on machinery.
3. Interest Subvention: 3% soft rebate on commercial bank interest for the entire repayment tenure.
4. Project Cost: ₹10 Lakhs up to ₹5 Crores for manufacturing or eligible service units.
5. Official portal: msmeonline.tn.gov.in via your local General Manager, DIC office.

⚠️ Note: Final eligibility must be verified with the concerned government authority.`;
    } else if (lower.includes('mudra') || lower.includes('முத்ரா') || lower.includes('loan') || lower.includes('collateral')) {
      fallbackReply = language === 'ta'
        ? `பிரதம மந்திரி முத்ரா (PMMY) கடனுதவி வழிகாட்டுதல்:
1. எவ்வித சொத்துப் பிணையமும் (Collateral) இன்றி ₹20 லட்சம் வரை வங்கிக் கடன் பெறலாம்.
2. மூன்று நிலைகள்: சிசு (₹50,000 வரை), கிஷோர் (₹50,001 முதல் ₹5 லட்சம் வரை), தருண் (₹5 லட்சம் முதல் ₹20 லட்சம் வரை).
3. தினசரி மூலதனச் செலவுகளுக்கு முத்ரா டெபிட் கார்டு வழங்கப்படுகிறது.
4. தேவையான ஆவணங்கள்: ஆதார் அட்டை, இருப்பிடச் சான்று, இயந்திரங்களுக்கான விலைப்புள்ளி, 6 மாத வங்கி அறிக்கை.
5. jansamarth.in வழியாகவோ அல்லது உங்கள் அருகிலுள்ள அரசு வங்கிக் கிளையிலோ விண்ணப்பிக்கலாம்.

⚠️ குறிப்பு: இறுதி தகுதி சம்பந்தப்பட்ட அரசு அதிகாரிகளால் மட்டுமே சரிபார்க்கப்பட வேண்டும்.`
        : `Guidance on Pradhan Mantri MUDRA Yojana (PMMY):
1. 100% Collateral-Free bank finance guaranteed by NCGTC up to ₹20 Lakhs.
2. Tiers: Shishu (Up to ₹50,000), Kishore (₹50,001 to ₹5 Lakhs), Tarun (₹5L to ₹20 Lakhs).
3. Comes with a MUDRA RuPay Debit Card for instant ATM working capital withdrawals.
4. Essential documents: Aadhaar, PAN, residence proof, quotations for machinery/inventory, and 6-month bank statement.
5. Apply online at jansamarth.in or walk into any public sector bank or regional rural bank.

⚠️ Note: Final eligibility must be verified with the concerned government authority.`;
    } else if (lower.includes('vishwakarma') || lower.includes('artisan') || lower.includes('கைவினைஞர்')) {
      fallbackReply = language === 'ta'
        ? `PM விஸ்வகர்மா திட்டம் வழிகாட்டுதல்:
1. தச்சர், கொல்லர், குயவர், தையல் கலைஞர் உள்ளிட்ட 18 பாரம்பரிய கைவினைத் தொழிலாளர்களுக்கு பொருந்தும்.
2. ₹15,000 இலவச நவீன கருவி மானியம் (Digital Voucher).
3. 5-7 நாட்கள் பயிற்சி காலத்தில் நாள் ஒன்றுக்கு ₹500 உதவித்தொகை.
4. வெறும் 5% சலுகை வட்டியில் ₹3 லட்சம் வரை பிணையமற்ற எளிய கடன்.
5. அருகிலுள்ள பொது சேவை மையம் (CSC) சென்று ஆதார் கைரேகை மூலம் பதிவு செய்யலாம்.

⚠️ குறிப்பு: இறுதி தகுதி சம்பந்தப்பட்ட அரசு அதிகாரிகளால் மட்டுமே சரிபார்க்கப்பட வேண்டும்.`
        : `Guidance on PM Vishwakarma Scheme (PM-VIKAS):
1. Covers 18 traditional artisan trades (Carpenters, Potters, Tailors, Masons, Blacksmiths, etc.).
2. Benefits: ₹15,000 digital toolkit voucher grant + ₹500/day training stipend.
3. Concessional credit: Up to ₹3 Lakhs collateral-free enterprise loan at an ultra-low 5% interest rate.
4. Enrolment: Visit any local Common Service Centre (CSC) with Aadhaar and mobile for biometric verification.

⚠️ Note: Final eligibility must be verified with the concerned government authority.`;
    } else {
      fallbackReply = language === 'ta'
        ? `வணக்கம்! SchemeMate AI உதவியாளரிடம் கேட்டமைக்கு நன்றி.
உங்கள் சிறு அல்லது புதிய தொழிலுக்கு பொருத்தமான திட்டங்களைக் கண்டறிய:
1. "திட்டங்களைக் காண்க" படிவத்தில் உங்கள் வயது, தொழில் வகை, முதலீட்டுத் தேவை மற்றும் சமூகப் பிரிவை உள்ளிடவும்.
2. எங்கள் AI அமைப்பு உங்கள் தகுதியை ஆராய்ந்து PMEGP, NEEDS, MUDRA, AABCS போன்ற திட்டங்களுடன் ஒப்பிட்டு பொருத்தம் காட்டும்.
3. உத்யம் (Udyam) பதிவு, திட்ட அறிக்கை (DPR), வங்கி கணக்கு அறிக்கை ஆகியவற்றை முன்கூட்டியே தயார் செய்து வைப்பது விரைவான ஒப்புதலுக்கு உதவும்.

⚠️ குறிப்பு: இறுதி தகுதி சம்பந்தப்பட்ட அரசு அதிகாரிகளால் மட்டுமே சரிபார்க்கப்பட வேண்டும்.`
        : `Hello! I am SchemeSaathi AI, your government scheme advisory guide.
To discover the highest subsidy scheme for your venture:
1. Fill out the "Find My Schemes" profile form with your age, enterprise type, required investment, and state/district.
2. Our AI engine instantly evaluates criteria across PMEGP, NEEDS, MUDRA, Stand-Up India, and Vishwakarma schemes.
3. Ensure you have your Aadhaar, Udyam MSME registration, 6-month bank statement, and machinery quotations ready.

⚠️ Note: Final eligibility must be verified with the concerned government authority.`;
    }

    res.json({ success: true, reply: fallbackReply, source: 'knowledge-base' });
  });

  // Setup Vite middleware in Dev or Static File Serving in Production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, locate index.html whether running from project root or inside dist
    const distPath = fs.existsSync(path.join(process.cwd(), 'dist', 'index.html'))
      ? path.join(process.cwd(), 'dist')
      : (fs.existsSync(path.join(__dirname, 'index.html')) ? __dirname : path.join(process.cwd(), 'dist'));
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`SchemeMate AI Server running on http://0.0.0.0:${PORT} (isDev: ${isDev})`);
  });

  // Handle graceful shutdown on Cloud Run termination
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, gracefully closing SchemeMate AI server...');
    server.close(() => {
      console.log('HTTP server closed cleanly.');
      process.exit(0);
    });
  });
}

startServer();
