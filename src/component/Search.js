import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";

const Search = ({ handleResult }) => {
  const [selected, setSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTerm, setDebounceTerm] = useState("friends");
  const [results, setResults] = useState([]);
  const [showNoResult, setShowNoResult] = useState(false);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDebounceTerm(searchTerm);
  };

  useEffect(() => {
    const searchShows = async () => {
      const { data } = await axios.get("https://api.tvmaze.com/search/shows", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          q: debounceTerm
        }
      });
      if (data.length) {
        setResults(data);
        setShowNoResult(false);
      } else {
        setShowNoResult(true);
      }
    };

    const searchActors = async () => {
      const { data } = await axios.get("https://api.tvmaze.com/search/people", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          q: debounceTerm
        }
      });
      if (data.length) {
        setResults(data);
      } else {
        setShowNoResult(true);
      }
    };

    if (selected === "Shows") {
      searchShows();
    }
    if (selected === "Actors") {
      searchActors();
    }
  }, [debounceTerm, selected]);

  useEffect(() => {
    handleResult(results);
  }, [results, handleResult]);

  return (
    <div className="container">
      <div className="title-container">
        <div className="heading">TV MAZE</div>
        <div className="message">Search Your Favourite Shows and Actors</div>
      </div>
      <div className="selection-box">
        <input
          type="radio"
          value="Actors"
          name="searchType"
          onChange={handleChange}
        />
        Actor
        <input
          type="radio"
          value="Shows"
          name="searchType"
          onChange={handleChange}
        />
        Shows
      </div>
      <div className="search-box">
        {selected && !searchTerm && (
          <div className="text">Enter {selected} Below</div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="friends"
          />
        </form>
        {showNoResult && <div className="text">No Result Found</div>}
      </div>
    </div>
  );
};

export default Search;
