"use client";

import React, { useState } from "react";
import { Search as SearchIcon, Users } from "lucide-react";

interface SearchProps {
    students: any[];
    onSelect: (student: any) => void;
}

const Search: React.FC<SearchProps> = ({ students, onSelect }) => {
    const [query, setQuery] = useState("");

    const filtered = students.filter(s => 
        s.roll_no.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="w-full space-y-6 animate-fade-in">
            <div className="relative group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search by seat number or name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {filtered.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => onSelect(s)}
                        className="p-4 glass-panel rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all text-left flex items-start gap-4 group"
                    >
                        <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Users className="w-5 h-5 text-zinc-400 group-hover:text-primary" />
                        </div>
                        <div>
                            <p className="font-bold truncate max-w-[150px]">{s.name}</p>
                            <p className="text-xs text-zinc-500 font-mono">{s.roll_no}</p>
                            <div className="mt-2 text-[10px] uppercase font-bold flex gap-2">
                                <span className={(s.result === 'PASS' || s.result === 'PASS/PROMOTED') ? 'text-green-500' : 'text-red-500'}>
                                    {s.result}
                                </span>
                                <span className="text-zinc-600">•</span>
                                <span className="text-primary">{s.sgpa} SGPA</span>
                            </div>
                        </div>
                    </button>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full p-6 text-center text-zinc-500 border border-zinc-800 rounded-xl">
                        No matching student found for &quot;{query}&quot;.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
