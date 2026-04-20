"use client";

import React, { useState } from "react";
import Upload from "@/components/Upload";
import { Sparkles, BarChart3, Search as SearchIcon, FileBarChart } from "lucide-react";

export default function Home() {
    const [results, setResults] = useState<any[] | null>(null);

    const handleUploadSuccess = (data: any[]) => {
        setResults(data);
    };

    return (
        <main className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-20">
                {/* Hero Section */}
                <header className="text-center space-y-6 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-primary font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Result Extraction</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Result <span className="text-primary italic">Intelligence</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Turn messy university PDF results into structured data, beautiful charts, and professional digital marksheets instantly.
                    </p>
                </header>

                {/* Features Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    {[
                        { icon: BarChart3, title: "Visual Analytics", desc: "Instantly see performance trends across subjects." },
                        { icon: SearchIcon, title: "Instant Search", desc: "Look up any student seat number in milliseconds." },
                        { icon: FileBarChart, title: "Smart Marksheets", desc: "Professional, ready-to-print digital results." }
                    ].map((feat, i) => (
                        <div key={i} className="p-6 glass-panel rounded-2xl space-y-3">
                            <feat.icon className="w-6 h-6 text-primary" />
                            <h3 className="font-bold">{feat.title}</h3>
                            <p className="text-sm text-zinc-500">{feat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Upload Section */}
                <section id="upload-section" className="space-y-8">
                    {!results ? (
                        <Upload onSuccess={handleUploadSuccess} />
                    ) : (
                        <div className="text-center space-y-4 py-20 animate-fade-in">
                            <h2 className="text-3xl font-bold">Data Extracted Successfully!</h2>
                            <p className="text-zinc-400">Proceed to Feature 8 to see the Search & Analytics UI.</p>
                            <button 
                                onClick={() => setResults(null)}
                                className="px-6 py-2 glass-panel rounded-lg hover:bg-white/5 transition-all"
                            >
                                Upload Another PDF
                            </button>
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="text-center text-zinc-600 text-sm py-10">
                    &copy; 2026 Result Intelligence Platform. All Rights Reserved.
                </footer>
            </div>
        </main>
    );
}
