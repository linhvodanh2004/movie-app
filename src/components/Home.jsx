import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from '../appwrite';
import Spinner from './Spinner';
import MovieCard from './MovieCard';
import Search from './search';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}


const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [debouncedSearchTerm, setDeboucedSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDeboucedSearchTerm(searchTerm), 500, [searchTerm])

    const fetchMovies = async (query = '') => {
        setIsloading(true);
        setErrorMessage('')
        try {
            const endpoint = (query)
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Fail to fetch movies.');
            }
            const data = await response.json();

            if (data.Response === 'False') {
                setErrorMessage(data.error || 'Fail to fetch movies.');
                setMovies([]);
                return;
            }
            setMovies(data.results);
            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }

        } catch (error) {
            console.error(`Error fetching: ${error}`);
            setErrorMessage('Error fetching movies, please try again.');
        } finally {
            setIsloading(false);
        }
    }

    const fetchTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        }
        catch (error) {
            console.error(`Error fetching trending movies: ${error}`);
        }
    }

    useEffect(
        () => {
            fetchMovies(debouncedSearchTerm);
        }, [debouncedSearchTerm]
    );
    useEffect(() => {
        fetchTrendingMovies();
    }, []);
    return (
        <main>
            <div className='pattern'></div>
            <div className='wrapper'>
                <header>
                    <img src='./hero.png' alt='Hero banner' />
                    <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    {/* <h1 className='text-white'> {searchTerm}</h1> */}
                </header>

                {trendingMovies.length > 0 && (
                    <section className='trending'>
                        <h2>Trending Movies</h2>
                        <ul>
                            {trendingMovies.map(
                                (movie, index) => (
                                    <li key={movie.$id}>
                                        <p>{index + 1}</p>
                                        <img src={movie.poster_url} alt={movie.title} />
                                    </li>
                                ))}
                        </ul>
                    </section>
                )}

                <section className='all-movies'>
                    <h2>All Movies</h2>
                    {
                        isLoading ? (<Spinner />)
                            : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>)
                                : (
                                    <ul>
                                        {movies.map((movie) => (
                                            <MovieCard key={movie.id} movie={movie} />
                                        ))}
                                    </ul>
                                )
                    }
                </section>
            </div>
        </main>
    )
}


export default Home