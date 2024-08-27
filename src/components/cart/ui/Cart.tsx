import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Cart.module.css';
import { RootState } from '@/store/store';

export default function CartHeader() {
	const { totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);

	return (
		<header className={styles.cartHeader}>
			<div className={styles.cartInfo}>
				<p>Total Items: {totalQuantity}</p>
				<p>Total Price: ${totalPrice.toFixed(2)}</p>
			</div>
		</header>
	);
}