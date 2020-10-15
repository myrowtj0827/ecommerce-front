import axios from "axios";
import config from "../../../config/index"

import {
    SCRAPING_MESSAGE_FORM_API,
    SCRAPING_PRODUCT_ALL,
    SCRAPING_FORM_API,
    SCRAPING_USER_LOADING,
    SET_SCRAPING_SORT_PRODUCT,
    MESSAGE_FORM_API,

    POPULAR_PRODUCT,
    PAGE_PRODUCT,
} from "../types/types";

export const gettingLink = () => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/scrapingProduct/scraping-product")
        .then(res => {
            console.log('success');
            console.log(res);
        })
        .catch(err => {
            console.log('Failed - Back end turned off !');
            dispatch({
                type: SCRAPING_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
        })
};

export const gettingPopularProducts = () => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/scrapingProduct/get-popular-product")
        .then(res => {
            console.log(res.data.results);
            dispatch({
                type: POPULAR_PRODUCT,
                payload: res.data.results,
            });
        })
        .catch(err => {
           console.log(err.response ? err.response.data : {error: "error"});
        })
};

export const getProductPage = (data) => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/scrapingProduct/get-page-product", data)
        .then(res => {
            console.log(res.data.results);
            dispatch({
                type: PAGE_PRODUCT,
                payload: res.data.results,
            });
        })
        .catch(err => {
            console.log(err.response ? err.response.data : {error: "error"});
        })
};

export const scrapingAllProducts = () => dispatch => {
    axios
        .get(config.SIM_API_URL + "api/scrapingProduct/scraping-product-all", )
        .then(res => {
            dispatch({
                type: SCRAPING_PRODUCT_ALL,
                payload: res.data.results,
            });

        })
        .catch(err => {
            console.log('fail' + JSON.stringify(err));
            dispatch({
                type: SCRAPING_MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
            dispatch({
                type: SCRAPING_USER_LOADING,
                payload: false,
            })
        })
};

export const ScrapingSort = (data) => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/scrapingProduct/scraping-product-sort", data)
        .then(res => {
            dispatch({
                type: SET_SCRAPING_SORT_PRODUCT,
                payload: res.data.results,
            });

        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
        })
};