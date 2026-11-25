'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function AdminLoginForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setBusy(true);
        setError('');
        const formData = new FormData(event.currentTarget);
        try {
            const response = await fetch('/api/admin/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password'),
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Sign in failed.');
            router.replace('/admin');
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : 'Sign in failed.');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className={styles.loginPage}>
            <form className={styles.loginCard} onSubmit={handleSubmit}>
                <p className={styles.eyebrow}>Leelabiologics</p>
                <h1>Admin sign in</h1>
                <p className={styles.muted}>Manage website enquiries and current career openings.</p>
                {error && <p className={styles.error} role="alert">{error}</p>}
                <label className={styles.field}>
                    Username
                    <input name="username" autoComplete="username" required />
                </label>
                <label className={styles.field}>
                    Password
                    <input name="password" type="password" autoComplete="current-password" required />
                </label>
                <button className={styles.primaryButton} type="submit" disabled={busy}>
                    {busy ? 'Signing in…' : 'Sign in'}
                </button>
                <Link className={styles.backLink} href="/">← Back to website</Link>
            </form>
        </div>
    );
}
