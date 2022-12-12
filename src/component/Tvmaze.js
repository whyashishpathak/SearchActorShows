import React, { useState } from "react";
import Search from "./Search";
import PosterList from "./PosterList";

const Tvmaze = () => {
  const [posterList, setPosterList] = useState([]);
  const handleResult = (results) => {
    setPosterList(results);
  };
  return (
    <div>
      <Search handleResult={handleResult} />
      <PosterList posterList={posterList} />
    </div>
  );
};

export default Tvmaze;
