import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language, SchemeMatchResult, Scheme } from '../types';
import { 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  Layers, 
  ExternalLink, 
  Filter, 
  Check, 
  Info,
  Calendar,
  Building,
  FileText,
  Percent,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from 'lucide-react';

interface MatchingResultsViewProps {
  language: Language;
  results: SchemeMatchResult[];
  onSelectScheme: (scheme: Scheme) => void;
  onToggleCompare: (scheme: Scheme) => void;
  comparedSchemeIds: string[];
  onToggleSave: (schemeId: string) => void;
  savedSchemeIds: string[];
  onEditProfile: () => void;
  onBack?: () => void;
}

export const MatchingResultsView: React.FC<MatchingResultsViewProps> = ({
  language,
  results,
  onSelectScheme,
  onToggleCompare,
  comparedSchemeIds,
  onToggleSave,
  savedSchemeIds,
  onEditProfile,
  onBack
}) => {
  const t = translations[language];

  // Filters
  const [filterTier, setFilterTier] = useState<'ALL' | 'Eligible / Strong Match' | 'Potential Match / Needs Verification'>('ALL');
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'Central' | 'State'>('ALL');
  const [expandedMissingId, setExpandedMissingId] = useState<string | null>(null);
  const [showIneligible, setShowIneligible] = useState(false);

  const eligibleCount = (results || []).filter(r => r.matchTier === 'Eligible / Strong Match' || r.matchTier === 'Likely Match').length;
  const potentialCount = (results || []).filter(r => r.matchTier === 'Potential Match / Needs Verification' || r.matchTier === 'Potentially Eligible').length;
  const ineligibleCount = (results || []).filter(r => r.matchTier === 'Not Eligible' || r.matchTier === 'Low Alignment').length;

  const filteredResults = (results || []).filter(res => {
    const isEligible = res.matchTier === 'Eligible / Strong Match' || res.matchTier === 'Likely Match';
    const isPotential = res.matchTier === 'Potential Match / Needs Verification' || res.matchTier === 'Potentially Eligible';
    const isIneligible = res.matchTier === 'Not Eligible' || res.matchTier === 'Low Alignment';

    if (filterTier === 'Eligible / Strong Match' && !isEligible) return false;
    if (filterTier === 'Potential Match / Needs Verification' && !isPotential) return false;

    // By default, exclude ineligible schemes from main view unless explicitly toggled or filtered
    if (isIneligible && !showIneligible) return false;

    if (filterLevel !== 'ALL' && res.scheme?.level !== filterLevel) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Top Back Navigation (Requirement 4) */}
      {onBack && (
        <div className="mb-4">
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

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 text-[#4F46E5] text-xs font-bold mb-2 border border-[#06B6D4]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>{results.length} {language === 'ta' ? 'திட்டங்கள் AI மூலம் பகுப்பாய்வு செய்யப்பட்டன' : 'Schemes Evaluated by AI'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] tracking-tight">
            {t.results.heading}
          </h1>
          <p className="text-xs sm:text-sm text-[#1E1B4B]/75 mt-1 max-w-2xl leading-relaxed">
            {t.results.subheading}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onEditProfile}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-[#1E1B4B] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            {t.results.refineBtn}
          </button>
        </div>
      </div>

      {/* Mandatory Statutory Notice */}
      <div className="mb-8 rounded-xl bg-amber-50/90 border border-amber-200/90 p-4 text-amber-900 flex items-start gap-3 shadow-xs">
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#06B6D4]" />
            {language === 'ta' ? 'தகுதி நிலை:' : 'Tier:'}
          </span>
          <button
            onClick={() => { setFilterTier('ALL'); setShowIneligible(false); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterTier === 'ALL' && !showIneligible
                ? 'bg-[#4F46E5] text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {language === 'ta' ? 'அனைத்து பரிந்துரைகள்' : 'All Eligible'} ({eligibleCount + potentialCount})
          </button>
          <button
            onClick={() => { setFilterTier('Eligible / Strong Match'); setShowIneligible(false); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterTier === 'Eligible / Strong Match' && !showIneligible
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-emerald-800 hover:bg-emerald-50 bg-emerald-50/50'
            }`}
          >
            {language === 'ta' ? 'முழுத் தகுதி' : 'Eligible / Strong Match'} ({eligibleCount})
          </button>
          <button
            onClick={() => { setFilterTier('Potential Match / Needs Verification'); setShowIneligible(false); }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterTier === 'Potential Match / Needs Verification' && !showIneligible
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-amber-800 hover:bg-amber-50 bg-amber-50/50'
            }`}
          >
            {language === 'ta' ? 'சாத்தியமான தகுதி' : 'Potential Match'} ({potentialCount})
          </button>

          {ineligibleCount > 0 && (
            <button
              onClick={() => { setShowIneligible(!showIneligible); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                showIneligible
                  ? 'bg-rose-700 text-white border-rose-700 shadow-2xs'
                  : 'text-slate-500 hover:text-rose-700 border-slate-200 hover:bg-rose-50/60'
              }`}
            >
              {showIneligible 
                ? (language === 'ta' ? 'தகுதியற்றவற்றை மறை' : 'Hide Ineligible Schemes') 
                : (language === 'ta' ? `தகுதியற்ற திட்டங்களைக் காட்டு (${ineligibleCount})` : `Show Ineligible Schemes (${ineligibleCount})`)}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 font-semibold px-2">
            {language === 'ta' ? 'அரசு:' : 'Jurisdiction:'}
          </span>
          {(['ALL', 'Central', 'State'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                filterLevel === lvl
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {lvl === 'ALL' ? (language === 'ta' ? 'அனைத்தும்' : 'All') : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Schemes Grid / List */}
      {filteredResults.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#1E1B4B]">
            {t.results.noMatchFound}
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            {language === 'ta' ? 'வடிகட்டிகளை மாற்றிப் பார்க்கவும்' : 'Try clearing your filters or widening your investment parameter.'}
          </p>
          <button
            onClick={() => { setFilterTier('ALL'); setFilterLevel('ALL'); }}
            className="px-4 py-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold cursor-pointer"
          >
            {language === 'ta' ? 'வடிகட்டிகளை நீக்கு' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredResults.map(result => {
            const { scheme, matchScore, matchTier, whyMatchReasons, whyMatchReasonsTamil, missingRequirements, missingRequirementsTamil, actionTipsToQualify } = result;
            const isSaved = savedSchemeIds.includes(scheme.id);
            const isCompared = comparedSchemeIds.includes(scheme.id);
            const isMissingExpanded = expandedMissingId === scheme.id;

            // Display language-sensitive strings
            const schemeName = language === 'ta' ? scheme.nameTamil : scheme.name;
            const ministry = language === 'ta' ? scheme.ministryTamil : scheme.ministryOrDepartment;
            const reasons = language === 'ta' ? whyMatchReasonsTamil : whyMatchReasons;
            const missing = language === 'ta' ? missingRequirementsTamil : missingRequirements;
            const highlight = language === 'ta' ? (scheme.keyHighlightTamil || scheme.keyHighlight) : (scheme.keyHighlight || '');

            return (
              <div
                key={scheme.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md ${
                  matchTier === 'Eligible / Strong Match' || matchTier === 'Likely Match'
                    ? 'border-[#4F46E5]/40 hover:border-[#4F46E5]' 
                    : matchTier === 'Not Eligible' || matchTier === 'Low Alignment'
                    ? 'border-rose-200 hover:border-rose-300 opacity-90'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Top strip banner */}
                <div className={`px-4 sm:px-6 py-2.5 flex items-center justify-between text-xs font-semibold ${
                  matchTier === 'Eligible / Strong Match' || matchTier === 'Likely Match'
                    ? 'bg-[#4F46E5]/10 text-[#1E1B4B] border-b border-[#4F46E5]/20'
                    : matchTier === 'Not Eligible' || matchTier === 'Low Alignment'
                    ? 'bg-rose-50 text-rose-900 border-b border-rose-200'
                    : 'bg-amber-50 text-amber-950 border-b border-amber-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#1E1B4B]">{scheme.level} Scheme</span>
                    <span>•</span>
                    <span className="text-slate-600">{scheme.nodalAgency}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 hidden sm:inline flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#4F46E5]" />
                      {t.results.lastVerified}: {scheme.lastVerifiedDate}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                      matchTier === 'Eligible / Strong Match' || matchTier === 'Likely Match'
                        ? 'bg-[#4F46E5] text-white shadow-2xs' 
                        : matchTier === 'Not Eligible' || matchTier === 'Low Alignment'
                        ? 'bg-rose-600 text-white'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}>
                      {matchTier === 'Eligible / Strong Match' || matchTier === 'Likely Match'
                        ? (language === 'ta' ? 'முழுத் தகுதி (Eligible)' : 'Eligible / Strong Match')
                        : matchTier === 'Not Eligible' || matchTier === 'Low Alignment'
                        ? (language === 'ta' ? 'தகுதியற்றது (Not Eligible)' : 'Not Eligible')
                        : (language === 'ta' ? 'சாத்தியமான தகுதி (Needs Verification)' : 'Potential Match / Needs Verification')}
                    </span>
                  </div>
                </div>

                {/* Main Card Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    
                    {/* Left: Scheme title, Ministry, Key Highlight */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-extrabold text-[#1E1B4B] bg-slate-100 px-2 py-0.5 rounded">
                          {scheme.acronym}
                        </span>
                        <span className="text-xs text-slate-500 font-medium truncate">
                          {ministry}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#1E1B4B] leading-snug">
                        {schemeName}
                      </h3>

                      {highlight && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#1E1B4B] text-xs font-semibold">
                          <Percent className="w-3.5 h-3.5 text-[#06B6D4]" />
                          <span>{highlight}</span>
                        </div>
                      )}

                      {/* Key Financial Badges Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-100">
                        <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-100">
                          <div className="text-[10px] text-slate-500 font-bold uppercase">{language === 'ta' ? 'அதிகபட்ச உதவி' : 'Max Support'}</div>
                          <div className="text-xs sm:text-sm font-extrabold text-[#1E1B4B] truncate">{scheme.maxSupportAmount}</div>
                        </div>

                        <div className="bg-[#4F46E5]/5 p-2.5 rounded-xl border border-[#4F46E5]/20">
                          <div className="text-[10px] text-[#4F46E5] font-bold uppercase">{language === 'ta' ? 'அரசு மானியம்' : 'Subsidy / Margin'}</div>
                          <div className="text-xs sm:text-sm font-extrabold text-[#4F46E5] truncate">
                            {language === 'ta' ? scheme.subsidyPercentageTamil : scheme.subsidyPercentage}
                          </div>
                        </div>

                        <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                          <div className="text-[10px] text-slate-500 font-bold uppercase">{language === 'ta' ? 'பிணையம்' : 'Collateral'}</div>
                          <div className="text-xs font-bold text-[#1E1B4B] truncate">
                            {language === 'ta' ? scheme.collateralRequiredTamil : scheme.collateralRequired}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: AI Match Score Dial */}
                    <div className="lg:w-56 shrink-0 flex flex-col items-center lg:items-end justify-center p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 text-center lg:text-right">
                      <div className="text-[11px] font-bold text-[#1E1B4B] uppercase tracking-wider mb-1">
                        {t.results.matchScore}
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-[#1E1B4B] font-mono tracking-tight">
                          {matchScore}
                        </span>
                        <span className="text-sm font-bold text-slate-400">/ 100</span>
                      </div>

                      {/* Mini Score Bar */}
                      <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            matchScore >= 80 ? 'bg-[#4F46E5]' : matchScore >= 60 ? 'bg-[#7C3AED]' : 'bg-amber-500'
                          }`}
                          style={{ width: `${matchScore}%` }}
                        />
                      </div>

                      {/* Sub-breakdown badges */}
                      <div className="grid grid-cols-2 gap-1 w-full mt-3 text-[10px] text-slate-600">
                        <div className="bg-white p-1 rounded border border-slate-200 font-semibold">
                          Funding: {result.scoreBreakdown.fundingAlignment}/25
                        </div>
                        <div className="bg-white p-1 rounded border border-slate-200 font-semibold">
                          Eligible: {result.scoreBreakdown.eligibilityFit}/35
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Why this matches you (Explainability Card) */}
                  <div className="mt-5 p-4 rounded-xl bg-[#4F46E5]/5 border border-[#4F46E5]/20">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1E1B4B] uppercase tracking-wide mb-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4F46E5]" />
                      <span>{t.results.whyMatch}</span>
                    </div>

                    <ul className="space-y-1.5">
                      {reasons.map((reason, idx) => (
                        <li key={idx} className="text-xs text-[#1E1B4B] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What Am I Missing / Action to qualify (Gap Analysis) */}
                  {missing.length > 0 && (
                    <div className="mt-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                      <div 
                        onClick={() => setExpandedMissingId(isMissingExpanded ? null : scheme.id)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 uppercase tracking-wide">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          <span>{t.results.whatMissing}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-950 font-bold">
                            {missing.length} {language === 'ta' ? 'குறிப்புகள்' : 'Action points'}
                          </span>
                        </div>
                        <button className="text-amber-800 text-xs font-semibold flex items-center gap-0.5 cursor-pointer">
                          {isMissingExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {isMissingExpanded && (
                        <div className="mt-3 pt-3 border-t border-amber-200/60 space-y-2">
                          {missing.map((miss, idx) => (
                            <div key={idx} className="text-xs text-amber-950 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                              <div>
                                <span className="font-semibold">{miss}</span>
                                {actionTipsToQualify[idx] && (
                                  <span className="block text-[11px] text-amber-800 mt-0.5 font-medium">
                                    💡 Tip: {actionTipsToQualify[idx]}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Card Action Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Secondary Actions: Compare & Save */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleCompare(scheme)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isCompared
                            ? 'bg-[#7C3AED] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
                        <span>{isCompared ? (language === 'ta' ? 'ஒப்பீட்டில் உள்ளது' : 'In Comparison') : (language === 'ta' ? 'ஒப்பிடு' : 'Compare')}</span>
                      </button>

                      <button
                        onClick={() => onToggleSave(scheme.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/30'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-[#4F46E5]" /> : <Bookmark className="w-3.5 h-3.5 text-slate-500" />}
                        <span>{isSaved ? (language === 'ta' ? 'சேமிக்கப்பட்டது' : 'Saved') : (language === 'ta' ? 'பலகையில் சேமி' : 'Save')}</span>
                      </button>

                      <a
                        href={scheme.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#1E1B4B] bg-slate-100 hover:bg-[#4F46E5]/10 hover:text-[#4F46E5] px-2.5 py-1.5 rounded-lg font-semibold transition-colors border border-slate-200"
                        title={`Open Official Portal: ${scheme.officialPortalUrl}`}
                      >
                        <span>{language === 'ta' ? 'அரசு தளம் (Portal)' : 'Official Website'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#4F46E5]" />
                      </a>
                    </div>

                    {/* Primary CTA */}
                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:translate-x-0.5 cursor-pointer"
                    >
                      <span>{t.results.viewDetails}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
