// frontend/src/lib/utils.js
export const formatDate = (date) => {
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
