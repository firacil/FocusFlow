
import axios, { AxiosHeaders, AxiosError, AxiosRequestConfig } from 'axios';

interface UseAxiosReturn<T> {
  getData: (url: string, withCredentials?: boolean, token?: string) => Promise<T>;
  postData: (url: string, body: any, withCredentials?: boolean, token?: string) => Promise<T>;
  patchData: (url: string, body: any, withCredentials?: boolean, token?: string) => Promise<T>;
  deleteData: (url: string, withCredentials?: boolean, token?: string) => Promise<T>;
}

// Helper function to create AxiosHeaders
const getHeaders = (withCredentials?: boolean, token?: string): AxiosRequestConfig['headers'] => {
  const headers = new AxiosHeaders();
  headers.set('Content-Type', 'application/json');
  
  if (withCredentials && token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  console.log(headers)

  return headers;
};

// Server-side axios utility for HTTP requests
const axiosInstance = <T>(baseURL: string): UseAxiosReturn<T> => {

  // GET request
  const getData = async (url: string, withCredentials: boolean = false, token: string = ''): Promise<T> => {
    try {
      const response = await axios.get<T>(`${baseURL}${url}`, {
        headers: getHeaders(withCredentials, token),
      });
      return response.data;
    } catch (err) {
      console.error('GET request error:', err);
      throw err as AxiosError;
    }
  };

  // POST request
  const postData = async (url: string, body: any, withCredentials: boolean = false, token: string = ''): Promise<T> => {
    try {
      const response = await axios.post<T>(`${baseURL}${url}`, body, {
        headers: getHeaders(withCredentials, token),
        withCredentials,
      });
      return response.data;
    } catch (err) {
      console.error('POST request error:', err);
      throw err as AxiosError;
    }
  };

  // PATCH request
  const patchData = async (url: string, body: any, withCredentials: boolean = false, token: string = ''): Promise<T> => {
    try {
      const response = await axios.patch<T>(`${baseURL}${url}`, body, {
        headers: getHeaders(withCredentials, token),
        withCredentials,
      });
      return response.data;
    } catch (err) {
      console.error('PATCH request error:', err);
      throw err as AxiosError;
    }
  };

  // DELETE request
  const deleteData = async (url: string, withCredentials: boolean = false, token: string = ''): Promise<T> => {
    try {
      const response = await axios.delete<T>(`${baseURL}${url}`, {
        headers: getHeaders(withCredentials, token),
        withCredentials,
      });
      return response.data;
    } catch (err) {
      console.error('DELETE request error:', err);
      throw err as AxiosError;
    }
  };

  return {
    getData,
    postData,
    patchData,
    deleteData,
  };
};

export default axiosInstance;
