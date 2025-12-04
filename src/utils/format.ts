export const capitalize = (value: string) => {
  if (!value) return "";
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
