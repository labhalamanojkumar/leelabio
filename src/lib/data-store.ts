import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Pool, type PoolClient } from 'pg';
import { JOB_OPENINGS, type JobOpening } from '@/lib/jobs';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';
export type EmailStatus = 'pending' | 'sent' | 'failed';
export type CareerApplicationStatus = 'new' | 'reviewing' | 'shortlisted' | 'interview' | 'offered' | 'rejected' | 'hired';

export interface ContactLead {
    id: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    title: string;
    modality: string;
    timeline: string;
    message: string;
    services: string[];
    status: LeadStatus;
    emailStatus: EmailStatus;
}

export interface CareerApplication {
    id: string;
    createdAt: string;
    fullName: string;
    email: string;
    phone: string;
    jobTitle: string;
    jobId: string;
    reqId: string;
    linkedIn: string;
    experience: string;
    coverNote: string;
    resumeFileName: string;
    resumeContentType: string;
    resumeSize: number;
    status: CareerApplicationStatus;
    emailStatus: EmailStatus;
}

export interface AdminData {
    jobs: JobOpening[];
    leads: ContactLead[];
}

declare global {
    var leelabiologicsPgPool: Pool | undefined;
    var leelabiologicsPgSchema: Promise<void> | undefined;
}

const LEGACY_DATA_FILE = path.join(process.cwd(), '.data', 'admin-data.json');
const LEGACY_MIGRATION = 'json-to-postgres-v1';

function getPool() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not configured. Start local PostgreSQL with `docker compose up -d`.');
    }

    if (!globalThis.leelabiologicsPgPool) {
        globalThis.leelabiologicsPgPool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: true } : false,
            max: 10,
            connectionTimeoutMillis: 5000,
            idleTimeoutMillis: 30000,
        });
    }
    return globalThis.leelabiologicsPgPool;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isJobOpening(value: unknown): value is JobOpening {
    if (!isRecord(value)) return false;
    return ['id', 'slug', 'title', 'department', 'location', 'type', 'experience', 'reqId', 'shortDescription', 'overview', 'email']
        .every((key) => typeof value[key] === 'string') &&
        isStringArray(value.responsibilities) &&
        isStringArray(value.qualifications);
}

function isContactLead(value: unknown): value is ContactLead {
    if (!isRecord(value)) return false;
    return ['id', 'createdAt', 'firstName', 'lastName', 'email', 'phone', 'company', 'title', 'modality', 'timeline', 'message']
        .every((key) => typeof value[key] === 'string') &&
        isStringArray(value.services) &&
        isLeadStatus(value.status) &&
        isEmailStatus(value.emailStatus);
}

function isEmailStatus(value: unknown): value is EmailStatus {
    return value === 'pending' || value === 'sent' || value === 'failed';
}

async function readLegacyData(): Promise<AdminData | null> {
    let content: string;
    try {
        content = await readFile(LEGACY_DATA_FILE, 'utf8');
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
        throw error;
    }

    const parsed: unknown = JSON.parse(content);
    if (!isRecord(parsed) || !Array.isArray(parsed.jobs) || !Array.isArray(parsed.leads)) {
        throw new Error('The previous local admin data file has an invalid format; fix or back it up before migrating.');
    }
    if (!parsed.jobs.every(isJobOpening) || !parsed.leads.every(isContactLead)) {
        throw new Error('The previous local admin data contains invalid records and could not be migrated.');
    }
    return { jobs: parsed.jobs, leads: parsed.leads };
}

async function insertJob(client: PoolClient, job: JobOpening) {
    await client.query(
        `INSERT INTO career_openings
            (id, slug, title, department, location, employment_type, experience, req_id, short_description, overview, responsibilities, qualifications, email)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12::jsonb, $13)
         ON CONFLICT DO NOTHING`,
        [
            job.id, job.slug, job.title, job.department, job.location, job.type, job.experience,
            job.reqId, job.shortDescription, job.overview, JSON.stringify(job.responsibilities),
            JSON.stringify(job.qualifications), job.email,
        ]
    );
}

async function insertLead(client: PoolClient, lead: ContactLead) {
    await client.query(
        `INSERT INTO contact_leads
            (id, created_at, first_name, last_name, email, phone, company, job_title, modality, timeline, message, services, status, email_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13, $14)
         ON CONFLICT DO NOTHING`,
        [
            lead.id, lead.createdAt, lead.firstName, lead.lastName, lead.email, lead.phone,
            lead.company, lead.title, lead.modality, lead.timeline, lead.message,
            JSON.stringify(lead.services), lead.status, lead.emailStatus,
        ]
    );
}

async function initializeSchema() {
    const client = await getPool().connect();
    try {
        await client.query('BEGIN');
        await client.query('SELECT pg_advisory_xact_lock($1)', [781246903]);
        await client.query(`
            CREATE TABLE IF NOT EXISTS career_openings (
                id TEXT PRIMARY KEY,
                slug TEXT NOT NULL UNIQUE,
                title TEXT NOT NULL,
                department TEXT NOT NULL,
                location TEXT NOT NULL,
                employment_type TEXT NOT NULL,
                experience TEXT NOT NULL,
                req_id TEXT NOT NULL,
                short_description TEXT NOT NULL,
                overview TEXT NOT NULL,
                responsibilities JSONB NOT NULL DEFAULT '[]'::jsonb,
                qualifications JSONB NOT NULL DEFAULT '[]'::jsonb,
                email TEXT NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `);
        await client.query(`
            CREATE TABLE IF NOT EXISTS contact_leads (
                id TEXT PRIMARY KEY,
                created_at TIMESTAMPTZ NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL DEFAULT '',
                company TEXT NOT NULL,
                job_title TEXT NOT NULL DEFAULT '',
                modality TEXT NOT NULL DEFAULT '',
                timeline TEXT NOT NULL DEFAULT '',
                message TEXT NOT NULL,
                services JSONB NOT NULL DEFAULT '[]'::jsonb,
                status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
                email_status TEXT NOT NULL CHECK (email_status IN ('pending', 'sent', 'failed'))
            )
        `);
        await client.query('CREATE INDEX IF NOT EXISTS contact_leads_created_at_idx ON contact_leads (created_at DESC)');
        await client.query(`
            CREATE TABLE IF NOT EXISTS career_applications (
                id TEXT PRIMARY KEY,
                created_at TIMESTAMPTZ NOT NULL,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL DEFAULT '',
                job_title TEXT NOT NULL,
                job_id TEXT NOT NULL,
                req_id TEXT NOT NULL,
                linked_in TEXT NOT NULL DEFAULT '',
                experience TEXT NOT NULL DEFAULT '',
                cover_note TEXT NOT NULL DEFAULT '',
                resume_file_name TEXT NOT NULL,
                resume_content_type TEXT NOT NULL,
                resume_size INTEGER NOT NULL,
                resume_data BYTEA NOT NULL,
                status TEXT NOT NULL CHECK (status IN ('new', 'reviewing', 'shortlisted', 'interview', 'offered', 'rejected', 'hired')),
                email_status TEXT NOT NULL CHECK (email_status IN ('pending', 'sent', 'failed'))
            )
        `);
        await client.query('CREATE INDEX IF NOT EXISTS career_applications_created_at_idx ON career_applications (created_at DESC)');
        await client.query('CREATE TABLE IF NOT EXISTS app_migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW())');

        const migration = await client.query('SELECT 1 FROM app_migrations WHERE name = $1', [LEGACY_MIGRATION]);
        if (migration.rowCount === 0) {
            const legacy = await readLegacyData();
            if (legacy) {
                for (const job of legacy.jobs) await insertJob(client, job);
                for (const lead of legacy.leads) await insertLead(client, lead);
            }
            await client.query('INSERT INTO app_migrations (name) VALUES ($1)', [LEGACY_MIGRATION]);
        }

        const jobs = await client.query<{ count: string }>('SELECT COUNT(*) AS count FROM career_openings');
        if (Number(jobs.rows[0].count) === 0) {
            for (const job of JOB_OPENINGS) await insertJob(client, job);
        }
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

async function ensureSchema() {
    if (!globalThis.leelabiologicsPgSchema) {
        globalThis.leelabiologicsPgSchema = initializeSchema().catch((error: unknown) => {
            globalThis.leelabiologicsPgSchema = undefined;
            throw error;
        });
    }
    await globalThis.leelabiologicsPgSchema;
}

export async function getAdminData(): Promise<AdminData> {
    await ensureSchema();
    const pool = getPool();
    const [jobs, leads] = await Promise.all([
        pool.query<JobOpening>(
            `SELECT id, slug, title, department, location, employment_type AS type, experience,
                    req_id AS "reqId", short_description AS "shortDescription", overview,
                    responsibilities, qualifications, email
             FROM career_openings ORDER BY created_at DESC`
        ),
        pool.query<ContactLead>(
            `SELECT id, created_at::text AS "createdAt", first_name AS "firstName", last_name AS "lastName",
                    email, phone, company, job_title AS title, modality, timeline, message, services,
                    status, email_status AS "emailStatus"
             FROM contact_leads ORDER BY created_at DESC`
        ),
    ]);
    return { jobs: jobs.rows, leads: leads.rows };
}

export async function createContactLead(lead: ContactLead) {
    await ensureSchema();
    await getPool().query(
        `INSERT INTO contact_leads
            (id, created_at, first_name, last_name, email, phone, company, job_title, modality, timeline, message, services, status, email_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13, $14)`,
        [
            lead.id, lead.createdAt, lead.firstName, lead.lastName, lead.email, lead.phone,
            lead.company, lead.title, lead.modality, lead.timeline, lead.message,
            JSON.stringify(lead.services), lead.status, lead.emailStatus,
        ]
    );
}

export async function getCareerJob(identifier: string): Promise<JobOpening | null> {
    await ensureSchema();
    const result = await getPool().query<JobOpening>(
        `SELECT id, slug, title, department, location, employment_type AS type, experience,
                req_id AS "reqId", short_description AS "shortDescription", overview,
                responsibilities, qualifications, email
         FROM career_openings WHERE id = $1 OR slug = $1 LIMIT 1`,
        [identifier]
    );
    return result.rows[0] ?? null;
}

export async function getCareerApplications(): Promise<CareerApplication[]> {
    await ensureSchema();
    const result = await getPool().query<CareerApplication>(
        `SELECT id, created_at::text AS "createdAt", full_name AS "fullName", email, phone,
                job_title AS "jobTitle", job_id AS "jobId", req_id AS "reqId",
                linked_in AS "linkedIn", experience, cover_note AS "coverNote",
                resume_file_name AS "resumeFileName", resume_content_type AS "resumeContentType",
                resume_size AS "resumeSize", status, email_status AS "emailStatus"
         FROM career_applications ORDER BY created_at DESC`
    );
    return result.rows;
}

export async function createCareerApplication(
    application: CareerApplication & { resumeData: Buffer }
): Promise<void> {
    await ensureSchema();
    await getPool().query(
        `INSERT INTO career_applications
            (id, created_at, full_name, email, phone, job_title, job_id, req_id, linked_in, experience,
             cover_note, resume_file_name, resume_content_type, resume_size, resume_data, status, email_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
        [
            application.id, application.createdAt, application.fullName, application.email, application.phone,
            application.jobTitle, application.jobId, application.reqId, application.linkedIn, application.experience,
            application.coverNote, application.resumeFileName, application.resumeContentType, application.resumeSize,
            application.resumeData, application.status, application.emailStatus,
        ]
    );
}

export async function setCareerApplicationEmailStatus(id: string, status: EmailStatus): Promise<boolean> {
    await ensureSchema();
    const result = await getPool().query(
        'UPDATE career_applications SET email_status = $2 WHERE id = $1',
        [id, status]
    );
    return (result.rowCount ?? 0) > 0;
}

export async function updateCareerApplicationStatus(id: string, status: CareerApplicationStatus): Promise<boolean> {
    await ensureSchema();
    const result = await getPool().query(
        'UPDATE career_applications SET status = $2 WHERE id = $1',
        [id, status]
    );
    return (result.rowCount ?? 0) > 0;
}

export async function getCareerApplicationResume(id: string): Promise<{
    fileName: string;
    contentType: string;
    data: Buffer;
} | null> {
    await ensureSchema();
    const result = await getPool().query<{ fileName: string; contentType: string; data: Buffer }>(
        `SELECT resume_file_name AS "fileName", resume_content_type AS "contentType", resume_data AS data
         FROM career_applications WHERE id = $1`,
        [id]
    );
    return result.rows[0] ?? null;
}

export async function setContactEmailStatus(id: string, status: EmailStatus) {
    await ensureSchema();
    await getPool().query('UPDATE contact_leads SET email_status = $2 WHERE id = $1', [id, status]);
}

export async function updateContactLeadStatus(id: string, status: LeadStatus) {
    await ensureSchema();
    const result = await getPool().query('UPDATE contact_leads SET status = $2 WHERE id = $1', [id, status]);
    return (result.rowCount ?? 0) > 0;
}

export async function deleteContactLead(id: string) {
    await ensureSchema();
    const result = await getPool().query('DELETE FROM contact_leads WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
}

export async function createJob(job: Omit<JobOpening, 'id'>): Promise<JobOpening> {
    await ensureSchema();
    const pool = getPool();
    const id = randomUUID();
    let slug = job.slug;
    for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
            const record = { ...job, id, slug };
            const client = await pool.connect();
            try {
                await insertJob(client, record);
            } finally {
                client.release();
            }
            const saved = await pool.query('SELECT 1 FROM career_openings WHERE id = $1', [id]);
            if (saved.rowCount) return record;
            slug = `${job.slug}-${randomUUID().slice(0, 6)}`;
        } catch (error) {
            if (!isUniqueViolation(error)) throw error;
            slug = `${job.slug}-${randomUUID().slice(0, 6)}`;
        }
    }
    throw new Error('Could not create a unique URL slug for this opening.');
}

export async function updateJob(id: string, job: Omit<JobOpening, 'id'>): Promise<JobOpening | null> {
    await ensureSchema();
    const pool = getPool();
    const collision = await pool.query('SELECT 1 FROM career_openings WHERE slug = $1 AND id <> $2', [job.slug, id]);
    const slug = collision.rowCount ? `${job.slug}-${id.slice(0, 6)}` : job.slug;
    const result = await pool.query<JobOpening>(
        `UPDATE career_openings
         SET slug = $2, title = $3, department = $4, location = $5, employment_type = $6,
             experience = $7, req_id = $8, short_description = $9, overview = $10,
             responsibilities = $11::jsonb, qualifications = $12::jsonb, email = $13
         WHERE id = $1
         RETURNING id, slug, title, department, location, employment_type AS type, experience,
                   req_id AS "reqId", short_description AS "shortDescription", overview,
                   responsibilities, qualifications, email`,
        [
            id, slug, job.title, job.department, job.location, job.type, job.experience,
            job.reqId, job.shortDescription, job.overview, JSON.stringify(job.responsibilities),
            JSON.stringify(job.qualifications), job.email,
        ]
    );
    return result.rows[0] ?? null;
}

export async function deleteJob(id: string) {
    await ensureSchema();
    const result = await getPool().query('DELETE FROM career_openings WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
}

function isUniqueViolation(error: unknown): boolean {
    return isRecord(error) && error.code === '23505';
}

export function slugify(value: string) {
    return value
        .normalize('NFKD')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

export function isLeadStatus(value: unknown): value is LeadStatus {
    return value === 'new' || value === 'contacted' || value === 'qualified' || value === 'closed';
}

export function isCareerApplicationStatus(value: unknown): value is CareerApplicationStatus {
    return value === 'new' || value === 'reviewing' || value === 'shortlisted' ||
        value === 'interview' || value === 'offered' || value === 'rejected' || value === 'hired';
}
