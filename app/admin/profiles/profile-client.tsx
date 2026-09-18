"use client";


import {
useEffect,
useState
} from "react";


import {

Search,

Users,

Edit3,

Trash2,

ChevronLeft,

ChevronRight,

RefreshCcw

} from "lucide-react";


import {
toast
} from "sonner";


import {
createClient
} from "@/lib/supabase/client";


import {
updateProfile,
deleteProfile
} from "./actions";





export default function ProfileClient({

initialProfiles,

totalCount,

pageSize

}:{

initialProfiles:any[];

totalCount:number;

pageSize:number;

}){


const supabase =
createClient();




const [profiles,setProfiles]
=
useState(
initialProfiles
);



const [total,setTotal]
=
useState(
totalCount
);



const [page,setPage]
=
useState(1);



const [search,setSearch]
=
useState("");



const [role,setRole]
=
useState("all");



const [selected,setSelected]
=
useState<any>(null);



const totalPages =
Math.ceil(
total / pageSize
);








async function loadProfiles(){


const from =
(page-1) * pageSize;


const to =
from + pageSize -1;



let query =
supabase

.from("profiles")

.select(
"*",
{
count:"exact"
}
)

.order(
"created_at",
{
ascending:false
}
)

.range(
from,
to
);





if(search){

query =
query.or(
`
full_name.ilike.%${search}%,
email.ilike.%${search}%
`
);

}





if(role !== "all"){

query =
query.eq(
"role",
role
);

}






const {

data,

count,

error

}=await query;



if(error){

toast.error(
error.message
);

return;

}



setProfiles(
data ?? []
);



setTotal(
count ?? 0
);



}








useEffect(()=>{


loadProfiles();


},[

page,

search,

role

]);









// REALTIME

useEffect(()=>{


const channel =

supabase

.channel(
"profiles-live"
)


.on(

"postgres_changes",

{

event:"*",

schema:"public",

table:"profiles"

},

()=>{

loadProfiles();

}

)


.subscribe();





return()=>{

supabase.removeChannel(
channel
);

};


},[]);









async function removeUser(id:string){


if(
!confirm(
"Delete this profile?"
)

)

return;



try{


await deleteProfile(id);


toast.success(
"Profile deleted"
);


loadProfiles();


}

catch(error:any){

toast.error(
error.message
);

}


}









return (

<div className="space-y-8">





{/* HEADER */}

<div>


<p className="
text-xs
uppercase
tracking-[0.3em]
font-bold
text-[#D4AF37]
">

PARAGEYAN 2026

</p>



<h1 className="
flex
items-center
gap-3
text-3xl
font-bold
text-[#0A2A1F]
mt-3
">


<Users/>


Profile Management


</h1>



<p className="
text-slate-500
mt-2
">

Manage voters and administrator accounts.

</p>


</div>









{/* FILTER */}

<div className="
bg-white
border
rounded-3xl
p-6
flex
gap-4
">


<div className="
flex
items-center
gap-3
border
rounded-xl
px-4
flex-1
">


<Search size={18}/>



<input

value={search}

onChange={(e)=>{

setPage(1);

setSearch(
e.target.value
);

}}

placeholder="
Search name or email...
"

className="
w-full
outline-none
py-3
"

/>


</div>






<select

value={role}

onChange={(e)=>{

setPage(1);

setRole(
e.target.value
);

}}

className="
border
rounded-xl
px-4
"

>


<option value="all">
All Users
</option>


<option value="admin">
Admins
</option>


<option value="voter">
Voters
</option>


</select>






<button

onClick={loadProfiles}

className="
bg-[#0A2A1F]
text-white
rounded-xl
px-4
"

>

<RefreshCcw size={18}/>

</button>



</div>









{/* TABLE */}

<div className="
bg-white
border
rounded-3xl
overflow-hidden
">


<table className="
w-full
">


<thead className="
bg-[#0A2A1F]
text-white
">


<tr>


<th className="
p-5
text-left
">

User

</th>



<th className="
p-5
text-left
">

Email

</th>



<th className="
p-5
text-center
">

Role

</th>



<th className="
p-5
text-center
">

Action

</th>


</tr>


</thead>




<tbody>


{

profiles.map((user)=>(


<tr

key={user.id}

className="
border-b
hover:bg-slate-50
"

>


<td className="
p-5
">


<div className="
flex
items-center
gap-3
">


<div className="
w-11
h-11
rounded-full
bg-[#0A2A1F]
text-white
flex
items-center
justify-center
font-bold
">

{

user.full_name
?.charAt(0)

}

</div>




<div>

<p className="
font-bold
">

{user.full_name}

</p>


<p className="
text-sm
text-slate-500
">

{user.department}

</p>


</div>


</div>


</td>





<td className="
p-5
">

{user.email}

</td>





<td className="
p-5
text-center
">


<span className={`

px-4
py-2
rounded-full
font-bold
text-sm

${

user.role==="admin"

?

"bg-yellow-100 text-yellow-700"

:

"bg-green-100 text-green-700"

}

`}>

{

user.role.toUpperCase()

}

</span>


</td>





<td className="
p-5
">


<div className="
flex
justify-center
gap-2
">


<button

onClick={()=>setSelected(user)}

className="
bg-[#0A2A1F]
text-white
p-3
rounded-xl
"

>

<Edit3 size={16}/>

</button>





<button

onClick={()=>removeUser(user.id)}

className="
bg-red-600
text-white
p-3
rounded-xl
"

>

<Trash2 size={16}/>

</button>



</div>


</td>




</tr>



))


}


</tbody>


</table>



</div>









{/* PAGINATION */}


<div className="
bg-white
border
rounded-2xl
p-5
flex
justify-between
items-center
">


<p className="
text-sm
text-slate-500
">

Page {page} of {totalPages || 1}

<br/>

Total Users: {total}

</p>





<div className="
flex
gap-3
">


<button

disabled={page===1}

onClick={()=>setPage(page-1)}

className="
border
rounded-xl
p-3
disabled:opacity-40
"

>

<ChevronLeft/>

</button>




<button

disabled={page===totalPages}

onClick={()=>setPage(page+1)}

className="
bg-[#0A2A1F]
text-white
rounded-xl
p-3
disabled:opacity-40
"

>

<ChevronRight/>

</button>



</div>


</div>









{

selected &&


<EditModal

user={selected}

close={()=>setSelected(null)}

refresh={loadProfiles}

/>


}



</div>


);

}









function EditModal({

user,

close,

refresh

}:any){



const [form,setForm]=useState(user);



async function save(){


try{


await updateProfile(

user.id,

form

);



toast.success(
"Profile updated"
);


await refresh();


close();


}

catch(error:any){

toast.error(
error.message
);

}



}




return (

<div className="
fixed
inset-0
bg-black/40
z-50
flex
items-center
justify-center
">


<div className="
bg-white
rounded-3xl
p-8
w-full
max-w-lg
">


<h2 className="
text-xl
font-bold
mb-5
">

Edit Profile

</h2>




{

[
"full_name",
"course",
"year_level",
"department"

].map(field=>(


<input

key={field}

value={
form[field] ?? ""
}

onChange={(e)=>

setForm({

...form,

[field]:
e.target.value

})

}

placeholder={field}

className="
w-full
border
rounded-xl
p-3
mb-3
"

/>


))

}






<select

value={form.role}

onChange={(e)=>

setForm({

...form,

role:e.target.value

})

}

className="
w-full
border
rounded-xl
p-3
"

>


<option value="voter">
Voter
</option>


<option value="admin">
Admin
</option>


</select>







<div className="
flex
gap-3
mt-6
">


<button

onClick={close}

className="
flex-1
border
rounded-xl
py-3
"

>

Cancel

</button>




<button

onClick={save}

className="
flex-1
bg-[#0A2A1F]
text-white
rounded-xl
py-3
"

>

Save

</button>



</div>



</div>


</div>


)

}