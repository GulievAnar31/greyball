import { createSlice } from '@reduxjs/toolkit';
import { Product } from '@/components/card/types/types';

interface CartState {
	items: { product: Product; quantity: number }[];
	totalQuantity: number;
	totalPrice: number;
}

const initialState: CartState = {
	items: [],
	totalQuantity: 0,
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action) {
			const existingItem = state.items.find(item => item.product.id === action.payload.id);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ product: action.payload, quantity: 1 });
			}
			state.totalQuantity += 1;
			state.totalPrice += action.payload.price;
		},
	},
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;