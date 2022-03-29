import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { fetchAsyncDetails, removeSelectedMovie } from '../features/movies/movieSlice'
import './MovieDetails.scss'

const MovieDetails = () => {

    const { imdbID } = useParams()
    const dispatch = useDispatch()
    const details = useSelector(state => state.movieSlice.selected)

    useEffect(() => {
        dispatch(fetchAsyncDetails(imdbID))
        return () => {
            dispatch(removeSelectedMovie())
        }
    }, [imdbID, dispatch])

    return (
        <div className="movie-section">
            {Object.keys(details).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <>
                    <div className="section-left">
                        <div className="movie-title">{details.Title}</div>
                        <div className="movie-rating">
                            <span>
                                IMDB Rating <i className="fa fa-star"></i> : {details.imdbRating}
                            </span>
                            <span>
                                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                                {details.imdbVotes}
                            </span>
                            <span>
                                Runtime <i className="fa fa-film"></i> : {details.Runtime}
                            </span>
                            <span>
                                Year <i className="fa fa-calendar"></i> : {details.Year}
                            </span>
                        </div>
                        <div className="movie-plot">{details.Plot}</div>
                        <div className="movie-info">
                            <div>
                                <span>Director</span>
                                <span>{details.Director}</span>
                            </div>
                            <div>
                                <span>Stars</span>
                                <span>{details.Actors}</span>
                            </div>
                            <div>
                                <span>Generes</span>
                                <span>{details.Genre}</span>
                            </div>
                            <div>
                                <span>Languages</span>
                                <span>{details.Language}</span>
                            </div>
                            <div>
                                <span>Awards</span>
                                <span>{details.Awards}</span>
                            </div>
                        </div>
                    </div>
                    <div className="section-right">
                        <img src={details.Poster} alt={details.Title} />
                    </div>
                </>
            )}
        </div>
    );
}

export default MovieDetails

