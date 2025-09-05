import { Dashboard } from "@/components/dashboard/dashboard";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  /**
   * Redirects to login if there is no session
   */
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  /**
   * Renders the dashboard
   */
  return <Dashboard />;
}
