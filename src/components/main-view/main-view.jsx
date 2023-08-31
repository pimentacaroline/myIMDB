import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = localStorage.getItem("token");
	const [user, setUser] = useState(storedUser? storedUser:null);
	const [token, setToken] = useState(storedToken? storedToken:null);
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);


	useEffect(() => {
    if (!token) return;

    fetch("https://cp-movies-api-41b2d280c95b.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

	if (!user) {
    return (
			<LoginView 
				onLoggedIn={(user, token) => {
					setUser(user);
					setToken(token);
				}}
			/>
		);
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
      <button onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>
        Logout
      </button>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};

