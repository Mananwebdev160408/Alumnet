const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors")({ origin: true });
const ModelClient = require("@azure-rest/ai-inference").default;
const { isUnexpected } = require("@azure-rest/ai-inference");
const { AzureKeyCredential } = require("@azure/core-auth");

exports.aichat = onRequest((req, res) => {
  cors(req, res, async () => {
    // Only allow POST
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }

    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    try {
      // Must set GITHUB_TOKEN in functions config: firebase functions:secrets:set GITHUB_TOKEN
      const token = process.env.GITHUB_TOKEN; 
      const endpoint = "https://models.github.ai/inference";
      const modelName = "openai/gpt-4o";

      if (!token) {
        console.error("AI service token not configured");
        return res.status(500).json({ success: false, message: "AI service config error" });
      }

      const client = ModelClient(endpoint, new AzureKeyCredential(token));
      
      const response = await client.path("/chat/completions").post({
        body: {
          messages: [
            { role: "system", content: "You are AlumNet AI, the official virtual assistant for the AlumNet platform, a Smart India Hackathon 2025 project developed by Team Syntax Squad. AlumNet is a digital solution for centralized alumni data management and engagement, dedicated to bridging the gap between alumni and their alma mater through meaningful connections, career growth opportunities, and automation powered by innovative technology. As a friendly and knowledgeable chatbot, provide expert and context-aware guidance to users about navigating AlumNet features such as Directory, Profile, AI Chat, About, Dashboard, and Messages. Assist with alumni directory searches by name, graduation year, branch, department, or location, and describe information related to profiles, contact details, professional and academic achievements, as well as team roles and contributions involved in the project. Clearly articulate AlumNet’s mission to foster continuous engagement, support smart education themes, and create value for both alumni and current students. Respond to queries about the Smart India Hackathon 2025, the specific problem statement (#25017), and aspects of the team’s collaborative approach, always using accurate terminology and platform-specific details. If asked about features that are not yet available, politely explain that they are “coming soon” and offer suitable alternatives where possible. Never answer questions outside of the AlumNet ecosystem, and consistently maintain an approachable, professional tone as an AI representative devoted to the success of this alumni network." },
            { role: "user", content: message }
          ],
          model: modelName,
        }
      });

      if (isUnexpected(response)) {
        console.error("AI service unexpected", response.body);
        return res.status(500).json({ success: false, message: "AI service error" });
      }

      const aiResponse = response.body.choices?.[0]?.message?.content || "No response from AI";
      
      res.status(200).json({ success: true, message: aiResponse });
      
    } catch (error) {
      console.error("AI service error details:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });
});
