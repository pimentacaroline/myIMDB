import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export const MovieCard = ({ movie, user, token, setUser }) => {

  const [isFavorite, setIsFavorite] = useState(
    user.FavoriteMovies.includes(movie._id)
  );

  const addFavoriteMovie = () => {
    fetch(
      `https://cp-movies-api-41b2d280c95b.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed');
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully added to favorites');
          localStorage.setItem("user", JSON.stringify(user)); // updating user on local storage
          setUser(user); // updating the react application
          setIsFavorite(true);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://cp-movies-api-41b2d280c95b.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed');
          return false;
        }
      })
      .then((user) => {
        if (user) {
          alert('successfully deleted from favorites');
          localStorage.setItem("user", JSON.stringify(user)); // updating user on local storage
          setUser(user); // updating the react application
          setIsFavorite(false);
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Card className='h-100 card text-bg-dark'>
        <Card.Img className='w-100' variant='top' src={movie.ImagePath} />
        <Card.Body className='favorite'>
            {isFavorite ? (
              <Button variant='danger' onClick={removeFavoriteMovie}>
                Remove from favorite
              </Button>
            ) : (
              <Button variant='primary' onClick={addFavoriteMovie}>
                Add to favorite
              </Button>
            )}
        </Card.Body>

        <Card.Body className='more-info'>
          <Link to={`/movies/${movie._id}`}>
            <Button className='info-button' variant='outline-light'>More Info</Button>
          </Link>
        </Card.Body>

      </Card>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};