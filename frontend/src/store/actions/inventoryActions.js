import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const FETCH_INVENTORY_REQUEST = 'FETCH_INVENTORY_REQUEST';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_FAILURE = 'FETCH_INVENTORY_FAILURE';
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';

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

export const fetchInventory = () => {
  return (dispatch) => {
    dispatch(fetchInventoryRequest());
    axios
      .get('http://localhost:5000/api/items') 
      .then((response) => {
        const data = response.data;
        dispatch(fetchInventorySuccess(data));
      })
      .catch((error) => {
        dispatch(fetchInventoryFailure(error));
      });
  };
};


export const addItemRequest = () => ({
  type: ADD_ITEM_REQUEST,
});

export const addItemSuccess = (data) => ({
  type: ADD_ITEM_SUCCESS,
  payload: data,
});

export const addItemFailure = (error) => ({
  type: ADD_ITEM_FAILURE,
  payload: error,
});

export const addItem = createAsyncThunk('inventory/addItem', async (item, { dispatch }) => {
  console.log(item);
  try {
    dispatch(addItemRequest());
    const response = await axios.post('http://localhost:5000/api/items', item); // Make an HTTP POST request to your API endpoint
    return response.data;
  } catch (error) {
    dispatch(addItemFailure(error));
    console.log(error);
    throw error;
  }
});