"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

interface AnalysisData {
  name: string;
  age: string;
  gender: string;
  skinType: string;
  skinConcerns: string[];
  goals: string;
  imageBase64: string | null;
}

export async function analyzeSkin(data: AnalysisData) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
  You are a professional dermatologist AI assistant. Based on the following information, provide a detailed skincare analysis and personalized routine.

  User Information:
  - Name: ${data.name}
  - Age: ${data.age}
  - Gender: ${data.gender}
  - Skin Type: ${data.skinType}
  - Skin Concerns: ${data.skinConcerns.join(", ")}
  - Skincare Goals: ${data.goals}

  Please provide a response in the following JSON format:
  {
    "skinType": "Analyzed skin type",
    "concerns": ["Concern 1", "Concern 2"],
    "morningRoutine": {
      "steps": [
        {
          "step": "Step name (e.g., Cleanse)",
          "product": "Product recommendation (use commonly used and dermatologist-approved products, preferably affordable and widely available, such as Cetaphil, CeraVe, Minimalist, The Ordinary, Dermaco, Neutrogena, etc.) It's not compulsion to include only these companies, but also companies like these which are affordable and used by most of the people",
          "description": "Brief description of why this product is recommended"
        }
      ]
    },
    "eveningRoutine": {
      "steps": [
        {
          "step": "Step name (e.g., Cleanse)",
          "product": "Product recommendation (use commonly used and dermatologist-approved products, preferably affordable and widely available, such as Cetaphil, CeraVe, Minimalist, The Ordinary, Dermaco, Neutrogena, etc.) It's not compulsion to include only these companies, but also companies like these which are affordable and used by most of the people",
          "description": "Brief description of why this product is recommended"
        }
      ]
    },
    "hydrationScore": Number between 0-100,
    "oilinessScore": Number between 0-100,
    "tips": ["Tip 1", "Tip 2", "Tip 3", "Tip 4", "Tip 5"]
  }

  Ensure the response is ONLY the JSON object with no additional text.
`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : "{}";

      const analysisResult = JSON.parse(jsonString);
      return analysisResult;
    } catch (error) {
      console.error("Error generating content:", error);

      return {
        skinType: data.skinType || "Combination",
        concerns: data.skinConcerns || ["Acne", "Uneven Tone"],
        morningRoutine: {
          steps: [
            {
              step: "Cleanse",
              product: "Gentle Foaming Cleanser",
              description: "Removes impurities without stripping natural oils",
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
  } catch (error) {
    console.error("Error in analyzeSkin:", error);
    throw new Error("Failed to analyze skin data");
  }
}
