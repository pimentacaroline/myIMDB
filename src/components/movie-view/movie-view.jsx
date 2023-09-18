import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
	const { movieId } = useParams();
	const movie = movies.find((m) => m._id === movieId);

	return (

		<>
			<Row className="h-100  movie-view">

				<Col md={6} sm={12} className="text-center px-4">
					<img src={movie.ImagePath} className="poster-image" />
				</Col>

				<Col md={6} sm={12} className="movie-info px-4">
					<div>
						<h1>{movie.Title}</h1>
						<Link to='/wes-anderson'>
							<Button variant="link" className="custom-link-button link">Wes Anderson</Button>
						</Link>
					</div>
					<div>
						<p>{movie.Description}</p>
					</div>
					<div>
						<span>Genre: </span>
						<span>{movie.Genre.Name}</span>
					</div>
					<div>
						<Link to={`/`}>
							<Button variant='danger' className="back-button">Back</Button>
						</Link>
					</div>
				</Col>
			</Row>
		</>
	);
};
