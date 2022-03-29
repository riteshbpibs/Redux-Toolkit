import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAsyncMovies, fetchAsyncShows } from '../features/movies/movieSlice'
import './Header.scss'

const Header = () => {

    const [state, setState] = useState()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(fetchAsyncMovies(state))
        dispatch(fetchAsyncShows(state))
        setState("")
    }

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">Movie App</Link>
            </div>
            <div className="search-bar">
                <form onSubmit={submitHandler}>
                    <input type="text" value={state} placeholder="Search" onChange={(e) => setState(e.target.value)} />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div className="user-image">
                <img src="https://github.com/dmalvia/React_Redux_ToolKit_Movie_App/blob/master/src/images/user.png?raw=true" alt="user" />
            </div>
        </div>
    )
}

export default Header
