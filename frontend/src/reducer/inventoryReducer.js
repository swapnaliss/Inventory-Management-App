// inventoryReducer.js
import {
    FETCH_INVENTORY_REQUEST,
    FETCH_INVENTORY_SUCCESS,
    FETCH_INVENTORY_FAILURE,
  } from '../store/actions/inventoryActions';
  
  const initialState = {
    items: [], // Initial state for inventory items
    loading: false,
    error: null,
  };
  
  const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_INVENTORY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_INVENTORY_SUCCESS:
        return {
          ...state,
          items: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_INVENTORY_FAILURE:
        return {
          ...state,
          items: [],
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default inventoryReducer;
  