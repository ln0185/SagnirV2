type SearchedStoriesType = {
  data: string[];
};

export const SearchedStories = ({ data }: SearchedStoriesType) => {
  return (
    <>
      {data?.map((item) => {
        return (
          <figure key={item}>
            <header>
              <h2 className="text-white">{item.replace(/[/]/g, "")}</h2>
            </header>
          </figure>
        );
      })}
    </>
  );
};
