export function formatDate(dateStirng : string):string{
return new Date(dateStirng).toLocaleDateString("en-US",{   

    year:"numeric",
    month:"short",
    day:"numeric",
    hour:"numeric",
    minute:"2-digit",

 });
}