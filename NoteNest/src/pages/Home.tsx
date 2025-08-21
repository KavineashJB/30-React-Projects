import NoteForm from "@/components/NoteForm";
import NotesList from "@/components/NotesList";
import { useState } from "react";

const Home = () => {
  const [isEditable, setIsEditble] = useState<boolean>(false);
  const [editableId, setEditableId] = useState<string>("");

  function handleIsEditable(id: string) {
    // toggle the editability because this function is handled by both NoteForm and NoteList Components
    if (id) {
      setIsEditble(true);
    } else {
      setIsEditble(false);
    }

    // If there is a editable Id then edit otherwise set to empty string
    setEditableId(id);
  }

  return (
    <div>
      <div className="w-sm space-y-5 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-6 rounded-sm">
        <h2 className="font-bold text-2xl text-center mb-6">📝 NoteNest</h2>
        <NoteForm
          isEditable={isEditable}
          editableId={editableId}
          handleIsEditable={handleIsEditable}
        />
      </div>
      <NotesList isEditable={isEditable} handleIsEditable={handleIsEditable} />
    </div>
  );
};

export default Home;
