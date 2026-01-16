"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { BookOpen, FileText, BrainCircuit, ArrowRight, Sparkles, Target, Zap, TrendingUp } from "lucide-react";
import ProfileMenu from '@/components/ProfileMenu';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in by checking localStorage
        const userData = localStorage.getItem('user');
        setIsLoggedIn(!!userData);
    }, []);

    return (
        <main className="page-wrapper">
            {/* Animated Background */}
            <div className="gradient-bg"></div>
            <div className="gradient-orb gradient-orb-1"></div>
            <div className="gradient-orb gradient-orb-2"></div>
            <div className="gradient-orb gradient-orb-3"></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header */}
                <header className="header-nav">
                    <div className="logo-section">
                        <Sparkles size={28} color="#818cf8" />
                        <span className="logo-text">AI Study</span>
                    </div>
                    <nav style={{ display: 'flex', gap: '1rem' }}>
                        {!isLoggedIn ? (
                            <>
                                <Link href="/login" className="btn-secondary">
                                    Log In
                                </Link>
                                <Link href="/signup" className="btn-primary">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <ProfileMenu />
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="hero-section">
                    <div className="animate-fade-in">
                        <div className="badge-pill">
                            <Sparkles size={16} />
                            <span>Powered by Advanced AI</span>
                        </div>

                        <h1 className="hero-title">
                            Master Any Topic with
                            <br />
                            <span className="bg-gradient-text">AI Precision</span>
                        </h1>

                        <p className="hero-subtitle">
                            Your personal AI tutor that adapts to your learning style. Simplify complex topics,
                            summarize notes instantly, and test your knowledge with intelligent quizzes.
                        </p>

                        <div className="cta-buttons">
                            <Link href="/explain" className="btn-primary btn-large">
                                Start Learning <ArrowRight size={20} />
                            </Link>
                            <button className="btn-glass">
                                View Demo
                            </button>
                        </div>

                        {/* Stats Section */}
                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-number">10k+</div>
                                <div className="stat-label">Topics Explained</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">95%</div>
                                <div className="stat-label">Accuracy Rate</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">5k+</div>
                                <div className="stat-label">Active Learners</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="section-header">
                        <h2 className="section-title">Everything You Need to Excel</h2>
                        <p className="section-subtitle">
                            Powerful AI-driven tools designed to accelerate your learning journey
                        </p>
                    </div>

                    <div className="features-grid">
                        {/* Feature 1 */}
                        <Link href="/explain" className="feature-card-link">
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.05))' }}>
                                    <BookOpen size={32} color="#818cf8" />
                                </div>
                                <h3 className="feature-title">Explain Simply</h3>
                                <p className="feature-description">
                                    Struggling with a concept? Get clear, simple explanations tailored to your level.
                                    No jargon, just understanding.
                                </p>
                                <div className="feature-arrow">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </Link>

                        {/* Feature 2 */}
                        <Link href="/notes" className="feature-card-link">
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.05))' }}>
                                    <FileText size={32} color="#f472b6" />
                                </div>
                                <h3 className="feature-title">Smart Summarizer</h3>
                                <p className="feature-description">
                                    Turn pages of notes into concise summaries. Upload text or files and extract
                                    the key points in seconds.
                                </p>
                                <div className="feature-arrow">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </Link>

                        {/* Feature 3 */}
                        <Link href="/quiz" className="feature-card-link">
                            <div className="feature-card">
                                <div className="feature-icon" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))' }}>
                                    <BrainCircuit size={32} color="#a78bfa" />
                                </div>
                                <h3 className="feature-title">AI Quiz Mode</h3>
                                <p className="feature-description">
                                    Test yourself with auto-generated quizzes and flashcards from any topic to
                                    reinforce your learning.
                                </p>
                                <div className="feature-arrow">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="benefits-section">
                    <div className="benefits-grid">
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <Target size={24} color="#818cf8" />
                            </div>
                            <h4>Personalized Learning</h4>
                            <p>AI adapts to your pace and style</p>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <Zap size={24} color="#f472b6" />
                            </div>
                            <h4>Instant Results</h4>
                            <p>Get answers in seconds, not hours</p>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon">
                                <TrendingUp size={24} color="#a78bfa" />
                            </div>
                            <h4>Track Progress</h4>
                            <p>Monitor your improvement over time</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-card">
                        <h2 className="cta-title">Ready to Transform Your Learning?</h2>
                        <p className="cta-subtitle">
                            Join thousands of students who are already learning smarter with AI
                        </p>
                        <div className="cta-buttons">
                            <Link href="/signup" className="btn-primary btn-large">
                                Get Started Free <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <Sparkles size={24} color="#818cf8" />
                            <span>AI Study</span>
                        </div>
                        <p className="footer-text">Built for the future of learning.</p>
                    </div>
                    <div className="footer-divider"></div>
                    <p className="footer-copyright">© 2024 AI Study. All rights reserved.</p>
                </footer>
            </div>
        </main>
    );
}
