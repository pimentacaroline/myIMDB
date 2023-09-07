import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './main-view.scss';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);

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
		<BrowserRouter>
			<Row className='justify-content-md-center'>
				<Routes>
					<Route
						path='/signup'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/login'
						elemet={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<LoginView
											onLoggedIn={(user, token) => {
												setUser(user);
												setToken(token);
											}}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/movies/:Title'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The movie list is empty!</Col>
								) : (
									<Col md={8}>
										<MovieView movies={movies} />
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The movie list is empty!</Col>
								) : (
									<>
										{movies.map((movie) => (
											<Col key={movie._id} md={3} className="gy-4 gx-4" >
												<MovieCard
													movie={movie}
												/>
											</Col>
										))}
									</>
								)}
							</>
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};