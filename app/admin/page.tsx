import {
getAdminStats
} from "@/lib/admin/queries";


import DashboardContent from "@/components/admin/dashboard-content";



export default async function AdminPage(){


const stats = await getAdminStats();



return (

<DashboardContent

stats={stats}

/>

)

}