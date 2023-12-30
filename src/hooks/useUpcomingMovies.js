import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);

  //fetch Data from TMDB API and update the stores
  const dispatch = useDispatch();
  useEffect(() => {
    !upcomingMovies && getUpcomingdMovies();
  }, []);

  const getUpcomingdMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpcomingMovies(json?.results));
  };
};

export default useUpcomingMovies;
