import {
    FETCH_SALES_REQUEST,
    FETCH_SALES_SUCCESS,
    FETCH_SALES_FAILURE,
    ADD_SALE_REQUEST,
    ADD_SALE_SUCCESS,
    ADD_SALE_FAILURE,
} from '../store/actions/salesActions';

const initialState = {
    sales: [],
    loading: false,
    error: null,
};

const salesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SALES_REQUEST:
        case ADD_SALE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_SALES_SUCCESS:
            return {
                ...state,
                sales: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_SALES_FAILURE:
            return {
                ...state,
                sales: [],
                loading: false,
                error: action.payload,
            };
        case ADD_SALE_SUCCESS:
            return {
                ...state,
                sales: [...state.sales, action.payload],
                loading: false,
                error: null,
            };
        case ADD_SALE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default salesReducer;
