export const fetchGif = async (
  query: string,
  isTrending: boolean,
  limit: number,
  loadMore: number
) => {
  // .env variables always begins with VITE while using React+Vite;
  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
  const offset: number = loadMore - limit;

  const url = `https://api.giphy.com/v1/gifs/${
    isTrending ? "trending?" : "search?q=" + query + "&"
  }api_key=${apiKey}&limit=${limit}&offset=${offset}`;

  console.log(url);
  try {
    return await fetch(url)
      .then(async (res) => await res.json())
      .then((res) => res.data);
  } catch (error) {
    console.error("Fetching Error: ", error);
    return [];
  }
};
