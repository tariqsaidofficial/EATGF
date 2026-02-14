
import { GoogleGenAI, Content } from "@google/genai";

// Initialize the client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Summarizes documentation content using the low-latency Gemini Flash Lite model.
 * Ideal for quick page insights.
 */
export const summarizeContent = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `You are a technical documentation assistant. Summarize the following technical documentation content into 3 concise bullet points for a senior engineer:\n\n${text}`,
    });
    return response.text || "Unable to generate summary.";
  } catch (error) {
    console.error("Gemini Summarize Error:", error);
    return "Service unavailable. Please try again later.";
  }
};

/**
 * Handles complex user queries using Gemini 3 Pro with Thinking Mode.
 * Maintains conversation history for context.
 */
export const chatWithGemini = async (message: string, history: {role: string, text: string}[]): Promise<string> => {
  try {
    const systemInstruction = `You are EATGF AI, the dedicated enterprise support assistant for the Enterprise AI-Aligned Technical Governance Framework (EATGF). 
    
    Guidelines:
    1. You are helpful, technical, and precise.
    2. Use **Markdown** for formatting:
       - Use **bold** for key concepts or UI elements.
       - Use \`inline code\` for file paths, variables, or short commands.
       - Use \`\`\`language\ncode\n\`\`\` blocks for longer code snippets (bash, typescript, json).
    3. Keep answers concise (under 200 words unless detailed code is requested).
    4. If you don't know the answer, politely admit it and suggest checking the official docs.
    5. Be friendly but professional.`;

    // Filter out the initial welcome message (often the first assistant message) to ensure valid conversation flow (User starts)
    // We assume the very first message if it is from 'assistant' is the welcome greeting which shouldn't be part of the API context usually.
    const validHistory = history.filter((msg, index) => !(index === 0 && msg.role === 'assistant'));

    // Convert internal history format to Gemini Content format
    const previousContents: Content[] = validHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Add the new user message
    const contents: Content[] = [
      ...previousContents,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm currently experiencing high traffic. Please try again in a moment.";
  }
};
