"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

interface SubjectResult {
    code: string;
    name: string;
    total: number | string;
}

interface ChartsProps {
    subjects: SubjectResult[];
}

const Charts: React.FC<ChartsProps> = ({ subjects }) => {
    // Filter and map exactly to the new structured data
    const chartData = subjects
        .filter(s => typeof s.total === 'number' || (!isNaN(Number(s.total)) && s.total !== "N/A"))
        .map((s, index) => ({
            name: s.name,
            shortName: `S${index + 1}`,
            marks: Number(s.total)
        }));

    if (chartData.length === 0) {
        return (
            <div className="w-full h-[240px] bg-zinc-50 rounded-xl p-6 border flex items-center justify-center">
                <span className="text-zinc-500 font-bold">Chart Data Unavailable</span>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                    <XAxis 
                        dataKey="shortName" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600 }} 
                    />
                    <YAxis 
                        domain={[0, 100]} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717a', fontSize: 10 }} 
                    />
                    <Tooltip 
                        cursor={{ fill: 'rgba(26, 54, 93, 0.05)' }} // #1a365d with opacity
                        formatter={(value: number) => [`${value} Marks`, "Total"]}
                        labelFormatter={(label) => {
                            const match = chartData.find(d => d.shortName === label);
                            return match ? match.name : label;
                        }}
                        contentStyle={{ 
                            backgroundColor: '#ffffff', 
                            border: '1px solid #e4e4e7', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            color: '#1a365d',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }} 
                    />
                    <Bar dataKey="marks" radius={[4, 4, 4, 4]} barSize={24}>
                        {chartData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={entry.marks >= 40 ? '#2563eb' : '#dc2626'} 
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;
