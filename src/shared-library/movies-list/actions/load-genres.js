export const loadGenresStart = () => ({
    status: 'Initiated',
    type: 'LOAD_GENRES_LIST_START'
});

export const loadGenresSuccess = (data) => ({
    status: 'Success',
    type: 'LOAD_GENRES_LIST_SUCCESS',
    data
});

export const loadGenresError = (error) => ({
    status: 'Failure',
    type: 'LOAD_GENRES_LIST_FAILURE',
    error
});
