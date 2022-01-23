import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from '../components.module.css';
import axios from 'axios';
import MyTable from './MyTable';

const AdminHome = ({ logged }) => {
	const nav = useNavigate();
	const [mans, setMans] = useState([]);
	const [message, setMessage] = useState('');

	useEffect(() => {
		axios.get('https://assignment-069.herokuapp.com/get', {
			headers: {
				'x-auth': window.localStorage.getItem('TOKEN')
			}
		}).then(res => {
			setMans(res.data.result);
		}).catch(err => {
			nav('/', { replace: true });
		})
	}, [nav]);

	return (
		<Container>
			<h3 className={styles.welcome}>Welcome {logged.username}</h3>
			<MyTable mans={mans} setMans={setMans} seterr={setMessage} />
			{message ? <div style={{ color: 'red', margin: '20px' }}>{message}</div> : null}
		</Container>
	);
};

export default AdminHome;
