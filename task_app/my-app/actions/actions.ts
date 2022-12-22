import axios, { AxiosResponse, AxiosError } from 'axios';

// GET
export const getMethod = await axios.get('/api/')
    .then(function (response: AxiosResponse) {
        console.log(response);
        return response;
    })
    .catch(function (error: AxiosError) {
        console.log(error)
    })
    .then(function () {
        // Always executed.
    });

// POST
export const postMethod = await axios.post('/api/')
    .then(function (response: AxiosResponse) {
        console.log(response);
        return response;
    })
    .catch(function (error: AxiosError): void {
        console.log(error);
    })
    .then(function (): void {
        // Always executed.
    })

// DELETE
export const deleteMethod = await axios.delete("/api/")
    .then(function (response: AxiosResponse) {
        console.log(response);
        return response;
    })
    .catch(function (error: AxiosError): void {
        console.log(error);
    })
    .then(function (): void {
        // Always executed.
    })
 
 
module.exports = { getMethod, postMethod, deleteMethod }