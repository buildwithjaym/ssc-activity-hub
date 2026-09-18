"use server";


import {
createClient
} from "@/lib/supabase/server";


import {
revalidatePath
} from "next/cache";



const PATH =
"/admin/profiles";





function validateId(id:string){

if(!id){

throw new Error(
"Profile ID required"
);

}

}





/*
UPDATE PROFILE
*/


export async function updateProfile(

id:string,

updates:any

){


validateId(id);



const supabase =
await createClient();



const {

data,

error

}=await supabase

.from("profiles")

.update({

full_name:
updates.full_name,

course:
updates.course,

year_level:
updates.year_level,

department:
updates.department,

role:
updates.role,

avatar_url:
updates.avatar_url,

updated_at:
new Date().toISOString()

})

.eq(

"id",

id

)

.select("*")

.maybeSingle();





if(error){

throw new Error(
error.message
);

}





if(!data){

throw new Error(
"Profile not found"
);

}




revalidatePath(PATH);



return data;


}








/*
DELETE PROFILE
*/


export async function deleteProfile(

id:string

){


validateId(id);



const supabase =
await createClient();





const {

data,

error

}=await supabase

.from("profiles")

.delete()

.eq(

"id",

id

)

.select("id")

.maybeSingle();






if(error){

throw new Error(
error.message
);

}




if(!data){

throw new Error(
"Profile not found"
);

}




revalidatePath(PATH);



return {

success:true

};


}