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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/all");
        if (!res.ok) {
          console.error("Failed to fetch data:", res.statusText);
          return;
        }
        const data: StoriesCategoryArrayInterface[] = await res.json();
        console.log("Fetched API data:", data);
        setAllStories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const categoryNames =
    allStories?.map(
      (category: StoriesCategoryArrayInterface) =>
        categoryDisplayNames[category.category] || category.category
    ) || [];

  const selectedCategory =
    clickedCategory === "all"
      ? allStories
      : allStories.find((item) => item.category === clickedCategory);

  console.log("Clicked Category:", clickedCategory);
  console.log(
    "All Categories:",
    allStories.map((item) => item.category)
  );
  console.log("Selected Category Data:", selectedCategory);

  const selectedStories =
    selectedCategory && clickedCategory !== "all"
      ? selectedCategory.stories
      : allStories.flatMap((category) => category.stories);

  console.log("Selected Stories:", selectedStories);

  const formattedStories = Array.isArray(selectedStories)
    ? selectedStories
        .map((story) => Object.entries(story.stories))
        .flat()
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>)
    : {};

  console.log("Formatted Stories:", formattedStories);

  return (
    <div className="z-10 bg-sagnir-100 pb-8">
      <StoriesHeader />
      {categoryNames.length > 0 ? (
        <div className="sticky top-[190px] z-30 bg-sagnir-100">
          <Categories
            data={categoryNames}
            setClickedCategory={setClickedCategory}
          />
        </div>
      ) : null}
      <div className="pt-2 pb-9 overflow-hidden">
        {Object.keys(formattedStories).length > 0 ? (
          <StoriesCard
            data={{
              category: clickedCategory,
              stories: formattedStories,
            }}
            categoryName={clickedCategory}
          />
        ) : (
          <p className="text-sagnir-200">Loading...</p>
        )}
      </div>
    </div>
  );
}
