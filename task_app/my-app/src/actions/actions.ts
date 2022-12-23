import axios, { AxiosResponse, AxiosError } from 'axios';

export const getMethod = async () => {
    const response: AxiosResponse | Error = await axios.get('http://localhost:1300/api/')
        .then(function (response: AxiosResponse): AxiosResponse {
            console.log(response);
            return response;
        })
        .catch(function (error: AxiosError): Error {
            console.log(error)
            return error;
        });
    return response;
} 

export const postMethod = async (newTaskString: string) => {
    const response: AxiosResponse | Error = await axios.post('http://localhost:1300/api/', {
        task: newTaskString
    })
        .then(function (response: AxiosResponse): AxiosResponse {
            console.log(response);
            return response;
        })
        .catch(function (error: AxiosError): Error {
            console.log(error);
            return error;
        });
    return response;
}

export const deleteMethod = async () => {
    const response: AxiosResponse | Error = await axios.delete("http://localhost:1300/api/")
        .then(function (response: AxiosResponse): AxiosResponse {
            console.log(response);
            return response;
        })
        .catch(function (error: AxiosError): Error {
            console.log(error);
            return error;
        });
    return response 
}
export default { getMethod, postMethod, deleteMethod }