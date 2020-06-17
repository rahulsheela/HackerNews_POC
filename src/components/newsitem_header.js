import React, { useState, useEffect } from "react";
import moment from "moment";

const NewsItemHeader = ({ news, index }) => {
  return (
    showNews && (
      <div key={index} className="news-item">
        <div className="comments">{news.num_comments}</div>
        <div className="upvotes">{news.points + point}</div>
        <div className="upvote-news">
          <button
            aria-label="Upvote News article"
            className="upvote-action"
            onClick={voteNews}
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

export default NewsItemHeader;
