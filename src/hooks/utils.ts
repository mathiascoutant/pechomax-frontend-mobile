export const formatDate = (date: Date): string => {
  if (!date || !(date instanceof Date)) {
    return ''; 
  }
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return formattedDate;
};



export const formatTimeDifference = (createdAt: Date): string => {
  const now = new Date();
  const difference = now.getTime() - new Date(createdAt).getTime();

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    return `Il y a quelques secondes`;
  }
};

export const isWithinWeek = (date: Date) => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return date >= oneWeekAgo && date <= now;
};