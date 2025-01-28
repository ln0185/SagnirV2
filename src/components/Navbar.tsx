"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import StoriesIcon from "../../public/resources/book dark mode.svg";
import StoriesIconActive from "../../public/resources/book active dark mode.svg";
import SearchIcon from "../../public/resources/search icon dark mode.svg";
import LocationIcon from "../../public/resources/location dark mode.svg";
import LocationIconActive from "../../public/resources/location active dark mode.svg";
import QuizIcon from "../../public/resources/quiz icon dark mode.svg";
import QuizIconActive from "../../public/resources/quiz icon active dark mode.svg";
import { Searchbar } from "../components/Searchbar";

const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>("StoriesPage");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  return (
    <>
      <Searchbar
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      <nav className="w-full bg-sagnir-100 fixed bottom-0 border-t border-s-sagnir-200">
        <ul className="flex justify-around items-center py-4">
          <li onClick={() => setActive("StoriesPage")}>
            <Link href="/stories" passHref>
              <Image
                src={active === "StoriesPage" ? StoriesIconActive : StoriesIcon}
                alt="StoriesPage"
                className="h-7 w-7"
                width={28}
                height={28}
              />
            </Link>
          </li>
          <li
            onClick={() => {
              setActive("SearchPage");
              setIsSearchOpen(true);
            }}
          >
            <Image
              src={SearchIcon}
              alt="Search"
              className="h-6 w-6 cursor-pointer"
              width={24}
              height={24}
            />
          </li>
          <li onClick={() => setActive("MapPage")}>
            <Link href="/map" passHref>
              <Image
                src={active === "MapPage" ? LocationIconActive : LocationIcon}
                alt="MapPage"
                className="h-6 w-6"
                width={24}
                height={24}
              />
            </Link>
          </li>
          <li onClick={() => setActive("QuizPage")}>
            <Link href="/quiz" passHref>
              <Image
                src={active === "QuizPage" ? QuizIconActive : QuizIcon}
                alt="QuizPage"
                className="h-7 w-7"
                width={28}
                height={28}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
