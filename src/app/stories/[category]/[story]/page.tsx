"use client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    category: string;
    story: string;
  };
};

type Story = {
  title: string;
  content: string;
} | null;

export default function SingleStoryPage({ params }: PageProps) {
  const [story, setStory] = useState<Story>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStory() {
      const res = await fetch(
        `/api/stories/${params.category}/${params.story}`
      );
      if (!res.ok) {
        setStory(null);
        return;
      }
      const data = await res.json();
      setStory(data);
      setLoading(false);
    }

    getStory();
  }, [params.category, params.story]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!story) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen p-4">
      <section>
        <h1>{story.title}</h1>
        <div>{story.content}</div>
      </section>
    </div>
  );
}
