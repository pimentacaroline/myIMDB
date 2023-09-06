import { Button, Card, Container, Row, Col } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
	return (

		<>
			<Row className="h-100  movie-view">

				<Col md={6} sm={12} className="movie-image">
					<img src={movie.ImagePath} className="poster-image" />
				</Col>

				<Col md={6} sm={12} className="movie-info">
					<div>
						<h1>{movie.Title}</h1>
						<Button variant="link" className="custom-link-button">{movie.Director.Name}</Button>
					</div>
					<div>
						<p>{movie.Description}</p>
					</div>
					<div>
						<span>Genre: </span>
						<span>{movie.Genre.Name}</span>
					</div>
					<div>
						<Button
							onClick={onBackClick}
							className="back-button">
							Back</Button>
					</div>
				</Col>
			</Row>
		</>
	);
};
