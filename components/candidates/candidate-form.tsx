"use client";

import { useState } from "react";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  candidateSchema,
  CandidateFormData,
} from "./schema";

import {
  createCandidate,
  updateCandidate,
} from "@/lib/candidates/actions";

import {
  Loader2,
  Save,
} from "lucide-react";

import {
  toast,
} from "sonner";

import ImageUpload from "./image-upload";

import {
 colleges,
 yearLevels
} from "./constants";

interface Props {

  candidate?: any;

  events:any[];

  categories:any[];

  close:()=>void;

}



export default function CandidateForm({

candidate,

events,

categories,

close,

}:Props){


const [loading,setLoading]=useState(false);


const [image,setImage]=useState(
candidate?.image_url ?? ""
);



const {
register,
handleSubmit,
watch,
setValue,
formState:{
errors
}

}=useForm({

resolver:zodResolver(candidateSchema),

defaultValues:{

candidate_number:
candidate?.candidate_number ?? 1,


full_name:
candidate?.full_name ?? "",


college:
candidate?.college ?? "",



year_level:
candidate?.year_level ?? "",


bio:
candidate?.bio ?? "",


event_id:
candidate?.event_id ?? "",


category_id:
candidate?.category_id ?? "",


image_url:
candidate?.image_url ?? "",

}

});



const selectedEvent =
watch("event_id");



const filteredCategories =
categories.filter(
(category)=>
category.event_id===selectedEvent
);


async function submit(data:any){

  try{

    setLoading(true);


    const payload = {

      ...data,

      image_url:image || null

    };


    console.log(
      "FORM PAYLOAD:",
      payload
    );



    let result;



    if(candidate){


      console.log(
        "UPDATING:",
        candidate.id
      );


      result = await updateCandidate(

        candidate.id,

        payload

      );


    }else{


      console.log(
        "CREATING"
      );


      result = await createCandidate(

        payload

      );


    }



    console.log(
      "SERVER RESULT:",
      result
    );



    if(result?.success === false){


      toast.error(

        result.message ||

        "Action failed"

      );


      return;

    }



    toast.success(

      candidate

      ?

      "Candidate updated successfully"

      :

      "Candidate created successfully"

    );


    close();



  }catch(error:any){


    console.error(

      "SERVER ACTION ERROR:",

      error

    );


    toast.error(

      error?.message ||

      "Something went wrong"

    );


  }finally{


    setLoading(false);


  }


}


return (

<form

onSubmit={
handleSubmit(submit)
}

className="space-y-6"

>


<ImageUpload

value={image}

onUpload={setImage}

/>





<div className="grid gap-5 md:grid-cols-2">


<Input

label="Candidate Number"

type="number"

{...register("candidate_number")}

error={
errors.candidate_number?.message
}

/>



<Input

label="Full Name"

{...register("full_name")}

error={
errors.full_name?.message
}

/>


<div>

<label className="
block
mb-2
text-sm
font-medium
">

College

</label>


<select

{...register("college")}

className="input-style"

>

<option value="">

Select College

</option>


{
colleges.map(
(college)=>(

<option
key={college}
value={college}
>

{college}

</option>

)

)
}


</select>


{
errors.college &&

<p className="
text-xs
text-red-500
mt-1
">

{errors.college.message}

</p>

}

</div>





<div>

<label className="
block
mb-2
text-sm
font-medium
">

Year Level

</label>


<select

{...register("year_level")}

className="input-style"

>

<option value="">

Select Year Level

</option>


{
yearLevels.map(
(year)=>(

<option

key={year}

value={year}

>

{year}

</option>

)

)
}


</select>


</div>



</div>






<div>


<label className="block mb-2 text-sm font-medium">

Event

</label>


<select

{...register("event_id")}

onChange={(e)=>{

setValue(
"event_id",
e.target.value
);


setValue(
"category_id",
""
);

}}

className="input-style"

>


<option value="">

Select Event

</option>



{

events.map(
(event)=>(

<option

key={event.id}

value={event.id}

>

{event.name}

</option>

)

)

}


</select>


</div>






<div>


<label className="block mb-2 text-sm font-medium">

Category

</label>


<select

{...register("category_id")}

className="input-style"

>


<option value="">

Select Category

</option>


{

filteredCategories.map(
(category)=>(

<option

key={category.id}

value={category.id}

>

{category.name}

</option>


)

)

}


</select>



</div>






<textarea

rows={5}

className="input-style"

placeholder="Candidate biography..."

{...register("bio")}

/>






<button

disabled={loading}

className="
flex
w-full
items-center
justify-center
gap-2
rounded-2xl
bg-[#0A2A1F]
py-4
font-semibold
text-white
disabled:opacity-50
"

>


{

loading

?

<Loader2 className="animate-spin"/>

:

<Save size={18}/>

}


{

candidate

?

"Update Candidate"

:

"Save Candidate"

}


</button>



</form>

);

}







function Input({

label,

error,

...props

}:any){


return (

<div>


<label className="block mb-2 text-sm font-medium">

{label}

</label>


<input

{...props}

className="input-style"

/>



{

error &&

<p className="text-xs text-red-500">

{
String(error)
}

</p>

}



</div>

);


}