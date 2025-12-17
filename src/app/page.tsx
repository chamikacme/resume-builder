import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 h-16 flex items-center justify-between border-b bg-white">
        <span className="font-bold text-xl">Resume Builder</span>
        <div className="flex gap-4">
            {userId ? (
                <Link href="/dashboard"><Button>Dashboard</Button></Link>
            ) : (
                <>
                    <Link href="/sign-in"><Button variant="ghost">Sign In</Button></Link>
                    <Link href="/sign-up"><Button>Get Started</Button></Link>
                </>
            )}
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50">
        <h1 className="text-5xl font-bold tracking-tight mb-6 max-w-4xl">Build Your Professional Resume in Minutes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Create professional, ATS-friendly resumes with our easy-to-use builder. Export to PDF instantly. No hidden fees.
        </p>
        <div className="flex gap-4">
             <Link href={userId ? "/dashboard" : "/sign-up"}>
                <Button size="lg" className="text-lg px-8 py-6 h-auto">Create My Resume</Button>
            </Link>
        </div>
      </main>
    </div>
  );
}
