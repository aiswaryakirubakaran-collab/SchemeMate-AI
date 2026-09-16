import React, { useState, useRef, useEffect } from 'react';
import { translations } from '../data/translations';
import { Language, ChatMessage } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  RotateCcw,
  Volume2,
  Square,
  Globe,
  HelpCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface AiChatAssistantProps {
  language: Language;
  isOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;
}

type ChatLanguageMode = 'en' | 'ta' | 'tanglish';

// Automatic Language Detection Function (Tamil script, Tanglish keywords, English)
export function detectQueryLanguage(text: string): ChatLanguageMode {
  // 1. Check for Tamil unicode characters
  if (/[\u0B80-\u0BFF]/.test(text)) {
    return 'ta';
  }

  // 2. Check for phonetic Tanglish vocabulary
  const tanglishRegex = /\b(vanakkam|ungalukku|enakku|ennoda|thittam|thittangal|maniyam|kadan|epdi|eppadi|enna|irukku|apply|pannalam|panna|venduma|thevai|kedaikkum|kaasu|panam|solunga|solla|mudiyuma|mudiyum|nan|neenga|avan|aval|avargal|oor|thozhil|udyam|romba|aagum|varaikkum|kitta|pannikonga|kudunga|vandum|vaanga|podanum|evalavu|evvalavu)\b/i;
  if (tanglishRegex.test(text)) {
    return 'tanglish';
  }

  // 3. Default to English
  return 'en';
}

export const AiChatAssistant: React.FC<AiChatAssistantProps> = ({ 
  language: initialGlobalLanguage,
  isOpen: controlledIsOpen,
  onToggleOpen
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: boolean | ((prev: boolean) => boolean)) => {
    const nextVal = typeof val === 'function' ? val(isOpen) : val;
    setInternalIsOpen(nextVal);
    if (onToggleOpen) onToggleOpen(nextVal);
  };

  const [chatLang, setChatLang] = useState<ChatLanguageMode>(
    initialGlobalLanguage === 'ta' ? 'ta' : 'en'
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: initialGlobalLanguage === 'ta'
        ? 'வணக்கம்! நான் SchemeMate AI அரசு திட்ட ஆலோசகர். மத்திய & மாநில சிறுதொழில் திட்டங்கள், மானியங்கள் மற்றும் விண்ணப்ப செயல்முறைகள் பற்றி தமிழில், Tanglish-ல் அல்லது English-ல் கேளுங்கள்.'
        : 'Hello! I am your SchemeMate AI Scheme Advisor. Ask me anything about MSME schemes, eligibility criteria, subsidies, or application steps in English, தமிழ் (Tamil), or Tanglish.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Pre-built quick prompt suggestions (Requirement 9)
  const quickPrompts = [
    { text: 'How can I get a subsidy for a food truck?', lang: 'en' as const },
    { text: 'What schemes are available for women in Tamil Nadu?', lang: 'en' as const },
    { text: 'How to apply for PMEGP loan step-by-step?', lang: 'en' as const },
    { text: 'Enakku 5 latcham loan thevai, enna scheme irukku?', lang: 'tanglish' as const },
    { text: 'PMEGP 35% மானியம் பெற தகுதி என்ன?', lang: 'ta' as const }
  ];

  // Voice speech synthesis
  const handleSpeak = (messageId: string, text: string) => {
    if (!synthRef.current) return;

    if (speakingMessageId === messageId) {
      // Stop speaking
      synthRef.current.cancel();
      setSpeakingMessageId(null);
      return;
    }

    synthRef.current.cancel();

    // Clean text of markdown/emojis for cleaner speech
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/⚠️/g, 'Note: ')
      .replace(/₹/g, 'Rupees ');

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick best voice
    const voices = synthRef.current.getVoices();
    if (chatLang === 'ta') {
      const tamilVoice = voices.find(v => v.lang.includes('ta') || v.lang.includes('ta-IN'));
      if (tamilVoice) utterance.voice = tamilVoice;
      utterance.lang = 'ta-IN';
    } else {
      const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
      if (indianVoice) utterance.voice = indianVoice;
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    setSpeakingMessageId(messageId);
    synthRef.current.speak(utterance);
  };

  const handleStopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setSpeakingMessageId(null);
  };

  const handleSend = async (queryText?: string, promptLang?: ChatLanguageMode) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    // Automatic Language Detection (Tamil, Tanglish, or English)
    const currentLang = promptLang || detectQueryLanguage(textToSend);
    setChatLang(currentLang);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    handleStopSpeech();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language: currentLang
        })
      });

      if (!response.ok) {
        throw new Error('API response failed');
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || (currentLang === 'ta' ? 'மன்னிக்கவும், தகவலைப் பெறுவதில் சிக்கல் ஏற்பட்டுள்ளது.' : 'Sorry, could not process query.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Helpful fallback
      let fallbackText = '';
      if (currentLang === 'ta') {
        fallbackText = `PMEGP வழிகாட்டுதல்:
1. உற்பத்தித் தொழிலுக்கு ₹50 லட்சம் வரையிலும், சேவைத் தொழிலுக்கு ₹20 லட்சம் வரையிலும் கடன் & மானியம் பெறலாம்.
2. கிராமப்புற பெண்கள் மற்றும் சிறப்பு பிரிவினருக்கு 35% வரை நேரடி மானியம் உண்டு.
3. விண்ணப்பிக்க kviconline.gov.in தளத்தை அணுகவும்.

⚠️ குறிப்பு: இறுதி தகுதி சம்பந்தப்பட்ட அரசு அதிகாரிகளால் மட்டுமே சரிபார்க்கப்பட வேண்டும்.`;
      } else if (currentLang === 'tanglish') {
        fallbackText = `Ungalukku best option PMEGP (Prime Minister's Employment Generation Programme) & TN NEEDS:
1. 5 Latcham loan-ukku MUDRA (Kishore category) or PMEGP scheme apply pannalam.
2. PMEGP-la women and rural entrepreneurs-ku 35% varaikkum subsidy kedaikkum.
3. kviconline.gov.in portal-la Udyam registration & Project Report vachu apply pannunga.

⚠️ Note: Final eligibility-ai DTFC / Bank authority kitta confirm pannikonga.`;
      } else {
        fallbackText = `Official Guidance for MSME Financing:
1. PMEGP offers up to ₹50 Lakhs for manufacturing and ₹20 Lakhs for service enterprises with 15% to 35% capital subsidy.
2. MUDRA provides collateral-free loans: Shishu (up to ₹50k), Kishore (₹50k to ₹5L), and Tarun (up to ₹20L).
3. Apply directly at kviconline.gov.in or contact your nearest District Industries Centre (DIC).

⚠️ Note: Final eligibility must be verified with the concerned government authority.`;
      }

      const fallbackMsg: ChatMessage = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    handleStopSpeech();
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'ai',
        text: chatLang === 'ta'
          ? 'உரையாடல் மீட்டமைக்கப்பட்டது. உங்கள் புதிய கேள்வியை கேட்கலாம்.'
          : chatLang === 'tanglish'
          ? 'Chat reset aagiduchu! Unga puthiya kelvi-ai kekkalam.'
          : 'Chat refreshed. Ask your question about government schemes and subsidies.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-xl hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 cursor-pointer border border-[#06B6D4]/50 group"
          aria-label="Open AI Scheme Advisor"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#06B6D4]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide">
            SchemeMate AI Advisor
          </span>
        </button>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[600px] max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header with Deep Navy Blue */}
          <div className="bg-[#4F46E5] text-white p-4 flex items-center justify-between border-b border-indigo-700">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>SchemeMate AI Advisor</span>
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-slate-100">
                  Multilingual Voice & Chat • Tamil / English / Tanglish
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-100">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Reset Chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  handleStopSpeech();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Automatic Language Status Bar */}
          <div className="bg-[#1E1B4B] px-3 py-1.5 flex items-center justify-between text-xs border-b border-white/10">
            <div className="flex items-center gap-1.5 text-slate-300 text-[11px] font-semibold">
              <Globe className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Smart Language Engine:</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse"></span>
              <span>
                {chatLang === 'ta' ? 'தமிழ் (Tamil)' : chatLang === 'tanglish' ? 'Tanglish' : 'English'}
                {' '}<span className="text-slate-400 font-normal">(Auto-detected)</span>
              </span>
            </div>
          </div>

          {/* Statutory disclaimer banner inside chat */}
          <div className="bg-amber-50 px-3 py-1.5 border-b border-amber-200 text-[10px] text-amber-900 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">
              Indicative advisory based on official government guidelines. Subject to official verification.
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#4F46E5] text-white rounded-br-xs font-medium shadow-xs'
                      : 'bg-white text-[#1F2937] border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  
                  {/* Voice Listen Button on AI messages (Requirement 9) */}
                  {msg.sender === 'ai' && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                          speakingMessageId === msg.id
                            ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            : 'bg-slate-100 text-[#1E1B4B] hover:bg-[#4F46E5]/10 hover:text-[#4F46E5]'
                        }`}
                        title={speakingMessageId === msg.id ? 'Stop listening' : 'Listen aloud'}
                      >
                        {speakingMessageId === msg.id ? (
                          <>
                            <Square className="w-3 h-3 fill-current" />
                            <span>Stop Audio</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#4F46E5]" />
                            <span>Listen (குரல்)</span>
                          </>
                        )}
                      </button>

                      <span className="text-[9px] text-slate-400">
                        {msg.timestamp}
                      </span>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-fit shadow-2xs">
                <div className="w-3 h-3 rounded-full bg-[#06B6D4] animate-ping" />
                <span>
                  {chatLang === 'ta' 
                    ? 'SchemeMate AI திட்டங்களை பகுப்பாய்வு செய்கிறது...' 
                    : chatLang === 'tanglish' 
                    ? 'Scheme details check panrom, oru nimisham...' 
                    : 'Analyzing MSME scheme guidelines...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions (Requirement 9) */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Suggestions:
            </span>
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item.text, item.lang)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#4F46E5]/10 hover:text-[#4F46E5] text-slate-700 text-[11px] font-medium transition-colors shrink-0 border border-slate-200 cursor-pointer"
              >
                {item.text}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask in English, தமிழ் (Tamil), or Tanglish..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-[#F8FAFC] focus:bg-white text-xs text-[#1F2937] outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white disabled:opacity-40 transition-all cursor-pointer shrink-0 shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
