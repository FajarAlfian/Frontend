export const ConvertDayDate = (dateString) => {
  const date = new Date(dateString);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${weekday}, ${day} ${month} ${year}`;
};

export const ConvertDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const formatRupiah = (numberString) => {
  const number = parseInt(numberString, 10);
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(number);
};

export const isFutureSchedule = (date) => {
  const scheduleDate = new Date(date);
  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return scheduleDate >= tomorrow;
};
