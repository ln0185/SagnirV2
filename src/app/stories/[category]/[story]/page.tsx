"use client";

import React, { use, useEffect, useState } from "react";
import ArrowLeft from "../../../../components/ArrowLeft";
import Image from "next/image";

interface StoryData {
  title: string;
  content: string;
}

const SingleStoryPage = ({
  params,
}: {
  params: Promise<{ category: string; story: string }>;
}) => {
  const resolvedParams = use(params);
  const { category, story } = resolvedParams || {};

  const [data, setData] = useState<StoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category || !story) {
      setError("Missing category or story parameters");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/${category}/${story}`);
        if (!response.ok) throw new Error("Story not found");
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch {
        setError("Error loading story.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, story]);

  const goback = () => {
    window.history.back();
  };

  const breakTextIntoParagraphs = (text: string) => {
    const sentences = text.split(/(?<=\.|\?|!)(\s)/);
    const paragraphs = [];

    for (let i = 0; i < sentences.length; i += 4) {
      paragraphs.push(sentences.slice(i, i + 4).join(""));
    }

    return paragraphs;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-sagnir-100">
      <ArrowLeft onClick={goback} />
      <div className="flex-col flex items-center w-screen mb-12">
        <Image
          src="/resources/huldufolk 1.png"
          alt="Huldufolk"
          width={500}
          height={500}
          quality={90}
          className="w-full h-full md:h-2/3 md:w-full"
        />
        <h2 className="font-glare text-center text-sagnir-200 p-5 text-4xl md:p-6 md:text-6xl">
          {data?.title}
        </h2>
        <hr className="h-0.010 w-full bg-sagnir-200" />
        <div className="font-glare text-[16px] text-sagnir-200 tracking-wide p-7 pt-5 leading-relaxed md:p-12">
          {data?.content &&
            breakTextIntoParagraphs(data.content).map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph.trim()}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleStoryPage;
