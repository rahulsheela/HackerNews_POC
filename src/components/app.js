import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { getNews } from "../actions";
import { useDispatch, connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";

import NewsItem from "./newsitem";

import { Chart } from "react-charts";

const NewsList = ({ pages, news }) => {
  NewsList.propTypes = {
    news: PropTypes.arrayOf(PropTypes.any),
  };

  NewsList.defaultProps = {
    news: [],
  };

  const dispatch = useDispatch();

  const [pageIndex, setpageIndex] = useState((pages && pages.current) || 1);
  const [chart, setChart] = useState();

  const routeMatch = useRouteMatch("/news/:page");

  const data = React.useMemo(
    () => [
      {
        data: news.map((item, index = 1) => [index + 1, item.points]),
      },
    ],
    [news]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  useEffect(() => {
    setpageIndex(routeMatch.params.page);
  }, [routeMatch.params.page]);

  useEffect(() => {
    dispatch(getNews(pageIndex));
  }, [pageIndex]);

  useEffect(() => {
    setChart(<Chart data={data} axes={axes} />);
  }, [data, axes]);

  return (
    <React.Fragment>
      <div className="newslist">
        {news.map((item, index) => (
          <NewsItem news={item} index={index} key={item.objectID} />
        ))}
      </div>
      <div className="pagination">
        {pageIndex > 1 && (
          <Link to={`/news/${Number(pageIndex) - 1}`}>Previous</Link>
        )}
        <Link to={`/news/${Number(pageIndex) + 1}`}>Next</Link>
      </div>
      <div className="chart-wrapper">
        <div className="chart-container">{chart}</div>
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
