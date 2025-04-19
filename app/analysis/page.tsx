"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { analyzeSkin } from "@/app/actions";
import { ThemeToggle } from "@/components/theme-toggle";

const skinTypes = [
  { value: "normal", label: "Normal" },
  { value: "oily", label: "Oily" },
  { value: "dry", label: "Dry" },
  { value: "combination", label: "Combination" },
  { value: "sensitive", label: "Sensitive" },
  { value: "acne-prone", label: "Acne-Prone" },
];

const skinConcerns = [
  { id: "acne", label: "Acne" },
  { id: "pigmentation", label: "Pigmentation" },
  { id: "wrinkles", label: "Wrinkles" },
  { id: "redness", label: "Redness" },
  { id: "dark-circles", label: "Dark Circles" },
  { id: "uneven-tone", label: "Uneven Tone" },
];

export default function AnalysisPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    skinType: "",
    skinConcerns: [] as string[],
    goals: "",
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      skinConcerns: checked
        ? [...prev.skinConcerns, id]
        : prev.skinConcerns.filter((item) => item !== id),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    try {
      let imageBase64 = null;
      if (formData.image) {
        imageBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.image);
        });
      }

      const result = await analyzeSkin({
        ...formData,
        imageBase64,
      });

      try {
        localStorage.setItem("skinAnalysisResult", JSON.stringify(result));
      } catch (error) {
        console.error("Error storing result in localStorage:", error);
      }

      setProgress(100);

      setTimeout(() => {
        router.push("/results");
      }, 500);
    } catch (error) {
      console.error("Error analyzing skin:", error);
      alert("An error occurred during analysis. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-lavender-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <header className="border-b bg-white dark:bg-gray-950">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Skin Analysis
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Complete the form below to receive your personalized skincare
                routine.
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Your Skin Profile</CardTitle>
                <CardDescription>
                  Tell us about your skin to get the most accurate
                  recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          placeholder="Your age"
                          required
                          min="1"
                          max="120"
                          value={formData.age}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleSelectChange("gender", value)
                        }
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skinType">Skin Type</Label>
                      <Select
                        value={formData.skinType}
                        onValueChange={(value) =>
                          handleSelectChange("skinType", value)
                        }
                      >
                        <SelectTrigger id="skinType">
                          <SelectValue placeholder="Select skin type" />
                        </SelectTrigger>
                        <SelectContent>
                          {skinTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Skin Concerns</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {skinConcerns.map((concern) => (
                          <div
                            key={concern.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={concern.id}
                              checked={formData.skinConcerns.includes(
                                concern.id
                              )}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  concern.id,
                                  checked as boolean
                                )
                              }
                            />
                            <Label htmlFor={concern.id} className="font-normal">
                              {concern.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goals">Skincare Goals</Label>
                      <Textarea
                        id="goals"
                        name="goals"
                        placeholder="What are your skincare goals? (e.g., reduce acne, glowing skin, reduce fine lines)"
                        value={formData.goals}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Upload Selfie (Optional)</Label>
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex w-full items-center justify-center">
                          <label
                            htmlFor="image"
                            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {previewUrl ? (
                              <img
                                src={previewUrl || "/placeholder.svg"}
                                alt="Preview"
                                className="h-full w-full object-contain p-2"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                                <Upload className="h-8 w-8 text-gray-400" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Drag and drop or click to upload
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  (Optional) For more accurate analysis
                                </p>
                              </div>
                            )}
                            <Input
                              id="image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                        {previewUrl && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, image: null }));
                              setPreviewUrl(null);
                            }}
                          >
                            Remove Image
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardFooter className="flex justify-end px-0">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-lavender-600 hover:bg-lavender-700 dark:bg-lavender-500 dark:hover:bg-lavender-600"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing your skin...
                        </>
                      ) : (
                        "Submit Analysis"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
            {isLoading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Analyzing your skin...
                  </span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full bg-lavender-600 dark:bg-lavender-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
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