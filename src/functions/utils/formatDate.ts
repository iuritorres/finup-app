export const formatDate = (date: string): string =>
  date.split("T")[0].split("-").reverse().join("/");

export const getMonthNameFromDate = (date: Date): string => {
  const monthName = date.toLocaleString("pt-BR", { month: "long" });
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};

export const toISODate = (date: string): string => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}T00:00:00.000Z`;
};
