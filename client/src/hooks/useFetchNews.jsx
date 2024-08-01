import { useEffect, useState } from "react";
import axios from "axios";

const useFetchNews = () => {
  const [newsData, setNewsData] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/news');
        console.log("response" + response);
        if (response.data.success) {
          const limitedNews = response.data.message.slice(0, 9);
          setNewsData(limitedNews);
        } else {
          console.error("No articles found in response:", response);
        }
      } catch (error) {
        console.error("Error fetching news from server:", error);
      }
    };

    fetchNews();
  }, []);

  return newsData;
};

export default useFetchNews;
