import {useState} from 'react';
import { Button, Form } from "react-bootstrap";
import "./signup-view.scss";


export const SignupView = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [birthday, setBirthday] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday
		};

		fetch("https://cp-movies-api-41b2d280c95b.herokuapp.com/users", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}).then ((response) => {
			if (response.ok) {
				alert("Signup successful");
				window.location.reload();
			} else {
				alert("Signup failed");
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit} className="authentication-form">
			
			<h2 className="form-title">Create your account</h2>

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

			<Form.Group className="form-group">
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>

			<Form.Group className="form-group">
				<Form.Label>Birthday:</Form.Label>
				<Form.Control
					type="date"
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					required
				/>
			</Form.Group>

			<Button  variant="primary" type="submit" className="submit-button">Submit</Button>
			
		</Form>
	);
};