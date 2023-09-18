import { useState } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";



export const LoginView = ({ onLoggedIn }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		// this prevents the default behavior of the form which is to reload the entire page
		event.preventDefault();

		const data = {
			Username: username,
			Password: password
		};

		fetch("https://cp-movies-api-41b2d280c95b.herokuapp.com/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Login response: ", data);
				if (data.user) {
					localStorage.setItem("user", JSON.stringify(data.user));
					localStorage.setItem("token", data.token);
					onLoggedIn(data.user, data.token);
				} else {
					alert("No such user");
				}
			})
			.catch((e) => {
				alert("Something is wrong");
			});
	};

	return (
		<>
			<Row className='title'>
				<Col >
					<h1 >Fantastical</h1>
				</Col>
			</Row>
			<Row className='subtitle'>
				<Col>
					<h3>A database of <span style={{ color: '#d52418' }}>Wes Anderson</span> movies</h3>
					<p>This app is for members only. Please signup or login first.</p>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col  md={5}>
					<Form onSubmit={handleSubmit} className="authentication-form">

						<h3 className="form-title">Login</h3>

						<Form.Group className="form-group" controlId="formUsername">
							<Form.Label>Username:</Form.Label>
							<Form.Control
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								minLength="3"
							/>
						</Form.Group>

						<Form.Group className="form-group" controlId="formPassword">
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</Form.Group>

						<Button variant="danger" type="submit" className="submit-button">Submit</Button>
						<Row>
							<Button variant='link' className='link' as={Link} to='/signup'>Not a member? Signup!</Button>
						</Row>
					</Form>


				</Col>
			</Row>


		</>
	);
};

