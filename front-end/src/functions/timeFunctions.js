export const convertToReadableTime = (timestamp) => {
  const date = new Date(timestamp);

  // Format options
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  // Convert to a user-friendly format
  return date.toLocaleDateString("en-US", options);
};
