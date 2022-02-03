export function writeServiceContainer(container: string) {

    return `
    import axios from 'axios';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Host': 'nflt-${container}.containers.sofitview.com.br',
        'Referer': 'http://nflt-${container}.containers.sofitview.com.br/#'
    };
    export const api = axios.create({
        baseURL: 'http://nflt-${container}.containers.sofitview.com.br/api/v1',
        headers
    });
    export const apiV2 = axios.create({
        baseURL: 'http://nflt-${container}.containers.sofitview.com.br/api/v2',
        headers
    });
`;
}