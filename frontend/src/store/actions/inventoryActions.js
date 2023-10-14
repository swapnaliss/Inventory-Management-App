// inventoryActions.js
import axios from 'axios';

// Action types
export const FETCH_INVENTORY_REQUEST = 'FETCH_INVENTORY_REQUEST';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_FAILURE = 'FETCH_INVENTORY_FAILURE';

// Action creators
export const fetchInventoryRequest = () => ({
  type: FETCH_INVENTORY_REQUEST,
});

export const fetchInventorySuccess = (data) => ({
  type: FETCH_INVENTORY_SUCCESS,
  payload: data,
});

export const fetchInventoryFailure = (error) => ({
  type: FETCH_INVENTORY_FAILURE,
  payload: error,
});

// Async action to fetch inventory items
export const fetchInventory = () => {
  return (dispatch) => {
    dispatch(fetchInventoryRequest());
    axios
      .get('http://localhost:5000/api/items') // Make an HTTP GET request to your API endpoint
      .then((response) => {
        const data = response.data;
        dispatch(fetchInventorySuccess(data));
      })
      .catch((error) => {
        dispatch(fetchInventoryFailure(error));
      });
  };
};
