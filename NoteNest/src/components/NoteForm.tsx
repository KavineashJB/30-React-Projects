import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import db from "@/lib/firebase";
import { IoMdClose } from "react-icons/io";
import { MdFilterAltOff, MdFilterAlt } from "react-icons/md";
import { toast } from "react-toastify";
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
  isFilter: boolean;
  handleIsEditable: (id: string) => void;
  handleIsFilter: () => void;
  handleFilterNoteText: (text: string) => void;
};

const NoteForm = ({
  isEditable,
  editableId,
  isFilter,
  handleIsEditable,
  handleIsFilter,
  handleFilterNoteText,
}: Props) => {
  const [notes, setNotes] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

    inputRef?.current?.focus();
    setNoteData();
  }, [isEditable]);

  const handleAddTags = () => {
    if (!tag) {
      toast.warn("Please fill the Tag 😊");
      return;
    }

    const findIndex = tags.findIndex(
      (currTag) =>
        currTag.toLowerCase().includes(tag.toLowerCase()) ||
        tag.toLowerCase().includes(currTag.toLowerCase())
    );
    if (findIndex === -1) setTags([...tags, tag]);
    else toast.warn("Tag already Added!");
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
      toast.warn("Please fill the Note 😊");
      return false;
    }
    setLoading(true);

    try {
      if (!isCancelled) {
        if (isEditable) {
          const noteRef = doc(db, "notes", editableId);

          await updateDoc(noteRef, {
            content: notes,
            tags: [...tags],
            updatedAt: serverTimestamp(),
          });
          toast.success("Note Updated Successfully!");
        } else {
          await addDoc(collection(db, "notes"), {
            content: notes,
            tags: [...tags],
            createdAt: serverTimestamp(),
          });
          toast.success("Note Added Successfully!");
        }
      } else {
        toast.success("Cancelled Successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }

    setNotes("");
    setLoading(false);
    setTags([]);

    // setting the editable id to empty
    handleIsEditable("");
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setNotes(e.target.value);
      if (isFilter) {
        handleFilterNoteText(value);
      } else {
        handleFilterNoteText("");
      }
    } else {
      alert("maximum characters reached!");
    }
  };

  return (
    <div className="space-y-3 ">
      <div className="flex flex-col gap-1 mb-4">
        <div className="flex items-center gap-3">
          <Input
            ref={inputRef}
            placeholder={(isFilter ? "Filter" : "Type") + " notes here..."}
            value={notes}
            onChange={(e) => handleNoteChange(e)}
          />
          <Button
            title={!isFilter ? "Filter Notes by Tags" : "Remove Filter"}
            className="cursor-pointer"
            onClick={() => {
              setNotes("");
              handleIsFilter();
            }}>
            {isFilter ? <MdFilterAltOff /> : <MdFilterAlt />}
          </Button>
        </div>
        <div
          className={`${
            isFilter && "invisible"
          } text-gray-400 ml-2 font-semibold text-[13px]`}>
          {notes.length + "/50"}
        </div>
      </div>
      <div className="flex gap-3">
        <Input
          placeholder={(isEditable ? "Edit" : "Add") + " tags to the notes..."}
          value={tag}
          disabled={isFilter}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button
          className="cursor-pointer"
          disabled={isFilter}
          onClick={handleAddTags}>
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
          onClick={() => {
            !isFilter && handleSaveNotes(false);
          }}>
          {loading
            ? "Saving..."
            : isEditable
            ? "Update Note"
            : isFilter
            ? "Search Notes"
            : "Save Notes"}
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
