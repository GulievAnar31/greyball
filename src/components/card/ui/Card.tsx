'use client';

import { FC } from 'react';
import styles from './Card.module.css';
import { Product } from '../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

type CardProps = {
	product: Product
}

const Card: FC<CardProps> = ({ product }) => {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart(product));
	};

	return (
		<div className={styles.card}>
			<img src={product.image} alt={product.title} className={styles.image} />
			<div className={styles.content}>
				<h3 className={styles.title}>{product.title}</h3>
				<p className={styles.description}>{product.description}</p>
				<div className={styles.footer}>
					<span className={styles.price}>
						{product.currency} {product.price.toFixed(2)}
					</span>
					<span className={styles.rating}>⭐ {product.rating}</span>
				</div>
				<button className={styles.button} onClick={handleAddToCart}>Add to Cart</button>
			</div>
		</div>
	);
};

export default Card;