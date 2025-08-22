import NoteForm from "@/components/NoteForm";
import NotesList from "@/components/NotesList";
import { useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

// for successful deletion, toast() not showing why? resolve this.
// once changing filter to default without erasing content. It also occur in the default note input value

const Home = () => {
  const [isEditable, setIsEditble] = useState<boolean>(false);
  const [editableId, setEditableId] = useState<string>("");
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterNoteText, setFilterNoteText] = useState<string>("");

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

  function handleIsFilter() {
    setIsFilter((prev) => !prev);
    if (isFilter) {
      toast.info("Filter Removed!");
      setFilterNoteText("");
    } else {
      toast.info("Filter Notes by Tags");
    }
  }

  function handleFilterNoteText(text: string) {
    if (isFilter) setFilterNoteText(text);
    else setFilterNoteText("");
  }

  return (
    <div>
      <div className="w-sm space-y-5 shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-6 rounded-sm">
        <h2 className="font-bold text-2xl text-center mb-6">📝 NoteNest</h2>
        <NoteForm
          isEditable={isEditable}
          editableId={editableId}
          isFilter={isFilter}
          handleIsEditable={handleIsEditable}
          handleIsFilter={handleIsFilter}
          handleFilterNoteText={handleFilterNoteText}
        />
      </div>
      <NotesList
        isEditable={isEditable}
        filterNoteText={filterNoteText}
        handleIsEditable={handleIsEditable}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        theme="light"
        transition={Slide}
      />
    </div>
  );
};

export default Home;
