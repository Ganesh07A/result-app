"use client";

import React from "react";
import { Printer, QrCode, BarChart3 } from "lucide-react";
import Charts from "./Charts";

interface SubjectResult {
    code: string;
    name: string;
    ese: number | string;
    internal: number | string;
    mid: number | string;
    total: number | string;
    grade: string;
    grade_point: number | null;
    credit: number;
}

interface MarksheetProps {
    student: {
        roll_no: string;
        name: string;
        college: string;
        sgpa: number | null;
        result: string | null;
        total_marks: number | null;
        subjects: SubjectResult[];
        performance: string;
        failedSubjectsCount: number;
    };
}

export default function Marksheet({ student }: MarksheetProps) {
    const isPass = student.result === "PASS" || student.result === "PASS/PROMOTED";

    return (
        <div className="w-full max-w-5xl mx-auto space-y-4">
            {/* Controls */}
            <div className="flex justify-end gap-4 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-[#1a365d] text-white px-5 py-2.5 rounded-lg font-bold shadow-md hover:bg-[#2a4365] transition-colors"
                >
                    <Printer className="w-5 h-5" />
                    Download PDF
                </button>
            </div>

            {/* A4 Paper Container */}
            <div className="bg-white text-zinc-900 shadow-2xl rounded-sm border border-zinc-200 overflow-hidden" id="marksheet-document">
                <div className="p-8 md:p-12 space-y-8">
                    
                    {/* 1. HEADER */}
                    <div className="flex justify-between items-start border-b-2 border-[#1a365d] pb-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full border-4 border-[#1a365d] flex items-center justify-center p-2">
                                {/* Placeholder for Univ Logo */}
                                <div className="w-full h-full rounded-full border border-dashed border-[#1a365d] flex items-center justify-center text-[#1a365d] font-bold text-[10px] text-center">
                                    DBATU LOGO
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-[#1a365d] uppercase tracking-wide">
                                    Dr. Babasaheb Ambedkar<br />Technological University
                                </h1>
                                <p className="text-sm text-zinc-600 font-medium mt-1">
                                    (Established by Government of Maharashtra & Governed by Dr. BATU Act No. XXVII of 2014)
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="bg-[#1a365d] text-white px-6 py-2 rounded font-black tracking-widest uppercase">
                                Marksheet
                            </div>
                            <div className="text-sm font-bold text-[#1a365d]">Institute Record</div>
                        </div>
                    </div>

                    {/* 2. EXAM DETAILS (4 Boxes) */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="p-3 border rounded">
                            <p className="text-xs text-[#1a365d] font-bold uppercase mb-1">Programme</p>
                            <p className="text-sm font-medium">B.Tech (Computer Science and Engineering - AI and ML)</p>
                        </div>
                        <div className="p-3 border rounded text-center">
                            <p className="text-xs text-[#1a365d] font-bold uppercase mb-1">Semester</p>
                            <p className="text-sm font-bold">5</p>
                        </div>
                        <div className="p-3 border rounded text-center">
                            <p className="text-xs text-[#1a365d] font-bold uppercase mb-1">Exam Session</p>
                            <p className="text-sm font-medium">Winter 2025 (Regular)</p>
                        </div>
                        <div className="p-3 border rounded">
                            <p className="text-xs text-[#1a365d] font-bold uppercase mb-1">Institute</p>
                            <p className="text-sm font-medium truncate">{student.college}</p>
                        </div>
                    </div>

                    {/* 3. STUDENT PROFILE */}
                    <div className="flex gap-6 items-stretch">
                        {/* Avatar */}
                        <div className="w-32 bg-zinc-100 rounded flex flex-col items-center justify-center border text-zinc-400">
                            <QrCode className="w-16 h-16 text-zinc-400 mb-2" />
                            <span className="text-[10px] font-bold uppercase">Verify ID</span>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 grid grid-cols-2 gap-4 border rounded p-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                    <span className="text-sm text-zinc-500 font-bold">Seat No.</span>
                                    <span className="font-bold">{student.roll_no}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                    <span className="text-sm text-zinc-500 font-bold">Name</span>
                                    <span className="font-bold uppercase">{student.name}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] items-center gap-2">
                                    <span className="text-sm text-zinc-500 font-bold">Center</span>
                                    <span className="font-medium text-sm text-zinc-600">02112 (Whole)</span>
                                </div>
                            </div>
                            
                            {/* Score Dash */}
                            <div className="bg-zinc-50/50 rounded flex">
                                <div className="flex-1 p-3 border-r flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-[#1a365d] tracking-widest uppercase mb-1">Total Marks</span>
                                    <div className="font-black text-xl">{student.total_marks}<span className="text-sm text-zinc-400 font-medium">/700</span></div>
                                </div>
                                <div className="flex-1 p-3 border-r flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-[#1a365d] tracking-widest uppercase mb-1">SGPA</span>
                                    <div className="font-black text-xl text-green-600">{student.sgpa}</div>
                                </div>
                                <div className="flex-1 p-3 flex flex-col justify-center text-center">
                                    <span className="text-xs font-bold text-[#1a365d] tracking-widest uppercase mb-1">Result</span>
                                    <div className={`font-black text-xl ${isPass ? 'text-green-600' : 'text-red-600'}`}>
                                        {student.result}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. MARKS TABLE */}
                    <div className="border rounded overflow-hidden">
                        <table className="w-full text-sm text-center">
                            <thead className="bg-[#1a365d] text-white">
                                <tr>
                                    <th className="p-3 border-r border-[#2a4365] w-12">Sr.</th>
                                    <th className="p-3 border-r border-[#2a4365] text-left">Subject Code & Name</th>
                                    <th className="p-3 border-r border-[#2a4365] w-16">ESE</th>
                                    <th className="p-3 border-r border-[#2a4365] w-16">CA</th>
                                    <th className="p-3 border-r border-[#2a4365] w-16">MID</th>
                                    <th className="p-3 border-r border-[#2a4365] w-20 bg-[#2a4365]/50">Total</th>
                                    <th className="p-3 border-r border-[#2a4365] w-20">Grade</th>
                                    <th className="p-3 border-r border-[#2a4365] w-16">GP</th>
                                    <th className="p-3 border-r border-[#2a4365] w-16">Cr</th>
                                    <th className="p-3 w-16">CP</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-zinc-800">
                                {student.subjects.map((sub, i) => {
                                    // Color logic
                                    const gradeColor = 
                                        sub.grade === "EX" ? "bg-green-100 text-green-700 border-green-200" :
                                        sub.grade === "AA" || sub.grade === "AB" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                        sub.grade === "FF" ? "bg-red-100 text-red-700 border-red-200" :
                                        sub.grade === "AU" ? "bg-zinc-100 text-zinc-600 border-zinc-200" :
                                        "bg-yellow-50 text-yellow-700 border-yellow-200";

                                    const creditPoints = (sub.grade_point !== null && sub.grade_point > 0) ? (sub.grade_point * sub.credit).toFixed(1) : '-';

                                    return (
                                        <tr key={i} className="hover:bg-zinc-50 transition-colors">
                                            <td className="p-3 border-r font-medium text-zinc-500">{i + 1}</td>
                                            <td className="p-3 border-r text-left">
                                                <div className="font-bold">{sub.name}</div>
                                                <div className="text-xs text-zinc-500 font-mono">{sub.code}</div>
                                            </td>
                                            <td className="p-3 border-r">{sub.ese}</td>
                                            <td className="p-3 border-r">{sub.internal}</td>
                                            <td className="p-3 border-r">{sub.mid}</td>
                                            <td className="p-3 border-r font-bold bg-zinc-50">{sub.total}</td>
                                            <td className="p-3 border-r">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${gradeColor}`}>
                                                    {sub.grade}
                                                </span>
                                            </td>
                                            <td className="p-3 border-r font-medium">{sub.grade_point || '-'}</td>
                                            <td className="p-3 border-r font-medium">{sub.credit}</td>
                                            <td className="p-3 font-bold text-[#1a365d]">{creditPoints}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Performance Graph & Signatures */}
                    <div className="grid grid-cols-[1fr_300px] gap-6">
                        <div className="border rounded p-4 bg-zinc-50/50">
                            <h3 className="text-sm font-bold text-[#1a365d] flex items-center gap-2 mb-4 uppercase tracking-widest">
                                <BarChart3 className="w-4 h-4" /> Academic Performance Graph
                            </h3>
                            {/* Reusing existing chart, but we need to pass data. Note: The existing chart is styled for dark mode.
                                Might need a light mode prop or just let it inherit if it's transparent. */}
                            <div className="h-40 rounded-xl overflow-hidden bg-white border opacity-90">
                                <Charts subjects={student.subjects} />
                            </div>
                        </div>

                        <div className="border rounded p-4 flex flex-col justify-end text-center space-y-8">
                            <div className="border-b border-dashed pb-2">
                                <div className="h-10 text-zinc-400 italic font-serif">Signed Electronically</div>
                                <p className="text-xs font-bold text-[#1a365d] uppercase">Controller of Examinations</p>
                            </div>
                            <div>
                                <div className="h-10 text-zinc-400 italic font-serif">Verified Record</div>
                                <p className="text-xs font-bold text-[#1a365d] uppercase">Director / Principal</p>
                            </div>
                            <p className="text-[10px] text-zinc-500">
                                Generated: {new Date().toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-[10px] text-zinc-500 border-t pt-4 space-y-1">
                        <p><strong>Note:</strong> The results published online are for immediate information only. These cannot be treated as the original statement of marks.</p>
                        <p>Please verify the information from the original statement of marks issued by the university separately.</p>
                        <p>AU: Audit | AB: Absent | FF: Fail. Copyright © 2026 Result Intelligence Platform.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
