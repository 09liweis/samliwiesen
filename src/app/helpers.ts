function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const m = month > 9 ? month : `0${month + 1}`;
  const day = now.getDate();
  const d = day > 9 ? day : `0${day}`;
  return {year,m,d}
}
export {
  getToday
}