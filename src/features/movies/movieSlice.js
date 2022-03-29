import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { API_KEY } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    const res = await movieApi.get(`/?apiKey=${API_KEY}&s=${term}&type=movie`)

    return res.data
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
    const res = await movieApi.get(`/?apiKey=${API_KEY}&s=${term}&type=series`)

    return res.data
})

export const fetchAsyncDetails = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
    const res = await movieApi.get(`?apiKey=${API_KEY}&i=${id}&Plot=full`)
    console.log(res);
    return res.data
})

const initialState = {
    movies: {},
    shows: {},
    selected: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, action) => {
            state.movies = action.payload
        },
        removeSelectedMovie: (state, action) => {
            state.selected = {}
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, action) => {
            console.log("success");
            return {
                ...state,
                movies: action.payload
            }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, action) => {
            console.log("success");
            return {
                ...state,
                shows: action.payload
            }
        },
        [fetchAsyncDetails.fulfilled]: (state, action) => {
            console.log("success");
            return {
                ...state,
                selected: action.payload
            }
        },
    }
})

export const { addMovies, removeSelectedMovie } = movieSlice.actions
export const getAllMovies = (state) => state.movieSlice.movies
export const getAllShows = (state) => state.movieSlice.shows
export default movieSlice.reducer