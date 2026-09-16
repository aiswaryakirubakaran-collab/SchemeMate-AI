import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  Printer, 
  ExternalLink,
  Sparkles,
  Check,
  Building,
  Upload,
  ArrowLeft
} from 'lucide-react';

interface DocumentChecklistVaultProps {
  language: Language;
  documentVaultStatus: Record<string, boolean>;
  onToggleDocumentReady: (docName: string) => void;
  onClose?: () => void;
}

interface StandardDocInfo {
  name: string;
  nameTamil: string;
  category: 'Identity' | 'Business Registration' | 'Financial & Project' | 'Location & Property';
  categoryTamil: string;
  whereToGet: string;
  whereToGetTamil: string;
  importance: 'Mandatory for All' | 'For Subsidies & Quotas' | 'Sector Specific';
}

const standardIndianMSMEDocuments: StandardDocInfo[] = [
  {
    name: 'Aadhaar Card (Linked with Active Mobile Number)',
    nameTamil: 'ஆதார் அட்டை (மொபைல் எண்ணுடன் இணைக்கப்பட்டது)',
    category: 'Identity',
    categoryTamil: 'அடையாளச் சான்று',
    whereToGet: 'UIDAI portal (m-Aadhaar) or any Aadhaar Seva Kendra.',
    whereToGetTamil: 'UIDAI இணையதளம் அல்லது அருகிலுள்ள ஆதார் சேவை மையம்.',
    importance: 'Mandatory for All'
  },
  {
    name: 'Permanent Account Number (PAN Card)',
    nameTamil: 'பான் அட்டை (PAN Card)',
    category: 'Identity',
    categoryTamil: 'அடையாளச் சான்று',
    whereToGet: 'Instant e-PAN via Income Tax Portal using Aadhaar OTP (Free).',
    whereToGetTamil: 'வருமான வரி போர்ட்டலில் ஆதாருடன் உடனடி இலவச e-PAN.',
    importance: 'Mandatory for All'
  },
  {
    name: 'Udyam MSME Registration Certificate',
    nameTamil: 'உத்யம் (Udyam MSME) பதிவுச் சான்றிதழ்',
    category: 'Business Registration',
    categoryTamil: 'தொழில் பதிவு',
    whereToGet: 'Official portal: udyamregistration.gov.in (100% Free, no fee needed).',
    whereToGetTamil: 'அதிகாரப்பூர்வ தளம்: udyamregistration.gov.in (இலவசம், கட்டணமில்லை).',
    importance: 'Mandatory for All'
  },
  {
    name: 'Detailed Project Report (DPR) with 3-Year Projections',
    nameTamil: 'விரிவான திட்ட அறிக்கை (DPR - திட்ட மதிப்பீடு & வருவாய்)',
    category: 'Financial & Project',
    categoryTamil: 'நிதி & திட்ட அறிக்கை',
    whereToGet: 'Local District Industries Centre (DIC), Chartered Accountant, or SchemeMate AI templates.',
    whereToGetTamil: 'மாவட்ட தொழில் மையம் (DIC) அல்லது ஆடிட்டர் மூலம் தயார் செய்யலாம்.',
    importance: 'Mandatory for All'
  },
  {
    name: 'Machinery & Equipment Quotations from Vendors',
    nameTamil: 'இயந்திரங்கள் & உபகரணங்களுக்கான விலைப்புள்ளி (Quotations)',
    category: 'Financial & Project',
    categoryTamil: 'நிதி & திட்ட அறிக்கை',
    whereToGet: 'Official GST invoice quotation from authorized machinery manufacturers.',
    whereToGetTamil: 'இயந்திர விற்பனையாளர்களிடமிருந்து GST விவரத்துடன் கூடிய விலைப்புள்ளி.',
    importance: 'Mandatory for All'
  },
  {
    name: 'Bank Account Passbook / 6-12 Months Statement',
    nameTamil: 'வங்கி கணக்குப் புத்தகம் / 6-12 மாத கணக்கு அறிக்கை',
    category: 'Financial & Project',
    categoryTamil: 'நிதி & திட்ட அறிக்கை',
    whereToGet: 'Your commercial/cooperative bank branch or net banking PDF.',
    whereToGetTamil: 'உங்கள் வங்கிக் கிளை அல்லது நெட் பேங்கிங் மூலம் பதிவிறக்கலாம்.',
    importance: 'Mandatory for All'
  },
  {
    name: 'Community / Caste Certificate (SC/ST/OBC/MBC)',
    nameTamil: 'சாதிச் சான்றிதழ் (Community Certificate)',
    category: 'Identity',
    categoryTamil: 'அடையாளச் சான்று',
    whereToGet: 'Taluk Office Tahsildar / TN e-Sevai centres (mandatory for 35% subsidies).',
    whereToGetTamil: 'வட்டாட்சியர் அலுவலகம் / இ-சேவை மையம் (35% மானியம் பெற அவசியம்).',
    importance: 'For Subsidies & Quotas'
  },
  {
    name: 'Educational Qualification Proof (8th / 10th / Degree / Diploma)',
    nameTamil: 'கல்வித் தகுதிச் சான்றிதழ் (8 அல்லது 10-ம் வகுப்பு / பட்டப்படிப்பு)',
    category: 'Identity',
    categoryTamil: 'அடையாளச் சான்று',
    whereToGet: 'School Transfer Certificate (TC) or University Degree/Diploma copy.',
    whereToGetTamil: 'பள்ளி மாற்றுச் சான்றிதழ் (TC) அல்லது கல்லூரி பட்டச் சான்றிதழ்.',
    importance: 'For Subsidies & Quotas'
  },
  {
    name: 'Business Premises Proof (Rental Agreement / Property Tax / Patta)',
    nameTamil: 'தொழில் இடத்திற்கான சான்று (வாடகை ஒப்பந்தம் / பட்டா / சொத்து வரி)',
    category: 'Location & Property',
    categoryTamil: 'இடத்தின் சான்று',
    whereToGet: 'Registered Lease/Rental deed on stamp paper or Own Property Tax receipt.',
    whereToGetTamil: 'முத்திரைத்தாளில் வாடகை ஒப்பந்தம் அல்லது சொந்த இடத்தின் ரசீது.',
    importance: 'Mandatory for All'
  },
  {
    name: 'FSSAI Food Safety Registration / License (If Food Trade)',
    nameTamil: 'FSSAI உணவுப் பாதுகாப்பு பதிவு (உணவுத் தொழிலாக இருந்தால்)',
    category: 'Business Registration',
    categoryTamil: 'தொழில் பதிவு',
    whereToGet: 'foscos.fssai.gov.in portal for micro food handlers (₹100/yr).',
    whereToGetTamil: 'foscos.fssai.gov.in இணையதளம் மூலம் எளிதாகப் பெறலாம்.',
    importance: 'Sector Specific'
  }
];

export const DocumentChecklistVault: React.FC<DocumentChecklistVaultProps> = ({
  language,
  documentVaultStatus,
  onToggleDocumentReady,
  onClose
}) => {
  const t = translations[language];

  // Calculate readiness percentage
  const readyCount = (standardIndianMSMEDocuments || []).filter(d => Boolean(documentVaultStatus && documentVaultStatus[d.name])).length;
  const totalCount = standardIndianMSMEDocuments.length;
  const readinessPercentage = Math.round((readyCount / totalCount) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Back Navigation */}
      {onClose && (
        <div className="mb-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E1B4B] hover:text-[#4F46E5] transition-colors py-1.5 px-3 rounded-lg bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#4F46E5]" />
            <span>{language === 'ta' ? '← பின்செல்க' : '← Back'}</span>
          </button>
        </div>
      )}

      {/* Header Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'ta' ? 'அரசு ஆவண தயார்நிலை சரிபார்ப்பு' : 'Official Document Readiness Vault'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.checklist.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t.checklist.subtitle}
            </p>
          </div>

          {/* Readiness Dial Card */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shrink-0 text-center sm:text-right min-w-[220px]">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {t.checklist.readinessIndex}
            </div>
            <div className="flex items-baseline justify-center sm:justify-end gap-1">
              <span className="text-3xl font-black text-emerald-400 font-mono">
                {readinessPercentage}%
              </span>
              <span className="text-xs text-slate-400">({readyCount}/{totalCount})</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-2">
              {readinessPercentage >= 70 
                ? (language === 'ta' ? '✅ நல்ல தயார்நிலை: வங்கியில் விண்ணப்பிக்கலாம்' : '✅ Great readiness! Ready to submit at DIC/Bank') 
                : (language === 'ta' ? '⚠️ சில முக்கிய ஆவணங்கள் இன்னும் தேவை' : '⚠️ Keep gathering documents to prevent delay')}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            {language === 'ta' ? 'உங்களிடம் உள்ள ஆவணங்களை கிளிக் செய்து டிக் செய்யவும்' : 'Click on each document to toggle ready status.'}
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'ஆவணப் பட்டியலை அச்சிடு' : 'Print Checklist'}</span>
          </button>
        </div>
      </div>

      {/* Document Cards List */}
      <div className="space-y-4">
        {standardIndianMSMEDocuments.map((doc, idx) => {
          const isReady = Boolean(documentVaultStatus[doc.name]);
          const docTitle = language === 'ta' ? doc.nameTamil : doc.name;
          const category = language === 'ta' ? doc.categoryTamil : doc.category;
          const guide = language === 'ta' ? doc.whereToGetTamil : doc.whereToGet;

          return (
            <div
              key={idx}
              onClick={() => onToggleDocumentReady(doc.name)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white ${
                isReady
                  ? 'border-emerald-300 ring-1 ring-emerald-200 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 flex-1">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                    isReady ? 'bg-emerald-600 text-white shadow-xs' : 'border-2 border-slate-300 bg-white'
                  }`}>
                    {isReady && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        doc.importance === 'Mandatory for All' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                      }`}>
                        {doc.importance}
                      </span>
                    </div>

                    <h3 className={`text-sm sm:text-base font-bold ${isReady ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {docTitle}
                    </h3>

                    {/* How to get advice */}
                    <p className="text-xs text-slate-500 mt-2 flex items-start gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span><strong>{t.checklist.howToGet}:</strong> {guide}</span>
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex sm:flex-col items-end justify-between sm:justify-start gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    isReady ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {isReady ? t.checklist.ready : t.checklist.needed}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
