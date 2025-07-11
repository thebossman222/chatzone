import { AuthForm } from "@/components/ui/auth/auth-form";
import { getSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getSession();
  if (!session) redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full">
      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        ChatZone
      </span>
      <div className="flex w-full items-center justify-center p-6 md:p-10 z-10">
        <div className="w-full max-w-sm">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
