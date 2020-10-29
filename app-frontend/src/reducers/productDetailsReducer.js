import * as actions from '../constants/productActions';

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case actions.PRODUCT_DETAILS_FETCH:
      return { isLoading: true, ...state };

    case actions.PRODUCT_DETAILS_SUCCESS:
      return { isLoading: false, product: action.payload };

    case actions.PRODUCT_DETAILS_FAIL:
      return { isLoading: false, error: action.payload };

    case actions.CLEAR_PRODUCT_DETAILS:
      return { isLoading: true, product: { reviews: [] } };

    default:
      return state;
  }
};
