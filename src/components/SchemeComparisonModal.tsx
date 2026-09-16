import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language, Scheme } from '../types';
import { 
  X, 
  Layers, 
  ArrowRight, 
  Check, 
  Printer, 
  Download, 
  Building2, 
  Award, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Search,
  ArrowLeft,
  Share2,
  Sparkles,
  Plus
} from 'lucide-react';

interface SchemeComparisonModalProps {
  language: Language;
  comparedSchemes: Scheme[];
  allSchemes: Scheme[];
  onRemoveScheme: (schemeId: string) => void;
  onAddScheme: (scheme: Scheme) => void;
  onSelectScheme: (scheme: Scheme) => void;
  onClose?: () => void;
}

export const SchemeComparisonModal: React.FC<SchemeComparisonModalProps> = ({
  language,
  comparedSchemes = [],
  allSchemes = [],
  onRemoveScheme,
  onAddScheme,
  onSelectScheme,
  onClose
}) => {
  const t = translations[language];
  
  // Internal state for selected IDs (allows checking up to 4 schemes)
  const [selectedIds, setSelectedIds] = useState<string[]>(
    comparedSchemes.length > 0 ? comparedSchemes.map(s => s.id) : (allSchemes.slice(0, 3).map(s => s.id))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Sync back to parent if requested
  const handleToggleSelect = (scheme: Scheme) => {
    if (selectedIds.includes(scheme.id)) {
      setSelectedIds(selectedIds.filter(id => id !== scheme.id));
      onRemoveScheme(scheme.id);
    } else {
      if (selectedIds.length >= 4) return;
      setSelectedIds([...selectedIds, scheme.id]);
      onAddScheme(scheme);
    }
  };

  const handleRemove = (schemeId: string) => {
    setSelectedIds(selectedIds.filter(id => id !== schemeId));
    onRemoveScheme(schemeId);
  };

  const selectedSchemes = allSchemes.filter(s => selectedIds.includes(s.id));

  const filteredSchemes = allSchemes.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.nameTamil && s.nameTamil.includes(searchQuery))
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Top Back Navigation (Clean and prominent) */}
      {onClose && (
        <div className="mb-4 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1E1B4B] hover:text-[#4F46E5] transition-colors py-1.5 px-3 rounded-lg bg-white border border-slate-200 shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#4F46E5]" />
            <span>{language === 'ta' ? '← பின்செல்க (Back)' : '← Back'}</span>
          </button>
        </div>
      )}

      {/* Header Container - Clean comparison header without multi-step indicators */}
      <div className="bg-[#4F46E5] text-white rounded-2xl p-6 sm:p-8 shadow-sm mb-6 border border-indigo-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#06B6D4] text-xs font-bold mb-2">
              <Layers className="w-4 h-4 text-[#06B6D4]" />
              <span>{language === 'ta' ? 'அரசு திட்ட ஒப்பீட்டுக் கருவி' : 'Government Scheme Comparison'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.comparison.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 mt-1 max-w-2xl leading-relaxed">
              {language === 'ta' 
                ? 'அதிகபட்ச மானியம், தகுதி, விண்ணப்பிக்கும் முறை மற்றும் ஆவணங்களை பக்கவாட்டில் ஒப்பிட்டு சிறந்த திட்டத்தைத் தேர்வு செய்யவும்.' 
                : 'Compare subsidy percentages, loan ceilings, eligibility, and documentation side-by-side to choose the best scheme for your venture.'}
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{isSelectorOpen ? (language === 'ta' ? 'தேர்வு பலகையை மூடு' : 'Close Selector') : (language === 'ta' ? 'திட்டங்களை மாற்ற / சேர்க்க' : 'Add / Change Schemes')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'ta' ? 'அச்சிடுக' : 'Print / Export'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scheme Selection Drawer (Collapsible) */}
      {isSelectorOpen && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8 print:hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-[#1E1B4B]">
                {language === 'ta' ? 'ஒப்பிட வேண்டிய திட்டங்கள் (அதிகபட்சம் 4 திட்டங்கள்)' : 'Schemes Selected for Analysis (2 to 4 Schemes)'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ta' ? 'ஒப்பீட்டு அட்டவணையில் பார்க்க வேண்டிய திட்டங்களை தேர்வு செய்யவும்' : 'Select or deselect schemes to update your side-by-side comparison matrix.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                selectedIds.length >= 2 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {selectedIds.length}/4 {language === 'ta' ? 'தேர்வு செய்யப்பட்டது' : 'Selected'}
              </span>

              <button
                onClick={() => setIsSelectorOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-all cursor-pointer"
              >
                {language === 'ta' ? 'முடிந்தது' : 'Done'}
              </button>
            </div>
          </div>

          {/* Selected Scheme Chips with Remove Option */}
          <div className="pt-4 pb-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {language === 'ta' ? 'தற்போது தேர்ந்தெடுக்கப்பட்டவை:' : 'Currently Selected:'}
            </div>
            {selectedSchemes.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                {language === 'ta' ? 'கீழேயுள்ள பட்டியலில் இருந்து குறைந்தபட்சம் 2 திட்டங்களைத் தேர்ந்தெடுக்கவும்.' : 'Please select at least 2 schemes from the catalog below.'}
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedSchemes.map(s => (
                  <div 
                    key={s.id} 
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#4F46E5]/40 text-xs font-bold text-[#1E1B4B] shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#4F46E5]"></span>
                    <span>{s.acronym}</span>
                    <span className="text-slate-400 font-normal">|</span>
                    <span className="text-slate-600 font-medium truncate max-w-[150px]">{s.name}</span>
                    <button
                      onClick={() => handleRemove(s.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Catalog Checkbox Selector */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs font-bold text-[#1E1B4B]">
                {language === 'ta' ? 'அனைத்து திட்டங்கள் பட்டியல்:' : 'Available Central & State Schemes:'}
              </span>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'ta' ? 'திட்டங்களைத் தேடுக...' : 'Search schemes...'}
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white outline-none focus:border-[#4F46E5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-1">
              {filteredSchemes.map(s => {
                const isChecked = selectedIds.includes(s.id);
                return (
                  <label
                    key={s.id}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isChecked 
                        ? 'border-[#4F46E5] bg-[#4F46E5]/5 shadow-2xs' 
                        : 'border-slate-200 hover:bg-slate-50'
                    } ${!isChecked && selectedIds.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={!isChecked && selectedIds.length >= 4}
                      onChange={() => handleToggleSelect(s)}
                      className="mt-0.5 rounded text-[#4F46E5] focus:ring-[#4F46E5] w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-extrabold text-[#1E1B4B] truncate">{s.acronym}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold shrink-0">
                          {s.maxSupportAmount}
                        </span>
                      </div>
                      <p className="text-slate-500 truncate text-[11px] mt-0.5">
                        {language === 'ta' ? s.nameTamil : s.name}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Matrix View */}
      {selectedSchemes.length < 2 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {language === 'ta' ? 'ஒப்பீடு செய்ய குறைந்தது 2 திட்டங்களைத் தேர்ந்தெடுக்கவும்' : 'Select at least 2 schemes to view comparison'}
          </h3>
          <p className="text-xs text-slate-500 mb-4 max-w-md mx-auto">
            {language === 'ta' 
              ? 'திட்டங்களைத் தேர்ந்தெடுக்க மேலேயுள்ள "திட்டங்களை மாற்ற / சேர்க்க" பொத்தானை அழுத்தவும்.' 
              : 'Click "Add / Change Schemes" above to select at least two government schemes for side-by-side evaluation.'}
          </p>
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'திட்டங்களைத் தேர்வு செய்க' : 'Select Schemes'}</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Matrix Header & Print Toolbar */}
          <div className="p-4 sm:p-6 bg-[#F8FAFC] border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#1E1B4B]">
                {language === 'ta' ? 'நிதி, தகுதி மற்றும் ஆவணங்கள் ஒப்பீடு' : 'Financial, Operational & Eligibility Comparison'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'ta' ? 'தேர்ந்தெடுக்கப்பட்ட திட்டங்கள்:' : 'Comparing:'} {selectedSchemes.map(s => s.acronym).join(' vs ')}
              </p>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-50 text-xs shadow-2xs transition-colors cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-4 h-4 text-[#4F46E5]" />
                <span>{language === 'ta' ? 'அச்சிடுக / PDF சேமி' : 'Print / Export PDF'}</span>
              </button>
            </div>
          </div>

          {/* Side-by-side Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200">
                  <th className="p-4 sm:p-5 text-xs font-bold text-[#1E1B4B] uppercase tracking-wider w-1/4">
                    {language === 'ta' ? 'ஒப்பீட்டு அளவுகோல்' : 'Evaluation Criteria'}
                  </th>
                  {selectedSchemes.map((s, idx) => (
                    <th key={s.id} className="p-4 sm:p-5 w-1/4 align-top border-l border-slate-200 bg-white">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          {idx === 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#4F46E5] text-white mb-1.5 shadow-2xs">
                              <Award className="w-3 h-3" />
                              <span>{language === 'ta' ? 'சிறந்த பொருத்தம்' : 'Top Match'}</span>
                            </span>
                          )}
                          <div>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                              {s.acronym}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[#1E1B4B] mt-1 leading-snug">
                            {language === 'ta' ? s.nameTamil : s.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {s.nodalAgency}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(s.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors print:hidden"
                          title={t.comparison.remove}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                
                {/* 1. Scheme Name & Ministry */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#1E1B4B] bg-[#F8FAFC]">
                    {language === 'ta' ? 'அரசு அமைச்சகம் / துறை' : 'Ministry & Sponsoring Agency'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 text-slate-700 border-l border-slate-100 font-medium text-xs">
                      {s.ministry} ({s.nodalAgency})
                    </td>
                  ))}
                </tr>

                {/* 2. Target Beneficiary & Eligibility */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#1E1B4B] bg-[#F8FAFC]">
                    {language === 'ta' ? 'தகுதியான பயனாளிகள்' : 'Target Beneficiary & Eligibility'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 text-slate-700 border-l border-slate-100 text-xs">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(language === 'ta' ? s.targetBeneficiariesTamil : s.targetBeneficiaries).map((b, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {b}
                          </span>
                        ))}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {language === 'ta' ? s.eligibilitySummaryTamil : s.eligibilitySummary}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 3. Max Financial Benefit & Subsidy Rate */}
                <tr className="bg-[#4F46E5]/5">
                  <td className="p-4 sm:p-5 font-bold text-[#1E1B4B] bg-[#4F46E5]/10">
                    {language === 'ta' ? 'அதிகபட்ச மானியம் & நிதி உதவி' : 'Max Financial Benefit / Subsidy Rate'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 border-l border-slate-100">
                      <div className="font-extrabold text-[#1E1B4B] text-sm">
                        {s.maxSupportAmount}
                      </div>
                      <div className="font-bold text-[#4F46E5] text-xs mt-0.5">
                        {language === 'ta' ? s.subsidyPercentageTamil : s.subsidyPercentage}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 4. Interest Subvention & Collateral */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#1E1B4B] bg-[#F8FAFC]">
                    {language === 'ta' ? 'வட்டி மானியம் & பிணை' : 'Interest Subvention & Collateral'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 text-slate-700 border-l border-slate-100 text-xs">
                      <div>
                        <strong className="text-slate-900">{language === 'ta' ? 'வட்டி: ' : 'Interest: '}</strong>
                        {language === 'ta' ? s.interestSubventionTamil : s.interestSubvention}
                      </div>
                      <div className="mt-1">
                        <strong className="text-slate-900">{language === 'ta' ? 'பிணை: ' : 'Collateral: '}</strong>
                        {language === 'ta' ? s.collateralRequiredTamil : s.collateralRequired}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 5. Required Documents */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#1E1B4B] bg-[#F8FAFC]">
                    {language === 'ta' ? 'தேவையான ஆவணங்கள்' : 'Required Documents Checklist'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 text-slate-700 border-l border-slate-100 text-xs">
                      <ul className="space-y-1">
                        {s.requiredDocuments.slice(0, 4).map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3 h-3 text-[#4F46E5] shrink-0 mt-0.5" />
                            <span>{language === 'ta' ? (doc.nameTamil || doc.name) : doc.name}</span>
                          </li>
                        ))}
                        {s.requiredDocuments.length > 4 && (
                          <li className="text-[10px] text-slate-400 italic">
                            +{s.requiredDocuments.length - 4} {language === 'ta' ? 'மேலும் ஆவணங்கள்' : 'more documents'}
                          </li>
                        )}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* 6. Application Process & Portal */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#1E1B4B] bg-[#F8FAFC]">
                    {language === 'ta' ? 'விண்ணப்பிக்கும் தளம் & முறை' : 'Application Process & Official Portal'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 text-slate-700 border-l border-slate-100 text-xs">
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px] mb-1">
                        {s.applicationMode}
                      </span>
                      <p className="text-[11px] text-slate-500">
                        {s.officialPortal}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* 7. Processing Time & Approval Authority */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#1E1B4B] bg-[#F8FAFC]">
                    {language === 'ta' ? 'ஒப்புதல் அதிகாரம் & கால அளவு' : 'Approval Authority & Est. Processing'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 text-slate-700 border-l border-slate-100 text-xs">
                      <div className="font-semibold text-slate-800">
                        {s.processingTime}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {s.approvalAuthority}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 8. Suitable For / Key Takeaway */}
                <tr className="bg-slate-50/50">
                  <td className="p-4 sm:p-5 font-bold text-[#1E1B4B]">
                    {language === 'ta' ? 'யாருக்கு மிகவும் உகந்தது' : 'Suitable For & Recommendation'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 text-slate-700 border-l border-slate-100 text-xs">
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {language === 'ta' 
                          ? `${s.acronym} திட்டம் ${s.targetBeneficiariesTamil.slice(0, 2).join(', ')} போன்றோருக்கு அதிகபட்ச மானியத்தைப் பெற மிகச் சிறந்தது.`
                          : `Best for ${s.targetBeneficiaries.slice(0, 2).join(', ')} seeking low-margin financing with government subsidy cover.`}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Action Row */}
                <tr className="bg-white print:hidden">
                  <td className="p-4 sm:p-5 font-bold text-slate-400 text-xs">
                    {language === 'ta' ? 'நடவடிக்கை' : 'Next Action'}
                  </td>
                  {selectedSchemes.map(s => (
                    <td key={s.id} className="p-4 sm:p-5 border-l border-slate-100">
                      <button
                        onClick={() => onSelectScheme(s)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        <span>{language === 'ta' ? 'முழு விவரம்' : 'View Scheme'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>

          {/* Statutory Footer Note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-slate-500 text-[11px] flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              {language === 'ta'
                ? 'அனைத்து மானியங்களும் மாவட்ட பணிக்குழு மற்றும் வங்கிகளின் அதிகாரப்பூர்வ விதிமுறைகளுக்கு உட்பட்டவை. உத்தரவாதமான ஒப்புதல் வழங்கப்படமாட்டாது.'
                : 'All comparisons are indicative based on published ministry criteria. Final sanction and subsidy release are subject to official DTFC and bank underwriting.'}
            </span>
          </div>

        </div>
      )}

    </div>
  );
};
