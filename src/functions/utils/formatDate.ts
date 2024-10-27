export const formatDate = (date: string): string =>
  date.split("T")[0].split("-").reverse().join("/");

export const getMonthNameFromDate = (date: Date): string => {
  const monthName = date.toLocaleString("pt-BR", { month: "long" });
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};
