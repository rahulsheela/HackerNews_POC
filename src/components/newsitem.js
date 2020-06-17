import React, { useState, useEffect } from "react";
import moment from "moment";

const NewsItem = ({ news, index }) => {
  const domain =
    news.url &&
    news.url.replace("http://", "").replace("https://", "").split(/[/?#]/)[0];
  const [point, setPoint] = useState(0);
  const [showNews, setShowNews] = useState(true);

  const isHiddeneData = () => {
    if (localStorage.getItem("hiddenNews")) {
      const hiddenData = JSON.parse(localStorage.getItem("hiddenNews"));
      const filtered = hiddenData.filter((itemId) => news.objectID === itemId);
      return filtered.length > 0;
    } else {
      return false;
    }
  };
  const hideNews = () => {
    let newSession = [];
    const hiddenData = localStorage.getItem("hiddenNews");
    if (hiddenData) {
      newSession = JSON.parse(hiddenData);
    }
    newSession.push(news.objectID);
    localStorage.setItem("hiddenNews", JSON.stringify(newSession));
    setShowNews(false);
  };

  const getVote = () => {
    if (sessionStorage.getItem("upVotedNews")) {
      const upVoteData = JSON.parse(sessionStorage.getItem("upVotedNews"));
      return upVoteData[news.objectID] ? upVoteData[news.objectID] : 0;
    } else {
      return 0;
    }
  };
  const voteNews = () => {
    setPoint((p) => p + 1);
  };

  useEffect(() => {
    if (point > 0) {
      let upVoteSession = {};
      if (sessionStorage.getItem("upVotedNews")) {
        upVoteSession = JSON.parse(sessionStorage.getItem("upVotedNews"));
      }
      upVoteSession[news.objectID] = point;
      sessionStorage.setItem("upVotedNews", JSON.stringify(upVoteSession));
    }
  }, [point]);

  useEffect(() => {
    setPoint(getVote());
    setShowNews(!isHiddeneData());
  }, []);

  const date_difference = moment(news.created_at, "YYYYMMDD").fromNow();
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

export default NewsItem;
