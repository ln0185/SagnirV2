"use client"; // Add this line at the very top

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
  const [visibleStories, setVisibleStories] = useState<number>(3); // Initial number of visible stories

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/all");
        if (!res.ok) {
          console.error("Failed to fetch data:", res.statusText);
          return;
        }
        const data: StoriesCategoryArrayInterface[] = await res.json();
        setAllStories(data);
        console.log("Fetched API data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const categoryNames =
    allStories?.map(
      (category) => categoryDisplayNames[category.category] || category.category
    ) || [];

  const selectedCategory =
    clickedCategory === "all"
      ? allStories
      : allStories.find((item) => item.category === clickedCategory);

  console.log("Clicked Category:", clickedCategory);
  console.log("All Categories:", allStories);
  console.log("Selected Category Data:", selectedCategory);

  const selectedStories =
    selectedCategory && "stories" in selectedCategory
      ? selectedCategory.stories
      : allStories.flatMap((category) => category.stories);

  let formattedStories: Record<string, string> = {};

  if (selectedStories) {
    if (Array.isArray(selectedStories)) {
      formattedStories = selectedStories
        .map((story) => Object.entries(story.stories))
        .flat()
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
    } else if (typeof selectedStories === "object") {
      formattedStories = Object.entries(selectedStories.stories).reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as Record<string, string>
      );
    }
  }

  const loadMoreStories = () => {
    setVisibleStories((prevVisibleStories) => prevVisibleStories + 3); // Increase the visible stories by 3
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
              data={{ category: clickedCategory, stories: displayedStories }}
              categoryName={clickedCategory}
            />
            {Object.keys(displayedStories).length <
              Object.keys(formattedStories).length && (
              <button
                onClick={loadMoreStories}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Load More
              </button>
            )}
          </>
        ) : (
          <p className="text-sagnir-200">Loading...</p>
        )}
      </div>
    </div>
  );
}
