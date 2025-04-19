"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  Droplets,
  Flame,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

interface SkinAnalysisResult {
  skinType: string;
  concerns: string[];
  morningRoutine: {
    steps: Array<{
      step: string;
      product: string;
      description: string;
    }>;
  };
  eveningRoutine: {
    steps: Array<{
      step: string;
      product: string;
      description: string;
    }>;
  };
  hydrationScore: number;
  oilinessScore: number;
  tips: string[];
}

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let storedResult = null;

    try {
      storedResult = localStorage.getItem("skinAnalysisResult");
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }

    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult));
      } catch (error) {
        console.error("Error parsing result:", error);
        setResult(getFallbackData());
      }
    } else {
      console.log("No stored result found, using fallback data");
      setResult(getFallbackData());
    }

    setLoading(false);
  }, []);

  function getFallbackData(): SkinAnalysisResult {
    return {
      skinType: "Combination",
      concerns: ["Acne", "Uneven Tone", "Dryness"],
      morningRoutine: {
        steps: [
          {
            step: "Cleanse",
            product: "Gentle Foaming Cleanser",
            description: "Removes impurities without stripping natural oils",
          },
          {
            step: "Tone",
            product: "Alcohol-Free Toner",
            description: "Balances skin pH and prepares for treatments",
          },
          {
            step: "Treat",
            product: "Vitamin C Serum",
            description: "Brightens skin and provides antioxidant protection",
          },
          {
            step: "Moisturize",
            product: "Oil-Free Moisturizer",
            description: "Hydrates without clogging pores",
          },
          {
            step: "Protect",
            product: "Broad Spectrum SPF 30+",
            description: "Shields skin from harmful UV rays",
          },
        ],
      },
      eveningRoutine: {
        steps: [
          {
            step: "Cleanse",
            product: "Double Cleansing Method",
            description: "Oil cleanser followed by water-based cleanser",
          },
          {
            step: "Exfoliate",
            product: "BHA Exfoliant (2-3 times weekly)",
            description: "Unclogs pores and removes dead skin cells",
          },
          {
            step: "Treat",
            product: "Niacinamide Serum",
            description: "Reduces inflammation and regulates oil production",
          },
          {
            step: "Moisturize",
            product: "Hydrating Night Cream",
            description: "Repairs skin barrier and prevents moisture loss",
          },
        ],
      },
      hydrationScore: 65,
      oilinessScore: 70,
      tips: [
        "Drink at least 8 glasses of water daily to maintain skin hydration",
        "Change pillowcases 2-3 times per week to prevent bacteria buildup",
        "Avoid touching your face throughout the day",
        "Incorporate foods rich in omega-3 fatty acids and antioxidants",
        "Cleanse skin immediately after exercising to prevent breakouts",
      ],
    };
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-lavender-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="mb-4 text-lavender-600 dark:text-lavender-400">
            <svg
              className="mx-auto h-12 w-12 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium">Loading your results...</h3>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-lavender-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="text-center">
          <h3 className="mb-4 text-xl font-bold">No analysis results found</h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Please complete the skin analysis form to see your personalized
            results.
          </p>
          <Link href="/analysis">
            <Button className="bg-lavender-600 hover:bg-lavender-700 dark:bg-lavender-500 dark:hover:bg-lavender-600">
              Go to Analysis Form
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-lavender-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-white dark:bg-gray-950">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/analysis" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Analysis</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Your Personalized Skincare Analysis
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Based on your skin profile, we've created a customized skincare
                routine just for you.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Skin Profile Summary</CardTitle>
                <CardDescription>
                  Here's what we've detected about your skin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold">Skin Type</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {result.skinType}
                    </p>

                    <h3 className="mb-2 mt-4 font-semibold">Skin Concerns</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.concerns.map((concern, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-lavender-100 dark:bg-lavender-900/50 px-2.5 py-0.5 text-xs font-medium text-lavender-800 dark:text-lavender-300"
                        >
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Droplets className="mr-2 h-4 w-4 text-blue-500" />
                          <span className="font-medium">Hydration Score</span>
                        </div>
                        <span>{result.hydrationScore}/100</span>
                      </div>
                      <Progress value={result.hydrationScore} className="h-2" />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <Flame className="mr-2 h-4 w-4 text-orange-500" />
                          <span className="font-medium">Oiliness Score</span>
                        </div>
                        <span>{result.oilinessScore}/100</span>
                      </div>
                      <Progress value={result.oilinessScore} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20 rounded-t-lg">
                  <div className="flex items-center">
                    <Sun className="mr-2 h-5 w-5 text-amber-500" />
                    <CardTitle>Morning Routine</CardTitle>
                  </div>
                  <CardDescription>
                    Follow these steps every morning for best results.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ol className="space-y-6">
                    {result.morningRoutine.steps.map((step, index) => (
                      <li
                        key={index}
                        className="relative pl-8 pb-6 border-b last:border-0 last:pb-0"
                      >
                        <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full bg-lavender-100 dark:bg-lavender-900/50 text-xs font-medium text-lavender-800 dark:text-lavender-300">
                          {index + 1}
                        </div>
                        <h4 className="font-medium">{step.step}</h4>
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                          {step.product}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {step.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-indigo-50 dark:bg-indigo-900/20 rounded-t-lg">
                  <div className="flex items-center">
                    <Moon className="mr-2 h-5 w-5 text-indigo-500" />
                    <CardTitle>Evening Routine</CardTitle>
                  </div>
                  <CardDescription>
                    Follow these steps every evening for best results.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ol className="space-y-6">
                    {result.eveningRoutine.steps.map((step, index) => (
                      <li
                        key={index}
                        className="relative pl-8 pb-6 border-b last:border-0 last:pb-0"
                      >
                        <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full bg-lavender-100 dark:bg-lavender-900/50 text-xs font-medium text-lavender-800 dark:text-lavender-300">
                          {index + 1}
                        </div>
                        <h4 className="font-medium">{step.step}</h4>
                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                          {step.product}
                        </p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {step.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lifestyle & Skincare Tips</CardTitle>
                <CardDescription>
                  Follow these recommendations to improve your skin health.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-lavender-100 dark:bg-lavender-900/50 text-center text-xs font-medium leading-5 text-lavender-800 dark:text-lavender-300">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Link href="/">
                <Button className="bg-lavender-600 hover:bg-lavender-700 dark:bg-lavender-500 dark:hover:bg-lavender-600">
                  Back to Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-white dark:bg-gray-950">
        <div className="container py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} RejuveAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}