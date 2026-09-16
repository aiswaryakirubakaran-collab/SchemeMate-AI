import { Scheme } from '../types';

export const sampleSchemes: Scheme[] = [
  {
    id: 'pmegp-001',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    nameTamil: "பிரதம மந்திரி வேலைவாய்ப்பு உருவாக்கும் திட்டம் (PMEGP)",
    acronym: 'PMEGP',
    ministryOrDepartment: 'Ministry of Micro, Small and Medium Enterprises (MSME), Govt of India',
    ministryTamil: 'மத்திய குறு, சிறு மற்றும் நடுத்தர தொழில் அமைச்சகம்',
    level: 'Central',
    targetStates: ['All'],
    category: 'Subsidies & Grants',
    categoryTamil: 'மானியங்கள் மற்றும் கடனுதவி',
    maxSupportAmount: 'Up to ₹50 Lakhs (Manufacturing) / ₹20 Lakhs (Services)',
    maxSupportValueLakhs: 50,
    subsidyPercentage: '15% to 35% margin money subsidy (35% for rural women, SC/ST, OBC, minorities)',
    subsidyPercentageTamil: '15% முதல் 35% வரை மானியம் (கிராமப்புற பெண்கள், SC/ST பிரிவினருக்கு 35%)',
    interestSubvention: 'Standard commercial bank rate with 3-year lock-in on subsidy',
    interestSubventionTamil: 'வங்கி வட்டி விகிதம்; மானியத்திற்கு 3 வருட லாக்-இன்',
    collateralRequired: 'No Collateral required for projects up to ₹10 Lakhs (Covered under CGTMSE)',
    collateralRequiredTamil: 'ரூ. 10 லட்சம் வரை எவ்வித பிணையமும் தேவையில்லை (CGTMSE பாதுகாப்பு)',
    targetSectors: ['Manufacturing', 'Services', 'Food Processing', 'Handicraft / Artisan'],
    eligibleStages: ['Planning', 'New'],
    minAge: 18,
    maxAge: 65,
    targetBeneficiaries: ['Women', 'SC/ST', 'OBC', 'Rural Youth', 'Differently Abled', 'Minorities'],
    targetBeneficiariesTamil: ['பெண்கள்', 'SC/ST', 'OBC', 'கிராமப்புற இளைஞர்கள்', 'மாற்றுத்திறனாளிகள்'],
    eligibilityCriteria: [
      'Individual entrepreneur must be at least 18 years of age.',
      'Minimum 8th standard pass required for projects costing above ₹10 Lakhs in Manufacturing and above ₹5 Lakhs in Services.',
      'Only new projects are considered for initial sanction; existing units not eligible for 1st tranche.',
      'Self-help Groups (SHGs) and institutions registered under Societies Registration Act are also eligible.',
      'Beneficiary contribution is only 5% of project cost for special categories (women/SC/ST/OBC) and 10% for general category.'
    ],
    eligibilityCriteriaTamil: [
      'விண்ணப்பதாரர் 18 வயது பூர்த்தியடைந்திருக்க வேண்டும்.',
      'உற்பத்தித் துறையில் ₹10 லட்சத்திற்கு மேல், சேவைத் துறையில் ₹5 லட்சத்திற்கு மேல் உள்ள திட்டங்களுக்கு குறைந்தபட்சம் 8-ம் வகுப்பு தேர்ச்சி அவசியம்.',
      'புதிய திட்டங்களுக்கு மட்டுமே முதலாவது கட்ட நிதி உதவி வழங்கப்படும்.',
      'பெண்கள் மற்றும் சிறப்புப் பிரிவினரின் சொந்த முதலீடு திட்ட மதிப்பீட்டில் வெறும் 5% மட்டுமே.'
    ],
    benefits: [
      'High capital subsidy up to 35% credited directly into bank as margin money deposit.',
      'Covers term loan for machinery/equipment and working capital for first operating cycle.',
      'Free Entrepreneurship Development Programme (EDP) training conducted by RSETI/KVIC.',
      'Eligible for 2nd loan up to ₹1 Crore for upgrade of successful existing PMEGP units with 15% subsidy.'
    ],
    benefitsTamil: [
      'வங்கி கணக்கில் செலுத்தப்படும் 35% வரை நேரடி மூலதன மானியம்.',
      'இயந்திரங்கள் மற்றும் முதல் சுழற்சிக்கான நடைமுறை மூலதனத்தை உள்ளடக்கியது.',
      'இலவச தொழில்முனைவோர் மேம்பாட்டுப் பயிற்சி (EDP).',
      'நன்றாக இயங்கும் நிறுவனங்களுக்கு ₹1 கோடி வரை 2-வது கட்ட விரிவாக்கக் கடன்.'
    ],
    requiredDocuments: [
      'Aadhaar Card & PAN Card',
      'Passport size photographs',
      'Detailed Project Report (DPR) with cash-flow projection',
      'Highest Educational Qualification Certificate (8th / 10th / Degree)',
      'Community / Caste Certificate (for SC/ST/OBC/Minority subsidy benefit)',
      'Rural Area Certificate from Gram Panchayat / BDO (for 35% rural subsidy)',
      'Bank Account passbook / cancelled cheque',
      'Rent agreement or Land ownership document for business premises'
    ],
    requiredDocumentsTamil: [
      'ஆதார் மற்றும் பான் அட்டை',
      'பாஸ்போர்ட் அளவு புகைப்படங்கள்',
      'விரிவான திட்ட அறிக்கை (DPR)',
      'கல்வித் தகுதிச் சான்றிதழ் (குறைந்தபட்சம் 8-ம் வகுப்பு)',
      'சாதிச் சான்றிதழ் (கூடுதல் மானியம் பெற)',
      'கிராமப்புற சான்றிதழ் (பஞ்சாயத்து தலைவர் / BDO வழங்கியது)',
      'வங்கி கணக்குப் புத்தகம் மற்றும் தொழில் இடத்திற்கான ஒப்பந்தம்'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Draft Project Report (DPR)',
        titleTamil: 'திட்ட அறிக்கை தயார் செய்தல்',
        description: 'Prepare a simple financial breakdown of machinery, working capital, and expected revenue.',
        descriptionTamil: 'இயந்திரங்கள், மூலதனம் மற்றும் வருவாய் மதிப்பீட்டுடன் கூடிய திட்ட அறிக்கையை உருவாக்கவும்.'
      },
      {
        step: 2,
        title: 'Online Application on KVIC Portal',
        titleTamil: 'KVIC இணையதளத்தில் விண்ணப்பித்தல்',
        description: 'Submit Form on kviconline.gov.in selecting your District Industries Centre (DIC) or KVIC agency.',
        descriptionTamil: 'kviconline.gov.in தளத்தில் உங்கள் மாவட்ட தொழில் மையத்தை (DIC) தேர்வு செய்து விண்ணப்பிக்கவும்.'
      },
      {
        step: 3,
        title: 'District Task Force Committee Interview',
        titleTamil: 'மாவட்ட சிறப்புக் குழு நேர்காணல்',
        description: 'Attend a short introductory interaction at your local DIC office to verify your project viability.',
        descriptionTamil: 'உங்கள் மாவட்ட தொழில் மையத்தில் நடைபெறும் சிறு நேர்காணலில் கலந்துகொள்ளவும்.'
      },
      {
        step: 4,
        title: 'Bank Sanction & EDP Training',
        titleTamil: 'வங்கி அனுமதி & EDP பயிற்சி',
        description: 'Upon bank in-principle clearance, complete the 10-day EDP training online or offline before fund release.',
        descriptionTamil: 'வங்கி ஒப்புதல் கிடைத்தவுடன் 10 நாட்கள் EDP பயிற்சியை முடித்து நிதியைப் பெறவும்.'
      }
    ],
    officialPortalUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    nodalAgency: 'KVIC, KVIB & District Industries Centres (DIC)',
    lastVerifiedDate: '2026-03-01',
    status: 'Active',
    tags: ['Subsidy', 'Manufacturing', 'Services', 'Rural', 'Women', 'High Subsidy'],
    keyHighlight: 'Up to 35% Government Cash Subsidy for Rural Women & Marginalized Groups',
    keyHighlightTamil: 'கிராமப்புற பெண்கள் மற்றும் சிறப்புப் பிரிவினருக்கு 35% வரை நேரடி அரசு மானியம்'
  },
  {
    id: 'mudra-002',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    nameTamil: 'பிரதம மந்திரி முத்ரா யோஜனா (PMMY)',
    acronym: 'PM MUDRA',
    ministryOrDepartment: 'Department of Financial Services, Ministry of Finance, Govt of India',
    ministryTamil: 'மத்திய நிதி அமைச்சகம், நிதி சேவைகள் துறை',
    level: 'Central',
    targetStates: ['All'],
    category: 'Low-Interest Loans',
    categoryTamil: 'குறைந்த வட்டி கடனுதவி',
    maxSupportAmount: 'Up to ₹20 Lakhs (Tarun Plus Category)',
    maxSupportValueLakhs: 20,
    subsidyPercentage: 'No upfront capital subsidy; 100% collateral-free credit guarantee',
    subsidyPercentageTamil: 'நேரடி மானியம் இல்லை; 100% பிணையமற்ற கடன் பாதுகாப்பு',
    interestSubvention: 'Low competitive interest rates (MCLR linked, 8.5% - 11.5%)',
    interestSubventionTamil: 'குறைந்த வங்கி வட்டி விகிதம் (8.5% முதல் 11.5%)',
    collateralRequired: 'Zero Collateral, Zero Third-Party Guarantor',
    collateralRequiredTamil: 'எந்தவித சொத்துப் பிணையமும், ஜாமீன்தாரரும் தேவையில்லை',
    targetSectors: ['Trading / Retail', 'Services', 'Manufacturing', 'Handicraft / Artisan', 'Food Processing', 'Agriculture / Allied'],
    eligibleStages: ['Planning', 'New', 'Existing'],
    minAge: 18,
    maxAge: 70,
    targetBeneficiaries: ['Small Shopkeepers', 'Fruit/Vegetable Vendors', 'Artisans', 'Micro Service Providers', 'Women Entrepreneurs'],
    targetBeneficiariesTamil: ['சிறு கடைக்காரர்கள்', 'வியாபாரிகள்', 'கைவினைஞர்கள்', 'சேவை வழங்குநர்கள்', 'பெண் தொழில்முனைவோர்'],
    eligibilityCriteria: [
      'Any Indian citizen having a viable business idea or operating an income-generating micro enterprise.',
      'Shishu tier: Loans up to ₹50,000 for early starters.',
      'Kishore tier: Loans from ₹50,001 up to ₹5 Lakhs for equipment & tools.',
      'Tarun tier: Loans from ₹5,00,001 up to ₹10 Lakhs (recently enhanced to ₹20 Lakhs for proven track record borrowers).',
      'Should not have defaulted on any previous loan with any commercial or cooperative bank.'
    ],
    eligibilityCriteriaTamil: [
      'வருமானம் ஈட்டும் சிறு தொழில் செய்யும் அல்லது தொடங்க விரும்பும் இந்திய குடிமக்கள்.',
      'சிசு (Shishu): ₹50,000 வரை ஆரம்ப நிலை கடன்கள்.',
      'கிஷோர் (Kishore): ₹50,001 முதல் ₹5 லட்சம் வரை.',
      'தருண் (Tarun): ₹5 லட்சம் முதல் ₹20 லட்சம் வரை.',
      'முந்தைய எந்த வங்கியிலும் கடன் பாக்கி / வாராக்கடன் இருக்கக்கூடாது.'
    ],
    benefits: [
      'Zero collateral or asset pledging required; credit guaranteed by National Credit Guarantee Trustee Company (NCGTC).',
      'Mudra Debit Card issued for convenient working capital withdrawal anytime from ATMs.',
      'Minimal processing fees and quick loan disbursement through any scheduled bank or NBFC.',
      'Available for retail shops, repair centers, transport vehicles, salon, tailoring, and micro food units.'
    ],
    benefitsTamil: [
      'எந்தவொரு சொத்துப் பிணையமும் இன்றி NCGTC உத்தரவாதத்தின் கீழ் கடன் வழங்கப்படுகிறது.',
      'நடைமுறை மூலதன செலவுகளுக்கு முத்ரா டெபிட் கார்டு வழங்கப்படுகிறது.',
      'குறைந்த செயலாக்கக் கட்டணம் மற்றும் விரைவான பரிசீலனை.',
      'மளிகை கடை, தையல், பழுதுபார்ப்பு, ஆட்டோ போன்ற அனைத்து சிறு தொழில்களுக்கும் ஏற்றது.'
    ],
    requiredDocuments: [
      'Aadhaar Card, Voter ID or Driving Licence',
      'PAN Card',
      'Proof of Residence (Electricity bill / Ration card)',
      'Quotations for machinery/items to be purchased',
      'Bank statement of the applicant for last 6 months (for Kishore/Tarun)',
      'Business address proof & Trade registration / Udyam Certificate (if available)'
    ],
    requiredDocumentsTamil: [
      'ஆதார் அட்டை மற்றும் பான் அட்டை',
      'இருப்பிடச் சான்றிதழ் (மின்சார ரசீது அல்லது குடும்ப அட்டை)',
      'வாங்கவிருக்கும் இயந்திரங்களுக்கான விலைப்புள்ளி (Quotations)',
      'கடந்த 6 மாத கால வங்கி கணக்கு அறிக்கை',
      'தொழில் செய்யும் இடத்திற்கான சான்று'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Choose Tier & Collect Quotations',
        titleTamil: 'பிரிவைத் தேர்வு செய்து விலைப்புள்ளி பெறுக',
        description: 'Decide loan category (Shishu < ₹50k, Kishore < ₹5L, Tarun < ₹20L) and obtain quotes for items.',
        descriptionTamil: 'தொழில் தேவைக்கேற்ப பிரிவு தேர்வு செய்து உபகரணங்களுக்கான விலைப்புள்ளிகளைப் பெறவும்.'
      },
      {
        step: 2,
        title: 'Apply on JanSamarth or Bank Branch',
        titleTamil: 'JanSamarth தளம் அல்லது வங்கியில் விண்ணப்பிக்கவும்',
        description: 'Submit digital application on jansamarth.in or walk into your nearest public sector bank / RRB.',
        descriptionTamil: 'jansamarth.in தளத்தில் இணையவழியாக அல்லது அருகிலுள்ள வங்கிக் கிளையில் நேரடியாக விண்ணப்பிக்கலாம்.'
      },
      {
        step: 3,
        title: 'Verification and Sanction',
        titleTamil: 'சரிபார்ப்பு மற்றும் கடன் ஒப்படைப்பு',
        description: 'Bank verifies identity, business site, and disburse funds with MUDRA debit card.',
        descriptionTamil: 'வங்கி கள ஆய்வு மேற்கொண்டு ஒப்புதல் அளித்து முத்ரா கார்டு வழங்கும்.'
      }
    ],
    officialPortalUrl: 'https://www.mudra.org.in/',
    nodalAgency: 'MUDRA Ltd, SIDBI, All Commercial Banks & RRBs',
    lastVerifiedDate: '2026-02-28',
    status: 'Active',
    tags: ['Collateral Free', 'Working Capital', 'Retail', 'Low Interest', 'Quick Sanction'],
    keyHighlight: '100% Collateral-Free Bank Finance with MUDRA Debit Card',
    keyHighlightTamil: '100% பிணையமற்ற வங்கிக் கடன் மற்றும் முத்ரா டெபிட் கார்டு வசதி'
  },
  {
    id: 'needs-tn-003',
    name: 'New Entrepreneur-cum-Enterprise Development Scheme (NEEDS)',
    nameTamil: 'புதிய தொழில்முனைவோர் மற்றும் தொழில் நிறுவன மேம்பாட்டு திட்டம் (NEEDS)',
    acronym: 'NEEDS TN',
    ministryOrDepartment: 'Department of MSME, Government of Tamil Nadu',
    ministryTamil: 'தமிழ்நாடு அரசு, குறு, சிறு மற்றும் நடுத்தர தொழில் துறை',
    level: 'State',
    targetStates: ['Tamil Nadu'],
    category: 'Subsidies & Grants',
    categoryTamil: 'அரசு மானியங்கள் மற்றும் கடன்',
    maxSupportAmount: 'Project cost from ₹10 Lakhs up to ₹500 Lakhs (₹5 Crores)',
    maxSupportValueLakhs: 500,
    subsidyPercentage: '25% State Capital Subsidy (up to ₹75 Lakhs) + 5% additional for SC/ST/Women/Differently Abled',
    subsidyPercentageTamil: '25% அரசு மூலதன மானியம் (₹75 லட்சம் வரை) + பெண்கள், SC/ST பிரிவினருக்கு கூடுதல் 5%',
    interestSubvention: '3% Interest Subvention for the entire repayment tenure',
    interestSubventionTamil: 'முழு கடன் காலத்திற்கும் 3% வட்டி மானியச் சலுகை',
    collateralRequired: 'Collateral as per bank norms (CGTMSE coverage permitted)',
    collateralRequiredTamil: 'வங்கி விதிகளின்படி அல்லது CGTMSE கீழ் பிணையமற்ற வசதி',
    targetSectors: ['Manufacturing', 'Services', 'Food Processing', 'Tech / Digital'],
    eligibleStages: ['Planning', 'New'],
    minAge: 21,
    maxAge: 45, // 45 for SC/ST/Women/BC/MBC, 35 for General
    targetBeneficiaries: ['Educated Youth of Tamil Nadu', 'Women Entrepreneurs', 'SC/ST/MBC', 'Degree/Diploma Holders'],
    targetBeneficiariesTamil: ['தமிழ்நாட்டு படித்த இளைஞர்கள்', 'பட்டதாரிகள் / டிப்ளமோ முடித்தவர்கள்', 'பெண்கள்', 'SC/ST/MBC'],
    eligibilityCriteria: [
      'Applicant must be a resident of Tamil Nadu holding Degree, Diploma, or ITI certificate.',
      'Age between 21 to 35 for General category, and 21 to 45 for Special categories (Women, SC, ST, BC, MBC, Differently abled, Transgender).',
      'Should not have availed prior capital subsidy under UYEGP, PMEGP, or other state schemes.',
      'Only new manufacturing and service sector enterprises located within Tamil Nadu are eligible.',
      'Promoter contribution: 10% for General, only 5% for Women, SC/ST, BC, MBC, and Minorities.'
    ],
    eligibilityCriteriaTamil: [
      'தமிழ்நாட்டில் வசிக்கும் பட்டதாரி, பட்டயப்படிப்பு (Diploma) அல்லது ITI தேர்ச்சி பெற்ற இளைஞர்.',
      'வயது வரம்பு: பொதுப்பிரிவு 21-35 வயது; பெண்கள்/SC/ST/BC/MBC பிரிவினருக்கு 21-45 வயது.',
      'முன்னர் UYEGP அல்லது PMEGP திட்டங்களில் மானியம் பெற்றிருக்கக் கூடாது.',
      'உற்பத்தி மற்றும் சேவைத் துறை சார்ந்த புதிய தொழில்களுக்கு மட்டுமே பொருந்தும்.',
      'பெண்கள் மற்றும் பிற்படுத்தப்பட்டோரின் சொந்த பங்கு வெறும் 5% மட்டுமே.'
    ],
    benefits: [
      'Generous 25% capital subsidy capped at ₹75 Lakhs on plant & machinery.',
      '3% interest rebate throughout the loan repayment period, lowering EMI burdens significantly.',
      'State government sponsored one-month residential Entrepreneurship Training at EDII-TN.',
      'Priority industrial plot allotment in SIDCO industrial estates across Tamil Nadu.'
    ],
    benefitsTamil: [
      'இயந்திர தளவாடங்களுக்கு ₹75 லட்சம் வரை 25% அதிகபட்ச அரசு மூலதன மானியம்.',
      'கடன் திருப்பிச் செலுத்தும் காலம் முழுவதும் 3% வட்டி மானியம்.',
      'தமிழ்நாடு தொழில்முனைவோர் மேம்பாட்டு நிறுவனம் (EDII) மூலம் இலவச சிறப்புப் பயிற்சி.',
      'சிட்கோ (SIDCO) தொழிற்பேட்டைகளில் தொழில் மனைகள் பெறுவதில் முன்னுரிமை.'
    ],
    requiredDocuments: [
      'Degree / Diploma / ITI completion certificate & Marksheets',
      'Nativity Certificate of Tamil Nadu',
      'Community Certificate',
      'Detailed Project Report (DPR) with machinery invoices',
      'Aadhaar Card and PAN Card',
      'Lease Deed / Rental Agreement for business premises',
      'NOC / Consent to Establish from pollution board (if applicable)'
    ],
    requiredDocumentsTamil: [
      'பட்டப்படிப்பு / டிப்ளமோ / ITI சான்றிதழ்',
      'தமிழ்நாடு இருப்பிடச் சான்றிதழ் (Nativity)',
      'சாதிச் சான்றிதழ் (Community Certificate)',
      'விரிவான திட்ட அறிக்கை (DPR)',
      'ஆதார் மற்றும் பான் அட்டை',
      'தொழில் இடத்திற்கான வாடகை / குத்தகை ஒப்பந்தம்'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Register on MSME Online TN Portal',
        titleTamil: 'MSME ஆன்லைன் TN தளத்தில் பதிவு',
        description: 'Create profile on msmeonline.tn.gov.in and select the NEEDS scheme tab.',
        descriptionTamil: 'msmeonline.tn.gov.in தளத்தில் பயனர் கணக்கு தொடங்கி NEEDS திட்டத்தைத் தேர்வு செய்க.'
      },
      {
        step: 2,
        title: 'Upload Project Report & Documents',
        titleTamil: 'ஆவணங்கள் மற்றும் DPR பதிவேற்றம்',
        description: 'Upload your educational proofs, machinery quotations, and detailed projected cash flows.',
        descriptionTamil: 'கல்விச் சான்றுகள், இயந்திர விலைப்புள்ளி மற்றும் திட்ட அறிக்கையைப் பதிவேற்றவும்.'
      },
      {
        step: 3,
        title: 'District Task Force Interview & Sanction',
        titleTamil: 'மாவட்டக் குழு நேர்காணல் & வங்கி ஒப்புதல்',
        description: 'General Manager of DIC conducts project appraisal; chosen commercial bank issues sanction letter.',
        descriptionTamil: 'மாவட்ட தொழில் மைய பொது மேலாளர் தலைமையிலான குழு ஆய்வு செய்து வங்கிக்கு பரிந்துரைக்கும்.'
      },
      {
        step: 4,
        title: 'EDII Training & Subsidy Release',
        titleTamil: 'EDII பயிற்சி மற்றும் மானியம் பெறுதல்',
        description: 'Complete EDII Chennai/District training module, after which the 25% subsidy is credited.',
        descriptionTamil: 'EDII பயிற்சி முடித்தவுடன் 25% மானியத் தொகை வங்கி கணக்கில் வரவு வைக்கப்படும்.'
      }
    ],
    officialPortalUrl: 'https://msmeonline.tn.gov.in/needs/',
    nodalAgency: 'District Industries Centre (DIC) & EDII Tamil Nadu',
    lastVerifiedDate: '2026-03-05',
    status: 'Active',
    tags: ['Tamil Nadu', 'State Subsidy', 'Youth', 'High Value', '25% Subsidy', 'Manufacturing'],
    keyHighlight: '25% Subsidy up to ₹75 Lakhs + 3% Interest Subvention for TN Youth',
    keyHighlightTamil: 'தமிழ்நாடு இளைஞர்களுக்கு ₹75 லட்சம் வரை 25% மானியம் + 3% வட்டிச் சலுகை'
  },
  {
    id: 'standup-india-004',
    name: 'Stand-Up India Scheme for Women and SC/ST Entrepreneurs',
    nameTamil: 'மகளிர் மற்றும் SC/ST பிரிவினருக்கான ஸ்டாண்ட்-அப் இந்தியா திட்டம்',
    acronym: 'Stand-Up India',
    ministryOrDepartment: 'Department of Financial Services, Ministry of Finance, Govt of India',
    ministryTamil: 'மத்திய நிதி அமைச்சகம், இந்திய அரசு',
    level: 'Central',
    targetStates: ['All'],
    category: 'Women & Marginalized',
    categoryTamil: 'பெண்கள் மற்றும் விளிம்புநிலை மக்கள் கடனுதவி',
    maxSupportAmount: '₹10 Lakhs to ₹1 Crore (Composite Loan)',
    maxSupportValueLakhs: 100,
    subsidyPercentage: 'Credit Guarantee Scheme coverage with up to 15% state subsidy convergence',
    subsidyPercentageTamil: 'கடன் உத்தரவாதப் பாதுகாப்பு மற்றும் மாநில மானியங்களுடன் இணைக்கும் வசதி',
    interestSubvention: 'Lowest applicable interest rate for category (Tenor premium + base rate, capped)',
    interestSubventionTamil: 'வங்கியின் மிகக் குறைந்த வட்டி விகிதத்தில் கூட்டுக்கடன்',
    collateralRequired: 'Covered under Credit Guarantee Scheme for Stand-Up India (CGFSIL); no third-party guarantee needed',
    collateralRequiredTamil: 'CGFSIL கடன் உத்தரவாதம் மூலம் பாதுகாக்கப்படுகிறது; மூன்றாம் நபர் பிணையம் தேவையில்லை',
    targetSectors: ['Manufacturing', 'Services', 'Trading / Retail', 'Agriculture / Allied'],
    eligibleStages: ['Planning', 'New'],
    minAge: 18,
    maxAge: 65,
    targetBeneficiaries: ['SC Entrepreneurs', 'ST Entrepreneurs', 'Women Entrepreneurs (All categories)'],
    targetBeneficiariesTamil: ['SC தொழில்முனைவோர்', 'ST தொழில்முனைவோர்', 'அனைத்துப் பிரிவு பெண்கள்'],
    eligibilityCriteria: [
      'Applicant must be either an SC, ST, or a Woman entrepreneur.',
      'Loans are sanctioned exclusively for setting up a greenfield (first-time) enterprise.',
      'In case of non-individual enterprises, 51% of shareholding and controlling stake must be held by SC/ST or woman.',
      'Borrower should not be in default to any bank or financial institution.',
      'Promoter contribution can be as low as 10% to 15% when converged with eligible state/central subsidies.'
    ],
    eligibilityCriteriaTamil: [
      'விண்ணப்பதாரர் SC, ST அல்லது பெண்ணாக இருக்க வேண்டும்.',
      'புதியதாக தொடங்கப்படும் முதல் நிறுவனத்திற்கு (Greenfield) மட்டுமே பொருந்தும்.',
      'கூட்டு நிறுவனமாக இருந்தால் 51% உரிமை SC/ST அல்லது பெண் வசம் இருக்க வேண்டும்.',
      'எந்த வங்கியிலும் நிலுவை அல்லது கடன் தவறிய வரலாறு இருக்கக்கூடாது.',
      'விண்ணப்பதாரரின் சொந்த முதலீடு 10% முதல் 15% மட்டுமே.'
    ],
    benefits: [
      'Mandatory quota: Every scheduled bank branch in India is mandated to sanction at least 1 SC/ST borrower and 1 Woman borrower.',
      'Handholding support via SIDBI Connect Centres for DPR, loan facilitation, and skill development.',
      'High ceiling up to ₹1 Crore composite loan covering both plant machinery and working capital.',
      'Direct convergence with central/state capital subsidy programs.'
    ],
    benefitsTamil: [
      'ஒவ்வொரு வங்கிக் கிளையும் குறைந்தது ஒரு பெண் மற்றும் ஒரு SC/ST தொழில்முனைவோருக்கு இக்கடனை வழங்க வேண்டும் என்ற கட்டாயம்.',
      'திட்ட அறிக்கை மற்றும் வழிகாட்டுதலுக்கு SIDBI நேரடி உதவி.',
      'இயந்திரங்கள் மற்றும் மூலதனத்திற்கு ₹1 கோடி வரை முழுமையான நிதி ஆதரவு.',
      'மத்திய/மாநில மானியங்களை இதனுடன் இணைத்து பயன் பெறும் வசதி.'
    ],
    requiredDocuments: [
      'Aadhaar Card and PAN Card',
      'Caste Certificate (for SC/ST applicants)',
      'Detailed Project Report (DPR) with 3-year projected balance sheet',
      'Proof of business premises (Own / Registered Lease)',
      'Machinery supplier quotations & technical specifications',
      'Bank statement for last 6 months'
    ],
    requiredDocumentsTamil: [
      'ஆதார் மற்றும் பான் அட்டை',
      'சாதிச் சான்றிதழ் (SC/ST விண்ணப்பதாரர்களுக்கு)',
      '3 ஆண்டு நிதி மதிப்பீட்டுடன் கூடிய விரிவான திட்ட அறிக்கை (DPR)',
      'தொழில் இடத்திற்கான வாடகை / உரிமை ஒப்பந்தம்',
      'இயந்திரங்களுக்கான விலைப்புள்ளி'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Register on Stand-Up Mitra Portal',
        titleTamil: 'ஸ்டாண்ட்-அப் மித்ரா தளத்தில் பதிவு',
        description: 'Visit standupmitra.in and enter your business concept and funding requirement.',
        descriptionTamil: 'standupmitra.in தளத்தில் உங்கள் தொழில் திட்டம் மற்றும் கடன் தேவையைப் பதிவு செய்யவும்.'
      },
      {
        step: 2,
        title: 'Select Handholding Support or Direct Bank',
        titleTamil: 'வழிகாட்டல் ஆதரவு அல்லது வங்கியைத் தேர்வு செய்க',
        description: 'Choose whether you need guidance on DPR drafting from SIDBI or apply directly to your preferred bank branch.',
        descriptionTamil: 'DPR தயாரிக்க SIDBI உதவியை தேர்வு செய்யலாம் அல்லது நேரடியாக வங்கியை அணுகலாம்.'
      },
      {
        step: 3,
        title: 'Lead Generation & Branch Sanction',
        titleTamil: 'விண்ணப்ப பரிசீலனை மற்றும் அனுமதி',
        description: 'Your application is assigned to the nearest bank branch for appraisal and sanction within 3-4 weeks.',
        descriptionTamil: 'அருகிலுள்ள வங்கிக் கிளைக்கு விண்ணப்பம் அனுப்பப்பட்டு 3-4 வாரங்களில் பரிசீலிக்கப்படும்.'
      }
    ],
    officialPortalUrl: 'https://www.standupmitra.in/',
    nodalAgency: 'SIDBI, Stand-Up Mitra, All Commercial Banks',
    lastVerifiedDate: '2026-03-02',
    status: 'Active',
    tags: ['Women', 'SC/ST', 'High Funding', 'Greenfield', 'Mandatory Quota'],
    keyHighlight: 'Mandatory ₹10L - ₹1Cr Loan Support per Bank Branch for Women & SC/ST',
    keyHighlightTamil: 'ஒவ்வொரு வங்கிக் கிளையிலும் ₹10L - ₹1Cr வரை பெண் மற்றும் SC/ST தொழில்முனைவோருக்கு பிரத்யேக கடன்'
  },
  {
    id: 'pm-vishwakarma-005',
    name: 'PM Vishwakarma Scheme (PM-VIKAS)',
    nameTamil: 'பிரதம மந்திரி விஸ்வகர்மா திட்டம் (PM-VIKAS)',
    acronym: 'PM Vishwakarma',
    ministryOrDepartment: 'Ministry of MSME & Ministry of Skill Development, Govt of India',
    ministryTamil: 'மத்திய MSME மற்றும் திறன் மேம்பாட்டு அமைச்சகம்',
    level: 'Central',
    targetStates: ['All'],
    category: 'Artisan & Skill Credit',
    categoryTamil: 'கைவினைஞர் மற்றும் திறன் சார்ந்த உதவி',
    maxSupportAmount: '₹3 Lakhs in two tranches (₹1L Tranche 1 + ₹2L Tranche 2) + ₹15,000 Toolkit Grant',
    maxSupportValueLakhs: 3,
    subsidyPercentage: '₹15,000 Direct Toolkit Incentive + 8% interest subvention paid by Govt',
    subsidyPercentageTamil: 'ரூ. 15,000 இலவச நவீன கருவி மானியம் + அரசு ஏற்கும் 8% வட்டி மானியம்',
    interestSubvention: 'Concessional interest rate of only 5% to the artisan (Govt pays the remaining 8%)',
    interestSubventionTamil: 'பயனாளிக்கு வெறும் 5% சலுகை வட்டி மட்டுமே (மீதி 8% வட்டியை அரசே செலுத்தும்)',
    collateralRequired: 'Completely Collateral-Free & Free from Processing Charges',
    collateralRequiredTamil: 'முற்றிலும் பிணையமற்ற கடன்; செயலாக்க கட்டணங்கள் இல்லை',
    targetSectors: ['Handicraft / Artisan', 'Manufacturing', 'Services'],
    eligibleStages: ['Existing', 'New'],
    minAge: 18,
    maxAge: 70,
    targetBeneficiaries: ['Traditional Artisans', 'Carpenters', 'Blacksmiths', 'Potters', 'Sculptors', 'Cobblers', 'Masons', 'Tailors', 'Weavers'],
    targetBeneficiariesTamil: ['பாரம்பரிய கைவினைஞர்கள்', 'தச்சர்கள்', 'கொல்லர்கள்', 'குயவர்கள்', 'தையல்காரர்கள்', 'சிற்பிகள்', 'நெசவாளர்கள்'],
    eligibilityCriteria: [
      'Artisan working with hands and tools in one of the 18 recognized traditional family trades (e.g. Carpenter, Blacksmith, Potter, Tailor, Barber, Cobbler, Mason, Weaver).',
      'Minimum age 18 years on date of registration.',
      'Must not have availed credit under similar central/state schemes like PMEGP, PM SVANidhi or MUDRA in past 5 years.',
      'Only one member per family is eligible to receive scheme benefits.',
      'Persons in government service and their family members are not eligible.'
    ],
    eligibilityCriteriaTamil: [
      '18 பாரம்பரிய கைவினைத் தொழில்களில் ஏதேனும் ஒன்றில் கைகளால் உழைக்கும் கைவினைஞர் (தச்சர், குயவர், தையல், மேஸ்திரி போன்றவை).',
      'பதிவு செய்யும் நாளில் குறைந்தபட்சம் 18 வயது.',
      'கடந்த 5 ஆண்டுகளில் PMEGP அல்லது SVANidhi திட்டங்களில் கடன் பெற்றிருக்கக் கூடாது.',
      'ஒரு குடும்பத்தில் ஒருவருக்கு மட்டுமே இத்திட்டம் பொருந்தும்.',
      'அரசு ஊழியர்கள் மற்றும் அவர்களது குடும்பத்தினருக்கு அனுமதியில்லை.'
    ],
    benefits: [
      'PM Vishwakarma Official Certificate and Digital ID card establishing national artisan status.',
      'Basic skill verification (5-7 days) with ₹500/day stipend paid during training.',
      'Direct e-Voucher grant of ₹15,000 to purchase modern tools and ergonomic equipment.',
      'Collateral-free enterprise loan at an ultra-low 5% interest rate with 18 to 30 months repayment.'
    ],
    benefitsTamil: [
      'தேசிய கைவினைஞர் அடையாள அட்டை மற்றும் அதிகாரப்பூர்வ சான்றிதழ்.',
      '5-7 நாட்கள் இலவச திறன் பயிற்சி; பயிற்சி காலத்தில் நாள் ஒன்றுக்கு ₹500 ஊக்கத்தொகை.',
      'நவீன கருவிகள் வாங்க ₹15,000 நேரடி உதவித்தொகை (e-Voucher).',
      'வெறும் 5% குறைந்த வட்டியில் ₹3 லட்சம் வரை பிணையமற்ற எளிய தவணைக் கடன்.'
    ],
    requiredDocuments: [
      'Aadhaar Card linked with mobile number',
      'Bank Passbook / Account details',
      'Ration Card / Family details',
      'Trade self-declaration proof / photographs of artisan at work'
    ],
    requiredDocumentsTamil: [
      'மொபைல் எண்ணுடன் இணைக்கப்பட்ட ஆதார் அட்டை',
      'வங்கி கணக்கு விவரங்கள் / பாஸ்புக்',
      'குடும்ப அட்டை (Ration Card)',
      'தொழில் செய்யும் புகைப்படங்கள் / சுய உறுதிமொழி'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'CSC Center Enrolment with Biometrics',
        titleTamil: 'பொது சேவை மையத்தில் (CSC) கைரேகைப் பதிவு',
        description: 'Visit your local Common Service Centre (CSC) with Aadhaar and mobile for biometric registration.',
        descriptionTamil: 'அருகிலுள்ள இ-சேவை மையம் (CSC) சென்று ஆதார் கைரேகை மூலம் பதிவு செய்யவும்.'
      },
      {
        step: 2,
        title: 'Gram Panchayat / Urban Local Body Verification',
        titleTamil: 'ஊராட்சி / நகராட்சி சரிபார்ப்பு',
        description: 'Panchayat President or Municipal Ward Officer digitally verifies that you practice the stated trade.',
        descriptionTamil: 'உங்கள் ஊராட்சித் தலைவர் அல்லது வார்டு அதிகாரி நீங்கள் கைவினைஞர் என்பதை சரிபார்ப்பார்.'
      },
      {
        step: 3,
        title: 'Skill Assessment & Toolkit Voucher',
        titleTamil: 'திறன் பயிற்சி & கருவி வவுச்சர்',
        description: 'Complete 5 days of skill training, receive ₹500/day stipend, and get ₹15,000 digital toolkit voucher.',
        descriptionTamil: '5 நாள் பயிற்சி முடித்து ₹15,000 கருவி வவுச்சரையும் நாள் ₹500 உதவித்தொகையையும் பெறவும்.'
      },
      {
        step: 4,
        title: 'Low-Interest Loan Disbursement',
        titleTamil: '5% சலுகை வட்டி கடன் பெறுதல்',
        description: 'Apply for Tranche 1 loan (₹1 Lakh) at 5% interest through participating banks.',
        descriptionTamil: 'வங்கி மூலம் முதல் தவணையாக ₹1 லட்சம் கடனை வெறும் 5% வட்டியில் பெறலாம்.'
      }
    ],
    officialPortalUrl: 'https://pmvishwakarma.gov.in/',
    nodalAgency: 'Ministry of MSME, Ministry of Skill Development, Local Bodies & Banks',
    lastVerifiedDate: '2026-03-04',
    status: 'Active',
    tags: ['Artisans', 'Skill Training', 'Toolkit Grant', '5% Interest', 'Traditional Crafts'],
    keyHighlight: '₹15,000 Free Modern Toolkit + ₹3L Loan at just 5% Interest Rate',
    keyHighlightTamil: '₹15,000 இலவச நவீன கருவி மானியம் + வெறும் 5% வட்டியில் ₹3 லட்சம் கடன்'
  },
  {
    id: 'aabcs-tn-006',
    name: 'Annal Ambedkar Business Champions Scheme (AABCS)',
    nameTamil: 'அண்ணல் அம்பேத்கர் தொழில் முன்னோடிகள் திட்டம் (AABCS)',
    acronym: 'AABCS TN',
    ministryOrDepartment: 'Adi Dravidar and Tribal Welfare Department & MSME, Govt of Tamil Nadu',
    ministryTamil: 'ஆதிதிராவிடர் மற்றும் பழங்குடியினர் நலத்துறை & MSME, தமிழ்நாடு அரசு',
    level: 'State',
    targetStates: ['Tamil Nadu'],
    category: 'Women & Marginalized',
    categoryTamil: 'SC/ST தொழில்முனைவோர் பிரத்யேக திட்டம்',
    maxSupportAmount: 'Project cost up to ₹300 Lakhs (₹3 Crores)',
    maxSupportValueLakhs: 300,
    subsidyPercentage: '35% Direct Capital Subsidy (up to ₹35 Lakhs) on project cost',
    subsidyPercentageTamil: '35% நேரடி மூலதன மானியம் (அதிகபட்சம் ₹35 லட்சம் வரை)',
    interestSubvention: '6% Interest Subvention for the complete loan tenure',
    interestSubventionTamil: 'முழு கடன் காலத்திற்கும் 6% வட்டி மானியச் சலுகை',
    collateralRequired: 'CGTMSE coverage supported by Govt of Tamil Nadu',
    collateralRequiredTamil: 'தமிழ்நாடு அரசு ஏற்கும் CGTMSE பாதுகாப்பு',
    targetSectors: ['Manufacturing', 'Services', 'Trading / Retail', 'Food Processing', 'Agriculture / Allied'],
    eligibleStages: ['Planning', 'New', 'Existing'],
    minAge: 18,
    maxAge: 55,
    targetBeneficiaries: ['SC Entrepreneurs of Tamil Nadu', 'ST Entrepreneurs of Tamil Nadu'],
    targetBeneficiariesTamil: ['தமிழ்நாட்டு பட்டியல் இனத்தவர் (SC)', 'தமிழ்நாட்டு பழங்குடியினர் (ST)'],
    eligibilityCriteria: [
      'Applicant must belong to Scheduled Caste (SC) or Scheduled Tribe (ST) community of Tamil Nadu.',
      'Age between 18 to 55 years.',
      'No formal educational qualification barrier (unlike NEEDS or PMEGP).',
      'Applicable for Manufacturing, Service, and Transport/Commercial vehicles (Trading also permitted).',
      'Both new enterprises and existing units taking up diversification/expansion are eligible.'
    ],
    eligibilityCriteriaTamil: [
      'தமிழ்நாட்டைச் சேர்ந்த SC அல்லது ST பிரிவைச் சேர்ந்தவராக இருக்க வேண்டும்.',
      'வயது வரம்பு 18 முதல் 55 வரை.',
      'குறிப்பிட்ட கல்வித் தகுதி தேவையில்லை (எழுத்தறிவு போதுமானது).',
      'உற்பத்தி, சேவை, வர்த்தகம் மற்றும் வணிக வாகனங்கள் வாங்குவதற்கும் பொருந்தும்.',
      'புதிய தொழில்கள் மற்றும் இயங்கும் தொழில்களை விரிவுபடுத்தவும் கிடைக்கும்.'
    ],
    benefits: [
      'Massive 35% capital subsidy capped at ₹35 Lakhs directly disbursed to reduce loan principal.',
      'Heavy 6% interest subvention making bank EMI extremely light and manageable.',
      'Covers commercial vehicle purchases for transport businesses (e.g. trucks, loaders, tourist vans).',
      'Handholding by TAHDCO and District Industries Centre without processing fees.'
    ],
    benefitsTamil: [
      'திட்ட மதிப்பீட்டில் 35% வரை நேரடி அரசு மானியம் (அதிகபட்சம் ₹35 லட்சம்).',
      '6% வட்டி மானியச் சலுகை - மாதாந்திர தவணையை பெருமளவு குறைக்கிறது.',
      'சரக்கு மற்றும் சுற்றுலா வாகனங்கள் (Commercial Vehicles) வாங்கவும் மானியம் உண்டு.',
      'தாட்கோ (TAHDCO) மற்றும் மாவட்ட தொழில் மையம் மூலம் உடனடி வழிகாட்டல்.'
    ],
    requiredDocuments: [
      'Aadhaar Card and Community Certificate (SC/ST)',
      'Quotations for machinery / vehicle / equipment',
      'Simple Project report with revenue estimation',
      'Nativity Certificate of Tamil Nadu',
      'Bank Account Passbook',
      'Driving license (if applying for commercial vehicle transport unit)'
    ],
    requiredDocumentsTamil: [
      'ஆதார் அட்டை மற்றும் சாதிச் சான்றிதழ் (SC/ST)',
      'இயந்திரம் / வாகனத்திற்கான விலைப்புள்ளி (Quotations)',
      'எளிய திட்ட அறிக்கை',
      'இருப்பிடச் சான்றிதழ்',
      'வங்கி கணக்கு புத்தகம்',
      'ஓட்டுநர் உரிமம் (வாகனம் வாங்க விண்ணப்பித்தால்)'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Apply on msmeonline.tn.gov.in (AABCS tab)',
        titleTamil: 'MSME போர்ட்டலில் AABCS பிரிவில் விண்ணப்பிக்கவும்',
        description: 'Fill applicant details, SC/ST certificate number, and target business sector.',
        descriptionTamil: 'சாதிச் சான்றிதழ் எண் மற்றும் தொழில் விவரங்களை உள்ளிட்டு பதிவு செய்யவும்.'
      },
      {
        step: 2,
        title: 'DIC and TAHDCO Scrutiny',
        titleTamil: 'DIC மற்றும் தாட்கோ ஆய்வு',
        description: 'District committee verifies applicant documents and sends recommendation to participating bank.',
        descriptionTamil: 'மாவட்ட தொழில் மையம் மற்றும் தாட்கோ அதிகாரிகள் ஆவணங்களை ஆய்வு செய்து வங்கிக்கு அனுப்பும்.'
      },
      {
        step: 3,
        title: 'Bank Sanction & 35% Subsidy Release',
        titleTamil: 'வங்கி கடன் ஒப்புதல் & 35% மானியம் வரவு',
        description: 'Bank disburses term loan, and 35% state subsidy is deposited as margin money.',
        descriptionTamil: 'வங்கி கடன் விடுவிக்கப்பட்டு 35% மானியத் தொகை உடனடியாக வரவு வைக்கப்படும்.'
      }
    ],
    officialPortalUrl: 'https://msmeonline.tn.gov.in/aabcs/',
    nodalAgency: 'District Industries Centre (DIC) & TAHDCO, Govt of Tamil Nadu',
    lastVerifiedDate: '2026-03-01',
    status: 'Active',
    tags: ['Tamil Nadu', 'SC/ST', '35% Subsidy', '6% Interest Subvention', 'Vehicles Allowed'],
    keyHighlight: '35% Direct Capital Subsidy + 6% Interest Rebate for SC/ST Entrepreneurs',
    keyHighlightTamil: 'தமிழ்நாடு SC/ST தொழில்முனைவோருக்கு 35% நேரடி மானியம் + 6% வட்டி தள்ளுபடி'
  },
  {
    id: 'cgtmse-007',
    name: 'Credit Guarantee Scheme for Micro & Small Enterprises (CGTMSE)',
    nameTamil: 'குறு மற்றும் சிறு நிறுவனங்களுக்கான கடன் உத்தரவாத திட்டம் (CGTMSE)',
    acronym: 'CGTMSE',
    ministryOrDepartment: 'Ministry of MSME & SIDBI, Govt of India',
    ministryTamil: 'மத்திய MSME அமைச்சகம் மற்றும் SIDBI',
    level: 'Central',
    targetStates: ['All'],
    category: 'Low-Interest Loans',
    categoryTamil: 'பிணையமற்ற கடன் உத்தரவாதம்',
    maxSupportAmount: 'Up to ₹500 Lakhs (₹5 Crores) Collateral-Free Bank Credit',
    maxSupportValueLakhs: 500,
    subsidyPercentage: 'Guarantees up to 85% of loan default risk for women, SC/ST, and ZED-certified units',
    subsidyPercentageTamil: 'பெண்கள் மற்றும் SC/ST நிறுவனங்களுக்கு 85% வரை வங்கி கடன் இழப்பு பாதுகாப்பு',
    interestSubvention: 'Concessional guarantee fee structure (as low as 0.37% per annum)',
    interestSubventionTamil: 'குறைந்த உத்தரவாத கட்டணம் (ஆண்டுக்கு 0.37% மட்டுமே)',
    collateralRequired: 'Strictly Zero Collateral; No Mortgages or Third-Party Guarantees Allowed',
    collateralRequiredTamil: 'சொத்து அடமானம் ஏதுமில்லை; மூன்றாம் நபர் பிணையம் முற்றிலும் தேவையில்லை',
    targetSectors: ['Manufacturing', 'Services', 'Tech / Digital', 'Food Processing', 'Agriculture / Allied'],
    eligibleStages: ['New', 'Existing'],
    minAge: 18,
    maxAge: 70,
    targetBeneficiaries: ['MSME Founders', 'Women Entrepreneurs', 'SC/ST Founders', 'Tech Startups', 'Expanding Micro Units'],
    targetBeneficiariesTamil: ['சிறு தொழில் நிறுவனங்கள்', 'தொழில்முனைவோர்', 'பெண்கள்', 'ஸ்டார்ட்-அப் நிறுவனங்கள்'],
    eligibilityCriteria: [
      'New or existing Micro and Small Enterprises engaged in manufacturing or service activities.',
      'Must have valid Udyam MSME registration.',
      'Retail trade and educational institutions now also eligible up to ₹2 Crores.',
      'Project must be financially viable with clear debt service coverage ratio (DSCR > 1.25).',
      'Borrower must not have any willful default record in CIBIL or RBI defalcation lists.'
    ],
    eligibilityCriteriaTamil: [
      'உற்பத்தி அல்லது சேவைத் துறையில் செயல்படும் புதிய மற்றும் இயங்கும் குறு, சிறு நிறுவனங்கள்.',
      'உத்யம் (Udyam) பதிவு கட்டாயம் இருக்க வேண்டும்.',
      'சில்லறை வர்த்தக நிறுவனங்களுக்கும் ₹2 கோடி வரை விரிவுபடுத்தப்பட்டுள்ளது.',
      'வங்கிக்கு திருப்பிச் செலுத்தக்கூடிய நிதித் திறன் (DSCR > 1.25) இருக்க வேண்டும்.'
    ],
    benefits: [
      'Enables entrepreneurs without ancestral land or commercial properties to obtain large bank loans.',
      'Up to 85% guarantee coverage for women-led enterprises and North-East/Aspirational district units.',
      'Covers both term loans (plant, machinery, office setup) and working capital limits (cash credit).',
      'Reduced annual guarantee fee reduced to incentivize early-stage startups and small workshops.'
    ],
    benefitsTamil: [
      'நிலம் அல்லது சொத்து இல்லாத தொழில்முனைவோரும் பல லட்சங்கள் வங்கிக் கடன் பெற வழிவகை செய்கிறது.',
      'பெண்கள் மற்றும் பின்தங்கிய மாவட்ட நிறுவனங்களுக்கு 85% வரை உத்தரவாத பாதுகாப்பு.',
      'இயந்திரங்கள் வாங்குவது மற்றும் தினசரி மூலதனச் செலவுகள் இரண்டிற்கும் கடன் பொருந்தும்.'
    ],
    requiredDocuments: [
      'Udyam Registration Certificate',
      'Audited or Projected Financials with Cash Flow and Balance Sheet',
      'Detailed Project Feasibility Report',
      'KYC documents of Directors / Partners / Proprietor',
      'Bank account statement of last 12 months',
      'GST returns (if applicable)'
    ],
    requiredDocumentsTamil: [
      'உத்யம் பதிவுச் சான்றிதழ் (Udyam)',
      'நிறுவனத்தின் நிதிநிலை அறிக்கை (Financials)',
      'விரிவான திட்ட அறிக்கை (DPR)',
      'நிறுவன உரிமையாளரின் ஆதார் மற்றும் பான் அட்டை',
      'கடந்த 12 மாத வங்கி அறிக்கை மற்றும் GST கணக்கு'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Obtain Udyam Registration',
        titleTamil: 'உத்யம் பதிவு பெறுதல்',
        description: 'Register for free on udyamregistration.gov.in with your Aadhaar and PAN in 5 minutes.',
        descriptionTamil: 'udyamregistration.gov.in தளத்தில் இலவசமாக உத்யம் பதிவைப் பெறவும்.'
      },
      {
        step: 2,
        title: 'Approach Member Lending Institution (Bank/NBFC)',
        titleTamil: 'உறுப்பினர் வங்கியை அணுகுதல்',
        description: 'Submit your loan proposal to any scheduled commercial bank, asking specifically for CGTMSE coverage.',
        descriptionTamil: 'வங்கியில் CGTMSE உத்தரவாதத் திட்டத்தின் கீழ் பிணையமற்ற கடனுக்கு விண்ணப்பிக்கவும்.'
      },
      {
        step: 3,
        title: 'Bank Sanction & CGTMSE Portal Guarantee',
        titleTamil: 'வங்கி அனுமதி & உத்தரவாதம் பெறுதல்',
        description: 'Bank evaluates the viable cash-flows, inputs details into cgtmse.in, and sanctions collateral-free funds.',
        descriptionTamil: 'வங்கி உங்கள் தொழில் லாபத்தன்மையை ஆய்வு செய்து cgtmse.in தளத்தில் உத்தரவாதம் பெற்று கடனை வழங்கும்.'
      }
    ],
    officialPortalUrl: 'https://www.cgtmse.in/',
    nodalAgency: 'CGTMSE Trust, SIDBI, All Member Commercial Banks',
    lastVerifiedDate: '2026-03-03',
    status: 'Active',
    tags: ['Collateral Free', 'Up to 5 Crores', 'Udyam', 'Credit Guarantee', 'High Capacity'],
    keyHighlight: 'Up to ₹5 Crores 100% Collateral-Free Bank Finance for MSMEs',
    keyHighlightTamil: 'குறு மற்றும் சிறு தொழில்களுக்கு ₹5 கோடி வரை எவ்வித சொத்து அடமானமும் இன்றி கடன்'
  },
  {
    id: 'uyegp-tn-008',
    name: 'Unemployed Youth Employment Generation Programme (UYEGP)',
    nameTamil: 'வேலையில்லா இளைஞர்களுக்கான வேலைவாய்ப்பு உருவாக்கும் திட்டம் (UYEGP)',
    acronym: 'UYEGP TN',
    ministryOrDepartment: 'Department of MSME, Government of Tamil Nadu',
    ministryTamil: 'குறு, சிறு மற்றும் நடுத்தர தொழில் துறை, தமிழ்நாடு அரசு',
    level: 'State',
    targetStates: ['Tamil Nadu'],
    category: 'Subsidies & Grants',
    categoryTamil: 'இளைஞர்களுக்கான மானிய திட்டம்',
    maxSupportAmount: '₹15 Lakhs (Manufacturing) / ₹5 Lakhs (Services & Trading)',
    maxSupportValueLakhs: 15,
    subsidyPercentage: '25% Government Subsidy (up to ₹3.75 Lakhs) directly back-ended',
    subsidyPercentageTamil: '25% அரசு மானியம் (அதிகபட்சம் ₹3.75 லட்சம் வரை)',
    interestSubvention: 'Standard subsidized micro-enterprise interest rates',
    interestSubventionTamil: 'சலுகை வங்கி வட்டி விகிதம்',
    collateralRequired: 'No collateral required for loans up to ₹10 Lakhs',
    collateralRequiredTamil: 'ரூ. 10 லட்சம் வரை பிணையம் ஏதுமில்லை',
    targetSectors: ['Manufacturing', 'Services', 'Trading / Retail', 'Handicraft / Artisan', 'Food Processing'],
    eligibleStages: ['Planning', 'New'],
    minAge: 18,
    maxAge: 45, // 45 for SC/ST/BC/MBC/Women, 35 for General
    targetBeneficiaries: ['Unemployed Youth', 'Women', 'First-time Business Starters', 'Rural Aspirants'],
    targetBeneficiariesTamil: ['வேலையில்லா இளைஞர்கள்', 'பெண்கள்', 'முதல்முறை தொழில் தொடங்குவோர்'],
    eligibilityCriteria: [
      'Applicant must be a permanent resident of Tamil Nadu.',
      'Educational qualification: Minimum 8th Standard pass.',
      'Family annual income must not exceed ₹5 Lakhs.',
      'Age criteria: 18 to 35 for General category; 18 to 45 for Special categories (SC, ST, BC, MBC, Women, Minorities, Differently Abled).',
      'Should not have availed benefits under any other government subsidy schemes.'
    ],
    eligibilityCriteriaTamil: [
      'தமிழ்நாட்டில் நிரந்தரமாக வசிப்பவராக இருக்க வேண்டும்.',
      'குறைந்தபட்சம் 8-ம் வகுப்பு தேர்ச்சி பெற்றிருக்க வேண்டும்.',
      'குடும்ப ஆண்டு வருமானம் ₹5 லட்சத்திற்கு மிகாமல் இருக்க வேண்டும்.',
      'வயது வரம்பு: பொதுப்பிரிவு 18-35; பெண்கள், SC/ST/BC/MBC பிரிவினருக்கு 18-45 வயது.',
      'அரசின் பிற மானியத் திட்டங்களில் ஏற்கனவே பலன் பெற்றிருக்கக் கூடாது.'
    ],
    benefits: [
      '25% state government subsidy on project cost, credited into beneficiary account.',
      'Very low promoter margin money (only 5% of project cost for special categories, 10% for general).',
      '7 days mandatory entrepreneurship training provided by DIC free of cost.',
      'Covers small manufacturing workshops, photocopy/DTP centres, food kiosks, beauty parlours, mobile repair shops, and grocery stores.'
    ],
    benefitsTamil: [
      'திட்ட மதிப்பீட்டில் 25% நேரடி அரசு மானியம்.',
      'தொழில்முனைவோரின் சொந்த முதலீடு வெறும் 5% முதல் 10% மட்டுமே.',
      'மாவட்ட தொழில் மையம் (DIC) மூலம் 7 நாட்கள் இலவச தொழில் பயிற்சி.',
      'ஜெராக்ஸ் கடை, பியூட்டி பார்லர், மளிகை கடை, தையலகம், செல்போன் பழுதுநீக்கம் போன்ற எளிய தொழில்களுக்கும் பொருந்தும்.'
    ],
    requiredDocuments: [
      'Transfer Certificate / 8th Standard or 10th Standard Marksheet',
      'Aadhaar Card and Ration Card',
      'Community Certificate',
      'Income Certificate issued by Revenue Tahsildar (< ₹5 Lakhs)',
      'Quotations for tools, equipment, or machinery',
      'Rent Agreement for proposed business premise'
    ],
    requiredDocumentsTamil: [
      'பள்ளி மாற்றுச் சான்றிதழ் (TC) / 8 அல்லது 10-ம் வகுப்பு மதிப்பெண் சான்றிதழ்',
      'ஆதார் மற்றும் குடும்ப அட்டை',
      'சாதிச் சான்றிதழ்',
      'வட்டாட்சியர் வழங்கிய வருமானச் சான்றிதழ் (ஆண்டுக்கு ₹5 லட்சத்திற்குள்)',
      'இயந்திரங்களுக்கான விலைப்புள்ளி மற்றும் கடை வாடகை ஒப்பந்தம்'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Apply on msmeonline.tn.gov.in (UYEGP Portal)',
        titleTamil: 'UYEGP இணையதளத்தில் விண்ணப்பிக்கவும்',
        description: 'Complete the online application form and upload 8th pass certificate, income proof, and machinery quotation.',
        descriptionTamil: 'கல்விச் சான்று, வருமானச் சான்றிதழ் மற்றும் விலைப்புள்ளியுடன் ஆன்லைனில் விண்ணப்பிக்கவும்.'
      },
      {
        step: 2,
        title: 'District Task Force Committee Interview',
        titleTamil: 'மாவட்ட சிறப்புக் குழு நேர்காணல்',
        description: 'Attend a brief interview at your district DIC office where officers help review your trade viability.',
        descriptionTamil: 'மாவட்ட தொழில் மையத்தில் நடைபெறும் எளிய நேர்காணலில் பங்கேற்கவும்.'
      },
      {
        step: 3,
        title: 'EDP Training & Bank Disbursement',
        titleTamil: 'பயிற்சி மற்றும் கடன் பெறுதல்',
        description: 'Complete 7 days EDP training, post which the bank disburses the loan and claims the 25% subsidy.',
        descriptionTamil: '7 நாள் பயிற்சியை முடித்தவுடன் வங்கி கடனை வழங்கும்; 25% மானியம் வரவு வைக்கப்படும்.'
      }
    ],
    officialPortalUrl: 'https://msmeonline.tn.gov.in/uyegp/',
    nodalAgency: 'District Industries Centres (DIC), Tamil Nadu',
    lastVerifiedDate: '2026-03-02',
    status: 'Active',
    tags: ['Tamil Nadu', '25% Subsidy', 'Youth', 'Low Income', 'Micro Business', 'Services'],
    keyHighlight: '25% Subsidy for Tamil Nadu Youth with Minimum 8th Standard Qualification',
    keyHighlightTamil: '8-ம் வகுப்பு தேர்ச்சி பெற்ற தமிழ்நாட்டு இளைஞர்களுக்கு 25% அரசு மானியம்'
  },
  {
    id: 'pm-svanidhi-009',
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    nameTamil: 'பிரதம மந்திரி ஸ்வநிதி திட்டம் (தெருவோர வியாபாரிகள் கடனுதவி)',
    acronym: 'PM SVANidhi',
    ministryOrDepartment: 'Ministry of Housing and Urban Affairs (MoHUA), Govt of India',
    ministryTamil: 'மத்திய வீட்டுவசதி மற்றும் நகர்ப்புற விவகாரங்கள் அமைச்சகம்',
    level: 'Central',
    targetStates: ['All'],
    category: 'Low-Interest Loans',
    categoryTamil: 'குறைந்த வட்டி நடைமுறை மூலதனம்',
    maxSupportAmount: '₹10,000 (1st Tranche) → ₹20,000 (2nd Tranche) → ₹50,000 (3rd Tranche)',
    maxSupportValueLakhs: 0.5,
    subsidyPercentage: '7% Interest Subsidy credited directly + up to ₹1,200/year cashback on digital UPI transactions',
    subsidyPercentageTamil: '7% நேரடி வட்டி மானியம் + டிஜிட்டல் பரிவர்த்தனைகளுக்கு ஆண்டுக்கு ₹1,200 வரை கேஷ்பேக்',
    interestSubvention: '7% per annum interest subsidy directly credited into vendor bank account quarterly',
    interestSubventionTamil: 'ஆண்டுக்கு 7% வட்டி மானியம் 3 மாதங்களுக்கு ஒருமுறை வங்கி கணக்கில் நேரடியாக வரவு',
    collateralRequired: 'Zero Collateral, Zero Processing Fee, Zero Penalty for Early Repayment',
    collateralRequiredTamil: 'எந்தவித பிணையமும் இல்லை; முன்கூட்டியே அடைக்க அபராதம் ஏதுமில்லை',
    targetSectors: ['Trading / Retail', 'Food Processing', 'Services'],
    eligibleStages: ['Existing'],
    minAge: 18,
    maxAge: 70,
    targetBeneficiaries: ['Street Vendors', 'Hawkers', 'Fruit / Vegetable Sellers', 'Tea Stalls', 'Cobblers', 'Flower Sellers'],
    targetBeneficiariesTamil: ['தெருவோர வியாபாரிகள்', 'காய்கறி/பழ வியாபாரிகள்', 'பூ விற்பனையாளர்கள்', 'டீ கடைகள்'],
    eligibilityCriteria: [
      'Street vendors in urban, peri-urban, or rural areas engaged in vending on or before the cut-off dates.',
      'Possession of Certificate of Vending / ID Card issued by Urban Local Bodies (Town Vending Committee).',
      'In case of vendors not possessing ID card, a Letter of Recommendation (LoR) can be issued by ULB/TVC.',
      'Vendor must link bank account with active mobile number and Aadhaar.',
      'Repaying the 1st loan (₹10,000) on time automatically unlocks 2nd loan of ₹20,000, and subsequent ₹50,000 loan.'
    ],
    eligibilityCriteriaTamil: [
      'நகர்ப்புறம் அல்லது கிராமப்புறங்களில் தெருவோர வியாபாரம் செய்யும் வியாபாரிகள்.',
      'நகராட்சி அல்லது டவுன் வெண்டிங் கமிட்டி (TVC) வழங்கிய விற்பனை அட்டை அல்லது பரிந்துரைக் கடிதம்.',
      'வங்கி கணக்கு ஆதாருடன் இணைக்கப்பட்டிருக்க வேண்டும்.',
      'முதல் கடன் ₹10,000-ஐ சரியான நேரத்தில் திருப்பிச் செலுத்தினால் ₹20,000 மற்றும் ₹50,000 கடன் கிடைக்கும்.'
    ],
    benefits: [
      'Instantly breaks dependence on private moneylenders charging exorbitant daily interest (Meter vaddi).',
      '7% interest subsidy makes the effective interest rate virtually negligible.',
      'Monthly cashback of ₹100 for receiving customer payments through UPI QR code (PhonePe, GPay, Paytm).',
      'Fast digital approval directly through mobile app with zero branch paperwork.'
    ],
    benefitsTamil: [
      'கந்துவட்டி மற்றும் தினசரி மீட்டர் வட்டி சுமையிலிருந்து விடுபட சிறந்த வழி.',
      '7% வட்டி மானியம் வழங்கப்படுவதால் வட்டிச் சுமை மிகக் குறைவு.',
      'UPI QR Code மூலம் டிஜிட்டல் பரிவர்த்தனை செய்தால் மாதம் ₹100 (ஆண்டுக்கு ₹1,200) கேஷ்பேக்.',
      'மொபைல் ஆப் மூலமாக எளிய முறையில் விரைவான கடன் அனுமதி.'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Vending Certificate / Urban Local Body ID or Letter of Recommendation (LoR)',
      'Bank Account Passbook',
      'Active mobile number linked to Aadhaar'
    ],
    requiredDocumentsTamil: [
      'ஆதார் அட்டை',
      'நகராட்சி விற்பனையாளர் அடையாள அட்டை அல்லது பரிந்துரைக் கடிதம் (LoR)',
      'வங்கி கணக்கு புத்தகம்',
      'ஆதாருடன் இணைக்கப்பட்ட தொலைபேசி எண்'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Check Vending Status or Apply for LoR',
        titleTamil: 'விற்பனையாளர் தகுதி சரிபார்த்தல்',
        description: 'Check your name on pmsvanidhi.mohua.gov.in or obtain a Letter of Recommendation from local municipality.',
        descriptionTamil: 'pmsvanidhi.mohua.gov.in தளத்தில் பெயர் சரிபார்க்கவும் அல்லது நகராட்சியில் பரிந்துரைக் கடிதம் பெறவும்.'
      },
      {
        step: 2,
        title: 'Apply through Banking Mitra or Mobile App',
        titleTamil: 'வங்கி மித்ரா அல்லது மொபைல் ஆப்பில் விண்ணப்பிக்கவும்',
        description: 'Submit Aadhaar OTP-verified application selecting preferred bank or microfinance institution.',
        descriptionTamil: 'ஆதார் OTP சரிபார்ப்பு மூலம் மொபைல் வழியே எளிய விண்ணப்பத்தை சமர்ப்பிக்கவும்.'
      },
      {
        step: 3,
        title: 'Direct Account Credit & QR Setup',
        titleTamil: 'கணக்கில் பணம் வரவு & QR கோடு பெறுதல்',
        description: '₹10,000 working capital is disbursed directly into account with a merchant QR code for cashback.',
        descriptionTamil: '₹10,000 கடன் தொகை வங்கி கணக்கில் செலுத்தப்பட்டு கேஷ்பேக்கிற்கான QR கோடு வழங்கப்படும்.'
      }
    ],
    officialPortalUrl: 'https://pmsvanidhi.mohua.gov.in/',
    nodalAgency: 'Ministry of Housing & Urban Affairs & Urban Local Bodies (Municipalities)',
    lastVerifiedDate: '2026-02-20',
    status: 'Active',
    tags: ['Street Vendors', 'Micro Loan', '7% Interest Subsidy', 'Digital Cashback', 'No Collateral'],
    keyHighlight: 'Collateral-Free Micro Credit up to ₹50,000 with 7% Interest Subsidy + UPI Cashback',
    keyHighlightTamil: 'தெருவோர வியாபாரிகளுக்கு ₹50,000 வரை பிணையமற்ற கடன் + 7% வட்டி மானியம் & கேஷ்பேக்'
  },
  {
    id: 'pmfme-010',
    name: 'PM Formalisation of Micro Food Processing Enterprises (PMFME)',
    nameTamil: 'பிரதம மந்திரி குறு உணவு பதப்படுத்தும் நிறுவனங்கள் முறைப்படுத்தும் திட்டம் (PMFME)',
    acronym: 'PMFME',
    ministryOrDepartment: 'Ministry of Food Processing Industries (MoFPI), Govt of India',
    ministryTamil: 'மத்திய உணவு பதப்படுத்தும் தொழில்கள் அமைச்சகம்',
    level: 'Central',
    targetStates: ['All'],
    category: 'Subsidies & Grants',
    categoryTamil: 'உணவு பதப்படுத்துதல் மானியத் திட்டம்',
    maxSupportAmount: 'Up to ₹10 Lakhs Capital Subsidy (35% of eligible project cost)',
    maxSupportValueLakhs: 30,
    subsidyPercentage: '35% Credit-linked Capital Subsidy with maximum ceiling of ₹10 Lakhs',
    subsidyPercentageTamil: '35% நேரடி கடன் இணைக்கப்பட்ட மூலதன மானியம் (அதிகபட்சம் ₹10 லட்சம்)',
    interestSubvention: 'Eligible for 3% interest subvention under Agriculture Infrastructure Fund (AIF)',
    interestSubventionTamil: 'AIF திட்டத்தின் கீழ் கூடுதல் 3% வட்டி மானிய இணைப்பு',
    collateralRequired: 'CGTMSE coverage eligible; no collateral for loans up to ₹10 Lakhs',
    collateralRequiredTamil: 'CGTMSE கீழ் ₹10 லட்சம் வரை பிணையமற்ற கடன்',
    targetSectors: ['Food Processing', 'Agriculture / Allied', 'Manufacturing'],
    eligibleStages: ['Existing', 'New'],
    minAge: 18,
    maxAge: 65,
    targetBeneficiaries: ['Bakery Owners', 'Oil Extraction Units', 'Pickle / Masala Makers', 'Dairy / Sweet Makers', 'Self Help Groups (SHGs)', 'Farmer Producer Orgs (FPOs)'],
    targetBeneficiariesTamil: ['பேக்கரி', 'எண்ணெய் செக்கு', 'மசாலா/ஊறுகாய் தயாரிப்பாளர்கள்', 'பால் பண்ணை', 'மகளிர் குழுக்கள்'],
    eligibilityCriteria: [
      'Micro food processing units (individual, partnership, FPO, SHG, or Producer Cooperative).',
      'Preference given to units producing One District One Product (ODOP) designated items (e.g. Banana in Theni, Mango in Krishnagiri, Coconut in Pollachi).',
      'Existing units should have investment in plant and machinery not exceeding ₹1 Crore and turnover up to ₹5 Crores.',
      'Beneficiary contribution should be minimum 10% of project cost, with 35% subsidy and remaining as bank loan.',
      'Must comply with basic food safety standards (FSSAI registration required within support period).'
    ],
    eligibilityCriteriaTamil: [
      'குறு உணவு பதப்படுத்தும் நிறுவனங்கள் (தனிநபர், மகளிர் சுயஉதவி குழுக்கள், உழவர் உற்பத்தியாளர் நிறுவனங்கள்).',
      'ஒரு மாவட்டம் ஒரு பொருள் (ODOP) திட்டத்தின் கீழ் உள்ள பொருட்களுக்கு முன்னுரிமை (எ.கா. தேனி வாழைப்பழம், பொள்ளாச்சி தேங்காய்).',
      'இயந்திரங்களில் முதலீடு ₹1 கோடிக்குள் மற்றும் ஆண்டு விற்றுமுதல் ₹5 கோடிக்குள் இருக்க வேண்டும்.',
      'விண்ணப்பதாரரின் சொந்த முதலீடு குறைந்தபட்சம் 10%; அரசு மானியம் 35%.',
      'FSSAI உணவு பாதுகாப்பு உரிமம் பெற வேண்டும்.'
    ],
    benefits: [
      '35% direct capital subsidy capped at ₹10 Lakhs for upgrading machinery, cold storage, packaging, or testing.',
      'Seed capital of ₹40,000 per SHG member for working capital and minor tools.',
      'Free branding and marketing support to sell under national brands like "Dilli Bakes", "AASNAA", or state ODOP brands.',
      'Handholding support by District Resource Persons (DRP) for DPR preparation and bank submission.'
    ],
    benefitsTamil: [
      'நவீன இயந்திரங்கள், பேக்கிங் மற்றும் தரக்கட்டுப்பாட்டிற்கு ₹10 லட்சம் வரை 35% நேரடி மூலதன மானியம்.',
      'மகளிர் குழு உறுப்பினர்களுக்கு தலா ₹40,000 தொடக்க மூலதன உதவி.',
      'FSSAI பதிவு மற்றும் இலவச பிராண்டிங், பேக்கேஜிங் வழிகாட்டல்.',
      'மாவட்ட வள ஆளர்கள் (DRP) மூலம் திட்ட அறிக்கை தயாரிப்பில் நேரடி உதவி.'
    ],
    requiredDocuments: [
      'Aadhaar Card and PAN Card',
      'Proof of existing micro food unit (Electricity bill, local body license, or FSSAI if existing)',
      'Quotations for food processing machinery (Stainless Steel grading, packing, extraction)',
      'Detailed Project Report (DPR) with raw material sourcing and sales channels',
      'Bank statement for 6 months'
    ],
    requiredDocumentsTamil: [
      'ஆதார் மற்றும் பான் அட்டை',
      'தொழில் நடப்பதற்கான சான்று (மின் ரசீது, உள்ளாட்சி உரிமம்)',
      'உணவு பதப்படுத்தும் இயந்திரங்களுக்கான விலைப்புள்ளி',
      'விரிவான திட்ட அறிக்கை (DPR)',
      'வங்கி கணக்கு அறிக்கை'
    ],
    applicationSteps: [
      {
        step: 1,
        title: 'Check ODOP Product for your District',
        titleTamil: 'உங்கள் மாவட்ட ODOP உணவைத் தேர்வு செய்க',
        description: 'Identify if your product matches district specialisation for priority approval.',
        descriptionTamil: 'உங்கள் மாவட்டத்திற்கான சிறப்பு உணவுப் பொருளை pmfme.mofpi.gov.in தளத்தில் சரிபார்க்கவும்.'
      },
      {
        step: 2,
        title: 'Connect with District Resource Person (DRP)',
        titleTamil: 'மாவட்ட வள ஆளரின் (DRP) உதவி பெறுதல்',
        description: 'Govt assigns a free DRP in your district who helps prepare the DPR and upload it.',
        descriptionTamil: 'அரசால் நியமிக்கப்படும் DRP அதிகாரி திட்ட அறிக்கையை இலவசமாகத் தயார் செய்து தருவார்.'
      },
      {
        step: 3,
        title: 'Online Submission on PMFME Portal',
        titleTamil: 'PMFME தளத்தில் சமர்ப்பித்தல்',
        description: 'Submit digital application on pmfme.mofpi.gov.in routed to your chosen lending bank branch.',
        descriptionTamil: 'pmfme.mofpi.gov.in தளத்தில் விண்ணப்பிக்கப்பட்டு வங்கிக்கு பரிந்துரைக்கப்படும்.'
      },
      {
        step: 4,
        title: 'Bank Sanction & 35% Credit Subsidy Release',
        titleTamil: 'வங்கி கடன் & 35% மானியம் விடுவிப்பு',
        description: 'Bank disburses term loan, and 35% subsidy is credited into loan account as subsidy reserve fund.',
        descriptionTamil: 'வங்கி கடனை வழங்கும்; 35% மானியம் கடன் கணக்கில் வரவு வைக்கப்படும்.'
      }
    ],
    officialPortalUrl: 'https://pmfme.mofpi.gov.in/',
    nodalAgency: 'Ministry of Food Processing Industries & State Nodal Agencies (TNAU / DIC in Tamil Nadu)',
    lastVerifiedDate: '2026-03-06',
    status: 'Active',
    tags: ['Food Processing', '35% Subsidy', 'Bakery', 'Agro', 'SHG', 'ODOP'],
    keyHighlight: '35% Capital Subsidy up to ₹10 Lakhs for Food Processing & Bakeries',
    keyHighlightTamil: 'உணவு பதப்படுத்துதல், பேக்கரி, மசாலா தொழில்களுக்கு ₹10 லட்சம் வரை 35% அரசு மானியம்'
  }
];

export const sampleNotifications = [
  {
    id: 'notif-1',
    title: 'PMEGP Rural Women Subsidy Ceiling Maintained at 35%',
    titleTamil: 'PMEGP கிராமப்புற மகளிர் மூலதன மானியம் 35% ஆக நீட்டிப்பு',
    summary: 'Ministry of MSME confirms priority processing for rural women and SC/ST manufacturing projects up to ₹50 Lakhs.',
    summaryTamil: 'கிராமப்புற பெண்கள் மற்றும் SC/ST பிரிவினரின் ₹50 லட்சம் வரையிலான உற்பத்தி திட்டங்களுக்கு 35% மானியம் தொடர்கிறது.',
    date: 'March 8, 2026',
    category: 'Policy Update' as const,
    unread: true,
    priority: 'high' as const,
    schemeId: 'pmegp-001'
  },
  {
    id: 'notif-2',
    title: 'Tamil Nadu NEEDS Scheme FY2026-27 Application Window Active',
    titleTamil: 'தமிழ்நாடு NEEDS திட்டம் 2026-27 புதிய சுற்று விண்ணப்பங்கள் தொடக்கம்',
    summary: 'District Industries Centres (DIC) across Tamil Nadu are accepting applications with up to ₹75L capital subsidy.',
    summaryTamil: 'ரூ. 75 லட்சம் வரையிலான மானியத்துடன் தமிழ்நாடு முழுவதும் மாவட்ட தொழில் மையங்களில் விண்ணப்பங்கள் பெறப்படுகின்றன.',
    date: 'March 4, 2026',
    category: 'Deadline Alert' as const,
    unread: true,
    priority: 'high' as const,
    schemeId: 'needs-tn-003'
  },
  {
    id: 'notif-3',
    title: 'PM Vishwakarma Toolkit Voucher Value Disbursal Accelerated',
    titleTamil: 'PM விஸ்வகர்மா கருவி வவுச்சர் ₹15,000 விநியோகம் தீவிரம்',
    summary: 'Over 1.2 Lakh artisans enrolled in Tamil Nadu & South India; e-vouchers redeemable at authorized hardware dealers.',
    summaryTamil: 'தமிழ்நாட்டில் பதிவு செய்துள்ள கைவினைஞர்களுக்கு நவீன கருவிகள் வாங்குவதற்கான ₹15,000 இ-வவுச்சர் வழங்கப்படுகிறது.',
    date: 'February 26, 2026',
    category: 'Subsidy Revision' as const,
    unread: false,
    priority: 'normal' as const,
    schemeId: 'pm-vishwakarma-005'
  },
  {
    id: 'notif-4',
    title: 'CGTMSE Annual Guarantee Fee Reduced for Women & Micro Units',
    titleTamil: 'மகளிர் மற்றும் குறு நிறுவனங்களுக்கான CGTMSE உத்தரவாத கட்டணம் குறைப்பு',
    summary: 'Guarantee fee slashed to 0.37% per annum, drastically reducing the cost of collateral-free bank loans.',
    summaryTamil: 'பிணையமற்ற வங்கிக் கடன்களுக்கான வருடாந்திர பாதுகாப்புக் கட்டணம் 0.37% ஆகக் குறைக்கப்பட்டுள்ளது.',
    date: 'February 15, 2026',
    category: 'Policy Update' as const,
    unread: false,
    priority: 'normal' as const,
    schemeId: 'cgtmse-007'
  }
];
