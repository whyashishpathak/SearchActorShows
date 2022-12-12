import React from "react";
import "./PosterList.css";

const PosterList = ({ posterList }) => {
  return (
    <div className="poster-container">
      {posterList &&
        posterList.map((poster) => {
          if (poster && poster.show && poster.show.image) {
            return (
              <img
                src={poster.show.image.medium}
                alt="poster"
                className="showImg"
              />
            );
          }
          if (poster && poster.person && poster.person.image) {
            return (
              <img
                src={poster.person.image.medium}
                alt="poster"
                className="personImg"
              />
            );
          }
        })}
    </div>
  );
};

export default PosterList;
