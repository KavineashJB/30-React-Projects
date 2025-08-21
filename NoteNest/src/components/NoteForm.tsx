import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import db from "@/lib/firebase";
import { IoMdClose } from "react-icons/io";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

type Props = {
  isEditable: boolean;
  editableId: string;
  handleIsEditable: (id: string) => void;
};

const NoteForm = ({ isEditable, editableId, handleIsEditable }: Props) => {
  const [notes, setNotes] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const setNoteData = async () => {
      if (isEditable) {
        const noteRef = doc(db, "notes", editableId);
        const noteData = await getDoc(noteRef);

        if (noteData.exists()) {
          const data = noteData?.data();
          setNotes(data?.content);
          setTags([...data?.tags]);
        } else {
          console.log("No such Notes...");
        }
      }
    };

    setNoteData();
  }, [isEditable]);

  const handleAddTags = () => {
    if (!tag) return;
    setTags([...tags, tag]);
    setTag("");
  };

  const handleDeleteTag = (index: number): void => {
    let filteredTags: string[] = tags.filter(
      (_, tagIndex) => tagIndex !== index
    );

    setTags([...filteredTags]);
  };

  const handleSaveNotes = async (isCancelled: boolean) => {
    if (!notes.trim() && !isCancelled) {
      alert("Please fill the Notes 😊");
      return;
    }
    setLoading(true);

    if (!isCancelled) {
      if (isEditable) {
        const noteRef = doc(db, "notes", editableId);

        await updateDoc(noteRef, {
          content: notes,
          tags: [...tags],
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "notes"), {
          content: notes,
          tags: [...tags],
          createdAt: serverTimestamp(),
        });
      }
    }

    setNotes("");
    setLoading(false);
    setTags([]);
    // setting the editable id to empty
    handleIsEditable("");
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Type notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="flex gap-3">
        <Input
          placeholder="Add tags to the notes..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button className="cursor-pointer" onClick={handleAddTags}>
          Add
        </Button>
      </div>
      <div className="overflow-auto">
        {tags.map((tag, index) => (
          <Button
            className="m-1 cursor-pointer "
            key={tag}
            onClick={() => handleDeleteTag(index)}>
            {tag} <IoMdClose />
          </Button>
        ))}
      </div>
      <div className="flex justify-between items-center gap-1">
        <Button
          className={`${isEditable ? "w-6/12" : " w-full"} cursor-pointer`}
          disabled={loading}
          onClick={() => handleSaveNotes(false)}>
          {loading ? "Saving..." : isEditable ? "Update Note" : "Save Notes"}
        </Button>
        {isEditable && (
          <Button
            onClick={() => handleSaveNotes(true)}
            className="w-6/12 cursor-pointer"
            variant={"destructive"}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default NoteForm;
