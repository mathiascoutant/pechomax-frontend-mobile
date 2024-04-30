export const formatDate = (date: string) => {
    const index = date.indexOf('T');
    return date.substring(0, index);
  };
  