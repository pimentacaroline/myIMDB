import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch("https://cp-movies-api-41b2d280c95b.herokuapp.com/movies")
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((movie) => {
					return {
						_id: movie.id,
						Title: movie.Title,
						ImagePath: movie.ImagePath,
						Description: movie.Description,
						Genre: {
							Name: movie.Genre.Name
						},
						Director: {
							Name: movie.Director.Name
						},
						Featured: movie.Featured
					};
				});

				setMovies(moviesFromApi);
			});
	}, []);

	if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)}/>;
  }

	if (selectedMovie) {
		return (
			<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
		);
	}

	if (movies.length === 0) {
		return <div>The list is empty!</div>
	}

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie._id}
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
			))}
		</div>
	);
};
