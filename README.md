## 🤖 AI Feature

The main AI feature of this application is an AI-powered resume reviewer.

Users paste their resume text into the application. The application sends the resume to the backend, where it is processed using an AI model through the Hugging Face API.

The AI analyzes the resume and provides:

1. Overall score out of 100
2. Strengths
3. Weaknesses
4. Specific improvements
5. ATS optimization suggestions
6. Recommended skills and keywords

The AI is instructed to act as an expert resume reviewer and provide clear, practical, professional, and actionable feedback to help students and job seekers improve their resumes.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Serverless API
- Hugging Face API
- Hugging Face AI Model
- Vercel
- GitHub

## 🔐 Environment Variables

The Hugging Face API token is stored securely as an environment variable on the deployment platform and is not included in the public GitHub repository.

The application uses the following environment variable:

```env
HF_TOKEN=your_huggingface_token_here
