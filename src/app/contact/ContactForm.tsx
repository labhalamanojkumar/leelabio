"use client";

import { useState } from 'react';
import { MODALITIES, PROJECT_TIMELINES } from '@/lib/constants';
import styles from './page.module.css';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);
        const services = formData.getAll('services');
        
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            title: formData.get('title'),
            modality: formData.get('modality'),
            timeline: formData.get('timeline'),
            message: formData.get('message'),
            services: services,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Failed to send message');
            }

            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'success') {
        return (
            <div className={`${styles.form} glass-panel`} style={{ padding: '40px', borderRadius: '16px', textAlign: 'center', backgroundColor: '#f0fdf4', borderColor: '#86efac' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" style={{ width: '64px', height: '64px', margin: '0 auto 20px' }}>
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h3 style={{ color: '#166534', fontSize: '24px', marginBottom: '16px' }}>RFP Submitted Successfully</h3>
                <p style={{ color: '#15803d', marginBottom: '24px' }}>
                    Thank you for reaching out. Your request has been securely sent to our business development team. A senior alliance manager will contact you within 24 business hours.
                </p>
                <button 
                    onClick={() => setStatus('idle')}
                    className={styles.submitButton}
                    style={{ background: 'var(--color-primary-600)', padding: '10px 24px', fontSize: '16px' }}
                >
                    Submit Another Inquiry
                </button>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {status === 'error' && (
                <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #fca5a5' }}>
                    {errorMessage}
                </div>
            )}
            
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>
                        First Name <span className={styles.required}>*</span>
                    </label>
                    <input type="text" id="firstName" name="firstName" className={styles.input} required disabled={isSubmitting} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>
                        Last Name <span className={styles.required}>*</span>
                    </label>
                    <input type="text" id="lastName" name="lastName" className={styles.input} required disabled={isSubmitting} />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Corporate Email <span className={styles.required}>*</span>
                    </label>
                    <input type="email" id="email" name="email" className={styles.input} required disabled={isSubmitting} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                        Direct Phone
                    </label>
                    <input type="tel" id="phone" name="phone" className={styles.input} disabled={isSubmitting} />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>
                        Company / Organization <span className={styles.required}>*</span>
                    </label>
                    <input type="text" id="company" name="company" className={styles.input} required disabled={isSubmitting} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>
                        Job Title
                    </label>
                    <input type="text" id="title" name="title" className={styles.input} disabled={isSubmitting} />
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="modality" className={styles.label}>
                    Primary Modality
                </label>
                <select id="modality" name="modality" className={styles.select} disabled={isSubmitting}>
                    <option value="">Select modality...</option>
                    {MODALITIES.map((modality) => (
                        <option key={modality} value={modality}>{modality}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="timeline" className={styles.label}>
                    Anticipated Timeline
                </label>
                <select id="timeline" name="timeline" className={styles.select} disabled={isSubmitting}>
                    <option value="">Select timeline...</option>
                    {PROJECT_TIMELINES.map((timeline) => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="services" className={styles.label}>
                    Capabilities Required
                </label>
                <div className={styles.checkboxGroup}>
                    {[
                        'Cell Line Development',
                        'Process Development',
                        'Analytical Development',
                        'Clinical Manufacturing',
                        'Commercial Manufacturing',
                        'Cell & Gene Therapy',
                        'mRNA / Nucleic Acids',
                        'Regulatory Support',
                    ].map((service) => (
                        <label key={service} className={styles.checkbox}>
                            <input type="checkbox" name="services" value={service} disabled={isSubmitting} />
                            <span>{service}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                    Executive Summary / Scope of Work <span className={styles.required}>*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    className={styles.textarea}
                    rows={5}
                    placeholder="Please provide a high-level overview of your program, target scale, and critical milestones..."
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.checkboxSingle}>
                    <input type="checkbox" name="consent" required disabled={isSubmitting} />
                    <span>
                        I agree to the <a href="/legal/privacy" style={{ color: 'var(--color-primary-600)' }}>Privacy Policy</a> and authorize Leela Biologics to process this data. <span className={styles.required}>*</span>
                    </span>
                </label>
            </div>

            <button 
                type="submit" 
                className={styles.submitButton} 
                style={{ 
                    background: isSubmitting ? 'var(--color-gray-400)' : 'var(--color-primary-600)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit RFP Inquiry'}
            </button>
        </form>
    );
}
