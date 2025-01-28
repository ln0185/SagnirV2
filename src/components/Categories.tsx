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
    if (formattedCategory === "Draugar") formattedCategory = "draug";
    if (formattedCategory === "Álfar og huldufólk") formattedCategory = "alfa";
    if (formattedCategory === "Helgisögur") formattedCategory = "efra";

    console.log("Category test", formattedCategory);

    setActiveCategory(clickedCategory);
    setClickedCategory(formattedCategory);
  };

  return (
    <div className="flex flex-row bg-sagnir-100 text-sagnir-200 text-lg">
      <ul className="flex flex-row gap-10 justify-between overflow-x-scroll md:w-full md:text-2xl py-4 px-4">
        {data.length > 0 ? (
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
        ) : null}
        {data.length > 0
          ? data.map((item) => {
              return (
                <li
                  onClick={() => handleCategory(item)}
                  className={`flex-align font-glare text-md text-nowrap cursor-pointer ${
                    activeCategory === item
                      ? "border-b-2 border-sagnir-200"
                      : "hover:border-b-2 hover:border-sagnir-200"
                  }`}
                  key={item}
                >
                  {item}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};