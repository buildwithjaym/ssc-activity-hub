import AdminShell from "@/components/admin/admin-shell";
import { getAdminProfile } from "@/lib/admin/queries";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getAdminProfile();

  // Restrict access
  if (!profile || profile.role !== "admin") {
    redirect("/voting");
  }

  return (
    <AdminShell profile={profile}>
      {children}
    </AdminShell>
  );
}