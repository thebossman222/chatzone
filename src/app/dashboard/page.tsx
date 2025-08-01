import { Dashboard } from "@/components/dashboard/dashboard";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <Dashboard session={session?.session} />;
}
