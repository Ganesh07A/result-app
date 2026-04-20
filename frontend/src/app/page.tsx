"use client";

import React, { useState } from "react";
import Upload from "@/components/Upload";
import Search from "@/components/Search";
import Marksheet from "@/components/Marksheet";
import { Sparkles, BarChart3, Search as SearchIcon, FileBarChart, ArrowLeft } from "lucide-react";

export default function Home() {
    const [allStudents, setAllStudents] = useState<any[] | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

    const handleUploadSuccess = (data: any[]) => {
        setAllStudents(data);
    };

    const handleSelectStudent = (student: any) => {
        setSelectedStudent(student);
        // Scroll to marksheet
        setTimeout(() => {
            document.getElementById("marksheet-section")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const resetSelection = () => {
        setSelectedStudent(null);
    };

    const resetAll = () => {
        setAllStudents(null);
        setSelectedStudent(null);
    };

    return (
        <main className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-16">
                
                {/* Header (Hidden when viewing marksheet on mobile to save space) */}
                <header className={`text-center space-y-6 animate-fade-in ${selectedStudent ? 'hidden md:block' : ''}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm text-primary font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>AI-Powered Result Extraction</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
                        Result <span className="text-primary italic">Intelligence</span>
                    </h1>
                </header>

                {!allStudents ? (
                    /* Initial Upload View */
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
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
                        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                            <Upload onSuccess={handleUploadSuccess} />
                        </section>
                    </>
                ) : (
                    /* Dashboard View */
                    <div className="space-y-12 animate-fade-in">
                        
                        {/* Dashboard Header */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 glass-panel p-6 rounded-3xl">
                            <div>
                                <h2 className="text-2xl font-bold">Processed Results</h2>
                                <p className="text-zinc-500 text-sm">Found {allStudents.length} student records in the document.</p>
                            </div>
                            <button 
                                onClick={resetAll}
                                className="px-6 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-all text-sm font-bold"
                            >
                                Upload New Document
                            </button>
                        </div>

                        {/* Search Section */}
                        <section className="space-y-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <SearchIcon className="w-5 h-5 text-primary" />
                                Select a Student
                            </h3>
                            <Search students={allStudents} onSelect={handleSelectStudent} />
                        </section>

                        {/* Marksheet Visualization Section */}
                        {selectedStudent && (
                            <section id="marksheet-section" className="pt-12 space-y-6 animate-fade-in">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <FileBarChart className="w-5 h-5 text-primary" />
                                        Digital Marksheet
                                    </h3>
                                    <button 
                                        onClick={resetSelection}
                                        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Search
                                    </button>
                                </div>
                                <Marksheet student={selectedStudent} />
                            </section>
                        )}
                    </div>
                )}

                {/* Footer */}
                <footer className="text-center text-zinc-600 text-sm py-10">
                    &copy; 2026 Result Intelligence Platform • Automation for University Exams
                </footer>
            </div>
        </main>
    );
}
