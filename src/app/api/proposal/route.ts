import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const systemPrompt = `You are an AI assistant representing Rohan Raut, a Senior Full-Stack Engineer specializing in Extreme Velocity Development.
The user is a potential client describing a project they want to build. 
Your job is to instantly generate a professional, structured, 3-phase project proposal based on their description.
Assume Rohan uses a modern stack like Next.js, React, Node.js, Angular, or React Native.
Format the output in Markdown.
Structure the proposal EXACTLY as follows:

# Project Proposal: [Generate a catchy name based on their idea]

## Executive Summary
[1-2 sentences summarizing the goal and how Rohan's extreme velocity approach will benefit them]

## Phase 1: Foundation & MVP (Weeks 1-2)
- **Deliverables:** [List 2-3 key deliverables]
- **Tech Stack:** [Suggest the best tech stack from Rohan's skills]

## Phase 2: Core Features & Scaling (Weeks 3-4)
- **Deliverables:** [List 2-3 key deliverables]

## Phase 3: Polish, Testing & Handoff (Week 5)
- **Deliverables:** [List 2-3 key deliverables]

## Estimated Investment
[Give a rough estimated range in USD, e.g., $3,000 - $6,000, depending on complexity, keeping it professional.]

---
*Note: This is an AI-generated preliminary estimate. Click 'Let's Collaborate' to get a finalized quote from Rohan.*
`;

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(JSON.stringify({ text: 'Please set `GOOGLE_GENERATIVE_AI_API_KEY` to enable the AI Proposal Generator. \n\n**Mock Proposal:**\n\n# Project Proposal: Custom HRMS\n\n## Phase 1: MVP\n- Next.js Setup\n\n## Estimated Investment\n$5,000' }), { headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: systemPrompt });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Proposal Route Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate proposal." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
