import { initialState } from '../state/initial-state.js';

export const LoadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_GENRES_LIST_START':
            return {
                ...state,
                genreData: {
                    ...initialState.genreData,
                    status: action.status
                }
            }
        case 'LOAD_GENRES_LIST_SUCCESS':
            return {
                ...state,
                genreData: {
                    status: action.status,
                    data: action.data
                }
            }
        case 'LOAD_GENRES_LIST_FAILURE':
            return {
                ...state,
                genreData: {
                    status: action.status,
                    error: action.error
                }
            }
        case 'LOAD_MOVIE_LIST_START':
            return {
                ...state,
                moviesData: {
                    ...initialState.moviesData,
                    status: action.status
                }
            }
        case 'LOAD_MOVIE_LIST_SUCCESS':
            return {
                ...state,
                moviesData: {
                    status: action.status,
                    data: action.data
                }

            }
        case 'LOAD_MOVIE_LIST_FAILURE':
            return {
                ...state,
                moviesData: {
                    status: action.status,
                    data: action.data
                }
            }
        default:
            return state
    }
}
