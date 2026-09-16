import React from 'react';
import { translations } from '../data/translations';
import { Language, EntrepreneurProfile } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Layers, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Zap,
  IndianRupee
} from 'lucide-react';

interface LandingHeroProps {
  language: Language;
  onStartMatching: () => void;
  onBrowseAll: () => void;
  onQuickProfile: (profile: Partial<EntrepreneurProfile>) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  language,
  onStartMatching,
  onBrowseAll,
  onQuickProfile
}) => {
  const t = translations[language];

  const quickPersonas = [
    {
      label: language === 'ta' ? 'கிராமப்புற மகளிர் தையலகம்' : 'Rural Woman Micro Enterprise',
      sub: language === 'ta' ? 'மதுரை • ₹5 லட்சம் • உற்பத்தி' : 'Madurai • ₹5 Lakhs • Manufacturing/Tailoring',
      badge: language === 'ta' ? '35% மானியம்' : 'Up to 35% Subsidy',
      profile: {
        age: 29,
        gender: 'Female' as const,
        socialCategory: 'OBC' as const,
        state: 'Tamil Nadu',
        district: 'Madurai',
        annualIncome: 180000,
        businessType: 'Manufacturing' as const,
        businessStage: 'Planning' as const,
        investmentRequired: 500000,
        supportNeeded: ['Funding' as const, 'Subsidy' as const, 'Training' as const],
        hasUdyamAadhaar: false,
      }
    },
    {
      label: language === 'ta' ? 'படித்த இளைஞர் உணவு பதப்படுத்துதல்' : 'Graduate Food Processing Startup',
      sub: language === 'ta' ? 'கோயம்புத்தூர் • ₹25 லட்சம் • புதிய தொழில்' : 'Coimbatore • ₹25 Lakhs • New Enterprise',
      badge: language === 'ta' ? '25% NEEDS மானியம்' : '25% NEEDS Subsidy',
      profile: {
        age: 26,
        gender: 'Male' as const,
        socialCategory: 'General' as const,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        annualIncome: 350000,
        businessType: 'Food Processing' as const,
        businessStage: 'New' as const,
        investmentRequired: 2500000,
        supportNeeded: ['Funding' as const, 'Loan' as const, 'Mentorship' as const],
        hasUdyamAadhaar: true,
      }
    },
    {
      label: language === 'ta' ? 'பாரம்பரிய கைவினைஞர் (தச்சு/சிற்பம்)' : 'Traditional Artisan & Craftsperson',
      sub: language === 'ta' ? 'தஞ்சாவூர் • ₹3 லட்சம் • 5% வட்டி' : 'Thanjavur • ₹3 Lakhs • 5% Interest',
      badge: language === 'ta' ? '₹15,000 கருவி மானியம்' : '₹15k Free Toolkit',
      profile: {
        age: 38,
        gender: 'Male' as const,
        socialCategory: 'OBC' as const,
        state: 'Tamil Nadu',
        district: 'Thanjavur',
        annualIncome: 120000,
        businessType: 'Handicraft / Artisan' as const,
        businessStage: 'Existing' as const,
        investmentRequired: 300000,
        supportNeeded: ['Loan' as const, 'Training' as const, 'Market Support' as const],
        hasUdyamAadhaar: false,
      }
    },
    {
      label: language === 'ta' ? 'SC/ST தொழில்முனைவோர் வணிக வாகனம்' : 'SC/ST Commercial Transport / Trade',
      sub: language === 'ta' ? 'சேலம் • ₹15 லட்சம் • AABCS திட்டம்' : 'Salem • ₹15 Lakhs • AABCS Scheme',
      badge: language === 'ta' ? '35% மானியம் + 6% வட்டி தள்ளுபடி' : '35% Subsidy + 6% Rebate',
      profile: {
        age: 32,
        gender: 'Female' as const,
        socialCategory: 'SC' as const,
        state: 'Tamil Nadu',
        district: 'Salem',
        annualIncome: 220000,
        businessType: 'Services' as const,
        businessStage: 'Planning' as const,
        investmentRequired: 1500000,
        supportNeeded: ['Funding' as const, 'Loan' as const, 'Subsidy' as const],
        hasUdyamAadhaar: false,
      }
    }
  ];

  return (
    <div className="relative overflow-hidden pb-16 pt-8 sm:pt-12">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/50 via-purple-50/30 to-transparent pointer-events-none -z-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statutory guidance notice banner - Prominent & compliant */}
        <div className="mb-8 rounded-xl bg-amber-50/90 border border-amber-200/80 p-3.5 sm:p-4 text-amber-900 flex items-start gap-3 shadow-xs">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-amber-950 block sm:inline mr-2">
              {t.disclaimer.banner}:
            </span>
            <span className="text-amber-900/90">
              {t.disclaimer.text}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] text-xs font-bold mb-6 border border-[#4F46E5]/20 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E1B4B] tracking-tight leading-[1.15] mb-5">
            {t.hero.titlePart1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4]">
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            <button
              onClick={onStartMatching}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] shadow-md shadow-[#4F46E5]/25 transition-all text-base hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#06B6D4]" />
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={onBrowseAll}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[#1E1B4B] bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all text-base cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto pt-4 border-t border-slate-200/80">
            <div className="text-center p-2">
              <div className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">{t.hero.stat1Number}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{t.hero.stat1Label}</div>
            </div>
            <div className="text-center p-2 border-x border-slate-200/80">
              <div className="text-xl sm:text-2xl font-extrabold text-[#7C3AED]">{t.hero.stat2Number}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{t.hero.stat2Label}</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xl sm:text-2xl font-extrabold text-[#1E1B4B]">{t.hero.stat3Number}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{t.hero.stat3Label}</div>
            </div>
          </div>
        </div>

        {/* Interactive Fast Personas - Quick Profiles for instant match */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-[#1E1B4B] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#4F46E5]" />
                <span>{language === 'ta' ? 'மாதிரி தொழில்முனைவோர் சுயவிவரங்கள் (1-கிளிக் சோதனை)' : 'Quick Demo Personas (1-Click Instant Match)'}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'ta' 
                  ? 'உடனடியாக தகுதி சரிபார்க்க கீழேயுள்ள முன்மாதிரி விவரங்களை கிளிக் செய்யவும்' 
                  : 'Select an authentic archetype below to test how the AI matches real MSME criteria.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {quickPersonas.map((persona, idx) => (
              <div
                key={idx}
                onClick={() => onQuickProfile(persona.profile)}
                className="group p-4 rounded-xl bg-white border border-slate-200 hover:border-[#7C3AED] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20">
                      {persona.badge}
                    </span>
                    <span className="text-[10px] text-slate-400">Demo #{idx + 1}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#1E1B4B] group-hover:text-[#4F46E5] transition-colors">
                    {persona.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {persona.sub}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#7C3AED] group-hover:translate-x-0.5 transition-transform">
                  <span>{language === 'ta' ? 'திட்டங்களை ஒப்பிடு' : 'Test Profile'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
