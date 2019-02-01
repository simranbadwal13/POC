export const initialState = Object.freeze({
    moviesData: {
        data: {
            page: 0,
            total_results: 0,
            total_pages: 0,
            results: [],
        },
        status: "NotStarted"
    },
    genreData: {
        data: {
            genres: []
        },
        status: "NotStarted"
    }
});