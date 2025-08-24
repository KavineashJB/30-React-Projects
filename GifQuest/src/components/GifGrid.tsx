import React from "react";
import { fetchGif } from "@/lib/giphy";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

interface Props {
  limit: number;
  query: string;
  isTrending: boolean;
  loadMore: number;
  handleLoadMore: (value: boolean) => void;
}

const GifGrid: React.FC<Props> = ({
  limit,
  query,
  isTrending,
  loadMore,
  handleLoadMore,
}) => {
  const [gifs, setGifs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const moveToNewGifRef = React.useRef<HTMLDivElement | null>(null);
  const maxLimit: number = 10;

  React.useEffect(() => {
    if (moveToNewGifRef.current) {
      moveToNewGifRef.current.scrollTop = moveToNewGifRef.current.scrollHeight;
    }
  }, [loadMore]);

  React.useEffect(() => {
    if (!query && !isTrending) {
      setGifs([]);
      return;
    }
    setLoading(true);
    console.log(loadMore);
    loadMore <= maxLimit && getGif(query);
  }, [query, isTrending, loadMore]);

  async function getGif(query: string) {
    try {
      const res = await fetchGif(query, isTrending, limit, loadMore);
      if (res.length == 0) {
        setGifs([]);
        toast.error("No Gifs Found!!");
        return;
      }
      if (loadMore > limit) setGifs((prev) => [...prev, ...res]);
      else setGifs(res);
    } catch (error) {
      console.error("Fetch Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (loadMore === maxLimit) {
      console.log("MaxLoadMore");
      toast.warn(`Maximum Limit ${maxLimit} Gifs Reached`);
    }
  }, [loadMore]);

  return (
    <>
      <div
        className={`mt-10 ${
          gifs?.length == 0 || loading ? "flex" : "columns-5"
        } gap-2 text-center font-semibold`}>
        {loading ? (
          <p className="w-full text-shadow-md font-semibold">Loading...</p>
        ) : (
          gifs.map((gif) => (
            <div key={gif.id}>
              <img
                className="block mb-2"
                src={gif.images.fixed_height.url}
                alt={gif.title}
                loading="lazy"
              />
            </div>
          ))
        )}
      </div>
      <div className="w-full text-center">
        {gifs.length !== 0 && !loading && (
          <Button
            disabled={loadMore === maxLimit}
            className="cursor-pointer mb-2"
            onClick={() => handleLoadMore(true)}>
            Load More
          </Button>
        )}
      </div>
    </>
  );
};

export default GifGrid;
