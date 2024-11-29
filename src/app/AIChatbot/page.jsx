"use client";
import { useState } from "react";
import "/public/mentors.json"

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
        From ${"@/mentors.json"}, please return the top three options for the individual, with an emphasis on ${newResponses.emphasis1} and ${newResponses.emphasis2}.
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
