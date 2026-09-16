import React, { useState } from 'react';
import { translations } from '../data/translations';
import { Language, Scheme } from '../types';
import { 
  Search, 
  Filter, 
  Layers, 
  ExternalLink, 
  ArrowRight, 
  Percent, 
  Calendar, 
  CheckCircle2, 
  ShieldAlert,
  Building2,
  Bookmark,
  BookmarkCheck,
  ArrowLeft
} from 'lucide-react';

interface BrowseAllSchemesViewProps {
  language: Language;
  schemes: Scheme[];
  onSelectScheme: (scheme: Scheme) => void;
  onToggleCompare: (scheme: Scheme) => void;
  comparedSchemeIds: string[];
  onToggleSave: (schemeId: string) => void;
  savedSchemeIds: string[];
  onStartMatching: () => void;
  onBack?: () => void;
}

export const BrowseAllSchemesView: React.FC<BrowseAllSchemesViewProps> = ({
  language,
  schemes,
  onSelectScheme,
  onToggleCompare,
  comparedSchemeIds,
  onToggleSave,
  savedSchemeIds,
  onStartMatching,
  onBack
}) => {
  const t = translations[language];

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Subsidies & Grants',
    'Low-Interest Loans',
    'Artisan & Skill Credit',
    'Women & Marginalized'
  ];

  const filtered = (schemes || []).filter(s => {
    if (selectedCategory !== 'ALL' && s.category !== selectedCategory) return false;
    if (selectedLevel !== 'ALL' && s.level !== selectedLevel) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = (s.name || '').toLowerCase().includes(q) || (s.nameTamil || '').includes(q);
      const matchAcronym = (s.acronym || '').toLowerCase().includes(q);
      const matchMinistry = (s.ministryOrDepartment || '').toLowerCase().includes(q);
      const matchSectors = Array.isArray(s.targetSectors) && s.targetSectors.some(sec => sec.toLowerCase().includes(q));
      if (!matchName && !matchAcronym && !matchMinistry && !matchSectors) return false;
    }
    return true;
  });

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#06B6D4] text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{schemes.length} {language === 'ta' ? 'சரிபார்க்கப்பட்ட திட்டங்கள்' : 'Verified Schemes in Database'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {language === 'ta' ? 'அரசு தொழில்முனைவோர் திட்டங்கள் களஞ்சியம்' : 'Central & State Government MSME Directory'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-100 mt-1 max-w-2xl leading-relaxed">
              {language === 'ta' 
                ? 'அனைத்து திட்டங்களையும் தேடலாம் அல்லது உங்கள் தொழிலுக்கேற்ற திட்டங்களை AI மூலம் துல்லியமாக அறியலாம்.' 
                : 'Browse all verified MSME loan, subsidy, and capital incentive programs. Use AI Matching for custom recommendations.'}
            </p>
          </div>

          <button
            onClick={onStartMatching}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <span>{t.nav.findSchemes}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filters toolbar inside header box */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'ta' ? 'திட்டம், சுருக்கப் பெயர் (PMEGP, MUDRA), அல்லது துறை மூலம் தேடுக...' : 'Search by scheme name, acronym (PMEGP, MUDRA, NEEDS), or sector...'}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-200 font-semibold px-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#06B6D4]" />
                Category:
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#7C3AED] text-white shadow-2xs'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat === 'ALL' ? (language === 'ta' ? 'அனைத்தும்' : 'All Categories') : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <span className="text-slate-200 font-semibold px-1">
                Level:
              </span>
              {(['ALL', 'Central', 'State'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-[#7C3AED] text-white shadow-2xs'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lvl === 'ALL' ? (language === 'ta' ? 'அனைத்தும்' : 'All') : lvl}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Scheme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(scheme => {
          const isSaved = savedSchemeIds.includes(scheme.id);
          const isCompared = comparedSchemeIds.includes(scheme.id);
          const schemeName = language === 'ta' ? scheme.nameTamil : scheme.name;

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#4F46E5]/50 transition-all shadow-xs hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                
                {/* Level badge & Actions */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-slate-100 text-[#1E1B4B]">
                      {scheme.acronym}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      scheme.level === 'Central' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {scheme.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onToggleSave(scheme.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isSaved ? 'text-[#4F46E5] bg-[#4F46E5]/10' : 'text-slate-400 hover:text-[#4F46E5] hover:bg-slate-100'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save Scheme'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#1E1B4B] leading-snug group-hover:text-[#4F46E5] transition-colors">
                  {schemeName}
                </h3>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {scheme.nodalAgency} • {scheme.ministryOrDepartment}
                </p>

                {/* Key Metrics */}
                <div className="mt-4 p-3 rounded-xl bg-[#F8FAFC] border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {language === 'ta' ? 'அதிகபட்ச உதவி' : 'Max Support'}
                    </span>
                    <span className="font-extrabold text-[#1E1B4B]">
                      {scheme.maxSupportAmount}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {language === 'ta' ? 'மானிய விகிதம்' : 'Subsidy'}
                    </span>
                    <span className="font-bold text-[#4F46E5]">
                      {language === 'ta' ? scheme.subsidyPercentageTamil : scheme.subsidyPercentage}
                    </span>
                  </div>
                </div>

                {/* Target sectors pills */}
                <div className="mt-4 flex flex-wrap gap-1">
                  {(scheme.targetSectors || []).slice(0, 3).map((sec, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {sec}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom footer button */}
              <div className="p-4 bg-[#F8FAFC] border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onToggleCompare(scheme)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    isCompared
                      ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {isCompared ? (language === 'ta' ? '✓ ஒப்பிடுகிறது' : '✓ In Compare') : (language === 'ta' ? '+ ஒப்பிடு' : '+ Compare')}
                </button>

                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  <span>{language === 'ta' ? 'முழு விவரம்' : 'View Scheme'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
