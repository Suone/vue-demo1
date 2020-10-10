import http from './http';

export default {
    exampleGet: opts => {
        const url = '';
        const data = {
            example: opts.example || ''
        };
        return http.get(url, data);
    },
    examplePost: opts => {
        const url = '';
        const data = {
            example: opts.example || ''
        };
        return http.post(url, data);
    }
};