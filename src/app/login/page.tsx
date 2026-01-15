"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Store user data in localStorage for ProfileMenu
            if (data.user) {
                localStorage.setItem('user', JSON.stringify({
                    name: data.user.username,  // Use username from API response
                    email: data.user.email
                }));
            }

            // Redirect to home
            window.location.href = '/'; // Hard reload to update auth state if using cookies middleware
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div className="glass-panel animate-fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '50%' }}>
                        <LogIn size={32} color="#6366f1" />
                    </div>
                </div>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>Welcome Back</h2>

                {error && (
                    <div style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', color: '#fca5a5', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div style={{ marginBottom: '1rem' }}>
                        <div className="input-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem' }}>
                            <Mail size={20} color="#94a3b8" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none' }}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <div className="input-glass" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem' }}>
                            <Lock size={20} color="#94a3b8" />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                style={{ background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none' }}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : <>Log In <ArrowRight size={18} /></>}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8' }}>
                    Don't have an account? <Link href="/signup" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
