import React from "react";
import { Input } from "./ui/input";
import { MdClear } from "react-icons/md";
import { Button } from "./ui/button";

interface Props {
  query: string;
  setQuery: (value: string) => void;
  setIsTrending: (value: boolean) => void;
  handleLoadMore: (val: boolean) => void;
}

const SearchBar: React.FC<Props> = ({
  query,
  setQuery,
  setIsTrending,
  handleLoadMore,
}) => {
  const autoFocusInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    autoFocusInputRef?.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTrending(false);
    handleLoadMore(false);
    setQuery(e.target.value);
  };
  return (
    <div className="relative">
      <Input
        ref={autoFocusInputRef}
        className="absolute w-9/12"
        value={query}
        placeholder="Search query..."
        onChange={handleChange}
      />
      <span className="w-3/12 absolute top-2 right-7 text-left ">
        <MdClear
          className="cursor-pointer"
          onClick={() => setQuery("")}
          title="Clear"
        />
      </span>
      <Button
        className="w-3/12 absolute right-0"
        onClick={() => {
          setIsTrending(true);
          setQuery("");
        }}>
        Feeling Lucky
      </Button>
    </div>
  );
};

export default SearchBar;
