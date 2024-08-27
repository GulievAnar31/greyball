import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/components/card/types/types';

interface ProductState {
	products: Product[];
	currentPage: number;
	itemsPerPage: number;
	sortOrder: 'asc' | 'desc';
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	totalItems: number;
	error: string | null;
	searchTerm: string;
}

const initialState: ProductState = {
	products: [],
	currentPage: 1,
	itemsPerPage: 10,
	sortOrder: 'asc',
	status: 'idle',
	totalItems: 20,
	error: null,
	searchTerm: '',
};

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async ({ page, sortOrder, limit }: { page: number; sortOrder: 'asc' | 'desc'; limit: number }) => {
		const response = await fetch(`https://my-json-server.typicode.com/GulievAnar31/fakeDb/products?_sort=price&_order=${sortOrder}&_page=${page}&_limit=${limit}`);
		if (!response.ok) {
			throw new Error('Failed to fetch products');
		}
		return response.json() as Promise<Product[]>;
	}
);

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setPage(state, action) {
			state.currentPage = action.payload;
		},
		setSortOrder(state, action) {
			state.sortOrder = action.payload;
		},
		setSearchTerm(state, action) {
			state.searchTerm = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch products';
			});
	},
});

export const { setPage, setSortOrder, setSearchTerm } = productSlice.actions;

export default productSlice.reducer;