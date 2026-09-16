import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language, Scheme, EntrepreneurProfile } from '../types';
import { 
  ArrowLeft, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Calendar, 
  Printer, 
  Check, 
  ListChecks, 
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';

interface SchemeDetailViewProps {
  language: Language;
  scheme: Scheme;
  userProfile?: EntrepreneurProfile;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (schemeId: string) => void;
  onTrackApplication: (schemeId: string) => void;
  onOpenChecklistVault: () => void;
  documentVaultStatus: Record<string, boolean>;
  onToggleDocumentReady: (docName: string) => void;
}

export const SchemeDetailView: React.FC<SchemeDetailViewProps> = ({
  language,
  scheme,
  userProfile,
  onBack,
  isSaved,
  onToggleSave,
  onTrackApplication,
  onOpenChecklistVault,
  documentVaultStatus,
  onToggleDocumentReady
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'steps'>('overview');

  const schemeName = language === 'ta' ? scheme.nameTamil : scheme.name;
  const ministry = language === 'ta' ? scheme.ministryTamil : scheme.ministryOrDepartment;
  const subsidyText = language === 'ta' ? scheme.subsidyPercentageTamil : scheme.subsidyPercentage;
  const interestText = language === 'ta' ? scheme.interestSubventionTamil : scheme.interestSubvention;
  const collateralText = language === 'ta' ? scheme.collateralRequiredTamil : scheme.collateralRequired;
  const eligibility = language === 'ta' ? scheme.eligibilityCriteriaTamil : scheme.eligibilityCriteria;
  const benefits = language === 'ta' ? scheme.benefitsTamil : scheme.benefits;
  const documents = language === 'ta' ? scheme.requiredDocumentsTamil : scheme.requiredDocuments;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top action bar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.details.back}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSave(scheme.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4 text-slate-500" />}
            <span className="hidden sm:inline">{isSaved ? t.details.removeFromDashboard : t.details.addToDashboard}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
            title="Print or Save PDF Brief"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">{t.details.downloadBrief}</span>
          </button>

          <a
            href={scheme.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-all cursor-pointer shadow-2xs"
          >
            <span>{t.details.visitPortal}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#06B6D4]" />
          </a>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="mb-6 rounded-xl bg-amber-50/90 border border-amber-200/90 p-4 text-amber-900 flex items-start gap-3 shadow-xs">
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

      {/* Main Header Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-emerald-100 text-emerald-800">
            {scheme.level} Scheme
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
            {scheme.acronym}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Verified on: {scheme.lastVerifiedDate}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
          {schemeName}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 flex items-center gap-1.5">
          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{ministry} • {t.details.nodalAgency}: <strong>{scheme.nodalAgency}</strong></span>
        </p>

        {/* 4-Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {t.details.maxAssistance}
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900">
              {scheme.maxSupportAmount}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
              {t.details.subsidyRate}
            </div>
            <div className="text-base sm:text-lg font-extrabold text-emerald-950">
              {subsidyText}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {t.details.interestBenefit}
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900">
              {interestText}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {t.details.collateralTerms}
            </div>
            <div className="text-base sm:text-lg font-extrabold text-slate-900">
              {collateralText}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Controls */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {language === 'ta' ? 'திட்ட நன்மைகள்' : 'Benefits & Overview'}
        </button>

        <button
          onClick={() => setActiveTab('eligibility')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'eligibility'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {t.details.eligibilityRules}
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'documents'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {t.details.documentsList}
        </button>

        <button
          onClick={() => setActiveTab('steps')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'steps'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {t.details.stepByStep}
        </button>
      </div>

      {/* Tab 1: Benefits & Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>{language === 'ta' ? 'திட்டத்தின் முதன்மை நன்மைகள்' : 'Key Government Benefits & Incentives'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Beneficiaries & Sectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {language === 'ta' ? 'முன்னுரிமை பயனாளிகள் பிரிவு' : 'Target Beneficiary Groups'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(language === 'ta' ? scheme.targetBeneficiariesTamil : scheme.targetBeneficiaries).map((group, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800">
                    {group}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                {language === 'ta' ? 'அனுமதிக்கப்படும் தொழில் துறைகள்' : 'Eligible Business Sectors'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {scheme.targetSectors.map((sector, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Eligibility Rules */}
      {activeTab === 'eligibility' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{t.details.eligibilityRules}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'ta' 
                ? 'அதிகாரப்பூர்வ வழிகாட்டு நெறிமுறைகளின்படி தகுதி நிபந்தனைகள் கீழே கொடுக்கப்பட்டுள்ளன' 
                : 'Statutory criteria evaluated by the District Task Force Committee and participating commercial banks.'}
            </p>
          </div>

          <div className="space-y-3">
            {eligibility.map((rule, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {rule}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Demographics Check */}
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex flex-wrap items-center justify-between gap-3 text-xs text-teal-950">
            <div>
              <span className="font-bold block">{language === 'ta' ? 'வயது வரம்பு:' : 'Age Range Limit:'}</span>
              <span>{scheme.minAge} to {scheme.maxAge} years</span>
            </div>
            <div>
              <span className="font-bold block">{language === 'ta' ? 'அனுமதிக்கப்படும் தொழில் நிலை:' : 'Admissible Business Stage:'}</span>
              <span>{scheme.eligibleStages.join(', ')}</span>
            </div>
            <div>
              <span className="font-bold block">{language === 'ta' ? 'மாநிலம் / எல்லை:' : 'Applicable Territory:'}</span>
              <span>{scheme.targetStates.join(', ')}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Document Checklist (Interactive) */}
      {activeTab === 'documents' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-emerald-600" />
                <span>{t.details.documentsList}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'ta' ? 'உங்களிடம் தயாராக உள்ள ஆவணங்களை கிளிக் செய்து சேமித்துக் கொள்ளலாம்' : 'Tick the documents you have ready. These are synced to your Document Vault.'}
              </p>
            </div>

            <button
              onClick={onOpenChecklistVault}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <span>{language === 'ta' ? 'முழு ஆவண பெட்டகம் (Vault)' : 'Open Full Vault'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {documents.map((doc, idx) => {
              const isReady = Boolean(documentVaultStatus[doc]);
              return (
                <div
                  key={idx}
                  onClick={() => onToggleDocumentReady(doc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isReady
                      ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isReady ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                    }`}>
                      {isReady && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold ${isReady ? 'text-emerald-950 line-through/none' : 'text-slate-800'}`}>
                      {doc}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isReady ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {isReady ? (language === 'ta' ? 'தயாராக உள்ளது' : 'Ready') : (language === 'ta' ? 'தேவைப்படுகிறது' : 'Pending')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Step-by-Step Application Roadmap */}
      {activeTab === 'steps' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>{t.details.stepByStep}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'ta' 
                ? 'விண்ணப்பம் முதல் மானியம் பெறுவது வரையிலான படிநிலைகள்' 
                : 'Follow this proven roadmap to ensure fast verification at the District Industries Centre and bank.'}
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
            {scheme.applicationSteps.map((step) => {
              const stepTitle = language === 'ta' ? step.titleTamil : step.title;
              const stepDesc = language === 'ta' ? step.descriptionTamil : step.description;

              return (
                <div key={step.step} className="relative">
                  {/* Step circle */}
                  <div className="absolute -left-6 sm:-left-8 top-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-sm">
                    {step.step}
                  </div>

                  <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                      {stepTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {stepDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct portal apply button */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">
                {language === 'ta' ? 'அரசு அதிகாரப்பூர்வ இணையதளம்:' : 'Official Government Portal:'}
              </span>
              <span className="text-xs font-semibold text-slate-800 break-all">
                {scheme.officialPortalUrl}
              </span>
            </div>

            <a
              href={scheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#4F46E5]/20 transition-all cursor-pointer"
            >
              <span>{t.details.visitPortal}</span>
              <ExternalLink className="w-4 h-4 text-[#06B6D4]" />
            </a>
          </div>
        </div>
      )}

      {/* Footer Track Application CTA */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="text-base font-bold">
            {language === 'ta' ? 'இத்திட்டத்திற்கான விண்ணப்பத்தை கண்காணிக்க வேண்டுமா?' : 'Ready to track your application progress?'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {language === 'ta' 
              ? 'உங்கள் Dashboard-ல் சேர்த்து ஆவண தயார்நிலை மற்றும் நிலைகளை கண்காணிக்கலாம்' 
              : 'Add to your user dashboard to track stages: Discovered → Docs Ready → Applied → Under Review.'}
          </p>
        </div>

        <button
          onClick={() => onTrackApplication(scheme.id)}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap"
        >
          {t.details.trackApplication}
        </button>
      </div>
    </div>
  );
};
