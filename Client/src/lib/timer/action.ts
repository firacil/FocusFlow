"use client";

import axiosInstance from '@/lib/useAxios';
import axios, { AxiosHeaders, AxiosError, AxiosRequestConfig } from 'axios';

export async function startTimerSession(sessionType: string, duration: number) {
  const axio = axiosInstance<any>("https://focus-6j4w.onrender.com/api");
  try {
    // Retrieve the user token from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token;

    if (!token) {
      throw new Error("User is not authenticated");
    }

    // Create the request body
    const body = {
      sessionType,
      duration,
      userId: user.userId
    };

    // Make the POST request to start the timer session, passing the token
    const response = await axio.postData("/timer/start", body, true, token);
    localStorage.setItem("session", JSON.stringify({ ...response }));

    // Handle the response, return relevant data
    return {
      sessionId: response.sessionId,
      startTime: response.startTime,
      status: response.status
    };
  } catch (error) {
    console.error("Error starting the timer session:", error);
    throw new Error("Failed to start the timer session");
  }
}
export async function pauseTimerSession() {
  const axio = axiosInstance<any>("https://focus-6j4w.onrender.com/api");

  try {
    // Retrieve the sessionId from localStorage
    const storedSession = localStorage.getItem("session");
    const session = storedSession ? JSON.parse(storedSession) : null;
    const sessionId = session?.sessionId;

    if (!sessionId) {
      throw new Error("Session not found");
    }

    // Retrieve the user token from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token;

    if (!token) {
      throw new Error("User is not authenticated");
    }


    // Create the request body
    const body = {
      sessionId
    };

    // Make the POST request to start the timer session, passing the token
    const response = await axio.postData("/timer/pause", body, true, token);

    // Handle the response, return relevant data
    return {
      sessionId: response.sessionId,
      status: response.status
    };
  } catch (error) {
    console.error("Error pausing the timer session:", error);
    throw new Error("Failed to pause the timer session");
  }
}


export async function currentTimerSession(): Promise<any> {
  try {

    // Retrieve the user token from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token;

    if (!token) {
      throw new Error("User is not authenticated");
    }

    // const response = await axios.getData("/timer/current", true, token);
    try {
        const response = await axios.get('https://focus-6j4w.onrender.com/api/timer/current/', {
          headers: {
            'Authorization': `Bearer ${token}`,  // Set the token in the Authorization header
            'Content-Type': 'application/json',  // Optional for GET requests
          },
        });
    
        // Handle the successful response
        console.log('Response:', response.data);
        return {
          sessionId: response?.data?.sessionId,
          sessionType: response?.data?.sessionType,
          remainingTime: response?.data?.remainingTime
        };
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      }
    // localStorage.setItem("session", JSON.stringify({ ...response }));

    // Handle the response, return relevant data
    
  } catch (error) {
    console.error("error getting the current timer session:", error);
    throw new Error("Failed to get the timer session");
  }
}

export async function endTimerSession(): Promise<any> {
  try {
    // Retrieve the sessionId from localStorage
    const storedSession = localStorage.getItem("timerSession");
    const session = storedSession ? JSON.parse(storedSession) : null;
    console.log(session);
    const sessionId = session?.sessionId;

    if (!sessionId) {
      throw new Error("Session not found");
    }

    // Retrieve the user token from localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token;

    if (!token) {
      throw new Error("User is not authenticated");
    }

    // Make a POST request to end the session
    const response = await axios.post(
      'https://focus-6j4w.onrender.com/api/timer/stop',
      { sessionId },
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Set the token in the Authorization header
          'Content-Type': 'application/json'
        }
      }
    );

    // Handle the successful response
    console.log('Response:', response.data);

    // Return relevant data from the response
    return {
      sessionId: response.data.sessionId,
      status: response.data.status,
      endTime: response.data.endTime
    };
  } catch (error) {
    console.error("Error ending the timer session:", error);
    throw new Error("Failed to end the timer session");
  }
}
