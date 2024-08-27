import React from 'react';
import { ProductList } from '@/components/productList';
import ReduxProvider from '@/components/reduxProvider';

const Home = () => {
	return (
		<div>
			<ReduxProvider>
				<ProductList />
			</ReduxProvider>
		</div>
	);
};

export default Home;