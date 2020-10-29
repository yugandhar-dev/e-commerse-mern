import * as actions from '../constants/productActionConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actions.FETCH_PRODUCT_LISTS:
      return { isLoading: true, products: [] };

    case actions.PRODUCT_LISTS_SUCCESS:
      return { isLoading: false, products: action.payload };

    case actions.PRODUCT_LISTS_FAIL:
      return { isLoading: false, error: action.payload };

    default:
      return state;
  }
};
