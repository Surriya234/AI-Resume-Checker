export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { resumeText } = req.body;

        if (!resumeText) {
            return res.status(400).json({
                error: "Resume text is required"
            });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "GEMINI_API_KEY is not configured"
            });
        }

        // Get models available to this API key
        const modelsResponse = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models?key=" + apiKey
        );

        const modelsData = await modelsResponse.json();

        if (!modelsResponse.ok) {
            return res.status(modelsResponse.status).json({
                error: modelsData.error?.message || "Could not fetch available models"
            });
        }

        // Find a model that supports generateContent
        const availableModel = modelsData.models?.find(
            (model) =>
                model.supportedGenerationMethods?.includes("generateContent") &&
                model.name?.includes("flash")
        );

        if (!availableModel) {
            return res.status(500).json({
                error: "No available Gemini model supports generateContent for this API key."
            });
        }

        const modelName = availableModel.name;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/" +
            modelName +
            ":generateContent?key=" +
            apiKey,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are an expert resume reviewer.

Analyze the following resume and provide:

1. Overall score out of 100
2. Strengths
3. Weaknesses
4. Specific suggestions for improvement
5. ATS optimization suggestions
6. Recommended skills or keywords to add

Give clear, practical, and professional feedback.

Resume:
${resumeText}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || "AI request failed"
            });
        }

        const result =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No AI feedback received.";

        return res.status(200).json({
            result: result
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message || "Something went wrong."
        });
    }
}
