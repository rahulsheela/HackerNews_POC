import React, { useState, useEffect } from "react";
import moment from "moment";

const NewsItem = ({ news, index, updateNewsPoints, updateNewsHidden }) => {
  const domain =
    news.url &&
    news.url.replace("http://", "").replace("https://", "").split(/[/?#]/)[0];
  const hideNews = () => {
    updateNewsHidden(index, news.objectID, true);
  };

  const addNewsPoints = () => {
    updateNewsPoints(index, news.objectID, news.points + 1);
  };

  const date_difference = moment(news.created_at, "YYYYMMDD").fromNow();
  return (
    !news.hidden && (
      <div key={index} className="news-item">
        <div className="comments">{news.num_comments}</div>
        <div className="upvotes">{news.points}</div>
        <div className="upvote-news">
          <button
            aria-label="Upvote News article"
            className="upvote-action"
            onClick={addNewsPoints}
          >
            <div className="upvote-arrow"></div>
          </button>
        </div>
        <div className="details">
          <div
            className="title"
            dangerouslySetInnerHTML={{ __html: news.title }}
          />
          <div className="info">
            {domain ? `(${domain})` : ""} by <em>{news.author}</em>&nbsp;
            {date_difference}&nbsp;
            <div className="hide-item-wrapper">
              [
              <button className="hide-item" onClick={hideNews}>
                hide
              </button>
              ]
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default NewsItem;
