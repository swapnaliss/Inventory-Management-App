import {
  FETCH_INVENTORY_REQUEST,
  FETCH_INVENTORY_SUCCESS,
  FETCH_INVENTORY_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  EDIT_ITEM_REQUEST,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAILURE,
} from '../store/actions/inventoryActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_REQUEST:
    case ADD_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
    case EDIT_ITEM_REQUEST:
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
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
        error: null,
      };
    case DELETE_ITEM_SUCCESS:
      const updatedItems = state.items.filter((item) => item.id !== action.payload.itemId);
      return {
        ...state,
        items: updatedItems,
        loading: false,
        error: null,
      };
    case FETCH_INVENTORY_FAILURE:
    case ADD_ITEM_FAILURE:
    case DELETE_ITEM_FAILURE:
    case EDIT_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case EDIT_ITEM_SUCCESS:
        const updatedItem = action.payload;
        const editedItems = state.items.map((item) =>
          item.id === !updatedItem.id ? updatedItem : item
        );
        return {
          ...state,
          items: editedItems,
          loading: false,
          error: null,
        };
    default:
      return state;
  }
};

export default inventoryReducer;
