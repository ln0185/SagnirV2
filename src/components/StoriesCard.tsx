import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import photo1 from "../../public/resources/huldufolk 1.png";
import photo2 from "../../public/resources/huldu1 1.png";
import photo3 from "../../public/resources/MYND4.png";
import photo4 from "../../public/resources/MYND3.png";
import photo5 from "../../public/resources/MYND2.png";
import photo6 from "../../public/resources/MYND1.png";
import photo7 from "../../public/resources/ghosts.png";
import photo8 from "../../public/resources/hidden people.svg";
import photo9 from "../../public/resources/hidden people 2.svg";
import photo10 from "../../public/resources/MYND5.png";
import photo11 from "../../public/resources/gillitrut.png";

type StoriesCardType = {
  data:
    | {
        category: string;
        stories: string[] | Record<string, string>;
      }
    | { stories: { stories: Record<string, string> } }[];
  categoryName: string;
};

export const StoriesCard = ({ data, categoryName }: StoriesCardType) => {
  const [categoryStories, setCategoryStories] = useState<string[]>([]);
  const [, setIsAllStories] = useState<boolean>(false);
  const router = useRouter();

  const categoryPhotos: Record<string, string[]> = {
    default: [
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      photo6,
      photo7,
      photo8,
      photo9,
      photo10,
      photo2,
      photo11,
    ],
    troll: ["photo4", "photo6", "photo5"],
    draug: ["photo7", "photo3", "photo11"],
    alfa: ["photo1", "photo9", "photo8"],
    efra: ["photo2", "photo3", "photo10"],
  };

  const selectedPhotos =
    typeof categoryName === "string"
      ? categoryPhotos[categoryName.toLowerCase()] || categoryPhotos.default
      : categoryPhotos.default;

  const storyNavigations: Record<string, string> = {
    "Álfadrottning í álögum": "alfa-dr",
    "Álfafólkið í Loðmundarfirði": "a-lodmfj",
    "Álfakóngurinn í Seley": "seley",
    "Ábæjar-Skotta": "skotta3",
    "Átján draugar úr Blöndu": "18draug",
    "Átján sendingar í senn": "18send",
    "Átján Skólabræður": "18skolab",
    "Andrarímur og Hallgrímsrímur": "andra",
    "Bergþór Bláfellingur": "blafell",
    Bakkastaður: "bakka",
    "Brytinn í Skálholti": "brytinn",
    "Dansinn í Hruna": "hruna",
  };

  useEffect(() => {
    if (categoryName === "alfa" && data) {
      const alfaStories = Object.keys(storyNavigations).filter((story) =>
        [
          "Álfadrottning í álögum",
          "Álfafólkið í Loðmundarfirði",
          "Álfakóngurinn í Seley",
        ].includes(story)
      );
      setCategoryStories(alfaStories);
    } else if (categoryName === "all" && data) {
      const allStories = Array.isArray(data)
        ? data.flatMap((item) => Object.values(item?.stories.stories).flat())
        : Object.values(data?.stories || {});
      setIsAllStories(true);
      setCategoryStories(allStories);
    } else if (!Array.isArray(data) && data.category !== "all") {
      const catStories = Object.values(data?.stories || {});
      setIsAllStories(false);
      setCategoryStories(catStories);
    }
  }, [data, categoryName]);

  const handleStoryClick = (story: string, category: string) => {
    const categoryNavigations: Record<string, string> = {
      Allt: "all",
      Tröll: "troll",
      Draugar: "draugar",
      "alfar-og-huldufolk": "alfa",
      Helgisögur: "ur-efra-og-nedra-helgisogur",
    };

    const storyNavigations: Record<string, string> = {
      "Álfadrottning í álögum": "alfa-dr",
      "Álfafólkið í Loðmundarfirði": "a-lodmfj",
      "Álfakóngurinn í Seley": "seley",
      "Ábæjar-Skotta": "skotta3",
      "Átján draugar úr Blöndu": "18draug",
      "Átján sendingar í senn": "18send",
      "Átján Skólabræður": "18skolab",
      "Andrarímur og Hallgrímsrímur": "andra",
      "Bergþór Bláfellingur": "blafell",
      Bakkastaður: "bakka",
      "Brytinn í Skálholti": "brytinn",
      "Dansinn í Hruna": "hruna",
    };

    const storyCategory = categoryNavigations[category] || category;
    const storySlug = storyNavigations[story] || story;

    router.push(`/stories/${storyCategory}/${storySlug}`);
  };

  if (!categoryStories || categoryStories.length === 0) {
    return (
      <p className="text-center">No stories available for this category.</p>
    );
  }

  return (
    <div className="bg-sagnir-100 flex flex-wrap flex-col justify-center w-full gap-4">
      {categoryStories
        .slice(0, categoryName === "all" ? 12 : 3)
        .map((story, index) => {
          const title = story?.replace(/[/]/g, "") || "Untitled";
          const photo = selectedPhotos[index] || "default-photo-path.svg";

          return (
            <figure key={index} className="flex flex-col items-center w-full">
              <header className="relative w-full">
                <Image
                  src={photo}
                  alt={`Story ${title}`}
                  className="w-full h-auto rounded-lg"
                />
                <h2
                  className="absolute bottom-2 left-2 text-sagnir-200 font-serifExtra text-2xl md:text-5xl px-2 py-1 rounded-md cursor-pointer"
                  onClick={() =>
                    handleStoryClick(story, categoryName as string)
                  }
                >
                  {title}
                </h2>
              </header>
            </figure>
          );
        })}
    </div>
  );
};
