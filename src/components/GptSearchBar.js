import React, { useRef } from "react";
import { lang } from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const handleGptSearchClick = async (e) => {
    e.preventDefault();
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, commo separated like the example ahead. Example Results: Gadar, Sholay, Don, Gomaal, Koi Mil Gaya";
    //make an API call to GPI API and get the results

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      //TODO: write error message
    }

    console.log(gptResults?.choices[0]?.message?.content);
    const gptMovies = gptResults?.choices[0]?.message?.content.split(",");

    //For each movieName search in TMDB
    //this  is the array of promises
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB());

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  //search movies with name which we get from gpt search
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.result;
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center ">
      <form className=" w-full md:w-1/2 bg-black grid grid-cols-12">
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
