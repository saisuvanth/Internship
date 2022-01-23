import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from '../components.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ManRegister = () => {
	const name = useRef();
	const email = useRef();
	const password = useRef();
	const age = useRef();
	const confirmpassword = useRef();
	const phone = useRef();
	const nav = useNavigate();
	const [gen, setGen] = useState('');
	const [message, setMessage] = useState(false);


	async function handleSubmit(e) {
		setMessage(false);
		e.preventDefault();
		console.log(age.current.value.length, gen)
		if (name.current.value.length > 0 && email.current.value.length > 0 && password.current.value.length > 0 && phone.current.value.length === 10 && password.current.value === confirmpassword.current.value && age.current.value.length !== 0 && gen !== '') {
			const result = await axios.post('https://assignment-069.herokuapp.com/register', {
				username: name.current.value.trim(),
				email: email.current.value.trim(),
				password: password.current.value.trim(),
				phone: phone.current.value,
				age: age.current.value,
				gender: gen
			});
			if (result.status === 200) {
				nav('/', { replace: true });
			}
		} else setMessage({ type: 'error', message: 'Please fill all the fields' });
	}

	return (
		<div className={styles.Login} >
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="name">
					<Form.Label> <h5>Username</h5></Form.Label>
					<Form.Control
						autoFocus
						type="text"
						ref={name}
						placeholder="Rick"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="email">
					<Form.Label> <h5>Email Address</h5></Form.Label>
					<Form.Control
						autoFocus
						type="email"
						ref={email}
						placeholder="example@gmail.com"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label><h5>Password</h5></Form.Label>
					<Form.Control
						type="password"
						ref={password}
						placeholder="Password"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="confirmpassword">
					<Form.Label><h5>Confirm Password</h5></Form.Label>
					<Form.Control
						type="password"
						ref={confirmpassword}
						placeholder="Re-enter Password"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="age">
					<Form.Label> <h5>Age</h5></Form.Label>
					<Form.Control
						autoFocus
						type="number"
						ref={age}
						placeholder="18"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="gender">
					<Form.Label> <h5>Gender</h5></Form.Label>
					<Form.Check inline type="radio" name='gender' label='Male' onChange={() => setGen('M')} />
					<Form.Check inline type="radio" name='gender' label='Female' onChange={() => setGen('F')} />
				</Form.Group>
				<Form.Group size="lg" controlId="phonenumber">
					<Form.Label> <h5>Phone Number</h5></Form.Label>
					<Form.Control
						autoFocus
						type="phone"
						ref={phone}
						placeholder="+91 xxxxxxxxx"
					/>
				</Form.Group>
				{message ? <div className={message.type === 'error' ? styles.errormsg : styles.informsg}>{message.message}</div> : null}
				<div className={styles.submit + ' text-center'}>
					<Button size="lg" type="submit">
						Sign Up
					</Button>
				</div>
				<Form.Text>
					Already have an account? <Link to={'/manager/login'}>Log In</Link>
				</Form.Text>
			</Form>
		</div >
	);
};

export default ManRegister;
