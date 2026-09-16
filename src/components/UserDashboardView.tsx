import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language, Scheme, TrackedApplication, EntrepreneurProfile, AuthUser } from '../types';
import { 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileText, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  Sparkles,
  Building,
  Check,
  ArrowLeft,
  Coins,
  Award,
  AlertCircle,
  FolderOpen,
  PlusCircle,
  Calendar
} from 'lucide-react';

interface UserDashboardViewProps {
  language: Language;
  savedSchemes: Scheme[];
  allSchemes?: Scheme[];
  trackedApplications: TrackedApplication[];
  userProfile?: EntrepreneurProfile;
  user?: AuthUser | null;
  documentVaultStatus: Record<string, boolean>;
  onRemoveSavedScheme: (schemeId: string) => void;
  onUpdateApplicationStage: (appId: string, stage: TrackedApplication['stage'], notes: string) => void;
  onRemoveTrackedApplication: (appId: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
  onEditProfile: () => void;
  onOpenVault: () => void;
  onBack?: () => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  language,
  savedSchemes = [],
  allSchemes = [],
  trackedApplications = [],
  userProfile,
  user,
  documentVaultStatus,
  onRemoveSavedScheme,
  onUpdateApplicationStage,
  onRemoveTrackedApplication,
  onSelectScheme,
  onEditProfile,
  onOpenVault,
  onBack
}) => {
  const t = translations[language];

  // Document Readiness Calculation
  const readyDocsCount = Object.values(documentVaultStatus || {}).filter(Boolean).length;
  const totalDocsCount = 10;
  const readinessScore = Math.min(100, Math.round((readyDocsCount / totalDocsCount) * 100));

  // Overview metrics
  const totalMatchedCount = allSchemes.length;
  const highMatchCount = allSchemes.filter(s => (s.matchScore || 0) >= 80).length || Math.max(3, savedSchemes.length);
  const totalPotentialSubsidy = "₹25 Lakhs – ₹50 Lakhs";

  const applicationStages: { stage: TrackedApplication['stage']; label: string; labelTa: string; nextAction: string; nextActionTa: string }[] = [
    { 
      stage: 'Discovered', 
      label: 'Draft / Discovered', 
      labelTa: 'கண்டறியப்பட்டது',
      nextAction: 'Download detailed scheme checklist & project report format',
      nextActionTa: 'திட்ட ஆவணங்கள் மற்றும் மாதிரி திட்ட அறிக்கையைப் பதிவிறக்கவும்'
    },
    { 
      stage: 'Docs Ready', 
      label: 'Docs Ready', 
      labelTa: 'ஆவணங்கள் தயார்',
      nextAction: 'Submit online at official portal or visit District Industries Centre',
      nextActionTa: 'அதிகாரப்பூர்வ தளத்தில் பதிவேற்றி மாவட்ட தொழில் மையத்தை அணுகவும்'
    },
    { 
      stage: 'Applied', 
      label: 'Submitted / Applied', 
      labelTa: 'சமர்ப்பிக்கப்பட்டது',
      nextAction: 'Track DTFC interview or bank branch verification call',
      nextActionTa: 'மாவட்ட பணிக்குழு நேர்காணல் அல்லது வங்கி சரிபார்ப்புக்காக காத்திருக்கவும்'
    },
    { 
      stage: 'Under Review', 
      label: 'Under Review', 
      labelTa: 'பரிசீலனையில்',
      nextAction: 'Respond to bank query or submit site inspection inspection photos',
      nextActionTa: 'வங்கி கேள்விகளுக்கு பதிலளித்து தள ஆய்வு ஆவணங்களை வழங்கவும்'
    },
    { 
      stage: 'Sanctioned', 
      label: 'Approved / Sanctioned', 
      labelTa: 'ஒப்புதல் வழங்கப்பட்டது',
      nextAction: 'Sign subsidy agreement and initiate promoter margin disbursement',
      nextActionTa: 'மானிய ஒப்பந்தத்தில் கையெழுத்திட்டு சொந்த பங்கை செலுத்தி திட்டத்தை தொடங்கவும்'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Top Back Navigation (Requirement 4) */}
      {onBack && (
        <div className="mb-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E1B4B] hover:text-[#4F46E5] transition-colors py-1.5 px-3 rounded-lg bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#4F46E5]" />
            <span>{language === 'ta' ? '← பின்செல்க' : '← Back'}</span>
          </button>
        </div>
      )}

      {/* Header Container */}
      <div className="bg-[#4F46E5] text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-indigo-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/30 border border-[#7C3AED]/50 text-[#06B6D4] text-xs font-bold mb-2">
              <Bookmark className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{language === 'ta' ? 'தொழில்முனைவோர் கட்டுப்பாட்டுப் பலகை' : 'Entrepreneur Command Center'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.dashboard.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 mt-1 max-w-2xl leading-relaxed">
              {language === 'ta'
                ? 'உங்கள் தொழில் சுயவிவரம், பொருத்தப்பட்ட அரசு மானியங்கள், விண்ணப்ப நிலைகள் மற்றும் ஆவண தயார்நிலையை ஒரே இடத்தில் கண்காணிக்கவும்.'
                : 'Monitor your matched government subsidies, tracked loan applications, and document readiness in one organized workspace.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenVault}
              className="px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{language === 'ta' ? 'ஆவண பெட்டகம்' : 'Document Vault'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
                {readinessScore}%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'ME'}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] block">
                {language === 'ta' ? 'பிரிவு 1: சுயவிவர சுருக்கம்' : 'Section 1: Entrepreneur Profile Snapshot'}
              </span>
              <h2 className="text-base font-bold text-[#1E1B4B]">
                {user?.name || userProfile?.fullName || (language === 'ta' ? 'சரிபார்க்கப்பட்ட தொழில்முனைவோர்' : 'Verified Entrepreneur')}
              </h2>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#4F46E5]" />
            <span>{language === 'ta' ? 'சுயவிவரத்தை திருத்துக' : 'Edit Profile'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
              {language === 'ta' ? 'தொழில் வகை' : 'Business Category'}
            </span>
            <span className="text-xs font-bold text-[#1E1B4B]">
              {userProfile?.businessType || (language === 'ta' ? 'குறிப்பிடப்படவில்லை' : 'Not set')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
              {language === 'ta' ? 'தொழில் நிலை' : 'Business Stage'}
            </span>
            <span className="text-xs font-bold text-[#1E1B4B]">
              {userProfile?.businessStage || (language === 'ta' ? 'குறிப்பிடப்படவில்லை' : 'Not set')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
              {language === 'ta' ? 'சமூக பிரிவு & பாலினம்' : 'Category & Gender'}
            </span>
            <span className="text-xs font-bold text-[#1E1B4B]">
              {userProfile?.socialCategory ? `${userProfile.socialCategory} • ${userProfile.gender}` : (language === 'ta' ? 'குறிப்பிடப்படவில்லை' : 'Not set')}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
              {language === 'ta' ? 'இருப்பிடம்' : 'Location'}
            </span>
            <span className="text-xs font-bold text-[#1E1B4B]">
              {userProfile?.district ? `${userProfile.district}, ${userProfile.state}` : (user?.district ? `${user.district}, ${user.state || 'Tamil Nadu'}` : (language === 'ta' ? 'தமிழ்நாடு' : 'Tamil Nadu'))}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Matched Schemes Overview Metrics */}
      <div>
        <div className="mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] block">
            {language === 'ta' ? 'பிரிவு 2: பொருத்தப்பட்ட திட்டங்களின் மேலோட்டம்' : 'Section 2: Matched Schemes Overview'}
          </span>
          <h2 className="text-lg font-bold text-[#1E1B4B]">
            {language === 'ta' ? 'நிதி மற்றும் மானிய வாய்ப்புகள்' : 'Potential Subsidy & Schemes Horizon'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Total Matched</span>
              <Sparkles className="w-4 h-4 text-[#06B6D4]" />
            </div>
            <div className="text-2xl font-extrabold text-[#1E1B4B] mt-2">
              {totalMatchedCount}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {language === 'ta' ? 'மத்திய மற்றும் மாநில திட்டங்கள்' : 'Central & State Government Schemes'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">High Match Count</span>
              <Award className="w-4 h-4 text-[#4F46E5]" />
            </div>
            <div className="text-2xl font-extrabold text-[#4F46E5] mt-2">
              {highMatchCount} Schemes
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {language === 'ta' ? '80%+ பொருத்தம் கொண்டவை' : 'Scores 80%+ against your profile'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Saved Schemes</span>
              <Bookmark className="w-4 h-4 text-[#4F46E5]" />
            </div>
            <div className="text-2xl font-extrabold text-[#1E1B4B] mt-2">
              {savedSchemes.length}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {language === 'ta' ? 'புக்மார்க் செய்தவை' : 'Pinned for application preparation'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#7C3AED]/5 border border-[#7C3AED]/20 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#7C3AED] uppercase">Total Potential Subsidy</span>
              <Coins className="w-4 h-4 text-[#7C3AED]" />
            </div>
            <div className="text-lg sm:text-xl font-extrabold text-[#1E1B4B] mt-2">
              {totalPotentialSubsidy}
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              {language === 'ta' ? '15% முதல் 35% வரை மூலதன மானியம்' : 'Via PMEGP, NEEDS, and MUDRA'}
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 3: Saved Schemes List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] block">
              {language === 'ta' ? 'பிரிவு 3: சேமிக்கப்பட்ட திட்டங்கள்' : 'Section 3: Saved Schemes'}
            </span>
            <h2 className="text-lg font-bold text-[#1E1B4B]">
              {language === 'ta' ? 'நீங்கள் புக்மார்க் செய்த திட்டங்கள்' : 'Saved Schemes for Application'} ({savedSchemes.length})
            </h2>
          </div>
        </div>

        {savedSchemes.length === 0 ? (
          <div className="p-8 text-center bg-[#F8FAFC] rounded-xl border border-dashed border-slate-300">
            <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              {language === 'ta' ? 'தற்போது சேமிக்கப்பட்ட திட்டங்கள் எதுவும் இல்லை.' : 'No schemes saved yet.'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ta'
                ? 'திட்டங்கள் பக்கத்தில் உள்ள புக்மார்க் பொத்தானை அழுத்தி இங்கு சேமிக்கவும்.'
                : 'Click "Save Scheme" on any scheme card to review and track it here.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedSchemes.map(scheme => {
              const schemeName = language === 'ta' ? scheme.nameTamil : scheme.name;
              const matchPercentage = scheme.matchScore || 85;

              return (
                <div
                  key={scheme.id}
                  className="p-5 rounded-xl border border-slate-200 hover:border-[#4F46E5]/50 bg-white transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-[#1E1B4B]">
                          {scheme.acronym}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20">
                          {matchPercentage}% Match
                        </span>
                      </div>
                      
                      <button
                        onClick={() => onRemoveSavedScheme(scheme.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Remove scheme from saved list"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-[#1E1B4B] leading-snug">
                      {schemeName}
                    </h3>
                    
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{language === 'ta' ? 'அதிகபட்ச நிதி:' : 'Max Support:'}</span>
                      <span className="font-extrabold text-[#1E1B4B]">{scheme.maxSupportAmount}</span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">{language === 'ta' ? 'மானிய விகிதம்:' : 'Subsidy:'}</span>
                      <span className="font-bold text-[#4F46E5]">{language === 'ta' ? scheme.subsidyPercentageTamil : scheme.subsidyPercentage}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={scheme.officialPortalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-500 hover:text-[#4F46E5] flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>{language === 'ta' ? 'முழு விவரம்' : 'View Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 4: Application Tracker (Pipeline & Next Action) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] block">
              {language === 'ta' ? 'பிரிவு 4: விண்ணப்ப கண்காணிப்பாளர்' : 'Section 4: Government Application Tracker'}
            </span>
            <h2 className="text-lg font-bold text-[#1E1B4B] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4F46E5]" />
              <span>{language === 'ta' ? 'நேரடி விண்ணப்ப நிலைகள்' : 'Active Scheme Applications Pipeline'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ta'
                ? 'விண்ணப்ப சமர்ப்பிப்பு முதல் வங்கி மானிய ஒப்புதல் வரை நிலைகளை மாற்றி கண்காணிக்கவும்.'
                : 'Track milestone stages: Draft → Docs Ready → Submitted → Under Review → Approved.'}
            </p>
          </div>
        </div>

        {trackedApplications.length === 0 ? (
          <div className="p-8 text-center bg-[#F8FAFC] rounded-xl border border-dashed border-slate-300">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              {language === 'ta' ? 'தற்போது கண்காணிக்கப்படும் விண்ணப்பங்கள் இல்லை.' : 'No active applications tracked yet.'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'ta'
                ? 'திட்ட விவரப் பக்கத்தில் "விண்ணப்ப நிலையை கண்காணிக்க" பொத்தானை அழுத்தவும்.'
                : 'Open any scheme detail page and click "Track Application Status" to begin monitoring.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {trackedApplications.map(app => {
              const matchedScheme = (allSchemes || savedSchemes).find(s => s.id === app.schemeId) || savedSchemes.find(s => s.id === app.schemeId);
              const schemeName = matchedScheme ? (language === 'ta' ? matchedScheme.nameTamil : matchedScheme.name) : 'Government MSME Scheme';
              const currentStageInfo = applicationStages.find(s => s.stage === app.stage) || applicationStages[0];

              return (
                <div key={app.id} className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-4">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 text-[#1E1B4B]">
                          {matchedScheme?.acronym || 'MSME SCHEME'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Updated: {app.updatedAt}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#1E1B4B] mt-1">
                        {schemeName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {matchedScheme && (
                        <button
                          onClick={() => onSelectScheme(matchedScheme)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          {language === 'ta' ? 'திட்டம் காண்க' : 'View Scheme'}
                        </button>
                      )}
                      <button
                        onClick={() => onRemoveTrackedApplication(app.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Delete application tracker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stage Flow Stepper */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                    {applicationStages.map((item, idx) => {
                      const isCurrent = app.stage === item.stage;
                      const isPassed = applicationStages.findIndex(s => s.stage === app.stage) >= idx;

                      return (
                        <button
                          key={item.stage}
                          onClick={() => onUpdateApplicationStage(app.id, item.stage, app.notes)}
                          className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-xs'
                              : isPassed
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] uppercase font-bold opacity-80">Step {idx + 1}</span>
                            {isPassed && <Check className="w-3 h-3" />}
                          </div>
                          <div className="truncate font-bold text-[11px]">
                            {language === 'ta' ? item.labelTa : item.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Action Box */}
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#1E1B4B] mr-1">
                        {language === 'ta' ? 'அடுத்த நடவடிக்கை (Next Action):' : 'Next Action Required:'}
                      </span>
                      <span className="text-slate-600">
                        {language === 'ta' ? currentStageInfo.nextActionTa : currentStageInfo.nextAction}
                      </span>
                    </div>
                  </div>

                  {/* Notes / Reference input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      defaultValue={app.notes}
                      placeholder={language === 'ta' ? 'விண்ணப்ப குறிப்பு எண் (எ.கா. KVIC/TN/2026/8923)...' : 'Application Ref # / Bank Branch Notes (e.g. KVIC/TN/2026/8923)...'}
                      onBlur={(e) => onUpdateApplicationStage(app.id, app.stage, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-[#1F2937] outline-none focus:border-[#4F46E5]"
                    />
                    <span className="text-[11px] text-slate-400">Auto-saved</span>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 5: Document Readiness Checklist Quick Access */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] block">
              {language === 'ta' ? 'பிரிவு 5: ஆவண தயார்நிலை சரிபார்ப்பு பட்டியல்' : 'Section 5: Document Readiness Checklist'}
            </span>
            <h2 className="text-lg font-bold text-[#1E1B4B] flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-[#4F46E5]" />
              <span>{language === 'ta' ? 'அரசு மானிய ஆவணங்கள் தயார்நிலை' : 'Citizen Document Vault Quick Access'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ta'
                ? 'ஆதார், பான், திட்ட அறிக்கை மற்றும் சாதிச் சான்றிதழ்களை முன்கூட்டியே சரிபார்க்கவும்.'
                : 'Ensure essential identity, project reports, and MSME registrations are ready before applying.'}
            </p>
          </div>

          <button
            onClick={onOpenVault}
            className="px-4 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <span>{language === 'ta' ? 'முழு சரிபார்ப்பு பட்டியல் திறக்க' : 'Open Vault Checklist'}</span>
            <ArrowRight className="w-4 h-4 text-[#06B6D4]" />
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-[#1E1B4B]">
              {readyDocsCount} of {totalDocsCount} {language === 'ta' ? 'ஆவணங்கள் தயார்' : 'Essential Documents Verified'}
            </span>
            <span className="text-[#4F46E5]">{readinessScore}% Complete</span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] transition-all duration-300 rounded-full"
              style={{ width: `${readinessScore}%` }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
