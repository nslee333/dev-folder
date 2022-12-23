import axios, { AxiosResponse, AxiosError } from 'axios';

const getMethod = await axios.get('/api/')
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

const postMethod = await axios.post('/api/')
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

const deleteMethod = await axios.delete("/api/")
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
 
export default { getMethod, postMethod, deleteMethod }