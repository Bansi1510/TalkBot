import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const geminiRes = async (
  command: string,
  assistantName: string,
  userName: string
): Promise<string> => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key not found");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  // ⚠️ PROMPT IS 100% UNCHANGED (as requested)
  const systemPrompt = `
You are a smart virtual voice assistant named "${assistantName}", created by "${userName}".

You are NOT Google.
You are a voice-enabled AI assistant designed for a web application.

Your job is to:
- Understand the user's natural language input
- Detect the user's intent
- Respond ONLY with a valid JSON object
- Do NOT add explanations, markdown, or extra text

-------------------------
RESPONSE FORMAT (STRICT)
-------------------------
You must respond ONLY in this JSON format:

{
  "type": "general | google_search | youtube_search | youtube_play | get_time | get_date | get_day | get_month | calculator_open | instagram_open | facebook_open | weather_show",
  "userinput": "<cleaned original user input>",
  "response": "<short, natural, voice-friendly reply>"
}

-------------------------
IMPORTANT RULES
-------------------------
1. "type":
   - Detect the user's intent accurately
   - Use ONLY one of the allowed types listed above

2. "userinput":
   - Keep the user's original sentence
   - Remove the assistant name if mentioned
   - If the user asks to search on Google or YouTube, keep ONLY the search keywords

3. "response":
   - Short
   - Friendly
   - Spoken style (voice assistant)

4. If someone asks:
   "Who created you?" or "Who made you?"
   → Respond using "${userName}" only.

5. If the intent is unclear:
   - Use type: "general"
   - Respond politely

6. NEVER break JSON format
7. NEVER add extra keys
8. NEVER return text outside JSON

-------------------------
NOW PROCESS THIS INPUT
-------------------------
User Input: "${command}"`

  // ✅ Configuration to force JSON output
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",

    generationConfig: {
      responseMimeType: "application/json",
    },
    // ✅ Better to put instructions here than in the main prompt
    systemInstruction: systemPrompt,
  });
  try {
    // Send the systemPrompt (which includes the user command)
    const result = await model.generateContent(systemPrompt);
    const output = result.response.text().trim();

    // Clean markdown blocks if the model accidentally includes them
    const cleanOutput = output.replace(/```json|```/g, "").trim();

    try {
      JSON.parse(cleanOutput);
      return cleanOutput;
    } catch {
      return JSON.stringify({
        type: "general",
        userinput: command,
        response: "Sorry, I didn’t understand that.",
      });
    }
  } catch (error) {
    console.error("Gemini SDK Error:", error);

    return JSON.stringify({
      type: "general",
      userinput: command,
      response: "Something went wrong. Please try again.",
    });
  }
};

export default geminiRes;