import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { getNews } from "../actions";
import { useDispatch, connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

import NewsItem from "./newsitem";

import NewsChart from "./newschart";

const NewsList = ({ pages, news }) => {
  NewsList.propTypes = {
    news: PropTypes.arrayOf(PropTypes.any),
  };

  NewsList.defaultProps = {
    news: [],
  };

  const dispatch = useDispatch();

  const [pageIndex, setpageIndex] = useState((pages && pages.current) || 1);

  const [newsData, setNewsData] = useState(news);

  const routeMatch = useRouteMatch("/news/:page");

  const getNewsHeader = React.useMemo(() => {
    return (
      <div className="news-header">
        <div className="comments">Comments</div>
        <div className="upvotes">Vote count</div>
        <div className="upvote-news">Upvote</div>
        <div className="details">News Details</div>
      </div>
    );
  });

  const mergeLocalData = (data) => {
    if (localStorage.getItem("news_list")) {
      const localData = JSON.parse(localStorage.getItem("news_list"));
      return data.map((item) => {
        return localData[item.objectID]
          ? { ...item, ...localData[item.objectID] }
          : item;
      });
    } else {
      return data;
    }
  };

  const updateNewsPoints = (index, itemId, points) => {
    let news_updated = [...news];
    news_updated[index] = { ...news_updated[index], points };
    setNewsData(news_updated);
    updateLocalData(itemId, "points", points);
  };

  const updateNewsHidden = (index, itemId, hidden) => {
    let news_updated = [...news];
    news_updated[index] = { ...news_updated[index], hidden };
    setNewsData(news_updated);
    updateLocalData(itemId, "hidden", hidden);
  };

  const updateLocalData = (itemId, key, value) => {
    let localData;
    if (localStorage.getItem("news_list")) {
      const hiddenData = JSON.parse(localStorage.getItem("news_list"));
      localData = {
        ...hiddenData,
        [itemId]: { ...hiddenData[itemId], [key]: value },
      };
    } else {
      localData = { [itemId]: { [key]: value } };
    }
    localStorage.setItem("news_list", JSON.stringify(localData));
  };

  useEffect(() => {
    setpageIndex(routeMatch.params.page);
  }, [routeMatch.params.page]);

  useEffect(() => {
    dispatch(getNews(pageIndex));
  }, [pageIndex]);

  useEffect(() => {
    setNewsData(mergeLocalData(news));
  }, []);

  useEffect(() => {
    setNewsData(mergeLocalData(news));
  }, [news]);

  return (
    <React.Fragment>
      <div className="newslist">
        {getNewsHeader}
        {newsData.map((item, index) => (
          <NewsItem
            news={item}
            index={index}
            key={item.objectID}
            updateNewsPoints={updateNewsPoints}
            updateNewsHidden={updateNewsHidden}
          />
        ))}
      </div>
      <div className="pagination">
        {pageIndex > 1 && (
          <Link to={`/news/${Number(pageIndex) - 1}`}>Previous</Link>
        )}
        <Link to={`/news/${Number(pageIndex) + 1}`}>Next</Link>
      </div>
      <div className="chart-wrapper">
        <NewsChart news={newsData} />
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    news: state.news,
    pages: state.pages,
  };
};

const loadNews = (store, { page }) => {
  return store.dispatch(getNews(page || 1));
};

export { loadNews };
export default connect(mapStateToProps, { getNews })(NewsList);
