import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  onSnapshot,
  doc,
  Timestamp,
} from "firebase/firestore";
import db from "@/lib/firebase";
import { Button } from "./ui/button";

type Notes = {
  id: string;
  content: string;
  createdAt: string;
  tags: string[];
  updatedAt?: string;
};

type Props = {
  handleIsEditable: (id: string) => void;
  isEditable: boolean;
};

const NotesList = ({ isEditable, handleIsEditable }: Props) => {
  const [notesList, setNotesList] = useState<Notes[]>([]);

  useEffect(() => {
    const unSubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
      const notesData = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          content: data.content,
          tags: [...data.tags],
          createdAt:
            data.createdAt instanceof Timestamp
              ? data.createdAt
                  .toDate()
                  .toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  // Using regular expression to match exacty with "am" and "pm" and convert into "AM" and "PM"
                  .replace(/(am|pm)/, (match: string) => match.toUpperCase())
              : "",
          updatedAt:
            data?.updatedAt instanceof Timestamp
              ? data.createdAt
                  .toDate()
                  .toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  // Using regular expression to match exacty with "am" and "pm" and convert into "AM" and "PM"
                  .replace(/(am|pm)/, (match: string) => match.toUpperCase())
                  .concat(" (Edited)")
              : "",
        };
      }) as Notes[];

      setNotesList(notesData);
    });

    return () => unSubscribe();
  }, []);

  const handlDeleteNotes = async (id: string) => {
    await deleteDoc(doc(db, "notes", id));
  };

  if (notesList.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-4">
        No Notes are available...
      </p>
    );
  }

  return (
    <div
      className={`${
        isEditable && "opacity-50 pointer-events-none"
      } max-w-sm grid gap-4 mt-4 grid-cols-1`}>
      {notesList.map((notes) => (
        <div
          key={notes.id}
          className="max-w-full space-y-2 overflow-hidden flex flex-col space-x-2 items-center justify-between border rounded-md p-3 shadow-md hover:shadow-xl transition-all duration-300">
          <div className="text-right w-full">
            <div className="w-full text-left mb-1">
              {notes?.tags.map((tag) => (
                <Button
                  className="text-[14px] h-7 rounded-xl m-1 cursor-pointer"
                  key={tag}>
                  {tag}
                </Button>
              ))}
            </div>
            <hr />
          </div>
          <div className="w-full flex flex-col gap-4 ">
            <p className="text-gray-700 p-2 border-2 rounded-md font-semibold">
              {notes.content}
            </p>
            <div className="flex justify-between items-center">
              {/* Timestamp of the Note */}
              <p className="cursor-default text-[13px] text-gray-400 font-semibold p-2">
                {notes.updatedAt ? notes.updatedAt : notes.createdAt}
              </p>
              {/* Notes Edit and Delete Button */}
              <div className="flex space-x-2">
                <Button
                  className="text-sm cursor-pointer bg-green-600 hover:bg-green-600"
                  size={"sm"}
                  onClick={() => handleIsEditable(notes.id)}>
                  Edit
                </Button>
                <Button
                  className="text-sm cursor-pointer"
                  size={"sm"}
                  variant={"destructive"}
                  onClick={() => handlDeleteNotes(notes.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
