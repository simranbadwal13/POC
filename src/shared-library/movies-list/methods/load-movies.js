import axios from 'axios';
import {
    loadMoviesStart,
    loadMoviesSuccess,
    loadMoviesError
} from '../actions/index.js';

export function loadMovieList(page, rating) {
    return (dispatch) => {
        dispatch(loadMoviesStart());
        return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=377385bcc02051861c90aca90bcbe947&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&vote_count.gte=${rating}`)
            .then((result) => {
                const processedResult = result.data;
                dispatch(loadMoviesSuccess(processedResult));
            })
            .catch((error) => {
                dispatch(loadMoviesError('Error loading Movie List'));
            });
    };
}
