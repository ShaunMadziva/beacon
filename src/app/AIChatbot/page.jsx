"use client";
import { useState } from "react";
import "/public/mentors.json"

const MentorsList = [
  {
      "name": "Alex Carter",
      "sector": "Technology (Software Development)",
      "expertise": [
          "Full-Stack Development",
          "Cloud Computing"
      ],
      "role": "Senior Software Engineer at a Fortune 500 company, with over a decade of experience building scalable web applications and mentoring junior developers."
  },
  {
      "name": "Priya Malhotra",
      "sector": "Finance & Banking",
      "expertise": [
          "Financial Analysis",
          "Risk Management"
      ],
      "role": "Investment Manager at a leading bank, specializing in portfolio management and sustainable investment strategies."
  },
  {
      "name": "Sarah Johnson",
      "sector": "Healthcare",
      "expertise": [
          "Healthcare IT",
          "Telemedicine"
      ],
      "role": "Digital Health Consultant, supporting healthcare startups in implementing innovative telemedicine solutions."
  },
  {
      "name": "Miguel Torres",
      "sector": "Education",
      "expertise": [
          "EdTech",
          "Curriculum Design"
      ],
      "role": "Founder of an EdTech startup that develops AI-driven personalized learning platforms for schools and universities."
  },
  {
      "name": "Emma Zhang",
      "sector": "E-Commerce",
      "expertise": [
          "Digital Marketing",
          "Customer Analytics"
      ],
      "role": "Head of Marketing for a fast-growing online retail platform, focusing on SEO, SEM, and user engagement strategies."
  },
  {
      "name": "James O'Neill",
      "sector": "Manufacturing",
      "expertise": [
          "Lean Manufacturing",
          "Supply Chain Optimization"
      ],
      "role": "Operations Manager at a global manufacturing firm, known for implementing cost-effective production processes."
  },
  {
      "name": "Amina Yusuf",
      "sector": "Non-Profit & Social Enterprises",
      "expertise": [
          "Fundraising",
          "Community Engagement"
      ],
      "role": "Director of a non-profit organization dedicated to providing educational resources to underserved communities."
  },
  {
      "name": "Hiroshi Tanaka",
      "sector": "Energy & Environment",
      "expertise": [
          "Renewable Energy",
          "Policy Advocacy"
      ],
      "role": "Consultant for sustainable energy projects, advising on solar and wind energy integration."
  },
  {
      "name": "Isabella Rossi",
      "sector": "Fashion & Retail",
      "expertise": [
          "Brand Strategy",
          "Ethical Fashion"
      ],
      "role": "Creative Director of an ethical fashion brand, focusing on sustainable production and global market expansion."
  },
  {
      "name": "Marcus Brown",
      "sector": "Media & Entertainment",
      "expertise": [
          "Content Creation",
          "Film Production"
      ],
      "role": "Independent film producer and mentor for aspiring filmmakers, with a focus on storytelling and distribution."
  }
]

const AIChatbot = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({
    buildSkills: "",
    sector: "",
    profile: "",
    emphasis1: "",
    emphasis2: "",
  });
  const [botResponse, setBotResponse] = useState("");

  const questions = [
    "What skills are you looking to build?",
    "Which sector are you interested in?",
    "Please describe yourself (e.g., experience, personality, goals).",
    "What is the first area of emphasis (e.g., fundraising, digital marketing)?",
    "What is the second area of emphasis?",
  ];

  const handleUserInput = async (input) => {
    // Save the user's input for the current step
    const newResponses = { ...responses };
    if (step === 0) newResponses.buildSkills = input;
    if (step === 1) newResponses.sector = input;
    if (step === 2) newResponses.profile = input;
    if (step === 3) newResponses.emphasis1 = input;
    if (step === 4) newResponses.emphasis2 = input;

    setResponses(newResponses);

    // Proceed to the next step or finalize
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Generate the prompt and call the AI API
      const aiPrompt = `
        We have an individual looking for a mentor for help to ${newResponses.buildSkills} in the ${newResponses.sector} sector.
        The person has a profile of ${newResponses.profile}.
        From ${MentorsList}, please return the top three options for the individual, with an emphasis on ${newResponses.emphasis1} and ${newResponses.emphasis2}.
        Please return the name, sector, role and reason for each mentor. Do not return any other information or text.
      `;

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessages: [{ role: "user", content: aiPrompt }],
        }),
      });

      const data = await response.json();
      setBotResponse(data.response);
      onComplete(data.response); // Pass the AI response back to the parent component
    }
  };

  return (
    <div>
      {botResponse ? (
        <div>
          <h2>Suggested Mentors</h2>
          <pre>{botResponse}</pre>
        </div>
      ) : (
        <div>
          <p>{questions[step]}</p>
          <input
            className="text-black"
            type="text"
            onBlur={(e) => handleUserInput(e.target.value)}
            placeholder="Type your answer here"
          />
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
