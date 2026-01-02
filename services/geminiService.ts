import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the API client
const apiKey = process.env.API_KEY || ''; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateAgentResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    // Fallback if no API key is present for the demo
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[SYSTEM_NOTICE]: API Key not detected. 
        
I am currently running in simulation mode. 
        
Based on your query "${prompt}", I would typically analyze my vector database of projects and experience. 
        
Since I can't connect to the neural core (Gemini API), please explore the "Deployed Projects" section below manually.`);
      }, 1000);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "No data received from the core.";
  } catch (error) {
    console.error("Agent Error:", error);
    return `[SYSTEM_ERROR]: Connection to neural core failed. Please try again. \n\nError logs: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  if (!ai) return null;
  
  try {
    // Clean text of basic markdown for better speech
    const cleanText = text.replace(/[*#_\[\]]/g, '');
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};
