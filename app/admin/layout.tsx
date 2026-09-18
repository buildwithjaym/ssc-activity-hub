import AdminShell from "@/components/admin/admin-shell";

import {
getAdminProfile
} from "@/lib/admin/queries";



export default async function AdminLayout({

children

}:{

children:React.ReactNode;

}){


const profile =
await getAdminProfile();



return (

<AdminShell

profile={profile}

>

{children}

</AdminShell>

)

}