import axios from 'axios';
import {
    loadGenresStart,
    loadGenresSuccess,
    loadGenresError
} from '../actions/index.js';

export function loadGenreList() {
    return (dispatch) => {
        dispatch(loadGenresStart());
        return axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=377385bcc02051861c90aca90bcbe947')
            .then((result) => {
                const processedResult = result.data;
                dispatch(loadGenresSuccess(processedResult));
            })
            .catch((error) => {
                dispatch(loadGenresError('Error loading Movie List'));
            });
    };
}
