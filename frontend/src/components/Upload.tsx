"use client";

import React, { useState } from "react";
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface UploadProps {
    onSuccess: (data: any) => void;
}

const Upload: React.FC<UploadProps> = ({ onSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "uploading" | "parsing" | "success">("idle");
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== "application/pdf") {
                setError("Please select a valid PDF file");
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first");
            return;
        }

        setIsLoading(true);
        setStatus("uploading");
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Processing state change for UX
            setTimeout(() => setStatus("parsing"), 1000);

            const response = await fetch(`${apiBaseUrl}/api/process-result`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setStatus("success");
                setTimeout(() => {
                    onSuccess(data.students);
                }, 800);
            } else {
                setError(data.error || "Failed to process PDF");
                setStatus("idle");
            }
        } catch (err) {
            setError("Connection to server failed. Ensure backend is running on port 5000.");
            setStatus("idle");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 glass-panel rounded-3xl animate-fade-in">
            <div className="flex flex-col items-center gap-6">
                <div className="p-5 bg-primary/10 rounded-2xl">
                    {status === "success" ? (
                        <CheckCircle className="w-12 h-12 text-green-400" />
                    ) : (
                        <UploadIcon className="w-12 h-12 text-primary" />
                    )}
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Upload Result PDF</h2>
                    <p className="text-zinc-400">Drag and drop or browse your university result file</p>
                </div>

                <div className="w-full relative group">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        disabled={isLoading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`
                        w-full p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 transition-all
                        ${file ? 'border-primary bg-primary/5' : 'border-zinc-700 group-hover:border-primary/50'}
                    `}>
                        {file ? (
                            <>
                                <FileText className="w-8 h-8 text-primary" />
                                <span className="font-medium">{file.name}</span>
                                <span className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </>
                        ) : (
                            <>
                                <UploadIcon className="w-8 h-8 text-zinc-600" />
                                <span className="text-zinc-500">Click to browse (.pdf)</span>
                            </>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!file || isLoading}
                    className={`
                        w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all
                        ${!file || isLoading 
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                            : 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20'}
                    `}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {status === "uploading" ? "Uploading..." : "Parsing Data..."}
                        </>
                    ) : (
                        status === "success" ? "Success!" : "Process Results"
                    )}
                </button>
            </div>
        </div>
    );
};

export default Upload;
