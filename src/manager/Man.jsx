import React, { useEffect } from 'react';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import { MdAccountBox } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../components.module.css';
import man from '../assets/man.png';
import woman from '../assets/woman.png';

const Man = ({ logged }) => {
	const nav = useNavigate();

	useEffect(() => {
		if (!logged) nav('/', { replace: true });
	}, [logged, nav]);

	return (<div style={{ background: 'linear-gradient(rgb(150 215 237) 0%, rgb(249 197 227) 100%)' }}>
		<Navbar>
			<div className={styles.heading}><MdAccountBox className={styles.logo} />{logged.username.toLocaleUpperCase()}</div>
			<div className={styles.dashboard}>
				<Link to={'/manager/dashboard'}>Dash Board</Link>
			</div>
		</Navbar>
		<Container fluid>
			<Row >
				<Col xs={12} md={6} lg={6} className='d-flex justify-content-center align-items-center'>
					{logged.gender === 'M' ? <img className={styles.image} src={man} alt="" /> : <img className={styles.image} src={woman} alt="" />}
				</Col>
				<Col xs={12} md={6} lg={6} className='d-flex align-items-center justify-content-center'>
					<div className={styles.maninfo}>
						<table>
							<tr>
								<td className={styles.tablehead}>Username</td>
								<td>{logged.username}</td>
							</tr>
							<tr>
								<td className={styles.tablehead}>Email</td>
								<td>{logged.email}</td>
							</tr>
							<tr>
								<td className={styles.tablehead}>Phone</td>
								<td>{logged.phone}</td>
							</tr>
							<tr>
								<td className={styles.tablehead}>Age</td>
								<td>{logged.age}</td>
							</tr>
							<tr>
								<td className={styles.tablehead}>Gender</td>
								<td>{logged.gender}</td>
							</tr>
						</table>
					</div>
				</Col>
			</Row>
		</Container>
	</div>);
};

export default Man;
