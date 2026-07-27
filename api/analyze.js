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

        const token = process.env.HF_TOKEN;

        if (!token) {
            return res.status(500).json({
                error: "HF_TOKEN is not configured"
            });
        }

        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "Qwen/Qwen2.5-7B-Instruct",
                    messages: [
                        {
                            role: "system",
                            content: "You are an expert resume reviewer. Give clear, professional and practical feedback."
                        },
                        {
                            role: "user",
                            content: `Analyze this resume and provide:

1. Overall score out of 100
2. Strengths
3. Weaknesses
4. Specific suggestions for improvement
5. ATS optimization suggestions
6. Recommended skills or keywords to add

Resume:

${resumeText}`
                        }
                    ],
                    max_tokens: 1000
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
            data.choices?.[0]?.message?.content ||
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
