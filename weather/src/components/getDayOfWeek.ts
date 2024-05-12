export const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);

  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfTheWeek = dayOfWeek[date.getDay()];

  return `${year}年${month}月${day}日(${dayOfTheWeek})`;
};
