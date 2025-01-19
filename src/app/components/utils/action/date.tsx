const DateCreate = (date?:string) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date(date || "");
   return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`; 
}

export default DateCreate