async function checkResume() {
    const resumeText = document.getElementById("resumeText").value;
    const result = document.getElementById("result");

    if (resumeText.trim() === "") {
        result.innerHTML = "⚠️ Please paste your resume text first.";
        return;
    }

    result.innerHTML = "🤖 AI is analyzing your resume... Please wait.";

    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                resumeText: resumeText
            })
        });

        const data = await response.json();

        if (!response.ok) {
            result.innerHTML = "❌ Error: " + (data.error || "Something went wrong.");
            return;
        }

        result.innerHTML = `
            <h3>🤖 AI Resume Analysis</h3>
            <div>${formatAIResponse(data.result)}</div>
        `;

    } catch (error) {
        result.innerHTML =
            "❌ Unable to connect to the AI service. Please try again later.";
    }
}

function formatAIResponse(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
}