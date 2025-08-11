import MoodInput from "@/components/MoodInput";
import MoodOutput from "@/components/MoodOutput";
import { useState } from "react";

const Home = () => {
  const [mood, setMood] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [footer, setFooter] = useState<string>("");
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  function handleGenerateEmail() {
    let moodString = mood.toLowerCase();
    if (moodString.includes("happy")) {
      setSubject("Feeling Greateful Today 😊");
      setFooter("Spread Hapiness...");
    } else if (moodString.includes("sad")) {
      setSubject("Just another tough day!");
      setFooter("Time will fade everything...");
    } else if (moodString.includes("angry") || moodString.includes("anger")) {
      setSubject("UnControlled Emotion!");
      setFooter("Deep Breaths...");
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
        <MoodOutput subject={subject} footer={footer} onReset={handleReset} />
      )}
    </div>
  );
};

export default Home;
