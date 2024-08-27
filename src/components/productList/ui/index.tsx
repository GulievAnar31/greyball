"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchProducts, setPage, setSortOrder, setSearchTerm } from '@/store/productSlice';
import Card from '@/components/card';
import { Product } from '../../card/types/types';
import { CartHeader } from '@/components/cart';

export default function ProductList() {
	const dispatch = useDispatch<AppDispatch>();
	const { products, currentPage, itemsPerPage, sortOrder, status, error, totalItems, searchTerm } = useSelector((state: RootState) => state.products);
	const { totalPrice } = useSelector((state: RootState) => state.cart);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

	useEffect(() => {
		dispatch(fetchProducts({ page: currentPage, sortOrder, limit: itemsPerPage }));
	}, [dispatch, currentPage, sortOrder, itemsPerPage]);

	useEffect(() => {
		if (products?.length > 0) {
			const filtered = products.filter(product =>
				product.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredProducts(filtered);
		}
	}, [products, searchTerm]);

	const handlePageChange = (page: number) => {
		dispatch(setPage(page));
	};

	const handleSortChange = (order: 'asc' | 'desc') => {
		dispatch(setSortOrder(order));
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(event.target.value));
	};

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	if (status === 'loading') return <p>Loading...</p>;
	if (status === 'failed') return <p>Error: {error}</p>;

	return (
		<>
			<h1 className="text-3xl font-bold text-center mb-4">Product List</h1>
			{totalPrice > 0 && <CartHeader />}
			<div className="flex justify-center mb-6">
				<input
					type="text"
					placeholder="Search by name..."
					value={searchTerm}
					onChange={handleSearchChange}
					className="p-2 border border-gray-300 rounded-md w-full max-w-xs"
				/>
				<button
					onClick={() => handleSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
					className="ml-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
				>
					Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
				{filteredProducts.map((product) => (
					<Card key={product.id} product={product} />
				))}
			</div>
			<div className="flex justify-center mt-6">
				{Array.from({ length: totalPages }).map((_, index) => (
					<button
						key={index}
						onClick={() => handlePageChange(index + 1)}
						className={`mx-1 w-10 h-10 flex items-center justify-center rounded-full 
							${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'} 
							hover:bg-gray-300 transition-colors`}
					>
						{index + 1}
					</button>
				))}
			</div>
		</>
	);
}