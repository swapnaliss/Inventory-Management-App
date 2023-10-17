import axios from 'axios';

export const FETCH_SALES_REQUEST = 'FETCH_SALES_REQUEST';
export const FETCH_SALES_SUCCESS = 'FETCH_SALES_SUCCESS';
export const FETCH_SALES_FAILURE = 'FETCH_SALES_FAILURE';

export const ADD_SALE_REQUEST = 'ADD_SALE_REQUEST';
export const ADD_SALE_SUCCESS = 'ADD_SALE_SUCCESS';
export const ADD_SALE_FAILURE = 'ADD_SALE_FAILURE';

// Action creators for fetching sales data
export const fetchSalesRequest = () => ({
    type: FETCH_SALES_REQUEST,
});

export const fetchSalesSuccess = (data) => ({
    type: FETCH_SALES_SUCCESS,
    payload: data,
});

export const fetchSalesFailure = (error) => ({
    type: FETCH_SALES_FAILURE,
    payload: error,
});

export const fetchSales = () => {
    return (dispatch) => {
        dispatch(fetchSalesRequest());
        axios
            .get('http://localhost:5000/api/sales')
            .then((response) => {
                const data = response.data;
                dispatch(fetchSalesSuccess(data));
            })
            .catch((error) => {
                dispatch(fetchSalesFailure(error));
            });
    };
}


// Action creators for adding a sale
export const addSaleRequest = () => ({
    type: ADD_SALE_REQUEST,
});

export const addSaleSuccess = (data) => ({
    type: ADD_SALE_SUCCESS,
    payload: data,
});

export const addSaleFailure = (error) => ({
    type: ADD_SALE_FAILURE,
    payload: error,
});

export const addSale = (newSale) => {
    return (dispatch) => {
        dispatch(addSaleRequest());
        axios
            .post('http://localhost:5000/api/sales', newSale)
            .then((response) => {
                const data = response.data;
                dispatch(addSaleSuccess(data));
            })
            .catch((error) => {
                dispatch(addSaleFailure(error));
            });
    };
}