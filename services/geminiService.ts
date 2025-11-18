
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function createChatSession(): Chat {
    const model = 'gemini-2.5-flash';
    return ai.chats.create({
        model: model,
        config: {
            systemInstruction: 'You are a helpful and friendly AI assistant. Your responses should be informative and well-formatted.',
        },
    });
}
