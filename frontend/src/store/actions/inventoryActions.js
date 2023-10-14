import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const FETCH_INVENTORY_REQUEST = 'FETCH_INVENTORY_REQUEST';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_FAILURE = 'FETCH_INVENTORY_FAILURE';
export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';
export const DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const DELETE_ITEM_FAILURE = 'DELETE_ITEM_FAILURE';
export const EDIT_ITEM_REQUEST = 'EDIT_ITEM_REQUEST';
export const EDIT_ITEM_SUCCESS = 'EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_FAILURE = 'EDIT_ITEM_FAILURE';

// fetching inventory
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

// adding item
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
  try {
    dispatch(addItemRequest());
    const response = await axios.post('http://localhost:5000/api/items', item); // Make an HTTP POST request to your API endpoint
    dispatch(fetchInventory());
    return response.data;
  } catch (error) {
    dispatch(addItemFailure(error));
    console.log(error);
    throw error;
  }
});


// deleting item
export const deleteItemRequest = () => ({
  type: DELETE_ITEM_REQUEST,
});

export const deleteItemSuccess = () => ({
  type: DELETE_ITEM_SUCCESS,
});

export const deleteItemFailure = (error) => ({
  type: DELETE_ITEM_FAILURE,
  payload: error,
});

export const deleteItem = (itemId) => {
  console.log(itemId);
  return (dispatch) => {
    dispatch(deleteItemRequest());
    axios
      .delete(`http://localhost:5000/api/items/${itemId}`)
      .then(() => {
        dispatch(deleteItemSuccess());
      })
      .catch((error) => {
        dispatch(deleteItemFailure(error));
      });
  };
};


// editing item
export const editItemRequest = () => ({
  type: EDIT_ITEM_REQUEST,
});

export const editItemSuccess = (updatedItem) => ({
  type: EDIT_ITEM_SUCCESS,
  payload: updatedItem,
});

export const editItemFailure = (error) => ({
  type: EDIT_ITEM_FAILURE,
  payload: error,
});

export const editItem = (itemId, updatedItem) => {
  return (dispatch) => {
    dispatch(editItemRequest());
    axios
      .put(`http://localhost:5000/api/items/${itemId}`, updatedItem)
      .then((response) => {
        const updatedItem = response.data;
        dispatch(editItemSuccess(updatedItem));
      })
      .catch((error) => {
        dispatch(editItemFailure(error));
      });
  };
};
