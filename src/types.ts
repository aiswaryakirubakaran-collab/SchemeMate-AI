export type Language = 'en' | 'ta';

export type BusinessType =
  | 'Manufacturing'
  | 'Services'
  | 'Trading / Retail'
  | 'Agriculture / Allied'
  | 'Handicraft / Artisan'
  | 'Food Processing'
  | 'Tech / Digital';

export type BusinessStage = 'Planning' | 'New' | 'Existing';

export type SupportType =
  | 'Funding'
  | 'Loan'
  | 'Subsidy'
  | 'Training'
  | 'Mentorship'
  | 'Market Support';

export type SocialCategory =
  | 'General'
  | 'OBC'
  | 'SC'
  | 'ST'
  | 'Minority'
  | 'Special (Differently Abled / Ex-Servicemen)';

export type Gender = 'Female' | 'Male' | 'Transgender' | 'Prefer not to say';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  phone?: string;
  state?: string;
  district?: string;
}

export interface EntrepreneurProfile {
  fullName?: string;
  age: number;
  gender: Gender;
  socialCategory: SocialCategory;
  state: string;
  district: string;
  annualIncome: number; // in INR (e.g. 250000)
  businessType: BusinessType;
  businessStage: BusinessStage;
  investmentRequired: number; // in INR (e.g. 1500000)
  supportNeeded: SupportType[];
  educationLevel?: string;
  hasUdyamAadhaar?: boolean;
  hasExistingBankLoan?: boolean;
}

export interface ApplicationStep {
  step: number;
  title: string;
  titleTamil: string;
  description: string;
  descriptionTamil: string;
}

export interface Scheme {
  id: string;
  name: string;
  nameTamil: string;
  acronym: string;
  ministryOrDepartment: string;
  ministryTamil: string;
  level: 'Central' | 'State' | 'Joint';
  targetStates: string[]; // ['All'] or specific states like ['Tamil Nadu']
  category: 'Subsidies & Grants' | 'Low-Interest Loans' | 'Artisan & Skill Credit' | 'Women & Marginalized' | 'Technology & Expansion';
  categoryTamil: string;
  maxSupportAmount: string;
  maxSupportValueLakhs: number;
  subsidyPercentage: string;
  subsidyPercentageTamil: string;
  interestSubvention: string;
  interestSubventionTamil: string;
  collateralRequired: string;
  collateralRequiredTamil: string;
  targetSectors: BusinessType[];
  eligibleStages: BusinessStage[];
  minAge: number;
  maxAge: number;
  targetBeneficiaries: string[];
  targetBeneficiariesTamil: string[];
  eligibilityCriteria: string[];
  eligibilityCriteriaTamil: string[];
  benefits: string[];
  benefitsTamil: string[];
  requiredDocuments: string[];
  requiredDocumentsTamil: string[];
  applicationSteps: ApplicationStep[];
  officialPortalUrl: string;
  nodalAgency: string;
  lastVerifiedDate: string;
  status: 'Active' | 'Draft' | 'Review';
  tags: string[];
  keyHighlight?: string;
  keyHighlightTamil?: string;
}

export interface ScoreBreakdown {
  fundingAlignment: number; // /25
  eligibilityFit: number;   // /35
  supportTypeMatch: number; // /20
  sectorAndScaleFit: number;// /20
}

export type MatchTier = 
  | 'Eligible / Strong Match' 
  | 'Potential Match / Needs Verification' 
  | 'Not Eligible'
  | 'Likely Match' 
  | 'Potentially Eligible' 
  | 'Low Alignment';

export interface SchemeMatchResult {
  scheme: Scheme;
  matchScore: number; // 0 to 100
  matchTier: MatchTier;
  whyMatchReasons: string[];
  whyMatchReasonsTamil: string[];
  missingRequirements: string[];
  missingRequirementsTamil: string[];
  actionTipsToQualify: string[];
  actionTipsToQualifyTamil: string[];
  scoreBreakdown: ScoreBreakdown;
}

export interface TrackedApplication {
  id: string;
  schemeId: string;
  stage: 'Discovered' | 'Docs Ready' | 'Applied' | 'Under Review' | 'Sanctioned';
  appliedDate?: string;
  updatedAt: string;
  notes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleTamil: string;
  message?: string;
  messageTamil?: string;
  summary: string;
  summaryTamil: string;
  date: string;
  schemeId?: string;
  relatedSchemeId?: string;
  targetView?: 'detail' | 'dashboard' | 'form' | 'vault' | 'browse';
  type?: string;
  read?: boolean;
  category: 'Policy Update' | 'Deadline Alert' | 'Subsidy Revision' | 'New Scheme' | 'Application Update' | 'Profile Reminder';
  unread: boolean;
  priority: 'high' | 'normal';
}

export type SchemeNotification = NotificationItem;

export interface ChatMessage {
  id: string;
  sender?: 'user' | 'ai';
  role?: 'user' | 'assistant' | 'system';
  content?: string;
  text?: string;
  timestamp: string;
  suggestedActions?: { label: string; action: string }[];
}
