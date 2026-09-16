import { EntrepreneurProfile, Scheme, SchemeMatchResult, ScoreBreakdown, MatchTier } from '../types';

export function calculateSchemeMatch(profile: EntrepreneurProfile, scheme: Scheme): SchemeMatchResult {
  const whyMatchReasons: string[] = [];
  const whyMatchReasonsTamil: string[] = [];
  const missingRequirements: string[] = [];
  const missingRequirementsTamil: string[] = [];
  const actionTipsToQualify: string[] = [];
  const actionTipsToQualifyTamil: string[] = [];

  let mandatoryFailures: string[] = [];
  let mandatoryFailuresTamil: string[] = [];

  let eligibilityPoints = 0; // max 35
  let fundingPoints = 0;     // max 25
  let supportPoints = 0;     // max 20
  let sectorPoints = 0;      // max 20

  const isWoman = profile.gender === 'Female';
  const isSCST = ['SC', 'ST'].includes(profile.socialCategory);
  const isSpecialCategory = ['SC', 'ST', 'Minority', 'Special (Differently Abled / Ex-Servicemen)'].includes(profile.socialCategory);
  const reqLakhs = profile.investmentRequired / 100000;

  // 1. Mandatory Location / State Eligibility
  const matchesState = scheme.targetStates.includes('All') || scheme.targetStates.includes(profile.state);
  if (matchesState) {
    eligibilityPoints += 10;
    if (scheme.level === 'State') {
      whyMatchReasons.push(`Tailored state initiative for entrepreneurs operating in ${profile.state}.`);
      whyMatchReasonsTamil.push(`${profile.state} மாநிலத்தில் செயல்படும் தொழில்முனைவோருக்கான பிரத்யேக மாநிலத் திட்டம்.`);
    }
  } else {
    mandatoryFailures.push(`State restriction: Scheme is exclusively for ${scheme.targetStates.join(', ')} residents. Your profile state is ${profile.state}.`);
    mandatoryFailuresTamil.push(`மாநில கட்டுப்பாடு: இத்திட்டம் ${scheme.targetStates.join(', ')} மாநிலத்திற்கு மட்டுமே பொருந்தும் (உங்கள் மாநிலம்: ${profile.state}).`);
  }

  // 2. Mandatory Demographics: Stand-Up India (SC/ST or Women)
  if (scheme.acronym === 'Stand-Up India') {
    if (!isWoman && !isSCST) {
      mandatoryFailures.push('Target Category requirement: Stand-Up India is exclusively reserved for Women or SC/ST entrepreneurs.');
      mandatoryFailuresTamil.push('இலக்கு பிரிவு நிபந்தனை: ஸ்டாண்ட்-அப் இந்தியா திட்டம் மகளிர் அல்லது SC/ST தொழில்முனைவோருக்கு மட்டுமே ஒதுக்கப்பட்டுள்ளது.');
    } else {
      eligibilityPoints += 10;
      whyMatchReasons.push(`Qualifies under Stand-Up India reservation for ${isWoman ? 'Women' : profile.socialCategory} entrepreneurs.`);
      whyMatchReasonsTamil.push(`ஸ்டாண்ட்-அப் இந்தியா முன்னுரிமைப் பிரிவின் கீழ் தகுதிபெறுகிறது.`);
    }
  }

  // 3. Mandatory Demographics: Tamil Nadu AABCS (SC/ST only)
  if (scheme.acronym === 'TN AABCS') {
    if (!isSCST) {
      mandatoryFailures.push('Category requirement: Annal Ambedkar Business Champions Scheme (AABCS) is exclusively for SC/ST founders.');
      mandatoryFailuresTamil.push('பிரிவு நிபந்தனை: அண்ணல் அம்பேத்கர் தொழில் முன்னோடிகள் திட்டம் (AABCS) SC/ST பிரிவினருக்கு மட்டுமே.');
    } else {
      eligibilityPoints += 10;
      whyMatchReasons.push(`Eligible for 35% capital subsidy under Tamil Nadu AABCS for SC/ST entrepreneurs.`);
      whyMatchReasonsTamil.push(`SC/ST தொழில்முனைவோருக்கான 35% மூலதன மானியத்திற்கு முழு தகுதி.`);
    }
  }

  // 4. Mandatory Sector Fit: PM Vishwakarma (Traditional Artisans only)
  if (scheme.acronym === 'PM Vishwakarma') {
    if (profile.businessType !== 'Handicraft / Artisan') {
      mandatoryFailures.push(`Sector mismatch: PM Vishwakarma is restricted to 18 traditional artisan/craft trades. Your sector is ${profile.businessType}.`);
      mandatoryFailuresTamil.push(`துறை முரண்பாடு: PM விஸ்வகர்மா திட்டம் 18 பாரம்பரிய கைவினைத் தொழில்களுக்கு மட்டுமே பொருந்தும் (உங்கள் துறை: ${profile.businessType}).`);
    } else {
      sectorPoints += 20;
      whyMatchReasons.push('Enrolled under artisan/craft trade eligible for PM Vishwakarma ₹15,000 tool voucher and 5% credit.');
      whyMatchReasonsTamil.push('PM விஸ்வகர்மா கருவி மானியம் மற்றும் 5% வட்டிக் கடனுக்கு உகந்த பாரம்பரிய கைவினைத் தொழில்.');
    }
  }

  // 5. Mandatory Sector Fit: PMFME (Food Processing only)
  if (scheme.acronym === 'PMFME') {
    if (profile.businessType !== 'Food Processing' && profile.businessType !== 'Agriculture / Allied') {
      mandatoryFailures.push(`Sector mismatch: PMFME is exclusively for micro food processing, bakeries, and agro-value-addition units.`);
      mandatoryFailuresTamil.push(`துறை முரண்பாடு: PMFME திட்டம் உணவு பதப்படுத்துதல் மற்றும் வேளாண் மதிப்புக்கூட்டல் தொழில்களுக்கு மட்டுமே.`);
    } else {
      sectorPoints += 20;
      whyMatchReasons.push('Food processing & agro-processing enterprises qualify for 35% credit-linked capital subsidy up to ₹10 Lakhs.');
      whyMatchReasonsTamil.push('உணவு பதப்படுத்துதல் தொழில்களுக்கு ₹10 லட்சம் வரை 35% மூலதன மானியம் பெற தகுதி.');
    }
  }

  // 6. Mandatory Income Fit: UYEGP (Income <= 5 Lakhs)
  if (scheme.acronym === 'UYEGP') {
    if (profile.annualIncome > 500000) {
      mandatoryFailures.push(`Income ceiling exceeded: UYEGP limits family annual income to ₹5,00,000 (your income: ₹${profile.annualIncome.toLocaleString('en-IN')}).`);
      mandatoryFailuresTamil.push(`வருமான வரம்பு தாண்டியது: UYEGP திட்டத்தின் குடும்ப ஆண்டு வருமான வரம்பு ₹5,00,000 (உங்கள் வருமானம்: ₹${profile.annualIncome.toLocaleString('en-IN')}).`);
    }
  }

  // 7. Age criteria (with relaxation for women and special categories)
  let effectiveMaxAge = scheme.maxAge;
  if ((scheme.acronym === 'NEEDS' || scheme.acronym === 'UYEGP') && (isWoman || isSpecialCategory)) {
    effectiveMaxAge = 45; // Special category age relaxation in Tamil Nadu
  }

  if (profile.age >= scheme.minAge && profile.age <= effectiveMaxAge) {
    eligibilityPoints += 8;
  } else if (profile.age < scheme.minAge) {
    mandatoryFailures.push(`Applicant must be at least ${scheme.minAge} years old (you are ${profile.age}).`);
    mandatoryFailuresTamil.push(`குறைந்தபட்ச வயது ${scheme.minAge} பூர்த்தியடைந்திருக்க வேண்டும் (உங்கள் வயது: ${profile.age}).`);
  } else {
    mandatoryFailures.push(`Age limit exceeded: Maximum allowable age is ${effectiveMaxAge} years (you are ${profile.age}).`);
    mandatoryFailuresTamil.push(`அதிகபட்ச வயது வரம்பான ${effectiveMaxAge} ஆண்டுகளை விட அதிகம் (உங்கள் வயது: ${profile.age}).`);
  }

  // 8. Business Stage criteria
  const isGreenfieldScheme = scheme.acronym === 'NEEDS' || scheme.acronym === 'Stand-Up India';
  if (isGreenfieldScheme && profile.businessStage === 'Existing') {
    mandatoryFailures.push(`${scheme.acronym} is exclusively for new (Greenfield) enterprises, not existing units.`);
    mandatoryFailuresTamil.push(`${scheme.acronym} திட்டம் புதிய (கிரீன்ஃபீல்ட்) நிறுவனங்களுக்கு மட்டுமே, ஏற்கனவே உள்ள நிறுவனங்களுக்கு அல்ல.`);
  } else if (scheme.eligibleStages.includes(profile.businessStage)) {
    eligibilityPoints += 7;
    whyMatchReasons.push(`Directly supports enterprises in the '${profile.businessStage}' lifecycle stage.`);
    whyMatchReasonsTamil.push(`உங்கள் '${profile.businessStage}' தொழில் நிலைக்கு இத்திட்டம் முழு ஆதரவு வழங்குகிறது.`);
  }

  // 9. Sector Scoring (when not already forced)
  if (sectorPoints === 0) {
    if (scheme.targetSectors.includes(profile.businessType)) {
      sectorPoints += 20;
      whyMatchReasons.push(`Your sector '${profile.businessType}' is an officially approved priority activity.`);
      whyMatchReasonsTamil.push(`உங்கள் '${profile.businessType}' தொழில் துறை இத்திட்டத்தில் நேரடியாக அனுமதிக்கப்பட்டுள்ளது.`);
    } else if (scheme.targetSectors.includes('Services') && profile.businessType === 'Tech / Digital') {
      sectorPoints += 16;
      whyMatchReasons.push('Tech & Digital solutions qualify under the Services category.');
      whyMatchReasonsTamil.push('தொழில்நுட்ப சேவைகள் சேவைப் பிரிவின் கீழ் அங்கீகரிக்கப்படுகின்றன.');
    } else if (scheme.acronym === 'PMEGP' && profile.businessType === 'Trading / Retail') {
      missingRequirements.push('Standard PMEGP focuses on Manufacturing and Services (Trading/Retail is not eligible under regular PMEGP).');
      missingRequirementsTamil.push('PMEGP திட்டம் உற்பத்தி மற்றும் சேவைத் துறைகளுக்கே முன்னுரிமை அளிக்கிறது.');
      sectorPoints += 4;
    } else {
      sectorPoints += 8;
    }
  }

  // 10. Financial Range Fit (max 25)
  if (reqLakhs <= scheme.maxSupportValueLakhs) {
    if (scheme.acronym === 'NEEDS' && reqLakhs < 10) {
      missingRequirements.push(`NEEDS project cost must be at least ₹10 Lakhs (your requirement is ₹${reqLakhs} Lakhs).`);
      missingRequirementsTamil.push(`NEEDS திட்டத்திற்கு குறைந்தபட்ச திட்ட மதிப்பு ₹10 லட்சம் தேவை.`);
      fundingPoints += 12;
    } else if (scheme.acronym === 'Stand-Up India' && reqLakhs < 10) {
      missingRequirements.push(`Stand-Up India minimum loan amount is ₹10 Lakhs (your requirement is ₹${reqLakhs} Lakhs).`);
      missingRequirementsTamil.push(`ஸ்டாண்ட்-அப் இந்தியா குறைந்தபட்ச கடன் தொகை ₹10 லட்சம்.`);
      fundingPoints += 12;
    } else {
      fundingPoints += 25;
      whyMatchReasons.push(`Investment requirement (₹${reqLakhs} Lakhs) is well within the ceiling of ₹${scheme.maxSupportValueLakhs} Lakhs.`);
      whyMatchReasonsTamil.push(`உங்கள் முதலீட்டுத் தேவை (₹${reqLakhs} லட்சம்) இத்திட்ட நிதி வரம்பிற்குள் (₹${scheme.maxSupportValueLakhs} லட்சம்) உள்ளது.`);
    }
  } else if (reqLakhs <= scheme.maxSupportValueLakhs * 1.4) {
    fundingPoints += 14;
    missingRequirements.push(`Required capital (₹${reqLakhs} Lakhs) slightly exceeds standard ceiling of ₹${scheme.maxSupportValueLakhs} Lakhs.`);
    missingRequirementsTamil.push(`தேவைப்படும் நிதி (₹${reqLakhs} லட்சம்) இத்திட்ட உச்சவரம்பை விட அதிகம்.`);
    actionTipsToQualify.push('Phasing project investments or contributing additional promoter equity can bridge the margin.');
    actionTipsToQualifyTamil.push('திட்டத்தை கட்டங்களாக செயல்படுத்தி இத்திட்டத்திற்கு விண்ணப்பிக்கலாம்.');
  } else {
    fundingPoints += 5;
    missingRequirements.push(`Project cost (₹${reqLakhs} Lakhs) substantially exceeds scheme maximum limit (₹${scheme.maxSupportValueLakhs} Lakhs).`);
    missingRequirementsTamil.push(`திட்ட மதிப்பு இத்திட்டத்தின் அதிகபட்ச நிதி வரம்பை விட மிக அதிகம்.`);
  }

  // 11. Support Type Alignment (max 20)
  let matchedSupportCount = 0;
  profile.supportNeeded.forEach(type => {
    if (type === 'Subsidy' && scheme.category === 'Subsidies & Grants') matchedSupportCount++;
    if (type === 'Loan' && (scheme.category === 'Low-Interest Loans' || scheme.category === 'Subsidies & Grants')) matchedSupportCount++;
    if (type === 'Funding' && scheme.category === 'Subsidies & Grants') matchedSupportCount++;
    if (type === 'Training' && (scheme.acronym === 'PMEGP' || scheme.acronym === 'PM Vishwakarma' || scheme.acronym === 'NEEDS')) matchedSupportCount++;
    if (type === 'Market Support' && (scheme.acronym === 'PMFME' || scheme.acronym === 'PM Vishwakarma')) matchedSupportCount++;
    if (type === 'Mentorship' && (scheme.acronym === 'NEEDS' || scheme.acronym === 'Stand-Up India')) matchedSupportCount++;
  });
  supportPoints = Math.min(20, Math.max(8, matchedSupportCount * 7));
  if (matchedSupportCount > 0) {
    whyMatchReasons.push(`Provides the exact support required: ${profile.supportNeeded.slice(0, 3).join(', ')}.`);
    whyMatchReasonsTamil.push(`நீங்கள் கோரிய உதவி வகைகளை (${profile.supportNeeded.slice(0, 3).join(', ')}) நேரடியாக வழங்குகிறது.`);
  }

  // Check Udyam Requirement
  if (!profile.hasUdyamAadhaar && (scheme.acronym === 'CGTMSE' || scheme.acronym === 'NEEDS')) {
    missingRequirements.push('Udyam MSME Registration certificate is required before loan sanction.');
    missingRequirementsTamil.push('கடன் ஒப்புதலுக்கு முன் உத்யம் MSME பதிவு கட்டாயம் தேவை.');
    actionTipsToQualify.push('Register free on udyamregistration.gov.in using Aadhaar (takes 5-10 minutes).');
    actionTipsToQualifyTamil.push('udyamregistration.gov.in தளத்தில் ஆதாருடன் இலவசமாக பதிவு செய்யவும்.');
  }

  // Social Category Concessions
  if (isSpecialCategory && !scheme.acronym.includes('AABCS')) {
    eligibilityPoints += 5;
    whyMatchReasons.push(`Relaxed promoter contribution & higher subsidy percentage for ${profile.socialCategory} category.`);
    whyMatchReasonsTamil.push(`${profile.socialCategory} பிரிவினருக்கான கூடுதல் மானிய விகிதம் மற்றும் குறைந்த சொந்த முதலீடு சலுகை.`);
  }

  // Final Points & Tier Decision
  eligibilityPoints = Math.min(35, Math.max(0, eligibilityPoints));
  fundingPoints = Math.min(25, Math.max(0, fundingPoints));
  supportPoints = Math.min(20, Math.max(0, supportPoints));
  sectorPoints = Math.min(20, Math.max(0, sectorPoints));

  let rawScore = Math.round(eligibilityPoints + fundingPoints + supportPoints + sectorPoints);
  let totalScore = rawScore;
  let matchTier: MatchTier;

  if (mandatoryFailures.length > 0) {
    // Mandatory eligibility failed -> strictly Not Eligible, score heavily penalized
    matchTier = 'Not Eligible';
    totalScore = Math.min(28, Math.max(12, Math.round(rawScore * 0.28)));
    missingRequirements.unshift(...mandatoryFailures);
    missingRequirementsTamil.unshift(...mandatoryFailuresTamil);
  } else if (missingRequirements.length > 0 || totalScore < 75) {
    // Potential match but needs verification of requirements
    matchTier = 'Potential Match / Needs Verification';
    totalScore = Math.min(74, Math.max(52, totalScore));
    if (whyMatchReasons.length === 0) {
      whyMatchReasons.push(`General compatibility with ${profile.businessType} sector and financial requirements.`);
      whyMatchReasonsTamil.push(`தொழில் துறை மற்றும் நிதித் தேவைகளுக்கு பொதுவான இணக்கம்.`);
    }
  } else {
    // Fully eligible strong match
    matchTier = 'Eligible / Strong Match';
    totalScore = Math.min(98, Math.max(78, totalScore));
    whyMatchReasons.unshift(`Your business type (${profile.businessType}), location (${profile.state}), investment range (₹${reqLakhs} Lakhs) and support requirement match the scheme criteria.`);
    whyMatchReasonsTamil.unshift(`உங்கள் தொழில் வகை (${profile.businessType}), மாநிலம் (${profile.state}), முதலீட்டுத் தேவை (₹${reqLakhs} லட்சம்) மற்றும் உதவி தேவைகள் இத்திட்ட தகுதியுடன் பொருந்துகின்றன.`);
  }

  if (actionTipsToQualify.length === 0 && matchTier !== 'Not Eligible') {
    actionTipsToQualify.push('Prepare a Detailed Project Report (DPR) with machinery quotations and projected cash flows.');
    actionTipsToQualifyTamil.push('இயந்திர விலைப்புள்ளிகள் மற்றும் நிதி மதிப்பீட்டுடன் விரிவான திட்ட அறிக்கை (DPR) தயார் செய்யவும்.');
  }

  const scoreBreakdown: ScoreBreakdown = {
    fundingAlignment: fundingPoints,
    eligibilityFit: eligibilityPoints,
    supportTypeMatch: supportPoints,
    sectorAndScaleFit: sectorPoints
  };

  return {
    scheme,
    matchScore: totalScore,
    matchTier,
    whyMatchReasons,
    whyMatchReasonsTamil,
    missingRequirements,
    missingRequirementsTamil,
    actionTipsToQualify,
    actionTipsToQualifyTamil,
    scoreBreakdown
  };
}

export function rankSchemesForProfile(profile: EntrepreneurProfile, schemes: Scheme[]): SchemeMatchResult[] {
  return schemes
    .map(scheme => calculateSchemeMatch(profile, scheme))
    .sort((a, b) => {
      // Prioritize Eligible > Potential > Ineligible
      const tierRank = (tier: MatchTier) => {
        if (tier === 'Eligible / Strong Match' || tier === 'Likely Match') return 3;
        if (tier === 'Potential Match / Needs Verification' || tier === 'Potentially Eligible') return 2;
        return 1;
      };
      const rankDiff = tierRank(b.matchTier) - tierRank(a.matchTier);
      if (rankDiff !== 0) return rankDiff;
      return b.matchScore - a.matchScore;
    });
}

export const runSchemeMatching = rankSchemesForProfile;

