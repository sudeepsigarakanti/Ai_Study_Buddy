"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { BookOpen, FileText, BrainCircuit, ArrowRight } from "lucide-react";
import ProfileMenu from '@/components/ProfileMenu';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in by checking localStorage
        const userData = localStorage.getItem('user');
        setIsLoggedIn(!!userData);
    }, []);

    return (
        <main className="container">
            <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1.5rem 0', position: 'absolute', top: 0, left: 0, right: 0, width: '100%', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>
                <nav style={{ display: 'flex', gap: '1rem' }}>
                    {!isLoggedIn ? (
                        <>
                            <Link href="/login" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', transition: 'all 0.2s' }}>
                                Log In
                            </Link>
                            <Link href="/signup" className="btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <ProfileMenu />
                    )}
                </nav>
            </header>

            <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div className="animate-fade-in">
                    <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        Master Any Topic with <br />
                        <span className="bg-gradient-text">AI Precision</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        Your personal AI tutor. Simplify complex topics, summarize notes instantly, and test your knowledge with auto-generated quizzes.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/explain" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Start Learning <ArrowRight size={20} />
                        </Link>
                        <button className="glass-panel" style={{ padding: '0.75rem 1.5rem', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                            View Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid-cards animate-fade-in" style={{ animationDelay: '0.2s' }}>

                {/* Feature 1 */}
                <Link href="/explain">
                    <div className="glass-panel" style={{ padding: '2rem', height: '100%', transition: 'transform 0.3s', cursor: 'pointer' }}>
                        <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
                            <BookOpen size={32} color="#818cf8" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Explain Simply</h3>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                            Struggling with a concept? Get clear, simple explanations tailored to your level. No jargon, just understanding.
                        </p>
                    </div>
                </Link>

                {/* Feature 2 */}
                <Link href="/notes">
                    <div className="glass-panel" style={{ padding: '2rem', height: '100%', transition: 'transform 0.3s', cursor: 'pointer' }}>
                        <div style={{ background: 'rgba(236, 72, 153, 0.2)', padding: '1rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
                            <FileText size={32} color="#f472b6" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Summarizer</h3>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                            Turn pages of notes into concise summaries. Upload text or files and get the key points in seconds.
                        </p>
                    </div>
                </Link>

                {/* Feature 3 */}
                <Link href="/quiz">
                    <div className="glass-panel" style={{ padding: '2rem', height: '100%', transition: 'transform 0.3s', cursor: 'pointer' }}>
                        <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '1rem', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
                            <BrainCircuit size={32} color="#a78bfa" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Quiz Mode</h3>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
                            Test yourself. Generate flashcards and quizzes significantly from any topic to reinforce your learning.
                        </p>
                    </div>
                </Link>

            </section>

            <footer style={{ marginTop: '5rem', textAlign: 'center', color: '#475569', paddingBottom: '2rem' }}>
                <p>© 2024 Aura Study. Built for the future of learning.</p>
            </footer>
        </main>
    );
}
