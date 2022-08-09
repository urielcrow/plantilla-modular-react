import {getToken,nameToken} from './token';
const baseUrl = "http://localhost/diversos/apis/backend-cliente-almer/api/"; //process.env.REACT_APP_API_URL;

export const fetchCustome = ( params ) =>{

    const { 
        endpoint = '', 
        body = '', 
        method = 'GET', 
        token = false
    } = params;

    const url = `${ baseUrl }${ endpoint }`;

    const headers = token ?  getHeaders() : {};
        
    if(method === 'GET')
        return fetch( url,{
            headers
        });
    else{
        return fetch( url, {
            headers,
            method,
            body
        });
    }

}

const  getHeaders = () =>{
    let headers = new Headers();
    headers.append(nameToken, getToken());
    return headers;
}
