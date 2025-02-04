"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
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

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

type StoriesCardType = {
  data:
    | {
        category: string;
        stories: string[] | Record<string, string>;
      }
    | { stories: { stories: Record<string, string> } }[];
  categoryName: string;
  visibleStories?: number;
};

export const StoriesCard = ({
  data,
  categoryName,
  visibleStories,
}: StoriesCardType) => {
  const [categoryStories, setCategoryStories] = useState<string[]>([]);
  const [shuffledPhotos, setShuffledPhotos] = useState<StaticImageData[]>([]);
  const router = useRouter();

  const categoryPhotos: Record<string, StaticImageData[]> = {
    troll: [photo1, photo2, photo3, photo4, photo5, photo6],
    draugar: [photo7, photo8, photo9, photo10, photo11],
    alfa: [photo1, photo2, photo3, photo4, photo5, photo6],
    default: [photo1, photo2, photo3, photo4, photo5, photo6],
  };

  const selectedPhotos =
    categoryPhotos[categoryName.toLowerCase()] || categoryPhotos.default;

  useEffect(() => {
    setShuffledPhotos(shuffleArray(selectedPhotos));
  }, [categoryName, visibleStories]);

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
    if (categoryName === "all" && data) {
      const allStories = Array.isArray(data)
        ? data.flatMap((item) => Object.values(item?.stories.stories).flat())
        : Object.values(data?.stories || {});
      setCategoryStories(allStories);
    } else if (!Array.isArray(data) && data.category !== "all") {
      const catStories = Object.values(data?.stories || {});
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

    const storySlug = storyNavigations[story] || story;

    router.push(
      `/stories/${categoryNavigations[category] || category}/${storySlug}`
    );
  };

  if (!categoryStories || categoryStories.length === 0) {
    return (
      <p className="text-center">No stories available for this category.</p>
    );
  }

  return (
    <div className="bg-sagnir-100 flex flex-wrap flex-col justify-center w-full gap-4">
      {categoryStories.slice(0, visibleStories).map((story, index) => {
        const title = story?.replace(/[/]/g, "") || "Untitled";
        const photo = shuffledPhotos[index % shuffledPhotos.length] || photo1;

        return (
          <figure key={index} className="flex flex-col items-center w-full">
            <header className="relative w-full">
              <Image
                width={450}
                height={250}
                src={photo}
                alt={`Story ${title}`}
                quality={100}
                priority={false}
                className="w-full h-auto rounded-lg"
              />
              <h2
                className="absolute bottom-2 left-2 text-sagnir-200 font-serifExtra text-2xl md:text-4xl xl:text-5xl px-2 py-1 rounded-md cursor-pointer"
                onClick={() => handleStoryClick(story, categoryName)}
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
