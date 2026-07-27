1
# AI Resume Checker

An AI-powered web application that helps students, fresh graduates, and job seekers review and improve their resumes.

## 🌐 Live Demo

https://ai-resume-checker-liart.vercel.app/

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


```markdown
## 📌 About the Project

Finding out whether a resume is strong enough for a job application can be difficult, especially for students and fresh graduates who may not have professional experience in resume writing.

AI Resume Checker solves this problem by allowing users to paste their resume text and receive instant AI-powered feedback.

The application helps users understand the quality of their resume and identify areas that can be improved before applying for jobs or internships.

## 🎯 Problem It Solves

Many students and job seekers struggle to understand:

- Whether their resume is well-written
- What strengths their resume has
- What weaknesses need improvement
- Whether their resume is optimized for Applicant Tracking Systems (ATS)
- Which skills and keywords they should add

The AI Resume Checker provides quick and practical AI-generated feedback to help users improve their resumes.

## ✨ Features

- Paste resume text into the application
- AI-powered resume analysis
- Overall resume score out of 100
- Resume strengths analysis
- Resume weaknesses analysis
- Specific improvement suggestions
- ATS optimization recommendations
- Recommended skills and keywords
- Simple and user-friendly interface
- Responsive web design
- Live public deployment

## 🧠 AI System Instructions

The AI is instructed to act as a professional resume reviewer and ATS expert.

The AI is instructed to:

- Analyze the provided resume
- Give an overall score out of 100
- Identify strengths
- Identify weaknesses
- Suggest specific improvements
- Provide ATS optimization suggestions
- Recommend relevant skills and keywords
- Provide clear, concise, professional, and practical feedback
- Analyze the resume instead of rewriting it

The AI is also instructed not to create a completely new resume and to focus on actionable feedback.
## 📸 Screenshots

The following screenshots show the AI Resume Checker application in action.

[View Screenshot 1 — Main Application Interface](./Screenshot_20260727-085952.jpg)

[View Screenshot 2 — AI Resume Analysis](./Screenshot_20260727-090049.jpg)

[View Screenshot 3 — ATS Optimization](./Screenshot_20260727-090059.jpg)

[View Screenshot 4 — Live Application](./Screenshot_20260727-090114.jpg)

## 🚀 How to Run the Project Locally

1. Clone the public GitHub repository.

2. Open the project folder.

3. Configure the required Hugging Face API token as an environment variable.

4. Make sure the environment variable is named:

```env
HF_TOKEN=your_huggingface_token_here
