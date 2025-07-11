import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, getSession, useSession } = createAuthClient();
