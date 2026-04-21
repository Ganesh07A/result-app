"use client";

import React from "react";
import { Printer, UserRound, BarChart3, Info, BookOpen } from "lucide-react";

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
    
    const displayName = student.name?.trim() || "Unknown Student";
    
    // Fallback for College Name if extraction caught a number (like SGPA) by mistake
    const displayCollege = (student.college && !student.college.match(/^[\d.]+$/) && student.college.length > 5 && student.college !== "Unknown College") 
        ? student.college 
        : "College information not available in source PDF";

    // Calculations for totals row
    const sumEse = student.subjects.reduce((sum, s) => sum + (Number(s.ese) || 0), 0);
    const sumInt = student.subjects.reduce((sum, s) => sum + (Number(s.internal) || 0), 0);
    const sumMid = student.subjects.reduce((sum, s) => sum + (Number(s.mid) || 0), 0);
    const totalCredits = student.subjects.reduce((sum, s) => sum + s.credit, 0);
    const totalCP = student.subjects.reduce((sum, s) => sum + ((s.grade_point || 0) * s.credit), 0);
    const percentage = student.total_marks ? ((student.total_marks / 700) * 100).toFixed(2) : "0.00";

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
                <div className="p-8 md:p-10 space-y-6">
                    
                    {/* 1. HEADER */}
                    <div className="flex justify-between items-center border-b-2 border-[#1a365d] pb-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full border-4 border-[#1a365d] flex items-center justify-center p-2 shrink-0">
                                <div className="w-full h-full rounded-full border border-dashed border-[#1a365d] flex flex-col items-center justify-center text-[#1a365d] font-bold text-[10px] text-center">
                                    DBATU<br/>LOGO
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-[#1a365d] uppercase tracking-wide">
                                    Dr. Babasaheb Ambedkar<br />Technological University
                                </h1>
                                <p className="text-sm text-zinc-600 mt-1">
                                    (Established by Government of Maharashtra & Governed by Dr. BATU Act No. XXVII of 2014)
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="bg-[#1a365d] text-white px-8 py-2 rounded font-black tracking-widest uppercase text-xl">
                                Marksheet
                            </div>
                            <div className="text-sm font-bold text-[#1a365d]">Institute Record</div>
                        </div>
                    </div>

                    {/* 2. EXAM DETAILS */}
                    <div className="grid grid-cols-[1fr_200px_200px_350px] gap-4 items-stretch">
                        <div className="p-3 border rounded border-zinc-300">
                            <p className="text-xs text-[#1a365d] font-bold uppercase mb-1">Programme</p>
                            <p className="text-sm">B.Tech (Computer Science and<br/>Engineering - AI and ML)</p>
                        </div>
                        <div className="p-3 border rounded border-zinc-300 text-center flex flex-col justify-center">
                            <p className="text-xs text-[#1a365d] font-bold uppercase mb-1">Semester</p>
                            <p className="text-md font-bold">5</p>
                        </div>
                        <div className="p-3 border rounded border-zinc-300 text-center flex flex-col justify-center">
                            <p className="text-xs text-[#1a365d] font-bold uppercase mb-1">Exam Session</p>
                            <p className="text-sm font-medium">Winter 2025 (Regular)</p>
                        </div>
                        <div className="p-3 border rounded border-zinc-300">
                            <p className="text-xs text-[#1a365d] font-bold uppercase mb-1">Institute</p>
                            <p className="text-sm leading-tight text-zinc-700 font-medium whitespace-pre-wrap">
                                {displayCollege}
                            </p>
                        </div>
                    </div>

                    {/* 3. STUDENT PROFILE */}
                    <div className="flex gap-4 items-stretch border border-zinc-300 rounded p-1">
                        <div className="w-32 bg-[#f8fafc] flex flex-col items-center justify-center p-2 shrink-0">
                            <UserRound className="w-16 h-16 text-[#cbd5e1]" />
                        </div>
                        
                        <div className="flex-1 grid grid-cols-[1fr_350px] items-stretch border-l border-zinc-300">
                            <div className="p-4 space-y-4 flex flex-col justify-center">
                                <div className="grid grid-cols-[100px_1fr] items-center">
                                    <span className="text-sm text-zinc-500 font-medium">Seat No.</span>
                                    <span className="font-bold text-base">{student.roll_no}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] items-center">
                                    <span className="text-sm text-zinc-500 font-medium">Name</span>
                                    <span className="font-bold text-base uppercase">{displayName}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] items-center">
                                    <span className="text-sm text-zinc-500 font-medium">Center</span>
                                    <span className="font-medium text-sm text-zinc-600">02112 (Whole)</span>
                                </div>
                            </div>
                            
                            {/* Score Dash */}
                            <div className="flex border-l border-zinc-300 bg-[#f8fafc]">
                                <div className="flex-1 flex flex-col justify-center text-center p-2 border-r border-zinc-300">
                                    <span className="text-[10px] font-bold text-[#1a365d] uppercase mb-1">Total Marks</span>
                                    <div className="font-black text-xl text-[#1a365d]">{student.total_marks}<span className="text-xs text-zinc-400 font-medium">/700</span></div>
                                </div>
                                <div className="flex-1 flex flex-col justify-center text-center p-2 gap-2">
                                    <div className="pb-2 border-b border-zinc-300">
                                         <span className="text-[10px] font-bold text-[#1a365d] uppercase block mb-0.5">SGPA</span>
                                         <span className="font-bold text-lg text-green-600">{student.sgpa ?? "-"}</span>
                                    </div>
                                    <div>
                                         <span className="text-[10px] font-bold text-[#1a365d] uppercase block mb-0.5">Result</span>
                                         <span className={`font-bold text-lg ${isPass ? 'text-green-600' : 'text-red-600'}`}>
                                            {student.result}
                                         </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. MARKS TABLE */}
                    <div className="border border-zinc-300 rounded overflow-hidden mt-6">
                        <table className="w-full text-sm text-center">
                            <thead className="bg-[#1a365d] text-white">
                                <tr>
                                    <th rowSpan={2} className="p-2 border-b border-r border-[#2a4365] w-12 align-middle border-white/20">Sr.<br/>No.</th>
                                    <th rowSpan={2} className="p-2 border-b border-r border-[#2a4365] w-24 align-middle border-white/20">Subject<br/>Code</th>
                                    <th rowSpan={2} className="p-2 border-b border-r border-[#2a4365] text-left align-middle border-white/20">Subject Name</th>
                                    <th colSpan={4} className="p-1 border-b border-r border-[#2a4365] bg-[#0c2340] border-white/20">MARKS OBTAINED</th>
                                    <th rowSpan={2} className="p-2 border-b border-r border-[#2a4365] w-16 align-middle border-white/20">Grade</th>
                                    <th rowSpan={2} className="p-2 border-b border-r border-[#2a4365] w-[70px] align-middle text-xs border-white/20">Grade Point<br/>(GP)</th>
                                    <th rowSpan={2} className="p-2 border-b border-r border-[#2a4365] w-16 align-middle border-white/20">Credit</th>
                                    <th rowSpan={2} className="p-2 border-b align-middle text-xs w-[70px] border-white/20">Credit<br/>Points<br/>(GP × C)</th>
                                </tr>
                                <tr className="text-xs">
                                    <th className="p-1.5 border-b border-r border-[#2a4365] w-[60px] font-medium border-white/20">ESE<br/>(60/20)</th>
                                    <th className="p-1.5 border-b border-r border-[#2a4365] w-[60px] font-medium border-white/20">CA Internal<br/>(20)</th>
                                    <th className="p-1.5 border-b border-r border-[#2a4365] w-[60px] font-medium border-white/20">Mid Internal<br/>(20)</th>
                                    <th className="p-1.5 border-b border-r border-[#2a4365] w-[70px] font-medium bg-[#0c2340] border-white/20">Total<br/>(100/40)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-zinc-800">
                                {student.subjects.map((sub, i) => {
                                    const gradeColor = 
                                        sub.grade === "EX" ? "bg-green-100 text-green-700 border-green-200" :
                                        sub.grade === "AA" || sub.grade === "AB" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                        sub.grade === "FF" ? "bg-red-100 text-red-700 border-red-200" :
                                        sub.grade === "AU" ? "bg-zinc-100 text-zinc-600 border-zinc-200" :
                                        "bg-yellow-50 text-yellow-700 border-yellow-200";

                                    const creditPoints = (sub.grade_point !== null && sub.grade_point > 0 && sub.grade !== 'AU') ? (sub.grade_point * sub.credit).toFixed(1) : '-';
                                    
                                    // Calculate precise numerical total
                                    const calculatedTotal = (Number(sub.ese) || 0) + (Number(sub.internal) || 0) + (Number(sub.mid) || 0);

                                    return (
                                        <tr key={i} className="hover:bg-[#f8fafc] transition-colors border-zinc-200">
                                            <td className="p-2 border-r border-zinc-300 font-medium text-zinc-500">{i + 1}</td>
                                            <td className="p-2 border-r border-zinc-300 text-center font-mono text-zinc-600">{sub.code}</td>
                                            <td className="p-2 border-r border-zinc-300 text-left font-medium leading-tight">{sub.name}</td>
                                            <td className="p-2 border-r border-zinc-300">{sub.ese}</td>
                                            <td className="p-2 border-r border-zinc-300">{sub.internal}</td>
                                            <td className="p-2 border-r border-zinc-300">{sub.mid}</td>
                                            <td className="p-2 border-r border-zinc-300 font-bold bg-[#f8fafc] text-base text-[#1a365d]">
                                                {calculatedTotal > 0 ? calculatedTotal : sub.total}
                                            </td>
                                            <td className="p-2 border-r border-zinc-300">
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${gradeColor}`}>
                                                    {sub.grade}
                                                </span>
                                            </td>
                                            <td className="p-2 border-r border-zinc-300 font-medium">{sub.grade_point || '-'}</td>
                                            <td className="p-2 border-r border-zinc-300 font-medium">{sub.credit}</td>
                                            <td className="p-2 font-bold text-[#1a365d]">{creditPoints}</td>
                                        </tr>
                                    );
                                })}
                                {/* Total Row */}
                                <tr className="bg-[#f1f5f9] font-bold text-[#1a365d] border-t border-[#1a365d]/20 text-base">
                                    <td colSpan={3} className="p-3 border-r border-zinc-300 text-right">Total</td>
                                    <td className="p-3 border-r border-zinc-300 text-center">{sumEse}</td>
                                    <td className="p-3 border-r border-zinc-300 text-center">{sumInt}</td>
                                    <td className="p-3 border-r border-zinc-300 text-center">{sumMid}</td>
                                    <td className="p-3 border-r border-zinc-300 text-center font-black">{student.total_marks}</td>
                                    <td className="p-3 border-r border-zinc-300 text-center">-</td>
                                    <td className="p-3 border-r border-zinc-300 text-center">-</td>
                                    <td className="p-3 border-r border-zinc-300 text-center text-lg">{totalCredits}</td>
                                    <td className="p-3 text-center text-lg">{totalCP.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 5. SUMMARY, GRADES & SIGNATURES */}
                    <div className="grid grid-cols-[1.2fr_1.8fr_1fr] gap-4 mt-6 items-stretch">
                        
                        {/* Box 1: Performance Summary */}
                        <div className="border border-zinc-300 rounded p-4 flex flex-col justify-between">
                            <h3 className="text-[#1a365d] font-bold text-sm flex items-center gap-2 uppercase">
                                <BarChart3 className="w-4 h-4"/> Performance Summary
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-center mt-6">
                                <div className="border-b border-r border-zinc-200 pb-4">
                                    <p className="text-xs text-zinc-500 mb-1">Total Marks</p>
                                    <p className="text-xl font-bold text-[#1a365d]">{student.total_marks}</p>
                                </div>
                                <div className="border-b border-zinc-200 pb-4">
                                    <p className="text-xs text-zinc-500 mb-1">Percentage</p>
                                    <p className="text-xl font-bold text-[#1a365d]">{percentage}%</p>
                                </div>
                                <div className="pt-2 border-r border-zinc-200">
                                    <p className="text-xs text-zinc-500 mb-1">SGPA</p>
                                    <p className="text-xl font-bold text-green-600">{student.sgpa ?? "-"} <span className="text-xs text-zinc-400">/ 10</span></p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-xs text-zinc-500 mb-1">Result</p>
                                    <p className={`text-xl font-bold ${isPass ? 'text-green-600' : 'text-red-600'}`}>{student.result}</p>
                                </div>
                            </div>
                        </div>

                        {/* Box 2: Grade Scale */}
                        <div className="border border-zinc-300 rounded p-4 text-[10px]">
                            <h3 className="text-[#1a365d] font-bold text-sm uppercase mb-3 flex items-center gap-1">
                                <span className="text-lg">★</span> Grade Scale
                            </h3>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-green-600 text-white text-center rounded py-0.5 font-bold">EX</span>
                                    <span>90.01 - 100</span><span>Outstanding</span><span className="font-mono">10</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-green-500 text-white text-center rounded py-0.5 font-bold">AA</span>
                                    <span>85.01 - 90.00</span><span>Excellent</span><span className="font-mono">9</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-emerald-500 text-white text-center rounded py-0.5 font-bold">AB</span>
                                    <span>80.01 - 85.00</span><span>Very Good</span><span className="font-mono">8.5</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-teal-500 text-white text-center rounded py-0.5 font-bold">BB</span>
                                    <span>75.01 - 80.00</span><span>Good</span><span className="font-mono">8</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-blue-500 text-white text-center rounded py-0.5 font-bold">BC</span>
                                    <span>70.01 - 75.00</span><span>Above Avg</span><span className="font-mono">7.5</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-indigo-500 text-white text-center rounded py-0.5 font-bold">CC</span>
                                    <span>65.01 - 70.00</span><span>Average</span><span className="font-mono">7</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-yellow-500 text-white text-center rounded py-0.5 font-bold">CD</span>
                                    <span>60.01 - 65.00</span><span>Satisfactory</span><span className="font-mono">6.5</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-orange-500 text-white text-center rounded py-0.5 font-bold">DD</span>
                                    <span>55.01 - 60.00</span><span>Pass</span><span className="font-mono">6</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-amber-600 text-white text-center rounded py-0.5 font-bold">DE</span>
                                    <span>50.01 - 55.00</span><span>Pass</span><span className="font-mono">5.5</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center">
                                    <span className="bg-zinc-500 text-white text-center rounded py-0.5 font-bold">EE</span>
                                    <span>40.00 - 50.00</span><span>Pass</span><span className="font-mono">5</span>
                                </div>
                                <div className="grid grid-cols-[24px_70px_1fr_20px] gap-1 items-center mb-1">
                                    <span className="bg-red-600 text-white text-center rounded py-0.5 font-bold">FF</span>
                                    <span>00.00 - 39.99</span><span>Fail</span><span className="font-mono">0</span>
                                </div>
                            </div>
                        </div>

                        {/* Box 3: Signatures */}
                        <div className="border border-zinc-300 rounded p-4 text-center flex flex-col justify-between">
                            <h3 className="text-[#1a365d] font-bold text-sm uppercase flex items-center justify-center gap-2 mb-2">
                                ✍ Signatures
                            </h3>
                            <div className="space-y-6 mt-4">
                                <div>
                                    <div className="h-6 border-b border-dashed border-[#1a365d] w-3/4 mx-auto relative">
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-serif text-sm italic text-zinc-400">Signed Mechanically</span>
                                    </div>
                                    <p className="text-[10px] mt-1 text-zinc-800 font-bold">Controller of Examinations</p>
                                </div>
                                <div>
                                    <div className="h-6 border-b border-dashed border-[#1a365d] w-3/4 mx-auto relative">
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-serif text-sm italic text-zinc-400">Verified System</span>
                                    </div>
                                    <p className="text-[10px] mt-1 text-zinc-800 font-bold">Director / Principal</p>
                                </div>
                            </div>
                            <p className="text-[8px] text-left text-zinc-500 mt-2 font-mono">
                                Date: {new Date().toLocaleDateString()}<br/>
                                Time: {new Date().toLocaleTimeString()}
                            </p>
                        </div>
                    </div>

                    {/* 6. NOTES & LEGENDS */}
                    <div className="grid grid-cols-[1.5fr_1fr] gap-4">
                        <div className="border border-zinc-300 rounded p-4 text-[10px] text-[#1a365d]">
                            <h4 className="font-bold mb-2 flex items-center gap-1"><Info className="w-3 h-3"/> IMPORTANT NOTES</h4>
                            <ul className="list-disc pl-4 space-y-1 block">
                                <li>The results published online are for immediate information only.</li>
                                <li>These cannot be treated as the original statement of marks.</li>
                                <li>Please verify the information from the original statement of marks issued by the university separately.</li>
                                <li><strong>Tot.GrP.(Cr.) = Total Grade Point (Total Credit)</strong></li>
                            </ul>
                        </div>
                        <div className="border border-zinc-300 rounded p-4 text-[10px] text-[#1a365d]">
                            <h4 className="font-bold mb-2 flex items-center gap-1"><BookOpen className="w-3 h-3"/> LEGENDS</h4>
                            <div className="grid grid-cols-[1.2fr_1fr] gap-2">
                                <ul className="space-y-1">
                                    <li><strong>ESE</strong> : End Semester Exam</li>
                                    <li><strong>CA</strong>  : Continuous Assessment</li>
                                    <li><strong>MID</strong> : Mid Semester Exam</li>
                                </ul>
                                <ul className="space-y-1">
                                    <li><strong>GP</strong> : Grade Point</li>
                                    <li><strong>C</strong>  : Credit</li>
                                    <li><strong>Cr.</strong>: Credit Earned</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
