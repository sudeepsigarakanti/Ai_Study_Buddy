"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ProfileMenu from '@/components/ProfileMenu';

export default function ExplainPage() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleExplain = async () => {
        if (!input) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('type', 'explain');
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
                    <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>Explain AI</span>
                </div>
                <ProfileMenu />
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 45%) 1fr', gap: '2rem', height: 'calc(100vh - 150px)' }}>

                {/* Input Section */}
                <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sparkles size={20} color="#6366f1" />
                        Topic to Explain
                    </h2>
                    <textarea
                        className="input-glass"
                        style={{ flex: 1, resize: 'none', marginBottom: '1.5rem' }}
                        placeholder="E.g. Quantum Computing, Photosynthesis, how does a car engine work?..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="btn-primary"
                        onClick={handleExplain}
                        disabled={loading}
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Thinking...' : <>Explain It <Send size={18} /></>}
                    </button>
                </div>

                {/* Output Section */}
                <div className="glass-panel" style={{ padding: '2rem', overflowY: 'auto', position: 'relative' }}>
                    {result ? (
                        <div className="animate-fade-in">
                            <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Explanation</h3>
                            <div style={{ lineHeight: 1.8, color: '#e2e8f0' }}>
                                <ReactMarkdown
                                    components={{
                                        h1: ({ node, ...props }) => <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }} {...props} />,
                                        h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: '1rem 0' }} {...props} />,
                                        h3: ({ node, ...props }) => <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '0.8rem 0' }} {...props} />,
                                        ul: ({ node, ...props }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                                        ol: ({ node, ...props }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
                                        li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                                        strong: ({ node, ...props }) => <strong style={{ color: 'var(--primary)', fontWeight: 'bold' }} {...props} />,
                                        p: ({ node, ...props }) => <p style={{ marginBottom: '1rem' }} {...props} />
                                    }}
                                >
                                    {result}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', textAlign: 'center' }}>
                            <p>The explanation will appear here.<br />Ready when you are.</p>
                        </div>
                    )}

                    {loading && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                            <div style={{ width: '40px', height: '40px', border: '3px solid rgba(99,102,241,0.3)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
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
