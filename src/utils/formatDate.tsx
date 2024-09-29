export default function formatDate(date: Date, getTime: boolean = true) {
  if (getTime) {
    const string = date.toLocaleTimeString("vi-vn", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour: "2-digit",
    });
    return string;
  } else {
    const string = date.toLocaleString("vi-vn", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return string;
  }
}
