import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Must include one uppercase letter")
  .regex(/[a-z]/, "Must include one lowercase letter");

export const signUpSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    password: passwordSchema,
    role: z.enum(["customer", "vendor"]),
    businessName: z.string().trim().optional(),
  })
  .refine((d) => d.role !== "vendor" || !!d.businessName, {
    message: "Business name is required for vendors",
    path: ["businessName"],
  });

export const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;