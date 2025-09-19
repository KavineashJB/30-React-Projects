import { useEffect, useState } from "react";
import QuoteInput from "./components/QuoteInput";
import QuoteList from "./components/QuoteList";
import { instance } from "./lib/axiosBaseURL";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { CiLight, CiDark } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./index.css";

const App = () => {
  const [text, setText] = useState<string>("");
  const [allQuotes, setAllQuotes] = useState<
    { _id: string; text: string; createdAt: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [order, setOrder] = useState<"ascending" | "descending">("descending");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const userTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (userTheme) return userTheme;
    return "dark";
  });
  const [page, setPage] = useState<number>(1);
  const [totalQuotes, setTotalQuotes] = useState<number>(0);
  const limit: number = 5;

  const getAllQuotes = async () => {
    setLoading(true);

    try {
      const response = await instance.get(`/?page=${page}&limit=${limit}`);

      setAllQuotes(response.data.content);
      setTotalQuotes(response.data.totalQuotes);
    } catch (error) {
      console.log("Get All Quote Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredQuotes = async () => {
    if (!isFilter) {
      getAllQuotes();
      return;
    }
    try {
      setLoading(true);
      let orderBy: number = order == "descending" ? -1 : 1;

      const response = await instance.get(
        `/filter?filter=${filter}&order=${orderBy}&page=${page}&limit=${limit}`
      );
      setTotalQuotes(response.data.totalQuotes);
      setAllQuotes(response.data.content);
    } catch (error) {
      console.log("Get Filtered Quote Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const postAQuote = async () => {
    try {
      setLoading(true);
      if (!text.trim()) {
        toast.warn("Text should not be Empty!");
        return;
      }

      await instance.post("/", { text });
      setText("");
      toast.success("Quote Added Successfully 🎉");
      getAllQuotes();
    } catch (error) {
      console.log("Posting Quote Error:", error);
      if (error?.response?.data?.message == "Quote Should be Unique") {
        setText("");
        toast.error("Quotes should not be Duplicate.");
      }
    } finally {
      setLoading(false);
    }
  };

  const putQuote = async (id: string, editableText: string) => {
    try {
      setLoading(true);
      await instance.put(`/${id}`, { text: editableText });
      toast.success("Quote Updated Successfully 🎉");
      getAllQuotes();
    } catch (error) {
      console.log("Update Quote Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuote = async (id: string) => {
    try {
      await instance.delete(`/${id}`);
      toast.success("Quote Deleted Successfully 🎉");
      getAllQuotes();
    } catch (error) {
      console.log("Deletion Quote Error:", error);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isFilter) {
      getFilteredQuotes();
    } else {
      getAllQuotes();
    }
  }, [page, filter, order]);

  function handleFilterChange() {
    if (isFilter) {
      toast.success("Filter Mode - OFF");
      setFilter("");
      setText("");
      getAllQuotes();
    } else {
      toast.success("Filter Mode - ON");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center gap-4
    dark:bg-black dark:text-white"
    >
      <div className="relative w-[400px] dark:shadow-gray-700 hover:dark:shadow-lg dark:shadow-md shadow-lg rounded-lg hover:shadow-2xl p-5 flex flex-col gap-3 items-center">
        <h1 className="font-bold text-2xl text-purple-700">QuoteBoard 📝</h1>
        <div
          className="absolute right-1 top-0 rounded-full border-1 border-gray-400 p-1 mt-5 cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <CiLight
              className="text-2xl transition-transform duration-500 rotate-360"
              title="Light"
            />
          ) : (
            <CiDark
              className="text-2xl transition-transform duration-500 rotate-360"
              title="Dark"
            />
          )}
        </div>
        <QuoteInput
          text={text}
          isEditable={isEditable}
          isFilter={isFilter}
          filter={filter}
          setText={setText}
          getFilteredQuotes={getFilteredQuotes}
          postAQuote={postAQuote}
          handleFilterChange={handleFilterChange}
          setIsFilter={setIsFilter}
          setFilter={setFilter}
        />
      </div>
      {isFilter && (
        <div className="w-[400px] text-left">
          <select
            className="border-1 bg-accent focus-within:border-gray-700 outline-0 cursor-pointer text-gray-400 rounded-full py-1 px-3 border-gray-600"
            onChange={(e) =>
              setOrder(e.target.value as "ascending" | "descending")
            }
          >
            <option value="descending">Latest First</option>
            <option value="ascending">Oldest First</option>
          </select>
        </div>
      )}

      <div className="w-[400px]">
        <QuoteList
          allQuotes={allQuotes}
          isEditable={isEditable}
          loading={loading}
          deleteQuote={deleteQuote}
          setIsEditable={setIsEditable}
          putQuote={putQuote}
        />
      </div>
      <div className="w-[400px] flex justify-center gap-2 items-center">
        <IoIosArrowBack
          title="Previous Page"
          className={`hover:bg-accent rounded-full text-2xl cursor-pointer
             ${page == 1 && "opacity-20 pointer-events-none"}`}
          onClick={() => setPage((prev) => prev - 1)}
        />
        <IoIosArrowForward
          title="Next Page"
          className={`hover:bg-accent rounded-full text-2xl cursor-pointer
             ${
               page * (limit > totalQuotes ? totalQuotes : limit) >=
                 totalQuotes && "opacity-20 pointer-events-none"
             }`}
          onClick={() => setPage((prev) => prev + 1)}
        />
      </div>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
        closeOnClick={true}
        transition={Bounce}
        theme={theme}
      />
    </div>
  );
};

export default App;
