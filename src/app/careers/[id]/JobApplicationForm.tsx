'use client';

import { useState, useRef } from 'react';
import { JobOpening } from '@/lib/jobs';
import styles from './jobDetail.module.css';

interface Props {
    job: JobOpening;
}

export default function JobApplicationForm({ job }: Props) {
    const [submissionResult, setSubmissionResult] = useState<{ applicationId: string; emailSent: boolean; warning?: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [resumeFile, setResumeFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        experience: '',
        coverNote: '',
    });

    const handleFileSelect = (file: File) => {
        // Validate file type
        const validExtensions = ['.pdf', '.doc', '.docx'];
        const fileName = file.name.toLowerCase();
        const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

        if (!isValid) {
            setErrorMessage('Please upload a valid resume in PDF, DOC, or DOCX format.');
            return;
        }

        // Validate max 10MB
        if (file.size > 10 * 1024 * 1024) {
            setErrorMessage('File size exceeds the 10MB limit. Please upload a smaller file.');
            return;
        }

        setErrorMessage(null);
        setResumeFile(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resumeFile) {
            setErrorMessage('Please attach your resume in PDF, DOC, or DOCX format.');
            return;
        }
        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const data = new FormData();
            data.append('fullName', formData.fullName);
            data.append('email', formData.email);
            data.append('phone', formData.phone);
            data.append('linkedIn', formData.linkedIn);
            data.append('experience', formData.experience);
            data.append('coverNote', formData.coverNote);
            data.append('jobId', job.id);

            if (resumeFile) {
                data.append('resume', resumeFile);
            }

            const res = await fetch('/api/careers', {
                method: 'POST',
                body: data,
            });

            const result = await res.json().catch(() => ({}));
            if (!res.ok || !result.saved || typeof result.applicationId !== 'string') {
                const errorData = result as { error?: string };
                throw new Error(errorData.error || 'Failed to submit application.');
            }

            setSubmissionResult({
                applicationId: result.applicationId,
                emailSent: result.emailSent === true,
                warning: typeof result.warning === 'string' ? result.warning : undefined,
            });
        } catch (err: unknown) {
            console.error('Error submitting application:', err);
            setErrorMessage(err instanceof Error ? err.message : 'An error occurred while submitting your application.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const mailtoSubject = encodeURIComponent(`Application for ${job.title} (${job.reqId})`);
    const mailtoBody = encodeURIComponent(
        `Dear Talent Acquisition Team,\n\n` +
        `I am writing to apply for the position of ${job.title} (Requisition ID: ${job.reqId}) at Leelabiologics.\n\n` +
        `Applicant Name: \n` +
        `Contact Phone: \n` +
        `Current Location: \n` +
        `Relevant Experience: \n\n` +
        `[ATTENTION: Please attach your Resume / CV to this email before sending]\n\n` +
        `Best regards,\n`
    );

    return (
        <div className={styles.applyCard}>
            <div className={styles.applyCardHeader}>
                <h3 className={styles.applyCardTitle}>Apply for Position</h3>
                <p className={styles.applyCardDesc}>
                    Submit your application and resume directly to our Talent Acquisition team.
                </p>
            </div>

            {/* Position Applied Badge Box */}
            <div className={styles.positionAppliedBox}>
                <span className={styles.positionAppliedLabel}>Position Applied</span>
                <span className={styles.positionAppliedValue}>{job.title}</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#15803d', marginTop: '2px' }}>
                    Requisition ID: {job.reqId} • {job.department}
                </span>
            </div>

            {/* Direct Email Application Box */}
            <div className={styles.emailDirectBox}>
                <div className={styles.emailDirectTitle}>Direct Email Submission</div>
                <a href={`mailto:${job.email}?subject=${mailtoSubject}&body=${mailtoBody}`} className={styles.emailLink}>
                    {job.email}
                </a>
                <a
                    href={`mailto:${job.email}?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className={styles.mailToButton}
                >
                    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Apply via Email Client</span>
                </a>
                <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#64748b' }}>
                    Attach your Resume/CV to the email before sending.
                </p>
            </div>

            <div className={styles.orDivider}>Or Fill Quick Form & Upload Resume</div>

            {submissionResult ? (
                <div className={styles.successMessage}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
                    <h4>Application Received</h4>
                    <p>
                        Thank you for applying for <strong>{job.title}</strong>. Your application and resume are securely saved for our hiring team.
                    </p>
                    {resumeFile && (
                        <div style={{ margin: '12px 0', padding: '8px 12px', background: '#dcfce7', borderRadius: '6px', fontSize: '12px', color: '#15803d' }}>
                            <strong>Resume:</strong> {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)
                        </div>
                    )}
                    <p style={{ marginTop: '8px', fontSize: '12px', color: submissionResult.emailSent ? '#15803d' : '#9a6708' }} role="status">
                        {submissionResult.emailSent
                            ? 'The application notification was also sent to careers@leelabiologics.com.'
                            : submissionResult.warning || 'Your application is saved, but the notification email was not sent.'}
                    </p>
                    <p style={{ marginTop: '6px', fontSize: '11px', color: '#64748b' }}>
                        Reference: {submissionResult.applicationId}
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {errorMessage && (
                        <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#b91c1c', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', marginBottom: '14px' }}>
                            {errorMessage}
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Full Name *</label>
                        <input
                            type="text"
                            required
                            className={styles.formInput}
                            placeholder="e.g. Dr. Rajesh Kumar"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Email Address *</label>
                        <input
                            type="email"
                            required
                            className={styles.formInput}
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Phone Number *</label>
                        <input
                            type="tel"
                            required
                            className={styles.formInput}
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    {/* Resume Upload Box */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Upload Resume / CV (Attachment) *
                        </label>
                        <div className={styles.fileUploadContainer}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                aria-required="true"
                                className={styles.fileInputHidden}
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        handleFileSelect(e.target.files[0]);
                                    }
                                }}
                            />

                            {!resumeFile ? (
                                <div
                                    className={`${styles.fileDropArea} ${isDragOver ? styles.dragOver : ''}`}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragOver(true);
                                    }}
                                    onDragLeave={() => setIsDragOver(false)}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <svg className={styles.fileDropIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    <div className={styles.fileDropText}>Click to browse or drag & drop resume</div>
                                    <div className={styles.fileDropHint}>PDF, DOC, DOCX up to 10MB • Directed to careers@leelabiologics.com</div>
                                </div>
                            ) : (
                                <div className={styles.selectedFileCard}>
                                    <div className={styles.selectedFileInfo}>
                                        <svg className={styles.selectedFileIcon} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                        </svg>
                                        <div>
                                            <div className={styles.selectedFileName}>{resumeFile.name}</div>
                                            <div className={styles.selectedFileSize}>
                                                {(resumeFile.size / 1024).toFixed(1)} KB • Attached
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className={styles.removeFileBtn}
                                        onClick={() => {
                                            setResumeFile(null);
                                            if (fileInputRef.current) fileInputRef.current.value = '';
                                        }}
                                    >
                                        Remove ✕
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Relevant Experience</label>
                        <input
                            type="text"
                            maxLength={160}
                            className={styles.formInput}
                            placeholder="e.g. 5 years in quality assurance"
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>LinkedIn / Portfolio Profile URL</label>
                        <input
                            type="url"
                            className={styles.formInput}
                            placeholder="https://linkedin.com/in/username"
                            value={formData.linkedIn}
                            onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Summary of Experience / Note to Hiring Manager</label>
                        <textarea
                            rows={3}
                            className={styles.formTextarea}
                            placeholder="Briefly describe your relevant technical background and availability..."
                            value={formData.coverNote}
                            onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.submitBtn}
                    >
                        {isSubmitting ? (
                            <>
                                <span className={styles.submittingSpinner}></span>
                                Submitting Application & Resume...
                            </>
                        ) : (
                            `Submit Application for ${job.title}`
                        )}
                    </button>
                    <p style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
                        Your form submission is saved securely, then emailed to careers@leelabiologics.com when SMTP is configured.
                    </p>
                </form>
            )}
        </div>
    );
}
