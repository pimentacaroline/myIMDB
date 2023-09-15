import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { SearchForm } from '../search-form/search-form';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from '../spinner/spinner';
import './main-view.scss';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	const handleSearch = (searchTerm) => {
		// Filter the movies based on the search term
		const filteredMovies = movies.filter((movie) =>
			movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
		);
	
		// Update the movies state with the filtered results
		setMovies(filteredMovies);
	};

	useEffect(() => {
		if (!token) return;

		setLoading(true);
		fetch('https://cp-movies-api-41b2d280c95b.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` }
		})
			.then((response) => response.json())
			.then((data) => {
				setMovies(data);
				setLoading(false);
			});
	}, [token]);

	return (
		<BrowserRouter>
			<NavigationBar
				user={user}
				onLoggedOut={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}
			/>

			<Row className='justify-content-md-center cards-container'>
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
								) : loading ? (
									<Spinner animation='border' variant='primary' />
								) : movies.length === 0 ? (
									<Col>The list is absolutely empty!</Col>
								) : (
									<>
										<Row>
											<Col>
											<SearchForm onSearch={handleSearch} />
											</Col>
										</Row>
										{movies.map((movie) => (
											<Col key={movie._id} md={3} className='gy-4 gx-4' >
												<MovieCard 
													movie={movie} 
													user={user} 
													token={token}
													setUser={setUser}
												/>
											</Col>
										))}
									</>
								)}
							</>
						}
					/>

					<Route
						path='/profile'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : (
									<Col md={5}>
										<ProfileView
											user={user}
											token={token}
											setUser={setUser}
											movies={movies}
										/>
									</Col>
								)}
							</>
						}
					/>



				</Routes>
			</Row>
		</BrowserRouter>
	);
};
