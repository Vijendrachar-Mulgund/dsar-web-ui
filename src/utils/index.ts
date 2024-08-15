export const getInitials = (firstname: string | undefined, lastname: string | undefined) => {
  if (!firstname || !lastname) return "";
  return `${firstname[0]}${lastname[0]}`;
};
