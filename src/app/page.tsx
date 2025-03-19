"use client";

import React, { useEffect, useState } from "react";
import { StoriesHeader } from "../components/StoriesHeader";
import { Categories } from "../components/Categories";
import { StoriesCard } from "../components/StoriesCard";

interface StoriesCategoryArrayInterface {
  category: string;
  stories: {
    category: string;
    stories: string[];
    links: string[];
  };
}

const categoryDisplayNames: { [key: string]: string } = {
  all: "Allt",
  troll: "Tröll",
  draugar: "Draugar",
  "alfar-og-huldufolk": "Álfar og Huldufólk",
  "ur-efra-og-nedra-helgisogur": "Helgisögur",
};

export default function StoriesPage() {
  const [allStories, setAllStories] = useState<StoriesCategoryArrayInterface[]>(
    () => []
  );
  const [clickedCategory, setClickedCategory] = useState<string>("all");
  const [visibleStories, setVisibleStories] = useState<number>(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/all");
        if (!res.ok) {
          return;
        }
        const data: StoriesCategoryArrayInterface[] = await res.json();
        setAllStories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const categoryNames = allStories.map(
    (category) => categoryDisplayNames[category.category] || category.category
  );

  const categoryStories = allStories.find(
    (s) => s.category === clickedCategory
  ) ?? {
    category: clickedCategory,
    stories: { category: "", stories: [], links: [] },
  };

  const displayedStories =
    categoryStories.stories?.stories?.slice(0, visibleStories) ?? [];

  const loadMoreStories = () => {
    setVisibleStories((prevVisibleStories) => prevVisibleStories + 3);
  };

  return (
    <div className="z-10 bg-sagnir-100 pb-8">
      <StoriesHeader />
      {categoryNames.length > 0 && (
        <div className="sticky top-[190px] z-30 bg-sagnir-100">
          <Categories
            data={categoryNames}
            setClickedCategory={setClickedCategory}
          />
        </div>
      )}
      <div className="pt-2 pb-9 overflow-hidden">
        {visibleStories > 0 ? (
          <>
            <StoriesCard
              data={{
                category: clickedCategory,
                stories: displayedStories,
              }}
              categoryName={clickedCategory}
              links={categoryStories?.stories?.links ?? []}
            />
            {visibleStories < 20 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={loadMoreStories}
                  className="px-4 py-2 mb-1 bg-sagnir-100 font-glare text-sagnir-200 text-md lg:text-md rounded border border-sagnir-200"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-sagnir-200">Loading...</p>
        )}
      </div>
    </div>
  );
}
