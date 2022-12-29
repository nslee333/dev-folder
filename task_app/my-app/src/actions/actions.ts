import axios, { AxiosResponse, AxiosError } from 'axios';


export const getMethod: () => Promise<AxiosResponse<any, any> | Error> = async () => {
    const response: AxiosResponse | Error = await axios.get('http://localhost:1300/api/')
        .then(function (response: AxiosResponse): AxiosResponse {
            return response;
        })
        .catch(function (error: AxiosError): Error {
            console.log(error)
            return error;
        });
    return response;
} 


export const postMethod: (newTaskString: string) => Promise<AxiosResponse<any, any> | Error> = async (newTaskString: string) => {
    const response: AxiosResponse | Error = await axios.post('http://localhost:1300/api/', {
        task: newTaskString
    })
        .then(function (response: AxiosResponse): AxiosResponse {
            return response;
        })
        .catch(function (error: AxiosError): Error {
            console.log(error);
            return error;
        });
    return response;
}


export const deleteMethod: (documentId: string) => Promise<AxiosResponse<any, any> | Error> = async (documentId: string) => {
    const response: AxiosResponse | Error = await axios.delete("http://localhost:1300/api/", {
        data: {
            "_id": documentId
        }
    })
        .then(function (response: AxiosResponse): AxiosResponse {
            return response;
        })
        .catch(function (error: AxiosError): Error {
            console.log(error);
            return error;
        });
    
    return response 
}


export default { getMethod, postMethod, deleteMethod }