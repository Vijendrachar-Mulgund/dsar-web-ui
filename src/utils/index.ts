export const getInitials = (firstname: string, lastname: string) => {
  if (!firstname && !lastname) return "AB";
  if (!firstname) return `${lastname[0]}${lastname?.[0]}`;
  if (!lastname) return `${firstname[0]}${firstname?.[0]}`;
};
