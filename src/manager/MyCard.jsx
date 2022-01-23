import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import styles from '../components.module.css';
import { GrCart } from 'react-icons/gr';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';

const MyCard = ({ item, setCartItems, setTotal }) => {
	const [quantity, setQuantity] = useState(0);
	const [added, setAdded] = useState();

	function subtractor() {
		setAdded(false);
		setQuantity(q => q !== 0 ? q - 1 : 0);
	}

	function adder() {
		setAdded(false);
		setQuantity(q => q + 1);
	}

	function addToCart() {
		setAdded(true);
		setCartItems(prev => [...prev, { name: item.title, quant: quantity }]);
		setTotal(prev => prev + item.price * quantity);
	}
	return (
		<Card className={'shadow border-0 ' + styles.mycard}>
			<Card.Img className={styles.cardimage} variant="top" src={item.image} />
			<Card.Body>
				<Card.Title style={{ fontSize: '16px' }}>{item.title}</Card.Title>
				<Card.Text className={styles.category}>
					Category : <span style={{ fontWeight: 'normal' }}>{item.category}</span>
				</Card.Text>
				<div className={styles.price}>
					Price<span className={styles.dollar}>${item.price}</span>
				</div>
			</Card.Body>
			<Card.Footer>
				<button className={styles.buttons + ' ' + styles.minus} onClick={subtractor}><AiOutlineMinusSquare /></button>
				<span className={styles.quantity}>{quantity}</span>
				<button className={styles.buttons + ' ' + styles.plus} onClick={adder}><AiOutlinePlusSquare /></button>
				<button className={added ? (styles.cart + ' ' + styles.cartadded) : styles.cart} onClick={addToCart}><GrCart /></button>
			</Card.Footer>
		</Card>
	);
};

export default MyCard;
