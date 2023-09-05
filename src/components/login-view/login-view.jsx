import { useState } from 'react';
import { Button, Form } from "react-bootstrap";
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
					localStorage.setItem("token", JSON.stringify(data.token));
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
		<Form onSubmit={handleSubmit} className="authentication-form">

			<h2 className="form-title">Login</h2>

			<Form.Group className="form-group" controlID="formUsername">
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					minLength="3"
				/>
			</Form.Group>

			<Form.Group className="form-group" controlID="formPassword">
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</Form.Group>

			<Button variant="primary" type="submit" className="submit-button">Submit</Button>
		</Form>
	);
};

