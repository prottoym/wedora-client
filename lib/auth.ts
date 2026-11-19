import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);
const db = client.db("wedora");

// Public sign-up can only create these two roles. Admin is never allowed here.
const SIGNUP_ROLES = ["vendor", "customer"];

// Fields a user must never change on their own account.
const PROTECTED_FIELDS = ["role", "isBlocked", "subscriptionPlan", "subscriptionExpiresAt"];

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

    user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "customer" },
      businessName: { type: "string", required: false },
      isBlocked: { type: "boolean", required: false, defaultValue: false, input: false },
      subscriptionPlan: { type: "string", required: false, defaultValue: "free", input: false },
      subscriptionExpiresAt: { type: "date", required: false, input: false },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = (user as { role?: string }).role;

          if (role && !SIGNUP_ROLES.includes(role)) {
            throw new APIError("BAD_REQUEST", { message: "Invalid account role." });
          }

          return {
            data: {
              ...user,
              role: role ?? "customer", // Google sign-up has no role, so it becomes customer
              isBlocked: false,
              subscriptionPlan: "free",
            },
          };
        },
      },
      update: {
        before: async (data) => {
          for (const key of PROTECTED_FIELDS) {
            if (key in (data as Record<string, unknown>)) {
              throw new APIError("FORBIDDEN", { message: "This field cannot be changed." });
            }
          }
          return { data };
        },
      },
    },
  },


  plugins: [jwt(), nextCookies()], // nextCookies() must stay the last plugin
});