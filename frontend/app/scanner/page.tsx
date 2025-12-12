"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScoreGauge } from "@/components/ScoreGauge"
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from "lucide-react"

export default function ScannerPage() {
    const [file, setFile] = useState<File | null>(null)
    const [jobDescription, setJobDescription] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const handleScan = async () => {
        if (!file || !jobDescription) return
        setLoading(true)

        const formData = new FormData()
        formData.append("resume", file)
        formData.append("job_description", jobDescription)

        try {
            const res = await fetch("http://localhost:8000/scan", {
                method: "POST",
                body: formData,
            })
            const data = await res.json()
            setResult(data)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-full flex-col bg-slate-50 md:flex-row">
            {/* LEFT: Input & Preview Section */}
            <div className="flex w-full flex-col border-r bg-white p-6 md:w-1/2 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Resume Scanner</h1>
                    <p className="text-slate-500">Upload your resume and paste the job description.</p>
                </div>

                {/* 1. Upload Resume */}
                <Card className="mb-6 p-6 border-dashed border-2 bg-slate-50">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600">
                            <UploadCloud className="h-6 w-6" />
                        </div>
                        <h3 className="mb-2 font-semibold">Upload Resume</h3>
                        <p className="mb-4 text-sm text-slate-500">PDF files only (Max 5MB)</p>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {file && (
                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-700 bg-white p-2 rounded-md border shadow-sm">
                                <FileText className="h-4 w-4" />
                                {file.name}
                            </div>
                        )}
                    </div>
                </Card>

                {/* 2. Job Description */}
                <div className="mb-6 flex-1">
                    <label className="mb-2 block font-medium text-slate-700">Job Description</label>
                    <textarea
                        className="h-64 w-full rounded-xl border p-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Paste the full job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                    />
                </div>

                <Button
                    size="lg"
                    className="w-full text-lg shadow-lg shadow-blue-500/20"
                    onClick={handleScan}
                    disabled={loading || !file || !jobDescription}
                >
                    {loading ? "Analyzing..." : "Scan & Match"}
                </Button>
            </div>

            {/* RIGHT: Analysis Results */}
            <div className="flex w-full flex-col bg-slate-50 p-6 md:w-1/2 overflow-y-auto">
                {!result ? (
                    <div className="flex h-full flex-col items-center justify-center text-slate-400">
                        <div className="h-16 w-16 mb-4 rounded-full bg-slate-200 animate-pulse" />
                        <p>Ready to scan. Results will appear here.</p>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Header Score */}
                        <Card className="mb-6 flex items-center justify-between p-6">
                            <div>
                                <h2 className="text-xl font-bold">Match Analysis</h2>
                                <p className="text-slate-500">Based on keyword relevance</p>
                            </div>
                            <ScoreGauge score={result.score} />
                        </Card>

                        {/* Missing Keywords */}
                        <div className="mb-6">
                            <h3 className="mb-3 font-semibold text-slate-900 flex items-center gap-2">
                                <AlertCircle className="text-rose-500 h-5 w-5" />
                                Missing Keywords
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {result.missing_keywords && result.missing_keywords.length > 0 ? (
                                    result.missing_keywords.map((kw: string) => (
                                        <Badge key={kw} variant="destructive" className="px-3 py-1 text-sm bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200">
                                            {kw}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500">No major keywords missing!</p>
                                )}
                            </div>
                        </div>

                        {/* AI Advice */}
                        <div>
                            <h3 className="mb-3 font-semibold text-slate-900 flex items-center gap-2">
                                <CheckCircle2 className="text-emerald-500 h-5 w-5" />
                                Improvement Suggestions
                            </h3>
                            <div className="space-y-3">
                                {result.advice.map((tip: string, idx: number) => {
                                    // Simple bold parsing for "Title": **Title** ...
                                    const parts = tip.split("**");
                                    const title = parts.length > 1 ? parts[1] : null;
                                    const content = parts.length > 1 ? parts[2] : tip;

                                    return (
                                        <Card key={idx} className="p-4 border-l-4 border-l-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 flex-shrink-0 text-blue-500">
                                                    <CheckCircle2 className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    {title && <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>}
                                                    <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
