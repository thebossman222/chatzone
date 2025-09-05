import { AuthForm } from "@/components/auth/auth-form";
import { getSession } from "@/lib/session";

export default async function LoginPage() {
  /**
   * Renders the login page
   */
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
