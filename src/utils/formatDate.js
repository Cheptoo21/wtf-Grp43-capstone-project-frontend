export const formatRelativeDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    
    const isToday = date.toDateString() === now.toDateString();
    
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const timeString = date.toLocaleTimeString(undefined, timeOptions);
    
    if (isToday) {
        return `Today, ${timeString}`;
    } else if (isYesterday) {
        return `Yesterday, ${timeString}`;
    } else {
        return date.toLocaleDateString(undefined, { 
            month: 'short', day: 'numeric' 
        }) + `, ${timeString}`;
    }
}