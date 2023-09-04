import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row } from "react-bootstrap";


export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);


	useEffect(() => {
		if (!token) return;

		fetch("https://cp-movies-api-41b2d280c95b.herokuapp.com/movies", {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((response) => response.json())
			.then((data) => {
				setMovies(data);
			});
	}, [token]);

	return (
		<Row>
			{!user ? (
				<>
					<LoginView
						onLoggedIn={(user, token) => {
							setUser(user);
							setToken(token);
						}}
					/>
					or
					<SignupView />
				</>
			) : selectedMovie ? (
				<MovieView 
					movie={selectedMovie} 
					onBackClick={() => setSelectedMovie(null)} 
				/>
			) : movies.length === 0 ? (
				<div>The list is empty!</div>
			) : (
				<>
					{movies.map((movie) => (
						<MovieCard
							key={movie._id}
							movie={movie}
							onMovieClick={(newSelectedMovie) => {
								setSelectedMovie(newSelectedMovie);
							}}
						/>
					))}
				</>
			)}
		</Row>
	);
};

