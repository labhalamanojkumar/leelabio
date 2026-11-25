'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { CareerApplication, CareerApplicationStatus, ContactLead, LeadStatus } from '@/lib/data-store';
import type { JobOpening } from '@/lib/jobs';
import styles from './admin.module.css';

type AdminView = 'overview' | 'leads' | 'applications' | 'jobs' | 'settings';
type SmtpDetails = { configured: boolean; host: string; port: number; recipient: string; careersRecipient: string };

interface JobDraft {
    id?: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    reqId: string;
    shortDescription: string;
    overview: string;
    responsibilities: string;
    qualifications: string;
    email: string;
}

const emptyDraft: JobDraft = {
    slug: '',
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    reqId: '',
    shortDescription: '',
    overview: '',
    responsibilities: '',
    qualifications: '',
    email: 'careers@leelabiologics.com',
};

const leadStatuses: LeadStatus[] = ['new', 'contacted', 'qualified', 'closed'];
const applicationStatuses: CareerApplicationStatus[] = ['new', 'reviewing', 'shortlisted', 'interview', 'offered', 'rejected', 'hired'];
const views: { id: AdminView; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '▦' },
    { id: 'leads', label: 'Contact leads', icon: '✉' },
    { id: 'applications', label: 'Job applications', icon: '♙' },
    { id: 'jobs', label: 'Career openings', icon: '▤' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
];

const viewCopy: Record<AdminView, { title: string; description: string }> = {
    overview: { title: 'Overview', description: 'A live snapshot of enquiries, applicants, and email delivery.' },
    leads: { title: 'Contact leads', description: 'Search enquiries, track follow-up, and export your inbox.' },
    applications: { title: 'Job applications', description: 'Review candidate details, download resumes, and manage hiring status.' },
    jobs: { title: 'Career openings', description: 'Publish and maintain the roles shown on your careers page.' },
    settings: { title: 'System settings', description: 'Check the database connection and test email delivery.' },
};

function csvCell(value: string) {
    const safeValue = /^[\s\u0000-\u001f]*[=+\-@]/.test(value) ? `'${value}` : value;
    return `"${safeValue.replace(/"/g, '""')}"`;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [leads, setLeads] = useState<ContactLead[]>([]);
    const [applications, setApplications] = useState<CareerApplication[]>([]);
    const [jobs, setJobs] = useState<JobOpening[]>([]);
    const [draft, setDraft] = useState<JobDraft>(emptyDraft);
    const [view, setView] = useState<AdminView>('overview');
    const [leadQuery, setLeadQuery] = useState('');
    const [leadStatus, setLeadStatus] = useState<'all' | LeadStatus>('all');
    const [applicationQuery, setApplicationQuery] = useState('');
    const [applicationStatus, setApplicationStatus] = useState<'all' | CareerApplicationStatus>('all');
    const [jobQuery, setJobQuery] = useState('');
    const [smtp, setSmtp] = useState<SmtpDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showJobEditor, setShowJobEditor] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [notice, setNotice] = useState('');
    const [error, setError] = useState('');
    const [smtpStatus, setSmtpStatus] = useState('');
    const [smtpTestState, setSmtpTestState] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

    const loadData = useCallback(async () => {
        const [leadResponse, jobResponse, smtpResponse, applicationResponse] = await Promise.all([
            fetch('/api/admin/leads', { cache: 'no-store' }),
            fetch('/api/admin/careers', { cache: 'no-store' }),
            fetch('/api/admin/smtp-test', { cache: 'no-store' }),
            fetch('/api/admin/applications', { cache: 'no-store' }),
        ]);
        if ([leadResponse, jobResponse, smtpResponse, applicationResponse].some((response) => response.status === 401)) {
            router.replace('/admin/login');
            return;
        }
        const [leadResult, jobResult, smtpResult, applicationResult] = await Promise.all([
            leadResponse.json(),
            jobResponse.json(),
            smtpResponse.json(),
            applicationResponse.json(),
        ]);
        if (!leadResponse.ok || !jobResponse.ok || !smtpResponse.ok || !applicationResponse.ok) {
            throw new Error(leadResult.error || jobResult.error || smtpResult.error || applicationResult.error || 'Could not load dashboard data.');
        }
        setLeads(leadResult.leads);
        setJobs(jobResult.jobs);
        setSmtp(smtpResult);
        setApplications(applicationResult.applications);
        setLastUpdated(new Date());
    }, [router]);

    useEffect(() => {
        let mounted = true;
        fetch('/api/admin/session', { cache: 'no-store' })
            .then(async (response) => {
                const session = await response.json();
                if (!mounted) return;
                if (!session.configured) {
                    setError('Admin login is not configured. Add ADMIN_USERNAME, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET to .env.local.');
                    setLoading(false);
                    return;
                }
                if (!session.authenticated) {
                    router.replace('/admin/login');
                    return;
                }
                setAuthorized(true);
                await loadData();
                if (mounted) setLoading(false);
            })
            .catch((reason: unknown) => {
                if (mounted) {
                    setError(reason instanceof Error ? reason.message : 'Could not load dashboard data.');
                    setLoading(false);
                }
            });
        return () => {
            mounted = false;
        };
    }, [loadData, router]);

    useEffect(() => {
        if (!authorized) return;
        const timer = window.setInterval(() => {
            loadData().catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Refresh failed.'));
        }, 15000);
        return () => window.clearInterval(timer);
    }, [authorized, loadData]);

    const filteredLeads = useMemo(() => {
        const query = leadQuery.trim().toLowerCase();
        return leads.filter((lead) => {
            const matchesStatus = leadStatus === 'all' || lead.status === leadStatus;
            const matchesQuery = !query || [
                lead.firstName, lead.lastName, lead.email, lead.phone, lead.company, lead.title, lead.message,
            ].some((value) => value.toLowerCase().includes(query));
            return matchesStatus && matchesQuery;
        });
    }, [leadQuery, leadStatus, leads]);

    const filteredApplications = useMemo(() => {
        const query = applicationQuery.trim().toLowerCase();
        return applications.filter((application) => {
            const matchesStatus = applicationStatus === 'all' || application.status === applicationStatus;
            const matchesQuery = !query || [
                application.fullName, application.email, application.phone, application.jobTitle,
                application.reqId, application.experience, application.coverNote,
            ].some((value) => value.toLowerCase().includes(query));
            return matchesStatus && matchesQuery;
        });
    }, [applications, applicationQuery, applicationStatus]);

    const filteredJobs = useMemo(() => {
        const query = jobQuery.trim().toLowerCase();
        return jobs.filter((job) =>
            !query || [job.title, job.department, job.location, job.reqId].some((value) => value.toLowerCase().includes(query))
        );
    }, [jobQuery, jobs]);

    async function refreshDashboard() {
        setRefreshing(true);
        setError('');
        try {
            await loadData();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Could not refresh dashboard.');
        } finally {
            setRefreshing(false);
        }
    }

    async function updateApplicationStatus(application: CareerApplication, status: CareerApplicationStatus) {
        setError('');
        try {
            const response = await fetch(`/api/admin/applications/${encodeURIComponent(application.id)}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Could not update application status.');
            setApplications((current) => current.map((item) => item.id === application.id ? { ...item, status } : item));
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Could not update application status.');
        }
    }

    async function saveJob(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setError('');
        setNotice('');
        const payload = {
            ...draft,
            responsibilities: draft.responsibilities.split('\n').map((item) => item.trim()).filter(Boolean),
            qualifications: draft.qualifications.split('\n').map((item) => item.trim()).filter(Boolean),
        };
        if (!payload.responsibilities.length || !payload.qualifications.length) {
            setError('Add at least one responsibility and one qualification before publishing.');
            setSaving(false);
            return;
        }
        try {
            const response = await fetch(draft.id ? `/api/admin/careers/${encodeURIComponent(draft.id)}` : '/api/admin/careers', {
                method: draft.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Could not save opening.');
            setNotice(draft.id ? 'Opening updated and published.' : 'Opening published.');
            setDraft(emptyDraft);
            setShowJobEditor(false);
            await loadData();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Could not save opening.');
        } finally {
            setSaving(false);
        }
    }

    function editJob(job: JobOpening) {
        setView('jobs');
        setDraft({
            ...job,
            responsibilities: job.responsibilities.join('\n'),
            qualifications: job.qualifications.join('\n'),
        });
        setShowJobEditor(true);
        setNotice('');
        setError('');
        window.setTimeout(() => document.getElementById('job-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    }

    function addJob() {
        setDraft(emptyDraft);
        setShowJobEditor(true);
        setView('jobs');
        setNotice('');
        window.setTimeout(() => document.getElementById('job-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    }

    async function deleteJob(job: JobOpening) {
        if (!window.confirm(`Delete "${job.title}" from current openings?`)) return;
        setError('');
        try {
            const response = await fetch(`/api/admin/careers/${encodeURIComponent(job.id)}`, { method: 'DELETE' });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Could not delete opening.');
            if (draft.id === job.id) {
                setDraft(emptyDraft);
                setShowJobEditor(false);
            }
            setNotice('Opening deleted.');
            await loadData();
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Could not delete opening.');
        }
    }

    async function updateLeadStatus(lead: ContactLead, status: LeadStatus) {
        try {
            const response = await fetch(`/api/admin/leads/${encodeURIComponent(lead.id)}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Could not update lead.');
            setLeads((current) => current.map((item) => item.id === lead.id ? { ...item, status } : item));
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Could not update lead.');
        }
    }

    async function deleteLead(lead: ContactLead) {
        if (!window.confirm(`Delete the enquiry from ${lead.firstName} ${lead.lastName}?`)) return;
        try {
            const response = await fetch(`/api/admin/leads/${encodeURIComponent(lead.id)}`, { method: 'DELETE' });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Could not delete lead.');
            setLeads((current) => current.filter((item) => item.id !== lead.id));
            setNotice('Contact lead deleted.');
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Could not delete lead.');
        }
    }

    function exportLeads() {
        const columns: (keyof ContactLead)[] = [
            'createdAt', 'firstName', 'lastName', 'email', 'phone', 'company', 'title',
            'modality', 'timeline', 'message', 'services', 'status', 'emailStatus',
        ];
        const rows = filteredLeads.map((lead) =>
            columns.map((column) => csvCell(Array.isArray(lead[column]) ? lead[column].join('; ') : String(lead[column])))
        );
        const content = [columns.map(csvCell).join(','), ...rows.map((row) => row.join(','))].join('\r\n');
        const url = URL.createObjectURL(new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = `leelabiologics-leads-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    function exportApplications() {
        const columns: (keyof CareerApplication)[] = [
            'createdAt', 'fullName', 'email', 'phone', 'jobTitle', 'reqId', 'experience',
            'linkedIn', 'coverNote', 'resumeFileName', 'status', 'emailStatus',
        ];
        const rows = filteredApplications.map((application) =>
            columns.map((column) => csvCell(String(application[column])))
        );
        const content = [columns.map(csvCell).join(','), ...rows.map((row) => row.join(','))].join('\r\n');
        const url = URL.createObjectURL(new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = `leelabiologics-applications-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    async function verifySmtp() {
        setSmtpTestState('testing');
        setSmtpStatus('');
        try {
            const response = await fetch('/api/admin/smtp-test', { method: 'POST' });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'SMTP test failed.');
            setSmtpTestState('success');
            setSmtpStatus(result.message);
        } catch (reason) {
            setSmtpTestState('error');
            setSmtpStatus(reason instanceof Error ? reason.message : 'SMTP test failed.');
        }
    }

    async function signOut() {
        await fetch('/api/admin/session', { method: 'DELETE' });
        router.replace('/admin/login');
    }

    if (loading) {
        return <div className={styles.loadingPage}><span className={styles.loader} /><p>Loading your admin workspace…</p></div>;
    }

    const newLeadCount = leads.filter((lead) => lead.status === 'new').length;
    const newApplicationCount = applications.filter((application) => application.status === 'new').length;
    const failedEmailCount = leads.filter((lead) => lead.emailStatus === 'failed').length +
        applications.filter((application) => application.emailStatus === 'failed').length;
    const copy = viewCopy[view];

    return (
        <div className={styles.dashboard}>
            <aside className={styles.sidebar}>
                <Link className={styles.brand} href="/" aria-label="Leelabiologics home">
                    <span className={styles.brandMark}>L</span>
                    <span><strong>Leelabiologics</strong><small>ADMIN CONSOLE</small></span>
                </Link>
                <div className={styles.workspaceLabel}>WORKSPACE</div>
                <nav className={styles.sideNav} aria-label="Admin sections">
                    {views.map((item) => (
                        <button
                            key={item.id}
                            className={`${styles.navButton} ${view === item.id ? styles.navButtonActive : ''}`}
                            onClick={() => { setView(item.id); setError(''); }}
                            aria-current={view === item.id ? 'page' : undefined}
                        >
                            <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                            <span>{item.label}</span>
                            {item.id === 'leads' && newLeadCount > 0 && <span className={styles.navCount}>{newLeadCount}</span>}
                            {item.id === 'applications' && newApplicationCount > 0 && <span className={styles.navCount}>{newApplicationCount}</span>}
                        </button>
                    ))}
                </nav>
                <div className={styles.sidebarBottom}>
                    <div className={styles.connection}>
                        <span className={styles.connectionDot} />
                        <span><strong>PostgreSQL</strong><small>Database connected</small></span>
                    </div>
                    <button className={styles.signOutButton} onClick={signOut}>Sign out <span aria-hidden="true">↗</span></button>
                </div>
            </aside>

            <div className={styles.mainArea}>
                <header className={styles.topbar}>
                    <div>
                        <p className={styles.eyebrow}>ADMINISTRATION / {view.toUpperCase()}</p>
                        <h1>{copy.title}</h1>
                        <p className={styles.pageDescription}>{copy.description}</p>
                    </div>
                    <div className={styles.topbarActions}>
                        <span className={styles.syncText}>{lastUpdated ? `Synced ${lastUpdated.toLocaleTimeString()}` : 'Connecting…'}</span>
                        <button className={styles.secondaryButton} onClick={refreshDashboard} disabled={refreshing} aria-label="Refresh dashboard">
                            <span className={refreshing ? styles.spinning : ''} aria-hidden="true">↻</span>
                            {refreshing ? 'Refreshing' : 'Refresh'}
                        </button>
                        <Link className={styles.viewSiteButton} href="/">View website <span aria-hidden="true">↗</span></Link>
                    </div>
                </header>

                <main className={styles.content}>
                    {error && <p className={styles.error} role="alert">{error}</p>}
                    {notice && <p className={styles.success} role="status">{notice}</p>}

                    {view === 'overview' && (
                        <>
                            <section className={styles.metricGrid} aria-label="Website overview">
                                <article className={styles.metricCard}>
                                    <span className={styles.metricIcon}>✉</span>
                                    <span className={styles.metricLabel}>Total enquiries</span>
                                    <strong>{leads.length}</strong>
                                    <small>All contact form submissions</small>
                                </article>
                                <article className={styles.metricCard}>
                                    <span className={`${styles.metricIcon} ${styles.metricAmber}`}>◷</span>
                                    <span className={styles.metricLabel}>Needs follow-up</span>
                                    <strong>{newLeadCount}</strong>
                                    <small>New leads awaiting a response</small>
                                </article>
                                <article className={styles.metricCard}>
                                    <span className={`${styles.metricIcon} ${styles.metricTeal}`}>▤</span>
                                    <span className={styles.metricLabel}>Live openings</span>
                                    <strong>{jobs.length}</strong>
                                    <small>Published on the careers page</small>
                                </article>
                                <article className={styles.metricCard}>
                                    <span className={`${styles.metricIcon} ${styles.metricTeal}`}>♙</span>
                                    <span className={styles.metricLabel}>Job applications</span>
                                    <strong>{applications.length}</strong>
                                    <small>{newApplicationCount} new applicants to review</small>
                                </article>
                                <article className={styles.metricCard}>
                                    <span className={`${styles.metricIcon} ${failedEmailCount ? styles.metricRose : styles.metricGreen}`}>↗</span>
                                    <span className={styles.metricLabel}>Email delivery</span>
                                    <strong>{failedEmailCount ? `${failedEmailCount} failed` : 'Healthy'}</strong>
                                    <small>{failedEmailCount ? 'Saved submissions remain in the dashboard' : 'No failed notifications'}</small>
                                </article>
                            </section>

                            <section className={styles.overviewGrid}>
                                <article className={styles.panel}>
                                    <div className={styles.panelHeader}>
                                        <div><h2>Recent enquiries</h2><p>Latest submissions from your contact form</p></div>
                                        <button className={styles.textButton} onClick={() => setView('leads')}>View all <span aria-hidden="true">→</span></button>
                                    </div>
                                    {leads.length === 0 ? (
                                        <div className={styles.emptyState}><span>✉</span><strong>Your inbox is clear</strong><p>New contact form enquiries will appear here.</p></div>
                                    ) : (
                                        <div className={styles.recentList}>
                                            {leads.slice(0, 5).map((lead) => (
                                                <button className={styles.recentItem} key={lead.id} onClick={() => { setLeadQuery(lead.email); setView('leads'); }}>
                                                    <span className={styles.avatar}>{`${lead.firstName[0] || ''}${lead.lastName[0] || ''}`.toUpperCase()}</span>
                                                    <span className={styles.recentName}><strong>{lead.firstName} {lead.lastName}</strong><small>{lead.company} · {lead.email}</small></span>
                                                    <span className={`${styles.statusBadge} ${styles[`status_${lead.status}`]}`}>{lead.status}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </article>

                                <article className={styles.panel}>
                                    <div className={styles.panelHeader}>
                                        <div><h2>Lead pipeline</h2><p>Current follow-up status</p></div>
                                    </div>
                                    <div className={styles.pipeline}>
                                        {leadStatuses.map((status) => {
                                            const count = leads.filter((lead) => lead.status === status).length;
                                            return (
                                                <button className={styles.pipelineRow} key={status} onClick={() => { setLeadStatus(status); setView('leads'); }}>
                                                    <span className={`${styles.pipelineDot} ${styles[`dot_${status}`]}`} />
                                                    <span>{status[0].toUpperCase() + status.slice(1)}</span>
                                                    <strong>{count}</strong>
                                                    <span className={styles.pipelineArrow}>→</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className={styles.quickActions}>
                                        <button className={styles.quickAction} onClick={() => setView('leads')}><span>✉</span> Review enquiries <b>→</b></button>
                                        <button className={styles.quickAction} onClick={addJob}><span>＋</span> Post a new opening <b>→</b></button>
                                    </div>
                                </article>
                            </section>
                            <section className={styles.panel}>
                                <div className={styles.panelHeader}>
                                    <div><h2>Recent job applications</h2><p>Latest candidates and their current review status.</p></div>
                                    <button className={styles.textButton} onClick={() => setView('applications')}>Review applicants <span aria-hidden="true">→</span></button>
                                </div>
                                {applications.length === 0 ? (
                                    <div className={styles.emptyState}><span>♙</span><strong>No applications yet</strong><p>Candidate submissions from the careers page will appear here.</p></div>
                                ) : (
                                    <div className={styles.recentList}>
                                        {applications.slice(0, 5).map((application) => (
                                            <button className={styles.recentItem} key={application.id} onClick={() => setView('applications')}>
                                                <span className={styles.avatar}>{application.fullName.slice(0, 2).toUpperCase()}</span>
                                                <span className={styles.recentName}><strong>{application.fullName}</strong><small>{application.jobTitle} · {application.email}</small></span>
                                                <span className={`${styles.applicationStatus} ${styles[`applicationStatus_${application.status}`]}`}>{application.status}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </>
                    )}

                    {view === 'leads' && (
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <div><h2>Enquiry inbox</h2><p>Manage follow-ups; updates are saved immediately.</p></div>
                                <button className={styles.secondaryButton} onClick={exportLeads} disabled={filteredLeads.length === 0}>Export CSV</button>
                            </div>
                            <div className={styles.toolbar}>
                                <label className={styles.searchBox}>
                                    <span aria-hidden="true">⌕</span>
                                    <input type="search" placeholder="Search name, company, email, message…" value={leadQuery} onChange={(event) => setLeadQuery(event.target.value)} />
                                </label>
                                <label className={styles.filterSelect}>
                                    <span>Status</span>
                                    <select value={leadStatus} onChange={(event) => setLeadStatus(event.target.value as 'all' | LeadStatus)}>
                                        <option value="all">All statuses</option>
                                        {leadStatuses.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}
                                    </select>
                                </label>
                                <span className={styles.resultCount}>{filteredLeads.length} of {leads.length} leads</span>
                            </div>
                            {filteredLeads.length === 0 ? (
                                <div className={styles.emptyState}><span>⌕</span><strong>{leads.length ? 'No matching leads' : 'No enquiries yet'}</strong><p>{leads.length ? 'Try another search or status filter.' : 'Contact form submissions will be saved here.'}</p></div>
                            ) : (
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead><tr><th>Received</th><th>Contact</th><th>Company</th><th>Enquiry</th><th>Notification</th><th>Pipeline</th><th aria-label="Actions" /></tr></thead>
                                        <tbody>
                                            {filteredLeads.map((lead) => (
                                                <tr key={lead.id}>
                                                    <td className={styles.dateCell}>{new Date(lead.createdAt).toLocaleDateString()}<small>{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></td>
                                                    <td><strong>{lead.firstName} {lead.lastName}</strong><a className={styles.contactLink} href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone && <small>{lead.phone}</small>}</td>
                                                    <td><strong>{lead.company}</strong>{lead.title && <small>{lead.title}</small>}</td>
                                                    <td className={styles.enquiryCell}><span>{lead.message}</span>{lead.services.length > 0 && <small>{lead.services.join(', ')}</small>}</td>
                                                    <td><span className={`${styles.emailBadge} ${styles[`email_${lead.emailStatus}`]}`}>{lead.emailStatus}</span></td>
                                                    <td><select className={styles.statusSelect} aria-label={`Follow-up status for ${lead.firstName} ${lead.lastName}`} value={lead.status} onChange={(event) => updateLeadStatus(lead, event.target.value as LeadStatus)}>{leadStatuses.map((status) => <option key={status} value={status}>{status}</option>)}</select></td>
                                                    <td><button className={styles.iconButton} aria-label={`Delete ${lead.firstName} ${lead.lastName} enquiry`} onClick={() => deleteLead(lead)}>×</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    )}

                    {view === 'applications' && (
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <div><h2>Candidate inbox <span className={styles.countPill}>{applications.length}</span></h2><p>Application records and resumes are stored in PostgreSQL; update review status as you go.</p></div>
                                <button className={styles.secondaryButton} onClick={exportApplications} disabled={filteredApplications.length === 0}>Export CSV</button>
                            </div>
                            <div className={styles.toolbar}>
                                <label className={styles.searchBox}>
                                    <span aria-hidden="true">⌕</span>
                                    <input type="search" placeholder="Search candidates, role, email, experience…" value={applicationQuery} onChange={(event) => setApplicationQuery(event.target.value)} />
                                </label>
                                <label className={styles.filterSelect}>
                                    <span>Status</span>
                                    <select value={applicationStatus} onChange={(event) => setApplicationStatus(event.target.value as 'all' | CareerApplicationStatus)}>
                                        <option value="all">All statuses</option>
                                        {applicationStatuses.map((status) => <option key={status} value={status}>{status.replace(/^\w/, (letter) => letter.toUpperCase())}</option>)}
                                    </select>
                                </label>
                                <span className={styles.resultCount}>{filteredApplications.length} of {applications.length} applicants</span>
                            </div>
                            {filteredApplications.length === 0 ? (
                                <div className={styles.emptyState}><span>♙</span><strong>{applications.length ? 'No matching applications' : 'No applications yet'}</strong><p>{applications.length ? 'Try another search or status filter.' : 'Applications submitted on the careers page will appear here.'}</p></div>
                            ) : (
                                <div className={styles.tableWrap}>
                                    <table className={styles.table}>
                                        <thead><tr><th>Received</th><th>Candidate</th><th>Position</th><th>Resume</th><th>Email</th><th>Review status</th></tr></thead>
                                        <tbody>
                                            {filteredApplications.map((application) => (
                                                <tr key={application.id}>
                                                    <td className={styles.dateCell}>{new Date(application.createdAt).toLocaleDateString()}<small>{new Date(application.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small></td>
                                                    <td>
                                                        <strong>{application.fullName}</strong>
                                                        <a className={styles.contactLink} href={`mailto:${application.email}`}>{application.email}</a>
                                                        <small>{application.phone}</small>
                                                        <details className={styles.applicationDetails}>
                                                            <summary>Application details</summary>
                                                            <div>
                                                                <strong>Experience</strong><span>{application.experience || 'Not provided'}</span>
                                                                <strong>LinkedIn / portfolio</strong>
                                                                {application.linkedIn ? <a href={application.linkedIn} target="_blank" rel="noreferrer">{application.linkedIn}</a> : <span>Not provided</span>}
                                                                <strong>Note to hiring manager</strong><p>{application.coverNote || 'Not provided'}</p>
                                                                <strong>Reference</strong><span>{application.id}</span>
                                                            </div>
                                                        </details>
                                                    </td>
                                                    <td><strong>{application.jobTitle}</strong><small>{application.reqId}</small></td>
                                                    <td>
                                                        <a className={styles.resumeLink} href={`/api/admin/applications/${encodeURIComponent(application.id)}/resume`}>
                                                            Download
                                                        </a>
                                                        <small>{application.resumeFileName} · {(application.resumeSize / 1024).toFixed(0)} KB</small>
                                                    </td>
                                                    <td><span className={`${styles.emailBadge} ${styles[`email_${application.emailStatus}`]}`}>{application.emailStatus}</span></td>
                                                    <td>
                                                        <select
                                                            className={styles.statusSelect}
                                                            aria-label={`Review status for ${application.fullName}`}
                                                            value={application.status}
                                                            onChange={(event) => updateApplicationStatus(application, event.target.value as CareerApplicationStatus)}
                                                        >
                                                            {applicationStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    )}

                    {view === 'jobs' && (
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <div><h2>Published openings <span className={styles.countPill}>{jobs.length}</span></h2><p>Changes are published immediately to the public careers page.</p></div>
                                <button className={styles.primaryButton} onClick={addJob}>＋ Create opening</button>
                            </div>
                            <div className={styles.toolbar}>
                                <label className={styles.searchBox}>
                                    <span aria-hidden="true">⌕</span>
                                    <input type="search" placeholder="Search roles, department, location…" value={jobQuery} onChange={(event) => setJobQuery(event.target.value)} />
                                </label>
                                <span className={styles.resultCount}>{filteredJobs.length} openings</span>
                            </div>
                            {showJobEditor && (
                                <form id="job-editor" className={styles.editor} onSubmit={saveJob}>
                                    <div className={styles.editorHeader}>
                                        <div><span className={styles.eyebrow}>{draft.id ? 'EDIT ROLE' : 'NEW ROLE'}</span><h3>{draft.id ? 'Update career opening' : 'Create career opening'}</h3></div>
                                        <button className={styles.iconButton} type="button" aria-label="Close job editor" onClick={() => { setShowJobEditor(false); setDraft(emptyDraft); }}>×</button>
                                    </div>
                                    <div className={styles.formGrid}>
                                        <label className={styles.field}>Job title<input required maxLength={180} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
                                        <label className={styles.field}>Department<input required value={draft.department} onChange={(event) => setDraft({ ...draft, department: event.target.value })} /></label>
                                        <label className={styles.field}>Location<input required value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} /></label>
                                        <label className={styles.field}>Employment type<input required value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value })} /></label>
                                        <label className={styles.field}>Experience<input required value={draft.experience} onChange={(event) => setDraft({ ...draft, experience: event.target.value })} /></label>
                                        <label className={styles.field}>Requisition ID<input value={draft.reqId} onChange={(event) => setDraft({ ...draft, reqId: event.target.value })} /></label>
                                        <label className={styles.field}>Contact email<input type="email" required value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} /></label>
                                        <label className={styles.field}>URL slug <span className={styles.optional}>Optional</span><input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: event.target.value })} /></label>
                                    </div>
                                    <label className={styles.field}>Short description<input required value={draft.shortDescription} onChange={(event) => setDraft({ ...draft, shortDescription: event.target.value })} /></label>
                                    <label className={styles.field}>Role overview<textarea required rows={3} value={draft.overview} onChange={(event) => setDraft({ ...draft, overview: event.target.value })} /></label>
                                    <div className={styles.formGrid}>
                                        <label className={styles.field}>Responsibilities <span className={styles.optional}>One item per line</span><textarea rows={5} value={draft.responsibilities} onChange={(event) => setDraft({ ...draft, responsibilities: event.target.value })} /></label>
                                        <label className={styles.field}>Qualifications <span className={styles.optional}>One item per line</span><textarea rows={5} value={draft.qualifications} onChange={(event) => setDraft({ ...draft, qualifications: event.target.value })} /></label>
                                    </div>
                                    <div className={styles.editorActions}>
                                        <button className={styles.primaryButton} type="submit" disabled={saving}>{saving ? 'Saving…' : draft.id ? 'Save and publish' : 'Publish opening'}</button>
                                        <button className={styles.secondaryButton} type="button" onClick={() => { setShowJobEditor(false); setDraft(emptyDraft); }}>Cancel</button>
                                    </div>
                                </form>
                            )}
                            {filteredJobs.length === 0 ? (
                                <div className={styles.emptyState}><span>▤</span><strong>No matching openings</strong><p>Change your search or create a new opening.</p></div>
                            ) : (
                                <div className={styles.jobList}>
                                    {filteredJobs.map((job) => (
                                        <article className={styles.jobCard} key={job.id}>
                                            <span className={styles.jobIcon}>▤</span>
                                            <div className={styles.jobDetails}>
                                                <strong>{job.title}</strong>
                                                <p>{job.department} <span>·</span> {job.location}</p>
                                                <div className={styles.jobMeta}><span>{job.type}</span><span>{job.experience}</span><span>{job.reqId}</span></div>
                                            </div>
                                            <div className={styles.itemActions}>
                                                <button className={styles.secondaryButton} onClick={() => editJob(job)}>Edit</button>
                                                <a className={styles.iconButton} href={`/careers/${job.slug}`} target="_blank" rel="noreferrer" aria-label={`Preview ${job.title}`}>↗</a>
                                                <button className={styles.iconButton} aria-label={`Delete ${job.title}`} onClick={() => deleteJob(job)}>×</button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}

                    {view === 'settings' && (
                        <section className={styles.settingsGrid}>
                            <article className={styles.panel}>
                                <div className={styles.panelHeader}>
                                    <div><h2>Email delivery</h2><p>Verify SMTP for contact inquiries and career applications.</p></div>
                                    <span className={`${styles.integrationBadge} ${smtp?.configured ? styles.integrationReady : styles.integrationMissing}`}>
                                        <span />{smtp?.configured ? 'Configured' : 'Needs setup'}
                                    </span>
                                </div>
                                <div className={styles.integrationDetails}>
                                    <div><span>SMTP host</span><strong>{smtp?.host || 'Not configured'}</strong></div>
                                    <div><span>Port</span><strong>{smtp?.port ?? '—'}</strong></div>
                                    <div><span>Contact recipient</span><strong>{smtp?.recipient || 'info@leelabiologics.com'}</strong></div>
                                    <div><span>Careers recipient</span><strong>{smtp?.careersRecipient || 'careers@leelabiologics.com'}</strong></div>
                                </div>
                                {!smtp?.configured && (
                                    <div className={styles.setupNotice}>
                                        <strong>SMTP password required</strong>
                                        <p>Add a valid provider app password as <code>SMTP_PASS</code> in the ignored `.env.local` file, then restart the dev server. Do not paste credentials into chat or commit them.</p>
                                    </div>
                                )}
                                <div className={styles.editorActions}>
                                    <button className={styles.primaryButton} onClick={verifySmtp} disabled={!smtp?.configured || smtpTestState === 'testing'}>
                                        {smtpTestState === 'testing' ? 'Testing connection…' : 'Test SMTP connection'}
                                    </button>
                                    {smtpStatus && <span className={smtpTestState === 'success' ? styles.inlineSuccess : styles.inlineError} role="status">{smtpStatus}</span>}
                                </div>
                            </article>
                            <article className={styles.panel}>
                                <div className={styles.panelHeader}><div><h2>Database</h2><p>Application data storage</p></div><span className={`${styles.integrationBadge} ${styles.integrationReady}`}><span />Connected</span></div>
                                <div className={styles.databaseCard}>
                                    <span className={styles.databaseIcon}>PG</span>
                                    <div><strong>PostgreSQL</strong><p>Contact leads, career openings, candidate details, and resume files are stored in the database.</p></div>
                                </div>
                                <p className={styles.securityNote}>Admin sessions are signed, HTTP-only, and expire after eight hours. Local database credentials are kept outside source control.</p>
                            </article>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
