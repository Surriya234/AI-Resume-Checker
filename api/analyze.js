export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        // Get resume text from frontend
        const { resumeText } = req.body;

        // Check if resume text is provided
        if (!resumeText || !resumeText.trim()) {
            return res.status(400).json({
                error: "Resume text is required"
            });
        }

        // Get Hugging Face token from Vercel Environment Variables
        const token = process.env.HF_TOKEN;

        // Check if token exists
        if (!token) {
            return res.status(500).json({
                error: "HF_TOKEN is not configured"
            });
        }

        // Send request to Hugging Face
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
                            content: "You are a professional resume reviewer and ATS expert. Your job is to analyze resumes and provide useful professional feedback. Do not rewrite the resume."
                        },
                        {
                            role: "user",
                            content: `Analyze the following resume.

IMPORTANT:
- Do NOT rewrite the resume.
- Do NOT create a new resume.
- Only analyze the existing resume.
- Give clear, concise, professional feedback.
- Use the exact headings shown below.

OVERALL SCORE:
Give a score from 0 to 100 and briefly explain the score.

STRENGTHS:
List 3 to 5 strong points of the resume.

WEAKNESSES:
List 3 to 5 weaknesses or areas that need improvement.

SPECIFIC IMPROVEMENTS:
Give 3 to 5 practical suggestions that can improve the resume.

ATS OPTIMIZATION:
Give 3 to 5 suggestions to improve ATS compatibility.

RECOMMENDED SKILLS AND KEYWORDS:
Suggest relevant skills and keywords that could improve the candidate's chances for suitable jobs.

Resume:

${resumeText}`
                        }
                    ],

                    max_tokens: 1200
                })
            }
        );

        // Read API response
        const data = await response.json();

        // Handle API errors
        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || "AI request failed"
            });
        }

        // Extract AI response
        const result =
            data.choices?.[0]?.message?.content ||
            "No AI feedback received.";

        // Send result to frontend
        return res.status(200).json({
            result: result
        });

    } catch (error) {
        // Handle unexpected errors
        return res.status(500).json({
            error: error.message || "Something went wrong."
        });
    }
    }        
                    
