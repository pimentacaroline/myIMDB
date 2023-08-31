import React from 'react';
import {useState} from 'react';


export const LoginView = ({onLoggedIn}) => {
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
		event.preventDefault();

		const data = {
			access: username,
			secret: password
		};

		fetch('https://cp-movies-api-41b2d280c95b.herokuapp.com/login.json', {
			method: 'POST',
			body: JSON.stringify(data)
		}).then((response) => {
			if (response.ok) {
				onLoggedIn(username);
			} else {
				alert('Login failed');
			}
		});
	};
  
	return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				/>
      </label>
      <label>
        Password:
        <input 
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				/>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');