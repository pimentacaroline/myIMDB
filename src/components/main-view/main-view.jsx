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
			<Row className="justify-content-md-center">
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
						element={
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
						path='/movies/:movieId'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The list is apparently empty!</Col>
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
									<Col>The list is absolutely empty!</Col>
								) : (
									<>
										{movies.map((movie) => (
											<Col key={movie._id} md={3} className="gy-4 gx-4" >
												<MovieCard movie={movie} />
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


				// return (
				// <>
				// 	<Row className="justify-content-md-center">
				// 		{!user ? (
				// 			<Col lg={4} md={8} sm={8} className="">
				// 				<LoginView
				// 					onLoggedIn={(user, token) => {
				// 						setUser(user);
				// 						setToken(token);
				// 					}}
				// 				/>
				// 				or
				// 				<SignupView />
				// 			</Col>
				// 		) : selectedMovie ? (
				// 			<Col md={8}>
				// 				<MovieView
				// 					movie={selectedMovie}
				// 					onBackClick={() => setSelectedMovie(null)}
				// 				/>
				// 			</Col>
				// 		) : movies.length === 0 ? (
				// 			<div>The list is empty!</div>
				// 		) : (
				// 			<>
				// 				{movies.map((movie) => (
				// 					<Col key={movie._id} md={3} className="gy-4 gx-4" >
				// 						<MovieCard
				// 							movie={movie}
				// 							onMovieClick={(newSelectedMovie) => {
				// 								setSelectedMovie(newSelectedMovie);
				// 							}}
				// 						/>
				// 					</Col>
				// 				))}
				// 			</>
				// 		)}
				// 	</Row>
				// 	<Row>
				// 		<Col className='logout'>
				// 			<Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
				// 				Logout
				// 			</Button>
				// 		</Col>
				// 	</Row>
				// </>
				// );