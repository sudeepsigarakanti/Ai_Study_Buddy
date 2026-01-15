"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Play, CheckCircle, XCircle, RotateCw } from 'lucide-react';
import ProfileMenu from '@/components/ProfileMenu';

interface Question {
    question: string;
    options: string[];
    answer: string;
}

export default function QuizPage() {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'topic' | 'file'>('topic');
    const [file, setFile] = useState<File | null>(null);
    const [count, setCount] = useState(5);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);

    const startQuiz = async () => {
        if (activeTab === 'topic' && !topic) return;
        if (activeTab === 'file' && !file) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('type', 'quiz');
            formData.append('count', count.toString());

            if (activeTab === 'topic') {
                formData.append('content', topic);
            } else if (file) {
                formData.append('file', file);
            }

            const res = await fetch('/api/generate', {
                method: 'POST',
                body: formData // No need for Content-Type header with FormData
            });
            const data = await res.json();
            const parsed = JSON.parse(data.result);
            setQuestions(parsed);
            setQuizStarted(true);
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (option: string) => {
        if (showResult) return;
        setSelectedOption(option);
        setShowResult(true);
        if (option === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        setSelectedOption(null);
        setShowResult(false);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // End of quiz
            setQuizStarted(false);
            alert(`Quiz finished! Score: ${score + (selectedOption === questions[currentQuestion]?.answer ? 1 : 0)}/${questions.length}`);
            setQuestions([]); // Reset or show summary screen
        }
    };

    return (
        <div className="container" style={{ minHeight: '100vh', padding: '2rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ArrowLeft size={24} />
                    </Link>
                    <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--accent)' }}>AI Quiz Master</span>
                </div>
                <ProfileMenu />
            </header>

            {!quizStarted ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                    <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '600px', width: '100%', textAlign: 'center' }}>
                        <div style={{ background: 'rgba(139, 92, 246, 0.2)', padding: '1rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 2rem auto' }}>
                            <BrainCircuit size={48} color="#a78bfa" />
                        </div>
                        <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Generate a Quiz</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Enter a topic or upload a PDF to test your knowledge.</p>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
                            <button
                                onClick={() => setActiveTab('topic')}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '8px',
                                    background: activeTab === 'topic' ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                                    border: activeTab === 'topic' ? '1px solid #8b5cf6' : '1px solid transparent',
                                    color: activeTab === 'topic' ? 'white' : '#94a3b8',
                                    cursor: 'pointer'
                                }}
                            >
                                Topic
                            </button>
                            <button
                                onClick={() => setActiveTab('file')}
                                style={{
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '8px',
                                    background: activeTab === 'file' ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                                    border: activeTab === 'file' ? '1px solid #8b5cf6' : '1px solid transparent',
                                    color: activeTab === 'file' ? 'white' : '#94a3b8',
                                    cursor: 'pointer'
                                }}
                            >
                                Upload PDF
                            </button>
                        </div>

                        {activeTab === 'topic' ? (
                            <input
                                type="text"
                                className="input-glass"
                                placeholder="E.g. World War II, React Hooks, Biochemistry..."
                                style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.2rem' }}
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        ) : (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label
                                    htmlFor="file-upload"
                                    className="input-glass"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #475569', color: file ? '#fff' : '#94a3b8' }}
                                >
                                    {file ? file.name : "Click to Upload PDF"}
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <label style={{ color: '#cbd5e1' }}>Number of Questions:</label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={count}
                                onChange={(e) => setCount(Number(e.target.value))}
                                className="input-glass"
                                style={{ width: '80px', padding: '0.5rem', textAlign: 'center' }}
                            />
                        </div>

                        <button
                            className="btn-primary"
                            onClick={startQuiz}
                            disabled={loading}
                            style={{ width: '100%', background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}
                        >
                            {loading ? 'Generating Quiz...' : 'Start Quiz'}
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                    <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '700px', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: '#94a3b8' }}>
                            <span>Question {currentQuestion + 1} of {questions.length}</span>
                            <span>Score: {score}</span>
                        </div>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: 1.4 }}>
                            {questions[currentQuestion].question}
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {questions[currentQuestion].options.map((opt, idx) => {
                                let bg = 'rgba(255,255,255,0.05)';
                                let border = '1px solid rgba(255,255,255,0.1)';

                                if (showResult) {
                                    if (opt === questions[currentQuestion].answer) {
                                        bg = 'rgba(34, 197, 94, 0.2)'; // Green
                                        border = '1px solid #22c55e';
                                    } else if (selectedOption === opt) {
                                        bg = 'rgba(239, 68, 68, 0.2)'; // Red
                                        border = '1px solid #ef4444';
                                    }
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(opt)}
                                        disabled={showResult}
                                        style={{
                                            background: bg,
                                            border: border,
                                            padding: '1.5rem',
                                            borderRadius: '12px',
                                            color: 'white',
                                            textAlign: 'left',
                                            cursor: showResult ? 'default' : 'pointer',
                                            transition: 'all 0.2s',
                                            fontSize: '1rem'
                                        }}
                                        onMouseOver={(e) => !showResult && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                                        onMouseOut={(e) => !showResult && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                                    >
                                        {opt}
                                    </button>
                                )
                            })}
                        </div>

                        {showResult && (
                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn-primary" onClick={nextQuestion}>
                                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
