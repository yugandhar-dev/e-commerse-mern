import axios from 'axios';
import * as actions from '../constants/productActionConstants';

export const fetchProducts = () => async dispatch => {
  try {
    dispatch({ type: actions.FETCH_PRODUCT_LISTS });

    const { data } = await axios.get('/api/products');

    dispatch({ type: actions.PRODUCT_LISTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_LISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const fetchSingleProduct = id => async dispatch => {
  try {
    dispatch({ type: actions.PRODUCT_DETAILS_FETCH });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: actions.PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actions.PRODUCT_LISTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const clearProductDetails = () => async dispatch => {
  dispatch({ type: actions.CLEAR_PRODUCT_DETAILS });
};
