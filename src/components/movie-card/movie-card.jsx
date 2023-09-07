import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './movie-card.scss';

export const MovieCard = ({ movie }) => {
  return (
        <Card className="h-100 custom-card" >
          <Card.Img variant="top" src={movie.ImagePath} className="card-image" />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            {/* <Card.Text>{movie.Genre.Name}</Card.Text> */}
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
             <Button variant="link"> More info</Button>
            </Link>
          </Card.Body>
        </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};