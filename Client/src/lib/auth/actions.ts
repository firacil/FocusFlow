"use client";

import {
  FormState,
  LoginFormSchema,
  SignupFormSchema
} from "@/lib/auth/definitions";
import { createSession, deleteSession } from "@/lib/auth/session";
import { useRouter } from 'next/router';
import axiosInstance from '@/lib/useAxios';
import { AxiosError, isAxiosError } from "axios";


// export async function signup(
//   state: FormState,
//   formData: FormData
// ): Promise<FormState> {
//   // Validate form fields
//   const validatedFields = SignupFormSchema.safeParse({
//     name: formData.get('name'),
//     email: formData.get('email'),
//     password: formData.get('password'),
//     confirmPassword: formData.get('confirmPassword'),
//   });

//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   // Prepare data for sending to the backend
//   const data = {
//     name: validatedFields.data.name,
//     email: validatedFields.data.email,
//     password: validatedFields.data.password,
//   };

//   try {
//     // Send request to backend to create the account
//     const response = await axios.postData('/auth/signup', data);
//     if (!response) {
//       return {
//         message: 'An error occurred while creating your account.',
//       };
//     }

//     // If account creation is successful, redirect to login page
//     redirect('/login');
//   } catch (error) {
//     return {
//       message: 'An error occurred during signup.',
//     };
//   }
// }

// export async function login(
//   state: FormState,
//   formData: FormData
// ): Promise<FormState> {
//   // Validate form fields
//   const validatedFields = LoginFormSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   });

//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   // Prepare data for sending to the backend
//   const data = {
//     email: validatedFields.data.email,
//     password: validatedFields.data.password,
//   };

//   try {
//     // Send request to backend to validate the user's credentials
//     const response = await axios.postData('/auth/login', data);
//     if (!response) {
//       return { message: 'Invalid login credentials.' };
//     }

//     // If login is successful, create a session for the user and redirect
//     const user = {
//       token: response.token,
//       name: response.name,
//       userId: response.userId,
//     };

//     await createSession(user);
//     redirect('/dashboard'); // Adjust this route according to your application

//   } catch (error) {
//     return { message: 'An error occurred during login.' };
//   }
// }

export async function signup(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const axios = axiosInstance<any>("https://focus-6j4w.onrender.com/api");

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword")
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const data = {
    name: validatedFields.data.name,
    email: validatedFields.data.email,
    password: validatedFields.data.password
  };
  console.log(data);

  try {
    const response = await axios.postData("/auth/signup", data);
    if (!response) {
      return { message: "An error occurred while creating your account." };
    }
    else {
      return { success: "Account created successfully." };
    }

  } catch (err) {
    console.log(err);
    return { message: isAxiosError(err) ? err.response?.data?.message ?? "An error occurred" : "An error occurred", };
  }
}

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const axios = axiosInstance<any>("https://focus-6j4w.onrender.com/api");

  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password
  };
  console.log(data);

  try {
    const response = await axios.postData("/auth/login", data);
    if (!response) {
      return { message: "Invalid login credentials." };
    }

    const user = {
      token: response.token,
      name: response.name,
      userId: response.userId
    };
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user);

    // Call the session API route
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user), // Must stringify the body
    });
    // await createSession(user);
    return { success: "Account created successfully." };
  } catch (error) {
    console.log(error);
    return { message: "An error occurred during login."};
  }
}

export async function logout() {
  await fetch("/api/session/delete", {
    method: "POST"
  });
}

