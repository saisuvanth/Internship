import React, { useRef, useState } from 'react';
import styles from './components.module.css';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ set }) => {
	const nav = useNavigate();
	const username = useRef();
	const password = useRef();
	const [message, setMessage] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		console.log('in handle submit');
		if (username.current.value.length > 0 && password.current.value.length > 0) {
			const res = await axios.post('https://assignment-069.herokuapp.com/login', {
				username: username.current.value.trim(),
				password: password.current.value.trim()
			});
			if (res.status === 200) {
				window.localStorage.setItem('TOKEN', res.data.result.token);
				console.log(res.data.result);
				set(res.data.result);
				if (res.data.result.role === 'manager') nav('/manager/', { replace: true });
				else nav('/admin', { replace: true });
			} else setMessage('Email and password does not match');
		} else {
			setMessage('Email and password cannot be empty');
		}
	}

	return (
		<div className={styles.Login} >
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="email">
					<Form.Label> <h5>User Name</h5></Form.Label>
					<Form.Control
						autoFocus
						type="text"
						ref={username}
						placeholder="user name"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label><h5>Password</h5></Form.Label>
					<Form.Control
						type="password"
						ref={password}
						placeholder="Password"
					/>
					{message ? <div className={styles.errormsg}>{message}</div> : null}
				</Form.Group>
				<div className={styles.submit + ' text-center'}>
					<Button size="lg" type="submit">
						Login
					</Button>
				</div>
				<Form.Text>
					Don't have an account? <Link to={'/register'}>Sign Up</Link>
				</Form.Text>
			</Form>
		</div >
	);
};

export default Login;
