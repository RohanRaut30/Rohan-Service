import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `You are an AI assistant representing Rohan Raut, a Senior Software Engineer specializing in Extreme Velocity Development.
You ONLY answer questions about Rohan's skills, experience, and services. If asked about anything else, politely decline and pivot back to Rohan.
Here is Rohan's context:
- Email: rohan.raut.dev@gmail.com
- Location: Pune, India
- Education: Master of Computer Applications, Pune University (2023)
- Certifications: Azure Certified AZ-900 Fundamentals
- Current Role: Software Developer at Onelife Capital Advisors, Mumbai (Jan 2026 - Present)
  - Spearheaded migration of a production LMS from Angular v2 to v19, improving build performance by ~35%.
  - Engineered Node.js backend APIs.
  - Refactored legacy modules to clean architecture.
- Past Role: Full-Stack Developer at Policy Planner, Pune (Nov 2023 - Sep 2025)
  - Architected MPS web platform (1000+ users).
  - Integrated WhatsApp Business API and Cashfree payment gateways.
  - Optimized MySQL queries.
- Key Projects: Pyrite Resorts & Villas, RewardPlanners & BizzPlanners.
- Tech Stack: Angular (v16-19), TypeScript, Node.js, MySQL, MongoDB, React.js, React Native, Next.js, Firebase, Azure AZ-900, Tailwind CSS.
- Services: Rapid MVP Development, AI Agent Integration, Frontend Modernization, Scalable API & Backends.
Answer concisely, professionally, and enthusiastically. Make it clear you are Rohan's AI assistant. Keep responses under 3 sentences unless asked for details.`;

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(JSON.stringify({ text: 'Please set `GOOGLE_GENERATIVE_AI_API_KEY` in your environment to enable the real AI. \n\n**Mock Answer:** Yes, Rohan is highly proficient in modern web and mobile stacks, including Next.js, Angular, and React Native! Let him know what you want to build.' }), { headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction: systemPrompt });

    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
    const latestMessage = messages[messages.length - 1].content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("AI Route Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
