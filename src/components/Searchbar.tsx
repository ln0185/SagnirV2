import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import searchIcon from "../../public/resources/search icon dark mode.svg";
import crossIcon from "../../public/resources/cross dark mode.svg";
import { StoriesCard } from "../components/StoriesCard";

interface StoryInterface {
  category: string;
  stories: Record<string, string>;
}

interface SearchbarProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
}

export const Searchbar: React.FC<SearchbarProps> = ({
  isSearchOpen,
  setIsSearchOpen,
}) => {
  const [searchedStory, setSearchedStory] = useState<string>("");
  const [allStories, setAllStories] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getSearchedStories = async () => {
      const res = await fetch(`/api/all`);
      const data = await res.json();

      const allFetchedStories = data?.flatMap((item: StoryInterface) => {
        return Object.values(item.stories?.stories ?? {});
      });

      setAllStories(allFetchedStories || []);
    };

    getSearchedStories();
  }, []);

  useEffect(() => {
    if (searchedStory.trim() === "") {
      setSearchResult([]);
      return;
    }

    const filteredStories = allStories.filter((story: string) =>
      story.toLowerCase().includes(searchedStory.toLowerCase())
    );

    setSearchResult(filteredStories);
  }, [searchedStory, allStories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen, setIsSearchOpen]);

  return (
    <div
      className={`fixed inset-0 bg-sagnir-100 bg-opacity-50 z-50 transition-opacity duration-300 ${
        isSearchOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={searchRef}
        className="absolute bottom-12 inset-x-4 mb-2 md:inset-x-96 w-[350px] md:w-[465px] bg-sagnir-100 p-4 rounded-md shadow-lg flex items-center space-x-3"
      >
        <div className="relative flex items-center w-full">
          <Image
            src={searchIcon}
            alt="Search Icon"
            className="absolute left-3"
          />
          <input
            className="bg-sagnir-100 text-sagnir-200 font-glare px-10 py-2 rounded-md w-full border border-sagnir-200 focus:outline-none focus:ring-2 focus:ring-sagnir-300"
            type="text"
            placeholder="Search..."
            value={searchedStory}
            onChange={(e) => setSearchedStory(e.target.value)}
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-3"
            aria-label="Close search"
          >
            <Image src={crossIcon} alt="Close Icon" className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-24 left-4 right-4 mb-4 -z-10 md:left-96 md:right-96 w-[350px] md:w-[465px] text-sagnir-200 bg-sagnir-100 rounded-lg shadow-md p-4 font-glare">
        {searchResult.length > 0 ? (
          <StoriesCard
            data={{ category: "", stories: searchResult }}
            categoryName={"all"}
            links={searchResult.map(() => "")}
          />
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};
