import React from "react";
import useFetchNews from "../hooks/useFetchNews.jsx";
import ShimmerNews from "./ShimmerNews.jsx";

const News = () => {
  const newsData = useFetchNews();

  return (
    <div className="bg-slate-800 pt-7 pb-7">
      <h1 className="text-center text-[1.6rem] px-[6px] md:text-3xl font-bold text-green-300">
        Follow what’s happening in Chess Today.
      </h1>
      <div className="flex flex-wrap justify-center gap-y-8 gap-x-10 mt-8">
        {newsData.length === 0 ? (
          <ShimmerNews />
        ) : (
          newsData.map((article, index) => {
            return (
              <div key={index} className="flex flex-col w-[90%] md:w-[30%] rounded-lg bg-slate-900">
                <div className="w-full">
                  <img
                    src={article.image}
                    className="rounded-t-lg"
                    alt="news-image"
                  />
                </div>
                <div className="my-3 px-2 ">
                  <a href={article.url}>
                    <h2 className="text-white text-base">{article.title}</h2>
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default News;
