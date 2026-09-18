"use client";

interface Props {

events:any[];

categories:any[];

selectedEvent:string;

selectedCategory:string;

selectedStatus:string;

setSelectedEvent:(value:string)=>void;

setSelectedCategory:(value:string)=>void;

setSelectedStatus:(value:string)=>void;

}


export default function CandidateFilter({

events,

categories,

selectedEvent,

selectedCategory,

selectedStatus,

setSelectedEvent,

setSelectedCategory,

setSelectedStatus,

}:Props){


const filteredCategories =
categories.filter(
(category)=>
!selectedEvent ||
category.event_id===selectedEvent
);


return (

<div className="
flex
flex-col
gap-3
md:flex-row
">

<select

value={selectedEvent}

onChange={(e)=>setSelectedEvent(e.target.value)}

className="input-style"

>

<option value="">
All Events
</option>


{
events.map((event)=>(

<option

key={event.id}

value={event.id}

>

{event.name}

</option>

))

}


</select>



<select

value={selectedCategory}

onChange={(e)=>setSelectedCategory(e.target.value)}

className="input-style"

>


<option value="">
All Categories
</option>


{
filteredCategories.map((category)=>(

<option

key={category.id}

value={category.id}

>

{category.name}

</option>

))

}


</select>



<select

value={selectedStatus}

onChange={(e)=>setSelectedStatus(e.target.value)}

className="input-style"

>


<option value="">
All Status
</option>


<option value="active">
Active
</option>


<option value="inactive">
Inactive
</option>


</select>


</div>

);

}