export const loadMoviesStart = () => ({
    status: 'Initiated',
    type: 'LOAD_MOVIE_LIST_START'
});

export const loadMoviesSuccess = (data) => ({
    status: 'Success',
    type: 'LOAD_MOVIE_LIST_SUCCESS',
    data
});

export const loadMoviesError = (error) => ({
    status: 'Failure',
    type: 'LOAD_MOVIE_LIST_FAILURE',
    error
});
