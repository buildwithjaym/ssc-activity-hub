import {
  getActiveEvent,
  getCategories,
  getCandidates,
} from "./actions";

import CandidatesClient from "./candidates-client";


export const revalidate = 3600;



export default async function CandidatesPage(){


const event = await getActiveEvent();



if(!event){

return (

<div className="
flex
min-h-screen
items-center
justify-center
">

No active event found.

</div>

);

}




const categories = await getCategories(event.id);

const candidates = await getCandidates(event.id);



return (

<CandidatesClient

eventName={event.name}

categories={categories}

candidates={candidates}

/>

);


}