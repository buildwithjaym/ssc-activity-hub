"use client";

import { useState } from "react";

import imageCompression from "browser-image-compression";

import { createClient } from "@/lib/supabase/client";

import {
  ImageIcon,
  Loader2,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";


interface Props {

value?: string;

onUpload:(url:string)=>void;

}



export default function ImageUpload({

value,

onUpload,

}:Props){


const supabase=createClient();


const [preview,setPreview]=useState(value || "");

const [uploading,setUploading]=useState(false);



async function handleUpload(file:File){


try{


setUploading(true);



const options={

maxSizeMB:0.5,

maxWidthOrHeight:1200,

useWebWorker:true,

fileType:"image/webp",

};



const compressed =
await imageCompression(
file,
options
);



const fileName =
`${crypto.randomUUID()}.webp`;



const path =
`candidates/${fileName}`;



const {
error
}=await supabase.storage

.from("candidate-images")

.upload(
path,
compressed,
{
contentType:"image/webp"
}
);



if(error)
throw error;



const {
data
}=supabase.storage

.from("candidate-images")

.getPublicUrl(path);



setPreview(
data.publicUrl
);



onUpload(
data.publicUrl
);



toast.success(
"Photo updated"
);



}

catch(error:any){


toast.error(
error.message ||
"Upload failed"
);



}

finally{


setUploading(false);


}


}




function removeImage(){


setPreview("");

onUpload("");

}



return (

<div className="space-y-4">


{preview ? (


<div className="flex flex-col items-center gap-4">


<div

className="
relative
h-44
w-44
overflow-hidden
rounded-3xl
border
border-[#0A2A1F]/10
"

>


<img

src={preview}

alt="Candidate"

className="
h-full
w-full
object-cover
"

/>



</div>




<div className="flex gap-3">


<label

className="
flex
cursor-pointer
items-center
gap-2
rounded-xl
bg-[#0A2A1F]
px-5
py-3
text-sm
font-semibold
text-white
hover:bg-[#123F2A]
"

>


<Upload size={16}/>

Change Photo



<input

hidden

type="file"

accept="image/*"

onChange={(e)=>{

const file=e.target.files?.[0];

if(file)
handleUpload(file);

}}

/>


</label>





<button

type="button"

onClick={removeImage}

className="
flex
items-center
gap-2
rounded-xl
border
border-red-200
px-5
py-3
text-sm
font-semibold
text-red-600
hover:bg-red-50
"

>


<X size={16}/>

Remove



</button>



</div>


</div>



):(



<label

className="
flex
cursor-pointer
flex-col
items-center
justify-center
rounded-3xl
border-2
border-dashed
border-[#0A2A1F]/20
bg-white
p-10
hover:border-[#D4AF37]
"

>


{

uploading ?

<Loader2

size={40}

className="
animate-spin
text-[#D4AF37]
"

/>

:

<>


<ImageIcon

size={40}

className="
text-[#D4AF37]
"

/>


<p

className="
mt-3
text-sm
font-semibold
"

>

Upload Candidate Photo

</p>


</>

}



<input

hidden

type="file"

accept="image/*"

onChange={(e)=>{

const file=e.target.files?.[0];

if(file)
handleUpload(file);

}}

/>



</label>


)}


</div>

);


}