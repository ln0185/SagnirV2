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
import photo8 from "../../public/resources/hidden people.png";
import photo9 from "../../public/resources/hidden people 2.png";
import photo10 from "../../public/resources/MYND5.png";
import photo11 from "../../public/resources/gillitrut.png";
import { useMediaQuery } from "../app/hooks/useMediaQuery";

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

type StoriesCardType = {
  data: {
    category: string;
    stories: string[];
  };

  categoryName: string;
  links: string[];
};

/* const formatTitle = (title: string) => {
  return title
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}; */

export const StoriesCard = ({ data, categoryName, links }: StoriesCardType) => {
  const [categoryStories, setCategoryStories] = useState<string[]>([]);
  const [shuffledPhotos, setShuffledPhotos] = useState<StaticImageData[]>([]);
  const router = useRouter();
  const visibleStories = categoryStories.length;

  const categoryPhotos: Record<string, StaticImageData[]> = {
    troll: [photo1, photo2, photo3, photo4, photo5, photo6],
    draugar: [photo7, photo8, photo9, photo10, photo11],
    "alfar-og-huldufolk": [photo1, photo2, photo3, photo4, photo5, photo6],
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
      console.log(links);
      setCategoryStories(data.stories || []);
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
      "Álfar og Huldufólk": "alfa",
      Helgisögur: "efra",
    };

    const storySlug = storyNavigations[story] || story;

    router.push(
      `/stories/${categoryNavigations[category] || category}/${storySlug}`
    );
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  if (!categoryStories || categoryStories.length === 0) {
    return (
      <p className="text-center">No stories available for this category.</p>
    );
  }

  return (
    <div className="bg-sagnir-100 flex flex-wrap flex-col justify-center w-full gap-3">
      {categoryStories.slice(0, visibleStories).map((story, index) => {
        const title = story;
        const photo = shuffledPhotos[index % shuffledPhotos.length] || photo1;

        return (
          <figure
            key={index}
            className="flex flex-col items-center w-full mx-auto"
          >
            <header className="relative w-full px-3">
              <Image
                src={photo}
                alt={`Story ${title}`}
                width={800}
                height={500}
                quality={isMobile ? 50 : 95}
                priority={index === 0}
                loading={"eager"}
                className="w-full h-auto rounded-lg"
              />
              <h2
                className="absolute bottom-2 left-4 text-sagnir-200 font-serifExtra text-2xl md:text-4xl xl:text-5xl px-2 py-1 rounded-md cursor-pointer"
                onClick={() => handleStoryClick(links[index], categoryName)}
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
