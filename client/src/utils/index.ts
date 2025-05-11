export const formatDate = (date: string | number | Date) => {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
