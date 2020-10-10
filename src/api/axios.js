"use strict";

import axios from "axios";
import router from "@/router";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV == 'development') {
    config.baseURL = '/api/';
} else if (process.env.NODE_ENV == 'debug') {
    config.baseURL = '/api/';
} else if (process.env.NODE_ENV == 'production') {
    config.baseURL = '/api/';
}

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        if (window.xtoken) {
            config.headers['x-hzdamei'] = window.xtoken;
        }
        if (config.method === 'post') {
            let formdata = new FormData();
            for (let k in config.data) {
                formdata.append(k, config.data[k]);
            }
            config.data = formdata;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        if (error) {
            console.log('axios.interceptors.request', error);
        }
        const err = {
            data: {
                code: 400,
                msg: '错误的传参!'
            }
        };
        return Promise.reject(err);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        if (Number(response.data.code) !== 200) {
            if (Number(response.data.code) === 403) {
                router.push('/login');
            }
            return Promise.reject(response);
        }
        return response;
    },
    function (error) {
        // Do something with response error
        if (error) {
            console.log('axios.interceptors.response', error);
        }
        const err = {
            data: {
                code: 404,
                msg: '网络有点慢,换个姿势再来一次!'
            }
        };
        return Promise.reject(err);
    }
);


export default _axios;