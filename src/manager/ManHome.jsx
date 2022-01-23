import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Table, Button } from 'react-bootstrap';
import styles from '../components.module.css';
import { useNavigate } from 'react-router-dom';
import MyCard from './MyCard';
import { FaShoppingCart } from 'react-icons/fa';

const ManHome = ({ logged }) => {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [modal, setModal] = useState(false);
	const [total, setTotal] = useState(0);
	const nav = useNavigate();
	if (!logged) nav('/', { replace: true });

	useEffect(() => {
		fetch('https://fakestoreapi.com/products')
			.then(res => res.json())
			.then(json => {
				setItems(json);
			});
	}, [nav])

	function openModal() {
		setModal(true);
	}

	function closeModal() {
		setModal(false);
	}

	function handleEmpty() {
		setCartItems([]);
		setTotal(0);
	}

	return (
		<Container>
			<h3 className={styles.welcome}>Welcome {logged.username}</h3>
			<button onClick={openModal} className={styles.cartmodal}><FaShoppingCart /></button>
			<br /> <br />
			<Row className='d-flex justify-content-center align-items-center'>
				{items?.map(item =>
					<Col xs={12} md={6} lg={3} key={item.id} className='my-4'>
						<MyCard item={item} setCartItems={setCartItems} setTotal={setTotal} />
					</Col>
				)}
			</Row>
			<Modal show={modal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Your Cart</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table bordered hover>
						<tbody>
							{cartItems?.map((item, index) =>
								<tr key={index}>
									<td>{item.name}</td>
									<td>{item.quant}</td>
								</tr>
							)}
						</tbody>
					</Table>
				</Modal.Body>
				<Modal.Footer>
					<Button className={styles.empty} onClick={handleEmpty}>Empty Cart</Button>
					{total ? <h4>Total : ${total}</h4> : <h4>Your cart is empty</h4>}
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default ManHome;

