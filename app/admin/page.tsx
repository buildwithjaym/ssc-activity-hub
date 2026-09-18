import DashboardClient from "@/components/admin/dashboard-client";

// You already have the eventId from your current logic
export default function AdminDashboardPage() {
  // Replace this with how you currently get the eventId
  const eventId = "677946cf-0f6b-4eb9-8f2d-72e3d9f3658a"; 

  return (
    <div className="p-6 lg:p-8">
      <DashboardClient eventId={eventId} />
    </div>
  );
}