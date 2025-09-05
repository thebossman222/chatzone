import { AuthForm } from "@/components/auth/auth-form";
import { getSession } from "@/lib/session";

/**
 *
 * @returns A React component representing the login page
 * This page includes a title and an authentication form
 * It retrieves the current user session to determine if the user is already authenticated
 * The layout is styled using Tailwind CSS to center the content and provide a clean, modern look
 * The title "ChatZone" is displayed with a gradient text effect
 *
 */
export default async function LoginPage() {
  const session = await getSession();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        ChatZone
      </span>
      <div className="flex w-full items-center justify-center p-6 md:p-10 z-10">
        <div className="w-full max-w-sm">
          <AuthForm session={session?.session} />
        </div>
      </div>
    </div>
  );
}
