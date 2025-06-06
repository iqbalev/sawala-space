export const formatDate = (date: string | number | Date) => {
  const formattedDate = new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedDate.replace(" at ", ", ");
};
