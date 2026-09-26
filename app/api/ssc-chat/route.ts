import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { sscKnowledge } from "@/lib/ssc-knowledge";


const apiKey = process.env.GEMINI_API_KEY;


if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY");
}


const genAI = new GoogleGenerativeAI(apiKey);



function cleanResponse(text: string) {

  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#/g, "")
    .replace(/^- /gm, "")
    .replace(/•/g, "")
    .replace(/`/g, "")
    .replace(/_/g, "")
    .replace(/—/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

}



export async function POST(
  request: Request
) {

  try {

    const {
      message
    } = await request.json();



    if (!message || typeof message !== "string") {

      return NextResponse.json({

        reply:
          "Hi! I am SSC Guide Bot. Please type your question and I will help you with Parageyan 2026, SSC information, activities, schedules, and voting."

      });

    }



    const model =
      genAI.getGenerativeModel({

        model:
          "gemini-3.5-flash-lite",


        systemInstruction:
          sscKnowledge,


        generationConfig: {

          temperature: 0.2,

          maxOutputTokens: 200,

        },

      });



    const result =
      await model.generateContent({

        contents: [

          {

            role: "user",

            parts: [

              {

                text: message,

              },

            ],

          },

        ],

      });



    const responseText =
      result.response.text();



    const reply =
      cleanResponse(responseText);



    return NextResponse.json({

      reply:
        reply ||
        "Sorry, I do not have that information yet. Please check the official SSC Hub announcements."

    });


  } catch (error) {


    console.error(
      "SSC Guide Bot Error:",
      error
    );



    return NextResponse.json(

      {

        reply:
          "Sorry, SSC Guide Bot is currently unavailable. Please try again later."

      },

      {

        status: 500

      }

    );

  }

}