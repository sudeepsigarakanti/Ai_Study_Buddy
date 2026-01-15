"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ProfileMenu from '@/components/ProfileMenu';

export default function NotesPage() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSummarize = async () => {
        if (!input) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('type', 'summarize');
            formData.append('content', input);

            const res = await fetch('/api/generate', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            setResult(data.result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ minHeight: '100vh', padding: '2rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--secondary)' }}>Note Summarizer</span>
                </div>
                <ProfileMenu />
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 45%) 1fr', gap: '2rem', height: 'calc(100vh - 150px)' }}>

                {/* Input Section */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={20} color="#ec4899" />
                        Paste Notes
                    </h2>
                    <textarea
                        className="input-glass"
                        style={{ flex: 1, resize: 'none', marginBottom: '1.5rem', fontFamily: 'monospace', fontSize: '0.9rem' }}
                        placeholder="Paste your lecture notes, article, or text here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="btn-primary"
                        onClick={handleSummarize}
                        disabled={loading}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}
                    >
                        {loading ? 'Summarizing...' : <>Summarize <Zap size={18} /></>}
                    </button>
                </div>

                {/* Output Section */}
                <div className="glass-panel" style={{ padding: '2rem', overflowY: 'auto', position: 'relative' }}>
                    {result ? (
                        <div className="animate-fade-in">
                            <h3 style={{ marginBottom: '1.5rem', color: 'var(--secondary)', borderBottom: '1px solid rgba(236, 72, 153, 0.2)', paddingBottom: '0.5rem' }}>Summary & Key Points</h3>
                            <div style={{ lineHeight: 1.8, color: '#e2e8f0' }}>
                                <ReactMarkdown
                                    components={{
                                        h1: ({ node, ...props }) => <h1 style={{ fontSize: '1.4rem', color: '#f8fafc', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }} {...props} />,
                                        h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: 'bold', marginTop: '1.2rem', marginBottom: '0.8rem' }} {...props} />,
                                        ul: ({ node, ...props }) => <ul style={{ listStyle: 'none', padding: 0 }} {...props} />,
                                        li: ({ node, ...props }) => (
                                            <li style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }} {...props}>
                                                <div style={{ marginTop: '6px', minWidth: '6px', height: '6px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
                                                <div>{props.children}</div>
                                            </li>
                                        ),
                                        strong: ({ node, ...props }) => <strong style={{ color: 'var(--secondary)', fontWeight: 600 }} {...props} />,
                                        p: ({ node, ...props }) => <p style={{ marginBottom: '1rem' }} {...props} />
                                    }}
                                >
                                    {result}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textAlign: 'center' }}>
                            <p>Your summary will appear here.</p>
                        </div>
                    )}
                    {loading && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(236, 72, 153, 0.3)', borderTopColor: '#ec4899', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                            <style jsx>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
