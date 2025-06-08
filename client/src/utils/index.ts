export const formatDate = (date: string | number | Date) => {
  const formattedDate = new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formattedDate.replace(" at ", ", ");
};

export const calculateReadTime = (content: string) => {
  const WORDS_PER_MINUTE = 250;
  // These regex meant to remove all HTML tags and multi-empty spaces from being calculated
  const normalizedContent = content
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = normalizedContent.split(" ").length;
  const readTime = wordCount / WORDS_PER_MINUTE;

  if (readTime < 0.5) {
    return "Less than 1 min read";
  } else {
    return `${Math.ceil(readTime).toString()} min read`;
  }
};
