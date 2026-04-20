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
    Cell,
    ReferenceLine
} from "recharts";

interface ChartsProps {
    data: number[];
}

const Charts: React.FC<ChartsProps> = ({ data }) => {
    // Transform marks array into Recharts-friendly objects
    const chartData = data.map((val, index) => ({
        subject: `Sub ${index + 1}`,
        marks: val
    }));

    return (
        <div className="w-full h-[300px] bg-zinc-900/30 rounded-2xl p-4 border border-zinc-800">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis 
                        dataKey="subject" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717a', fontSize: 12 }} 
                    />
                    <YAxis 
                        domain={[0, 100]} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#71717a', fontSize: 12 }} 
                    />
                    <Tooltip 
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ 
                            backgroundColor: '#18181b', 
                            border: '1px solid #3f3f46', 
                            borderRadius: '12px',
                            color: '#fff'
                        }} 
                    />
                    <ReferenceLine y={40} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Pass', position: 'right', fill: '#ef4444', fontSize: 10 }} />
                    <Bar dataKey="marks" radius={[6, 6, 0, 0]} barSize={40}>
                        {chartData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={entry.marks >= 40 ? '#3b82f6' : '#ef4444'} 
                                fillOpacity={0.8}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Charts;
