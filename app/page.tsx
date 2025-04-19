import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">RejuveAI</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-lavender-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Smarter Skincare Starts Here
                  </h1>
                  <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                    Get personalized skincare routines with the power of AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/analysis">
                    <Button className="bg-lavender-600 hover:bg-lavender-700 dark:bg-lavender-500 dark:hover:bg-lavender-600">
                      Start My Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex justify-center lg:justify-end">
                <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] rounded-full overflow-hidden bg-lavender-100 dark:bg-lavender-900/30 flex items-center justify-center">
                  <img
                    alt="Skincare illustration"
                    className="object-cover"
                    src="/placeholder.svg?height=450&width=450"
                    style={{
                      aspectRatio: "450/450",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform analyzes your skin and provides
                  personalized recommendations in just a few steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-100 dark:bg-lavender-900/30 text-lavender-600 dark:text-lavender-300">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Complete the Form</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Tell us about your skin type, concerns, and goals.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-100 dark:bg-lavender-900/30 text-lavender-600 dark:text-lavender-300">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our advanced AI analyzes your information to create a
                  personalized profile.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-100 dark:bg-lavender-900/30 text-lavender-600 dark:text-lavender-300">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Get Your Routine</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive a customized skincare routine and product
                  recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-lavender-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Skincare Routine?
                </h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have discovered their perfect
                  skincare routine with RejuveAI.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/analysis">
                  <Button className="bg-lavender-600 hover:bg-lavender-700 dark:bg-lavender-500 dark:hover:bg-lavender-600">
                    Start My Analysis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
              © {new Date().getFullYear()} RejuveAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}