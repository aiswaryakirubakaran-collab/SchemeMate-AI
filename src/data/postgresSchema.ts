/**
 * PostgreSQL Schema Definition for SchemeMate AI
 * Enterprise-grade relational schema designed for government scheme discovery & matching.
 */

export const POSTGRESQL_DDL = `
-- SchemeMate AI Database Schema (PostgreSQL 15+)
-- Designed for Government MSME Scheme Discovery & Beneficiary Matching

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Entrepreneur Profiles Table
CREATE TABLE IF NOT EXISTS entrepreneur_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_identifier VARCHAR(100) NOT NULL,
    full_name VARCHAR(150),
    age INTEGER CHECK (age >= 18 AND age <= 90),
    gender VARCHAR(20) NOT NULL,
    social_category VARCHAR(50) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    annual_income NUMERIC(14, 2) NOT NULL,
    business_type VARCHAR(50) NOT NULL,
    business_stage VARCHAR(30) NOT NULL,
    investment_required NUMERIC(14, 2) NOT NULL,
    support_needed TEXT[] NOT NULL,
    has_udyam_aadhaar BOOLEAN DEFAULT FALSE,
    has_existing_bank_loan BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Government Schemes Master Table
CREATE TABLE IF NOT EXISTS schemes (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_tamil VARCHAR(255) NOT NULL,
    acronym VARCHAR(50) NOT NULL,
    ministry_or_department TEXT NOT NULL,
    ministry_tamil TEXT NOT NULL,
    level VARCHAR(20) CHECK (level IN ('Central', 'State', 'Joint')),
    target_states TEXT[] NOT NULL, -- ['All'] or specific states
    category VARCHAR(50) NOT NULL,
    category_tamil VARCHAR(50) NOT NULL,
    max_support_amount VARCHAR(100) NOT NULL,
    max_support_value_lakhs NUMERIC(10, 2) NOT NULL,
    subsidy_percentage TEXT NOT NULL,
    subsidy_percentage_tamil TEXT NOT NULL,
    interest_subvention TEXT,
    interest_subvention_tamil TEXT,
    collateral_required TEXT NOT NULL,
    collateral_required_tamil TEXT NOT NULL,
    target_sectors TEXT[] NOT NULL,
    eligible_stages TEXT[] NOT NULL,
    min_age INTEGER DEFAULT 18,
    max_age INTEGER DEFAULT 70,
    target_beneficiaries TEXT[] NOT NULL,
    target_beneficiaries_tamil TEXT[] NOT NULL,
    eligibility_criteria TEXT[] NOT NULL,
    eligibility_criteria_tamil TEXT[] NOT NULL,
    benefits TEXT[] NOT NULL,
    benefits_tamil TEXT[] NOT NULL,
    required_documents TEXT[] NOT NULL,
    required_documents_tamil TEXT[] NOT NULL,
    official_portal_url TEXT NOT NULL,
    nodal_agency VARCHAR(255) NOT NULL,
    last_verified_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Active' CHECK (status IN ('Active', 'Draft', 'Review')),
    tags TEXT[] NOT NULL,
    key_highlight TEXT,
    key_highlight_tamil TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Scheme Application Steps
CREATE TABLE IF NOT EXISTS scheme_application_steps (
    id SERIAL PRIMARY KEY,
    scheme_id VARCHAR(50) REFERENCES schemes(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    title_tamil VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    description_tamil TEXT NOT NULL
);

-- 4. User Saved Schemes & Tracking
CREATE TABLE IF NOT EXISTS user_tracked_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_profile_id UUID REFERENCES entrepreneur_profiles(id) ON DELETE CASCADE,
    scheme_id VARCHAR(50) REFERENCES schemes(id) ON DELETE CASCADE,
    stage VARCHAR(30) CHECK (stage IN ('Discovered', 'Docs Ready', 'Applied', 'Under Review', 'Sanctioned')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. User Document Readiness Vault
CREATE TABLE IF NOT EXISTS user_documents_vault (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_profile_id UUID REFERENCES entrepreneur_profiles(id) ON DELETE CASCADE,
    document_name VARCHAR(150) NOT NULL,
    is_ready BOOLEAN DEFAULT FALSE,
    document_reference_no VARCHAR(100),
    file_path TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Scheme Updates & Policy Notifications
CREATE TABLE IF NOT EXISTS scheme_notifications (
    id VARCHAR(50) PRIMARY KEY,
    scheme_id VARCHAR(50) REFERENCES schemes(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    title_tamil VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    summary_tamil TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    priority VARCHAR(20) DEFAULT 'normal',
    published_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for high-performance matching queries
CREATE INDEX IF NOT EXISTS idx_schemes_sectors ON schemes USING GIN (target_sectors);
CREATE INDEX IF NOT EXISTS idx_schemes_stages ON schemes USING GIN (eligible_stages);
CREATE INDEX IF NOT EXISTS idx_schemes_states ON schemes USING GIN (target_states);
CREATE INDEX IF NOT EXISTS idx_schemes_status ON schemes(status);
`;

export function generateFullSQLDump(schemes: any[]): string {
  let dump = POSTGRESQL_DDL + "\n\n-- SEED DATA INSERT STATEMENTS --\n";

  schemes.forEach((s) => {
    const escapedName = s.name.replace(/'/g, "''");
    const escapedNameTa = s.nameTamil.replace(/'/g, "''");
    const escapedMinistry = s.ministryOrDepartment.replace(/'/g, "''");
    const escapedMinistryTa = s.ministryTamil.replace(/'/g, "''");
    const statesArray = `ARRAY[${s.targetStates.map((st: string) => `'${st.replace(/'/g, "''")}'`).join(',')}]`;
    const sectorsArray = `ARRAY[${s.targetSectors.map((st: string) => `'${st.replace(/'/g, "''")}'`).join(',')}]`;
    const stagesArray = `ARRAY[${s.eligibleStages.map((st: string) => `'${st.replace(/'/g, "''")}'`).join(',')}]`;
    const tagsArray = `ARRAY[${s.tags.map((st: string) => `'${st.replace(/'/g, "''")}'`).join(',')}]`;

    dump += `
INSERT INTO schemes (
    id, name, name_tamil, acronym, ministry_or_department, ministry_tamil,
    level, target_states, category, category_tamil, max_support_amount,
    max_support_value_lakhs, subsidy_percentage, subsidy_percentage_tamil,
    interest_subvention, interest_subvention_tamil, collateral_required,
    collateral_required_tamil, target_sectors, eligible_stages, min_age,
    max_age, target_beneficiaries, target_beneficiaries_tamil,
    eligibility_criteria, eligibility_criteria_tamil, benefits, benefits_tamil,
    required_documents, required_documents_tamil, official_portal_url,
    nodal_agency, last_verified_date, status, tags, key_highlight, key_highlight_tamil
) VALUES (
    '${s.id}', '${escapedName}', '${escapedNameTa}', '${s.acronym}',
    '${escapedMinistry}', '${escapedMinistryTa}', '${s.level}', ${statesArray},
    '${s.category}', '${s.categoryTamil.replace(/'/g, "''")}', '${s.maxSupportAmount.replace(/'/g, "''")}',
    ${s.maxSupportValueLakhs}, '${s.subsidyPercentage.replace(/'/g, "''")}', '${s.subsidyPercentageTamil.replace(/'/g, "''")}',
    '${(s.interestSubvention || '').replace(/'/g, "''")}', '${(s.interestSubventionTamil || '').replace(/'/g, "''")}',
    '${s.collateralRequired.replace(/'/g, "''")}', '${s.collateralRequiredTamil.replace(/'/g, "''")}',
    ${sectorsArray}, ${stagesArray}, ${s.minAge}, ${s.maxAge},
    ARRAY[${s.targetBeneficiaries.map((b: string) => `'${b.replace(/'/g, "''")}'`).join(',')}],
    ARRAY[${s.targetBeneficiariesTamil.map((b: string) => `'${b.replace(/'/g, "''")}'`).join(',')}],
    ARRAY[${s.eligibilityCriteria.map((c: string) => `'${c.replace(/'/g, "''")}'`).join(',')}],
    ARRAY[${s.eligibilityCriteriaTamil.map((c: string) => `'${c.replace(/'/g, "''")}'`).join(',')}],
    ARRAY[${s.benefits.map((b: string) => `'${b.replace(/'/g, "''")}'`).join(',')}],
    ARRAY[${s.benefitsTamil.map((b: string) => `'${b.replace(/'/g, "''")}'`).join(',')}],
    ARRAY[${s.requiredDocuments.map((d: string) => `'${d.replace(/'/g, "''")}'`).join(',')}],
    ARRAY[${s.requiredDocumentsTamil.map((d: string) => `'${d.replace(/'/g, "''")}'`).join(',')}],
    '${s.officialPortalUrl}', '${s.nodalAgency.replace(/'/g, "''")}', '${s.lastVerifiedDate}',
    '${s.status}', ${tagsArray}, '${(s.keyHighlight || '').replace(/'/g, "''")}', '${(s.keyHighlightTamil || '').replace(/'/g, "''")}'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    last_verified_date = EXCLUDED.last_verified_date;
`;
  });

  return dump;
}
