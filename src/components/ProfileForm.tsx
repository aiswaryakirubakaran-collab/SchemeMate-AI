import React, { useState } from 'react';
import { translations } from '../data/translations';
import { 
  Language, 
  EntrepreneurProfile, 
  BusinessType, 
  BusinessStage, 
  SupportType, 
  SocialCategory, 
  Gender 
} from '../types';
import { 
  Sparkles, 
  User, 
  Building2, 
  Coins, 
  ShieldCheck, 
  HelpCircle, 
  Check, 
  ArrowRight,
  ArrowLeft,
  RotateCcw
} from 'lucide-react';

interface ProfileFormProps {
  language: Language;
  initialProfile?: EntrepreneurProfile;
  onSubmit: (profile: EntrepreneurProfile) => void;
  onCancel?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  language,
  initialProfile,
  onSubmit,
  onCancel
}) => {
  const t = translations[language];

  // Default initial profile - starts blank/clean for new users
  const [profile, setProfile] = useState<EntrepreneurProfile>(initialProfile || {
    fullName: '',
    age: ('' as unknown as number),
    gender: 'Female',
    socialCategory: 'General',
    state: 'Tamil Nadu',
    district: '',
    annualIncome: ('' as unknown as number),
    businessType: 'Manufacturing',
    businessStage: 'Planning',
    investmentRequired: 500000, // ₹5 Lakhs default
    supportNeeded: ['Funding', 'Subsidy'],
    hasUdyamAadhaar: false,
    hasExistingBankLoan: false,
  });

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes: BusinessType[] = [
    'Manufacturing',
    'Services',
    'Trading / Retail',
    'Food Processing',
    'Handicraft / Artisan',
    'Agriculture / Allied',
    'Tech / Digital'
  ];

  const businessStages: { id: BusinessStage; label: string; desc: string }[] = [
    {
      id: 'Planning',
      label: language === 'ta' ? 'திட்டமிடல் நிலை' : 'Planning / Idea',
      desc: language === 'ta' ? 'புதிய தொழில் தொடங்க திட்டமிடுகிறேன்' : 'Setting up a brand-new enterprise (Greenfield)'
    },
    {
      id: 'New',
      label: language === 'ta' ? 'புதிய தொழில்' : 'New Enterprise',
      desc: language === 'ta' ? 'கடந்த 1 ஆண்டுக்குள் தொடங்கப்பட்டது' : 'Operating for less than 1 year'
    },
    {
      id: 'Existing',
      label: language === 'ta' ? 'இயங்கும் தொழில்' : 'Existing Unit',
      desc: language === 'ta' ? 'விரிவாக்கம் அல்லது நவீனமயமாக்கல்' : 'Looking for expansion, modern machinery or working capital'
    }
  ];

  const supportOptions: { id: SupportType; label: string; desc: string }[] = [
    { 
      id: 'Funding', 
      label: t.form.supportFunding, 
      desc: language === 'ta' ? 'திருப்பிச் செலுத்தத் தேவையில்லாத மூலதன மானியம்' : 'Direct non-repayable government cash grants' 
    },
    { 
      id: 'Loan', 
      label: t.form.supportLoan, 
      desc: language === 'ta' ? 'வங்கிக் கடன் / பிணையமற்ற நிதியுதவி' : 'Bank term loan or working capital line' 
    },
    { 
      id: 'Subsidy', 
      label: t.form.supportSubsidy, 
      desc: language === 'ta' ? 'வட்டி சலுகை மற்றும் கழிவு' : 'Interest subvention on bank loan EMI' 
    },
    { 
      id: 'Training', 
      label: t.form.supportTraining, 
      desc: language === 'ta' ? 'இலவச தொழில்முனைவோர் பயிற்சி (EDP)' : 'Certified entrepreneurship skill training' 
    },
    { 
      id: 'Mentorship', 
      label: t.form.supportMentorship, 
      desc: language === 'ta' ? 'திட்ட அறிக்கை தயாரித்தல் & வழிகாட்டல்' : 'DPR formulation and incubation guidance' 
    },
    { 
      id: 'Market Support', 
      label: t.form.supportMarket, 
      desc: language === 'ta' ? 'அரசு கண்காட்சிகள் மற்றும் சந்தை வாய்ப்பு' : 'Expositions, ODOP branding, and public tenders' 
    }
  ];

  const handleSupportToggle = (type: SupportType) => {
    if (profile.supportNeeded.includes(type)) {
      if (profile.supportNeeded.length > 1) {
        setProfile({
          ...profile,
          supportNeeded: profile.supportNeeded.filter(s => s !== type)
        });
      }
    } else {
      setProfile({
        ...profile,
        supportNeeded: [...profile.supportNeeded, type]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(profile);
      setIsSubmitting(false);
    }, 600);
  };

  const investmentPresets = [
    { label: '₹1 Lakh', val: 100000 },
    { label: '₹5 Lakhs', val: 500000 },
    { label: '₹10 Lakhs', val: 1000000 },
    { label: '₹25 Lakhs', val: 2500000 },
    { label: '₹50 Lakhs', val: 5000000 },
    { label: '₹1 Crore', val: 10000000 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Back Navigation (Requirement 4) */}
      {onCancel && (
        <div className="mb-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E1B4B] hover:text-[#4F46E5] transition-colors py-1.5 px-3 rounded-lg bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#4F46E5]" />
            <span>{language === 'ta' ? '← பின்செல்க' : '← Back'}</span>
          </button>
        </div>
      )}

      {/* Form Container Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header with Primary Color */}
        <div className="bg-[#4F46E5] text-white p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/40 flex items-center justify-center text-[#06B6D4]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'ta' ? 'தொழில்முனைவோர் சுயவிவரப் படிவம்' : 'Entrepreneur Profile Assessment'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-100 mt-0.5">
                  {language === 'ta' 
                    ? 'துல்லியமான அரசு மானியங்கள் மற்றும் கடன் வழிகாட்டல்களைப் பெற உங்கள் விவரங்களை உள்ளிடவும்' 
                    : 'Enter your venture details to calculate matching MSME subsidies, schemes, and eligibility.'}
                </p>
              </div>
            </div>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-100 transition-colors cursor-pointer"
              >
                {language === 'ta' ? 'மூடுக' : 'Close'}
              </button>
            )}
          </div>

          {/* Stepper pills with Secondary Color */}
          <div className="flex items-center gap-2 sm:gap-4 mt-6 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setActiveStep(1)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeStep === 1
                  ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                  : 'bg-white/10 text-indigo-100 hover:bg-white/15'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>1. {t.form.step1Title}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep(2)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeStep === 2
                  ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                  : 'bg-white/10 text-indigo-100 hover:bg-white/15'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>2. {t.form.step2Title}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStep(3)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeStep === 3
                  ? 'bg-[#7C3AED] text-white font-bold shadow-xs'
                  : 'bg-white/10 text-indigo-100 hover:bg-white/15'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>3. {t.form.step3Title}</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 bg-[#F8FAFC]">
          
          {/* STEP 1: Basic Entrepreneur Demographics */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="border-b border-slate-200 pb-2">
                <p className="text-xs text-slate-600 font-medium">
                  {language === 'ta' 
                    ? 'துல்லியமான திட்டப் பொருத்தத்திற்கு உங்கள் தனிப்பட்ட மற்றும் இருப்பிட விவரங்களை உள்ளிடவும்' 
                    : 'Enter your personal, economic, and regional details for targeted eligibility evaluation.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                    {t.form.fullName || (language === 'ta' ? 'முழுப் பெயர்' : 'Full Name')}
                  </label>
                  <input
                    type="text"
                    value={profile.fullName || ''}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder={language === 'ta' ? 'எ.கா. ஐஸ்வர்யா கிருபாகரன்' : 'e.g. Aiswarya Kirubakaran'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none text-sm font-semibold transition-all text-[#1E1B4B]"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                    {t.form.age} *
                  </label>
                  <input
                    type="number"
                    min={18}
                    max={75}
                    value={profile.age || ''}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || ('' as unknown as number) })}
                    placeholder="18 - 75"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none text-sm font-semibold transition-all text-[#1E1B4B]"
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {language === 'ta' ? 'பெரும்பாலான திட்டங்களுக்கு குறைந்தபட்சம் 18 வயது அவசியம்' : 'Minimum age is 18 years for central & state MSME schemes.'}
                  </p>
                </div>

                {/* Gender - Clean without eligibility claims */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                    {t.form.gender} *
                  </label>
                  <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value as Gender })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none text-sm font-semibold transition-all bg-white text-[#1E1B4B]"
                  >
                    <option value="Female">{language === 'ta' ? 'பெண்' : 'Female'}</option>
                    <option value="Male">{language === 'ta' ? 'ஆண்' : 'Male'}</option>
                    <option value="Prefer not to say">{language === 'ta' ? 'மற்றவை / குறிப்பிட விரும்பவில்லை' : 'Other / Prefer not to say'}</option>
                  </select>
                </div>

                {/* Social Category */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                    {t.form.socialCategory} *
                  </label>
                  <select
                    value={profile.socialCategory}
                    onChange={(e) => setProfile({ ...profile, socialCategory: e.target.value as SocialCategory })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none text-sm font-semibold transition-all bg-white text-[#1E1B4B]"
                  >
                    <option value="General">{t.form.categoryGeneral}</option>
                    <option value="OBC">{t.form.categoryOBC}</option>
                    <option value="SC">{t.form.categorySC}</option>
                    <option value="ST">{t.form.categoryST}</option>
                    <option value="Minority">{t.form.categoryMinority}</option>
                    <option value="Special (Differently Abled / Ex-Servicemen)">{t.form.categorySpecial}</option>
                  </select>
                </div>

                {/* Annual Income */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                    {t.form.annualIncome} *
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    value={profile.annualIncome || ''}
                    placeholder="e.g. 250000"
                    onChange={(e) => setProfile({ ...profile, annualIncome: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none text-sm font-semibold transition-all text-[#1E1B4B]"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t.form.annualIncomeHelp}
                  </p>
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                    {t.form.state} *
                  </label>
                  <select
                    value={profile.state}
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none text-sm font-semibold transition-all bg-white text-[#1E1B4B]"
                  >
                    <option value="Tamil Nadu">Tamil Nadu (தமிழ்நாடு)</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Other States">Other States / UT</option>
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">
                    {t.form.district} *
                  </label>
                  <input
                    type="text"
                    value={profile.district}
                    onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                    placeholder={t.form.districtPlaceholder || 'Enter your district'}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 outline-none text-sm font-semibold transition-all text-[#1E1B4B]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
                >
                  <span>{language === 'ta' ? 'அடுத்த படி: தொழில் விவரம்' : 'Next: Business Profile'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Business & Investment Profile */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="border-b border-slate-200 pb-2">
                <p className="text-xs text-slate-600 font-medium">
                  {language === 'ta' ? 'உங்கள் தொழில் வகை மற்றும் தேவைப்படும் நிதி மதிப்பீடு' : 'Define your industry sector and capital investment requirement.'}
                </p>
              </div>

              {/* Business Type selector */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-3">
                  {t.form.businessType} *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {businessTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProfile({ ...profile, businessType: type })}
                      className={`p-3 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                        profile.businessType === type
                          ? 'bg-[#4F46E5]/10 border-[#4F46E5] text-[#1E1B4B] ring-2 ring-[#4F46E5]/30'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span>{type}</span>
                        {profile.businessType === type && (
                          <Check className="w-3.5 h-3.5 text-[#4F46E5]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Stage */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-3">
                  {t.form.businessStage} *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {businessStages.map(stage => (
                    <div
                      key={stage.id}
                      onClick={() => setProfile({ ...profile, businessStage: stage.id })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        profile.businessStage === stage.id
                          ? 'bg-[#4F46E5]/10 border-[#4F46E5] text-[#1E1B4B] ring-2 ring-[#4F46E5]/30'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-[#1E1B4B]">{stage.label}</span>
                        {profile.businessStage === stage.id && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#4F46E5]"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">
                        {stage.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Investment Required */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
                    {t.form.investmentRequired} *
                  </label>
                  <span className="text-base font-extrabold text-[#4F46E5]">
                    ₹{(profile.investmentRequired / 100000).toLocaleString('en-IN')} Lakhs ({profile.investmentRequired.toLocaleString('en-IN')})
                  </span>
                </div>

                <input
                  type="range"
                  min={50000}
                  max={10000000}
                  step={50000}
                  value={profile.investmentRequired}
                  onChange={(e) => setProfile({ ...profile, investmentRequired: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4F46E5]"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {investmentPresets.map(preset => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setProfile({ ...profile, investmentRequired: preset.val })}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        profile.investmentRequired === preset.val
                          ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Udyam toggle */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    {t.form.hasUdyam}
                  </div>
                  <p className="text-xs text-slate-500">
                    {language === 'ta' ? 'உத்யம் பதிவு இல்லாதவர்கள் இலவசமாக udyamregistration.gov.in-ல் பெறலாம்' : 'Takes 5 minutes with Aadhaar on udyamregistration.gov.in'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, hasUdyamAadhaar: !profile.hasUdyamAadhaar })}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                    profile.hasUdyamAadhaar ? 'bg-[#4F46E5]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      profile.hasUdyamAadhaar ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 cursor-pointer"
                >
                  {language === 'ta' ? '← முந்தைய படி' : '← Back'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
                >
                  <span>{language === 'ta' ? 'அடுத்த படி: தேவையான உதவிகள்' : 'Next: Support Needed'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Support Needed & Submit */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="border-b border-slate-200 pb-2">
                <p className="text-xs text-slate-600 font-medium">
                  {language === 'ta' ? 'உங்களுக்கு தேவையான உதவி வகைகளைத் தேர்வு செய்யவும் (ஒன்றுக்கும் மேற்பட்டவை தேர்வு செய்யலாம்)' : 'Select all forms of government assistance your business requires.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {supportOptions.map(option => {
                  const isChecked = profile.supportNeeded.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => handleSupportToggle(option.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-[#4F46E5]/10 border-[#4F46E5] ring-2 ring-[#4F46E5]/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isChecked ? 'bg-[#4F46E5] text-white' : 'border border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#1E1B4B] leading-snug">
                          {option.label}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {option.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary recap box */}
              <div className="p-4 rounded-xl bg-[#1E1B4B] text-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-slate-300 block font-semibold">{language === 'ta' ? 'மதிப்பீட்டு சுருக்கம்' : 'Profile Summary'}:</span>
                  <span className="font-semibold text-white">
                    {profile.age ? `${profile.age} yrs` : 'Age pending'} • {profile.gender} • {profile.socialCategory} • {profile.businessType} • ₹{(profile.investmentRequired / 100000).toLocaleString()}L in {profile.district || 'District'}, {profile.state}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-[#06B6D4] hover:underline font-bold cursor-pointer"
                >
                  {language === 'ta' ? 'விவரங்களை திருத்து' : 'Edit details'}
                </button>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 cursor-pointer"
                >
                  {language === 'ta' ? '← முந்தைய படி' : '← Back'}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-sm shadow-md shadow-[#4F46E5]/20 transition-all cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t.form.evaluating}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                      <span>{t.form.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
