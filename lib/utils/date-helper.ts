export function convertToManilaTime(
 value:string
){

if(!value)
return null;


return `${value}:00+08:00`;

}