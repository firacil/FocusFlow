import axiosInstance from '@/lib/useAxios';

// 1. Create a new productivity goal
export async function createGoal(goalType: string, targetHours: number) {
    const axios = axiosInstance('https://focus-6j4w.onrender.com/api'); // Set your base URL here

  try {
    // Retrieve the user token from localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token;

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const body = {
      goalType,
      targetHours,
    };

    const response = await axios.postData('/goals/create', body, true, token) as { goalId: string, status: string };// Assumes the goal creation requires authentication
    console.log('Goal created:', response);
    return {
      goalId: response?.goalId,
      status: response?.status,
    };
  } catch (error) {
    console.error('Error creating goal:', error);
    throw new Error('Failed to create goal');
  }
}

// 2. Get active productivity goals
export async function getActiveGoals() {
    const axios = axiosInstance('https://focus-6j4w.onrender.com/api'); // Set your base URL here

  try {
    // Retrieve the user token from localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token;

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.getData('/goals', true, token);
    console.log('Active goals:', response);
    return response;
  } catch (error) {
    console.error('Error fetching active goals:', error);
    throw new Error('Failed to fetch active goals');
  }
}
