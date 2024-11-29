"use client";

import { useState } from "react";
import OpenAI from "openai";

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

const AIChatbot = () => {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({
    buildSkills: "",
    sector: "",
    profile: "",
    emphasis1: "",
    emphasis2: "",
  });
  const [botResponse, setBotResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    "What skills are you looking to build?",
    "Which sector are you interested in?",
    "Please describe yourself (e.g., experience, personality, goals).",
    "What is the first area of emphasis (e.g., fundraising, digital marketing)?",
    "What is the second area of emphasis?",
  ];

  const handleUserInput = async (input) => {
    const newResponses = { ...responses };
    if (step === 0) newResponses.buildSkills = input;
    if (step === 1) newResponses.sector = input;
    if (step === 2) newResponses.profile = input;
    if (step === 3) newResponses.emphasis1 = input;
    if (step === 4) newResponses.emphasis2 = input;

    setResponses(newResponses);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Final step: Call OpenAI API
      setIsLoading(true);
      const aiPrompt =
        "We have an individual looking for a mentor for help to " +
        newResponses.buildSkills +
        " in the " +
        newResponses.sector +
        " sector.\n" +
        "The person has a profile of " +
        newResponses.profile +
        ".\n" +
        "From the following list of mentors, please return the top three options for the individual, with an emphasis on " +
        newResponses.emphasis1 +
        " and " +
        newResponses.emphasis2 +
        ".\n" +
        "Mentor List:\n" +
        JSON.stringify(MentorsList, null, 2) +
        "\n" +
        "Please return the name, sector, role and reason for each mentor. Do not return any other information or text.";

      console.log("!!!!!#", newResponses);

      console.log("!!!!!", aiPrompt);

      const openai = new OpenAI({
        apiKey:
          "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",
        dangerouslyAllowBrowser: true,
      });

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: aiPrompt }],
        });
        console.log("$$$$$$", completion);
        setBotResponse(
          completion.choices[0]?.message?.content || "No response received."
        );
      } catch (error) {
        setBotResponse("Error connecting to OpenAI API. Please try again.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8">
        {botResponse ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Suggested Mentors
            </h2>
            <pre className="bg-gray-100 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
              {botResponse}
            </pre>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl font-medium mb-6 text-gray-700">
              {questions[step]}
            </p>
            <input
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 text-gray-700"
              type="text"
              onBlur={(e) => handleUserInput(e.target.value)}
              placeholder="Type your answer here..."
            />
          </div>
        )}
        {isLoading && (
          <div className="mt-6 text-purple-600 text-center animate-bounce">
            Generating your results...
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatbot;
