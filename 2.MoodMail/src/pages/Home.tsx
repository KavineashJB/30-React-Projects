import MoodInput from "@/components/MoodInput";
import MoodOutput from "@/components/MoodOutput";
import { useState } from "react";

type MoodTemplate = {
  mood: string;
  subject: string;
  footer: string;
  color: string;
};

const Home = () => {
  const [mood, setMood] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [footer, setFooter] = useState<string>("");
  const [color, setColor] = useState<string>("#ABCD12");
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const moods: MoodTemplate[] = [
    {
      mood: "happy",
      subject: "Feeling Grateful Today 😊",
      footer: "Spread Happiness...",
      color: "#F8D663", // Bright yellow: joy, optimism, positivity
    },
    {
      mood: "excited",
      subject: "Can’t Wait for What’s Next!",
      footer: "Let’s go 🚀",
      color: "#FF4500", // Vibrant orange-red: excitement, enthusiasm, energy
    },
    {
      mood: "sad",
      subject: "Just Another Tough Day",
      footer: "This too shall pass...",
      color: "#4682B4", // Soft blue: calmness, melancholy
    },
    {
      mood: "angry",
      subject: "Uncontrolled Emotion!",
      footer: "Deep breaths...",
      color: "#B22222", // Deep red: intensity, anger
    },
    {
      mood: "stressed",
      subject: "Need a Break!",
      footer: "Take it easy on yourself ❤️",
      color: "#8B0000", // Dark crimson: urgency, stress
    },
    {
      mood: "romantic",
      subject: "Thinking About You 💖",
      footer: "Love always...",
      color: "#FF69B4", // Pink: romance, affection
    },
    {
      mood: "bored",
      subject: "Nothing Much Happening...",
      footer: "Let’s make it interesting!",
      color: "#A9A9A9", // Gray: dullness, neutrality
    },
    {
      mood: "curious",
      subject: "Exploring New Ideas",
      footer: "Stay curious 🔍",
      color: "#32CD32", // Lime green: growth, curiosity, freshness
    },
  ];

  function handleGenerateEmail() {
    let moodString: string = mood.toLowerCase();
    if (!moodString) return;
    const foundMood: MoodTemplate | undefined = moods.find(
      (emotion) => emotion.mood === moodString
    );

    if (foundMood) {
      setSubject(foundMood.subject);
      setFooter(foundMood.footer);
      setColor(foundMood.color);
    } else {
      setSubject("Awesome Mood!");
      setFooter("Catch you later...");
    }

    setIsGenerated(true);
  }

  function handleReset() {
    setMood("");
    setSubject("");
    setFooter("");
    setColor("#ABCD12");
    setIsGenerated(false);
  }
  return (
    <div className="rounded-sm border p-6 max-w-xl min-w-sm">
      <h2 className="text-center font-semibold text-gray-600 text-xl mb-3">
        MoodMail Generator
      </h2>

      {!isGenerated ? (
        <MoodInput
          mood={mood}
          setMood={setMood}
          onGenerate={handleGenerateEmail}
          disabled={isGenerated}
        />
      ) : (
        <MoodOutput
          color={color}
          subject={subject}
          footer={footer}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default Home;
