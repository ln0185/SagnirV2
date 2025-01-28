"use client";

import { useState, useEffect } from "react";
import { StoriesHeader } from "../components/StoriesHeader";
import { Categories } from "../components/Categories";
import { StoriesCard } from "../components/StoriesCard";

interface StoryInterface {
  category: string;
  stories: { stories: Record<string, string> };
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

const StoriesPage = () => {
  const [clickedCategory, setClickedCategory] = useState<string>("all");
  const [allStories, setAllStories] = useState<
    StoriesCategoryArrayInterface[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/all")
      .then((res) => res.json())
      .then((data) => {
        setAllStories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const categoryNames =
    allStories?.map(
      (category: StoriesCategoryArrayInterface) =>
        categoryDisplayNames[category.category] || category.category
    ) || [];

  const selectedCategoryStories =
    allStories?.find((item) => item.category === clickedCategory)?.stories ||
    [];

  return (
    <div className="z-10 bg-sagnir-100 pb-8">
      <StoriesHeader />
      {categoryNames.length > 0 && !isLoading ? (
        <div className="sticky top-[190px] z-30 bg-sagnir-100">
          <Categories
            data={categoryNames}
            setClickedCategory={setClickedCategory}
          />
        </div>
      ) : null}
      <div className="pt-2 pb-9 overflow-hidden">
        {selectedCategoryStories.length > 0 ? (
          <StoriesCard
            data={selectedCategoryStories}
            categoryName={clickedCategory}
          />
        ) : null}
      </div>
    </div>
  );
};

export default StoriesPage;
