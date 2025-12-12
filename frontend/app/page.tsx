import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-center">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-6xl font-extrabold tracking-tight text-slate-900">
          Beat the <span className="text-blue-600">ATS</span>.
          <br />
          Get Hired Faster.
        </h1>
        <p className="mb-10 text-xl text-slate-600">
          Our AI analyzes your resume against job descriptions to help you land more interviews. Instant feedback on keywords and formatting.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/scanner">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-blue-500/20">
              Scan My Resume for Free
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
