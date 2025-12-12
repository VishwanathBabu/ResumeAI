"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ScoreGaugeProps {
    score: number
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        // Animation delay
        const timer = setTimeout(() => setPercent(score), 100)
        return () => clearTimeout(timer)
    }, [score])

    const radius = 70
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percent / 100) * circumference

    let colorClass = "text-primary"
    if (score >= 75) colorClass = "text-emerald-500" // Emerald
    else if (score >= 50) colorClass = "text-amber-500" // Amber
    else colorClass = "text-rose-500" // Rose

    return (
        <div className="relative flex items-center justify-center p-6">
            <svg className="h-48 w-48 -rotate-90 transform">
                {/* Background Circle */}
                <circle
                    className="text-slate-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="96"
                    cy="96"
                />
                {/* Progress Circle */}
                <circle
                    className={cn("transition-all duration-1000 ease-out", colorClass)}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="96"
                    cy="96"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={cn("text-4xl font-bold", colorClass)}>{percent}%</span>
                <span className="text-sm font-medium text-slate-500">Match</span>
            </div>
        </div>
    )
}
