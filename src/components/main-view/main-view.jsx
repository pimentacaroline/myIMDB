import {useState} from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';


export const MainView = () => {
	const [movies, setMovies] = useState([
		{
			id: 1, 
			title:'Silence of the Lambs',
			description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
			genre: 'Thriller',
			director: 'Jonathan Demme',
			image: 'https://www.themoviedb.org/t/p/original/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg'
		},
		{
			id: 2, 
			title: 'Fantastic Mr. Fox',
			description: 'An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers\' retaliation.',
			genre: 'Animation',
			director: 'Wes Anderson',
			image: 'https://www.themoviedb.org/t/p/original/izBLrCxhSZRwNXuwp1GAR3wmInL.jpg'
		},
		{
			id: 3, 
			title: 'Underground',
			description: 'A group of Serbian socialists prepares for the war in a surreal underground filled by parties, tragedies, love, and hate.',
			genre: 'Drama',
			director: 'Emir Kusturica',
			image: 'https://www.themoviedb.org/t/p/original/h8N6y13t4VusrDdH5PzTkwvBvgN.jpg'
		},
		{
			id: 4, 
			title: 'The Grand Budapest Hotel',
			description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glorious years under an exceptional concierge.',
			genre: 'Comedy',
			director: 'Wes Anderson',
			image: 'https://www.themoviedb.org/t/p/original/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg'
		},
	]);

	const [selectedMovie, setSelectedMovie] = useState(null);

	if (selectedMovie) {
		return (
			<MovieView movie={selectedMovie} onBackClick={()=> setSelectedMovie(null)}/>
		);
	}

	if (movies.length === 0) {
		return <div>The list is empty!</div>
	}

	return (
		<div>
			{movies.map((movie) => (
        <MovieCard 
					key={movie.id} 
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
      ))}
		</div>
	);
};
