import { z } from "zod";

export const SignupFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name field must not be empty." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character."
      })
      .trim(),
    confirmPassword: z.string().trim()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"] // this points to the confirmPassword field
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." })
});

export const ForgetPasswrodFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." })
});

export const TwoFactorAuthFormSchema = z.object({
  code: z.string().min(6, { message: "Code must be exactly 6 characters" })
});

export const EmailVerificationFormSchema = z.object({
  code: z.string().min(6, { message: "Code must be exactly 6 characters" })
});

export const PasswordResetFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "Password field must not be empty." }),
    confirmNewPassword: z
      .string()
      .min(1, { message: "Password field must not be empty." })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match.",
    path: ["confirmNewPassword"] // This will highlight the confirmNewPassword field on error
  });

export type FormState =
  | {
      errors?: {
        name?: string[];
        firstName?: string[];
        middleName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        code?: string[];
        newPassword?: string[];
        confirmNewPassword?: string[];
      };
      message?: string;
      success?: string;
    }
  | undefined;

export type SessionPayload = {
  expiresAt: Date;
  user: UserPayload;
};

export type UserPayload = {
  token: string;
  name: string;
  userId: string;
};
