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

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
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
                                    text: `You are an expert resume reviewer. Analyze the following resume and provide:
1. Overall score out of 100
2. Strengths
3. Weaknesses
4. Specific suggestions for improvement

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
