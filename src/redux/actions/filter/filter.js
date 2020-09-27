import axios from "axios";
import config from "../../../config/index"

import {
    MESSAGE_FORM_API,
    USER_LOADING,
    PRODUCT_ALL,
    SET_SORT_PRODUCT
} from "../types/types";

export const createProduct = (productData, history) => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/filters/register-product", productData)
        .then(res => {
            console.log('success');
            console.log(res);
        })
        .catch(err => {
            console.log('fail');
            dispatch({
                type: MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
        })
};

export const fetchAllProducts = () => dispatch => {
    axios
        .get(config.SIM_API_URL + "api/filters/get-product-all", )
        .then(res => {
            console.log("All Products -> ", res.data.results);

            dispatch({
                type: PRODUCT_ALL,
                payload: res.data.results,
            });

        })
        .catch(err => {
            console.log('fail' + JSON.stringify(err));
            dispatch({
                type: MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
            dispatch({
                type: USER_LOADING,
                payload: false,
            })
        })
};

export const SortProduct = (category, history) => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/filters/get-product-sort", {category})
        .then(res => {
            console.log("Sort Products -> ", res.data.results);

            dispatch({
                type: SET_SORT_PRODUCT,
                payload: res.data.results,
            });

        })
        .catch(err => {
            console.log('fail-category');
            dispatch({
                type: MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
        })
};
