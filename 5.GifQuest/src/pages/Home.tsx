import React from "react";
import GifGrid from "@/components/GifGrid";
import SearchBar from "@/components/SearchBar";
import { Slide, ToastContainer } from "react-toastify";

const Home = () => {
  const limit: number = 5;
  const [query, setQuery] = React.useState<string>("");
  const [isTrending, setIsTrending] = React.useState<boolean>(false);
  const [loadMore, setLoadMore] = React.useState<number>(limit);

  function handleLoadMore(isLoadMore: boolean) {
    if (isLoadMore) setLoadMore((prev) => prev + limit);
    else setLoadMore(limit);
  }
  return (
    <div className="overflow-hidden flex flex-col gap-3 m-3 min-w-lg max-w-4xl ">
      <h2 className="text-3xl text-center font-bold">📝Query Quest</h2>
      <SearchBar
        query={query}
        setQuery={setQuery}
        setIsTrending={setIsTrending}
        handleLoadMore={handleLoadMore}
      />
      <GifGrid
        limit={limit}
        query={query}
        isTrending={isTrending}
        loadMore={loadMore}
        handleLoadMore={handleLoadMore}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="light"
        hideProgressBar
        transition={Slide}
      />
    </div>
  );
};

export default Home;
