export const dateToString = (date) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();
  let [createYear, createMonth, createDay] = date;
  if (Math.abs(currentDay - createDay) < 1) {
    return "Today";
  } else if (
    Math.abs(currentDay - createDay) > 0 &&
    Math.abs(currentDay - createDay) < 30
  ) {
    return `${Math.abs(currentDay - createDay)} ${Math.abs(currentDay - createDay) > 1 ? "days" : "day"
      } ago`;
  } else if (
    Math.abs(currentMonth - createMonth) > 0 &&
    Math.abs(currentMonth - createMonth) < 13
  ) {
    return `${Math.abs(currentMonth - createMonth)} ${Math.abs(currentMonth - createMonth) > 1 ? "months" : "month"
      } ago`;
  } else
    return `${currentYear - createYear} ${currentYear - createYear > 1 ? "years" : "year"
      } ago`;
};

export const creationDateGenerator = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return [year, month, day];
};
