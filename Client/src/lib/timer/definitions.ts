import { z } from "zod";

export const TimerSchema = z.object({
  time: z.string().min(1),
  sessionType: z.string().min(1)
});

export type FormState =
  | {
      errors?: {
        time?: string[];
        sessionType?: string[];
      };
      message?: string;
      success?: string;
    }
  | undefined;

export type UserPayload = {
  token: string;
  name: string;
  userId: string;
};
