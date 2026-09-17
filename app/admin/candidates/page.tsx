import {

getCandidates,

getEvents,

getCategories

} from "@/lib/candidates/queries";


import CandidateClient

from "./candidate-client";




export default async function CandidatesPage(){



const [

candidates,

events,

categories

]=await Promise.all([


getCandidates(),

getEvents(),

getCategories()


]);





return (

<CandidateClient


candidates={candidates}


events={events}


categories={categories}


/>

);


}