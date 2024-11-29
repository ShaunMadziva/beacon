"use client";
import { useState } from "react";

const MentorsList = [
  {
    name: "Alex Carter",
    sector: "Technology (Software Development)",
    expertise: ["Full-Stack Development", "Cloud Computing"],
    role: "Senior Software Engineer at a Fortune 500 company, with over a decade of experience building scalable web applications and mentoring junior developers.",
  },
  {
    name: "Priya Malhotra",
    sector: "Finance & Banking",
    expertise: ["Financial Analysis", "Risk Management"],
    role: "Investment Manager at a leading bank, specializing in portfolio management and sustainable investment strategies.",
  },
  {
    name: "Sarah Johnson",
    sector: "Healthcare",
    expertise: ["Healthcare IT", "Telemedicine"],
    role: "Digital Health Consultant, supporting healthcare startups in implementing innovative telemedicine solutions.",
  },
  {
    name: "Miguel Torres",
    sector: "Education",
    expertise: ["EdTech", "Curriculum Design"],
    role: "Founder of an EdTech startup that develops AI-driven personalized learning platforms for schools and universities.",
  },
  {
    name: "Emma Zhang",
    sector: "E-Commerce",
    expertise: ["Digital Marketing", "Customer Analytics"],
    role: "Head of Marketing for a fast-growing online retail platform, focusing on SEO, SEM, and user engagement strategies.",
  },
  {
    name: "James O'Neill",
    sector: "Manufacturing",
    expertise: ["Lean Manufacturing", "Supply Chain Optimization"],
    role: "Operations Manager at a global manufacturing firm, known for implementing cost-effective production processes.",
  },
  {
    name: "Amina Yusuf",
    sector: "Non-Profit & Social Enterprises",
    expertise: ["Fundraising", "Community Engagement"],
    role: "Director of a non-profit organization dedicated to providing educational resources to underserved communities.",
  },
  {
    name: "Hiroshi Tanaka",
    sector: "Energy & Environment",
    expertise: ["Renewable Energy", "Policy Advocacy"],
    role: "Consultant for sustainable energy projects, advising on solar and wind energy integration.",
  },
  {
    name: "Isabella Rossi",
    sector: "Fashion & Retail",
    expertise: ["Brand Strategy", "Ethical Fashion"],
    role: "Creative Director of an ethical fashion brand, focusing on sustainable production and global market expansion.",
  },
  {
    name: "Marcus Brown",
    sector: "Media & Entertainment",
    expertise: ["Content Creation", "Film Production"],
    role: "Independent film producer and mentor for aspiring filmmakers, with a focus on storytelling and distribution.",
  },
];

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
  const [input, setInput] = useState("");

  const questions = [
    "What skills are you looking to build?",
    "Which sector are you interested in?",
    "Please describe yourself (e.g., experience, personality, goals).",
    "What is the first area of emphasis (e.g., fundraising, digital marketing)?",
    "What is the second area of emphasis?",
  ];

  const handleUserInput = async (inputValue) => {
    // Save the user's input for the current step
    const newResponses = { ...responses };
    if (step === 0) newResponses.buildSkills = inputValue;
    if (step === 1) newResponses.sector = inputValue;
    if (step === 2) newResponses.profile = inputValue;
    if (step === 3) newResponses.emphasis1 = inputValue;
    if (step === 4) newResponses.emphasis2 = inputValue;

    setResponses(newResponses);
    console.log("!!!!!", newResponses);
    setInput(""); // Clear input after each prompt

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
      console.log("*******", data);
      setBotResponse(data.response);
      onComplete(data.response); // Pass the AI response back to the parent component
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-3xl p-8">
        {botResponse ? (
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800 text-center">
              Suggested Mentors
            </h2>
            <pre className="bg-gray-100 p-6 rounded-lg text-gray-700 text-lg whitespace-pre-line">
              {botResponse}
            </pre>
            <button
              className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 text-lg font-semibold"
              onClick={() => {
                setStep(0);
                setBotResponse("");
              }}
            >
              Restart Chat
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold text-gray-800 text-center mb-6">
              {questions[step]}
            </p>
            <input
              className="w-full p-4 border border-gray-300 rounded-lg shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  handleUserInput(input);
                }
              }}
              placeholder="Type your answer here..."
            />
            <button
              onClick={() => input.trim() !== "" && handleUserInput(input)}
              className="mt-2 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-700 focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;
