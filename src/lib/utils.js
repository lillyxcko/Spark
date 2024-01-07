import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export function formatDateString(dateString) {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    else if (minutes > 0) {
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    else {
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
}
export const checkIsLiked = (likeList, userId) => {
    return likeList.includes(userId);
};
