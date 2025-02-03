"use client";

import React, { useState, useEffect } from "react";
import { StoriesHeader } from "../components/StoriesHeader";
import { Categories } from "../components/Categories";
import { StoriesCard } from "../components/StoriesCard";

interface StoryInterface {
  category: string;
  stories: Record<string, string>;
}

interface StoriesCategoryArrayInterface {
  category: string;
  stories: StoryInterface[];
}

const categoryDisplayNames: { [key: string]: string } = {
  troll: "Tröll",
  draug: "Draugar",
  alfa: "Álfar og huldufólk",
  efra: "Helgisögur",
};

export default function StoriesPage() {
  const [allStories, setAllStories] = useState<StoriesCategoryArrayInterface[]>(
    []
  );
  const [clickedCategory, setClickedCategory] = useState<string>("all");
  const [visibleStories, setVisibleStories] = useState<number>(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/all");
        if (!res.ok) {
          return;
        }
        const data = (await res.json()) as StoriesCategoryArrayInterface[];
        setAllStories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const categoryNames =
    allStories?.map(
      (category: StoriesCategoryArrayInterface) =>
        categoryDisplayNames[category.category] || category.category
    ) || [];

  const selectedCategory: StoriesCategoryArrayInterface | undefined =
    clickedCategory === "all"
      ? { category: "all", stories: allStories.flatMap((c) => c.stories) }
      : allStories.find((item) => item.category === clickedCategory);

  const selectedStories = selectedCategory?.stories || [];

  let formattedStories: Record<string, string> = {};

  if (Array.isArray(selectedStories)) {
    formattedStories = selectedStories
      .map((story) => Object.entries(story.stories))
      .flat()
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
  }

  const loadMoreStories = () => {
    setVisibleStories((prevVisibleStories) => prevVisibleStories + 3);
  };

  const displayedStories = Object.keys(formattedStories)
    .slice(0, visibleStories)
    .reduce((acc, key) => {
      acc[key] = formattedStories[key];
      return acc;
    }, {} as Record<string, string>);

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
        {Object.keys(displayedStories).length > 0 ? (
          <>
            <StoriesCard
              data={{
                category: clickedCategory,
                stories: displayedStories,
              }}
              categoryName={clickedCategory}
              visibleStories={visibleStories}
            />
            {Object.keys(displayedStories).length <
              Object.keys(formattedStories).length && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={loadMoreStories}
                  className="px-4 py-2 bg-sagnir-100 font-glare text-sagnir-200 text-md lg:text-md rounded border border-sagnir-200"
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
