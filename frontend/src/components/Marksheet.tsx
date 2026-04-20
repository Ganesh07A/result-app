"use client";

import React from "react";
import { Award, ShieldAlert, GraduationCap, Printer, Download } from "lucide-react";
import Charts from "./Charts";

interface MarksheetProps {
    student: {
        roll_no: string;
        name: string;
        sgpa: number | null;
        result: string | null;
        marks: number[];
        performance: string;
        failedSubjectsCount: number;
    };
}

const Marksheet: React.FC<MarksheetProps> = ({ student }) => {
    return (
        <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden animate-fade-in shadow-2xl">
            {/* Header / Banner */}
            <div className="bg-primary/10 p-8 border-b border-primary/20 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary rounded-2xl">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">{student.name}</h2>
                        <p className="text-zinc-500 font-mono text-sm uppercase">Seat No: {student.roll_no}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm font-bold">
                    <div className={`px-4 py-2 rounded-xl flex items-center gap-2 ${student.result === 'PASS' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {student.result === 'PASS' ? <Award className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                        {student.result}
                    </div>
                    <div className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-xl">
                        {student.sgpa} SGPA
                    </div>
                </div>
            </div>

            <div className="p-8 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                        <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Performance</p>
                        <p className={`text-xl font-black ${
                            student.performance === 'Excellent' ? 'text-yellow-400' : 
                            student.performance === 'Good' ? 'text-blue-400' : 'text-zinc-400'
                        }`}>{student.performance}</p>
                    </div>
                    <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                        <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Total Subjects</p>
                        <p className="text-xl font-black text-white">{student.marks.length}</p>
                    </div>
                    <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                        <p className="text-zinc-500 text-xs uppercase font-bold mb-1">Backlogs</p>
                        <p className={`text-xl font-black ${student.failedSubjectsCount > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {student.failedSubjectsCount}
                        </p>
                    </div>
                </div>

                {/* Performance Chart */}
                <div>
                    <h3 className="text-sm font-bold text-zinc-500 uppercase mb-4 ml-1">Subject Performance Analytics</h3>
                    <Charts data={student.marks} />
                </div>

                {/* Detailed Table */}
                <div className="overflow-hidden rounded-2xl border border-zinc-800">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-800/50 text-zinc-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Subject</th>
                                <th className="px-6 py-4">Marks Obtained</th>
                                <th className="px-6 py-4">Threshold</th>
                                <th className="px-6 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {student.marks.map((m, i) => (
                                <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium">Subject Module {i + 1}</td>
                                    <td className={`px-6 py-4 font-black ${m < 40 ? 'text-red-400' : 'text-white'}`}>{m}</td>
                                    <td className="px-6 py-4 text-zinc-500">40 / 100</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-2 py-1 rounded text-[10px] uppercase font-black ${m < 40 ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                                            {m < 40 ? 'FAIL' : 'PASS'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                    <p className="text-xs text-zinc-600">Generated on {new Date().toLocaleDateString()} • University AI System</p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => window.print()}
                            className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all"
                        >
                            <Printer className="w-5 h-5" />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20">
                            <Download className="w-5 h-5" />
                            <span>Export PDF</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marksheet;
