"use client";

import React, { useState } from "react";

type CategoriesType = {
  data: string[];
  setClickedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const Categories = ({ data, setClickedCategory }: CategoriesType) => {
  const [activeCategory, setActiveCategory] = useState<string>("Allt");

  const handleCategory = (clickedCategory: string) => {
    let formattedCategory = clickedCategory;

    if (formattedCategory === "Allt") formattedCategory = "all";
    if (formattedCategory === "Tröll") formattedCategory = "troll";
    if (formattedCategory === "Draugar") formattedCategory = "draugar";
    if (formattedCategory === "Álfar og Huldufólk") {
      formattedCategory = "alfar-og-huldufolk";
    }
    if (formattedCategory === "Helgisögur") {
      formattedCategory = "ur-efra-og-nedra-helgisogur";
    }

    setActiveCategory(clickedCategory);
    setClickedCategory(formattedCategory);
  };

  return (
    <div className="flex flex-row bg-sagnir-100 text-sagnir-200 text-lg">
      <ul className="flex flex-row gap-8 justify-between overflow-x-scroll md:w-full md:text-2xl py-4 px-4 md:overflow-x-hidden">
        {data.length > 0 && (
          <li
            onClick={(e) => handleCategory((e.target as HTMLElement).innerText)}
            className={`pl-2 cursor-pointer ${
              activeCategory === "Allt"
                ? "border-b-2 border-sagnir-200"
                : "hover:border-b-2 hover:border-sagnir-200"
            }`}
          >
            Allt
          </li>
        )}
        {data.map((item) => (
          <li
            onClick={() => handleCategory(item)}
            className={`flex-align font-glare text-md whitespace-nowrap cursor-pointer ${
              activeCategory === item
                ? "border-b-2 border-sagnir-200"
                : "hover:border-b-2 hover:border-sagnir-200"
            }`}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
