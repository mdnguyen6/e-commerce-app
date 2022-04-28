import { AnalyticsSharp } from "@mui/icons-material";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import Product from "../../model/Product.type";
import ProductService from "../../services/productService";

interface ProductState {
  categories: string[] | null;
  product: Product | Product[] | null;
  isLoading: boolean;
  error: string;
}
export interface Payload {
  limit?: number;
  sort?: string;
  category?: string;
  id?: number;
}

const initialState = {
  categories: null,
  product: null,
  isLoading: false,
  error: "",
} as ProductState;
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProduct: (state) => {
      state.isLoading = true;
    },
    getProductSuccess: (state, action: PayloadAction<Product | Product[]>) => {
      state.isLoading = false;
      state.product = action.payload;
    },
    getProductFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCategory: (state) => {
      state.isLoading = true;
    },
    getCategorySuccess: (state, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    getCategoryFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getProduct, getProductSuccess, getProductFail, getCategory, getCategorySuccess, getCategoryFail } =
  productSlice.actions;
export default productSlice.reducer;

export const fetchProduct = (payload: Payload) => (dispatch: Dispatch) => {
  dispatch(getProduct());
  async function getResponse() {
    if (payload.category)
      return await ProductService.getByCategory(
        payload.category,
        payload.limit,
        payload.sort
      );
    if (payload.id) return await ProductService.getById(payload.id);
    return await ProductService.getAll(payload.limit, payload.sort);
  }
  getResponse()
    .then((res) => {
      dispatch(getProductSuccess(res.data));
    })
    .catch((err) => {
      dispatch(getProductFail(err));
    });
};

export const fetchCategory = () => (dispatch: Dispatch) => {
  dispatch(getCategory());
  async function getResponse() {
      return await ProductService.getCategory();
  }
  getResponse()
    .then((res) => {
      dispatch(getCategorySuccess(res.data));
    })
    .catch((err) => {
      dispatch(getCategoryFail(err));
    });
};
