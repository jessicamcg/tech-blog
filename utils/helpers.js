module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    // console.log(date);
    // return new Date(date).getMonth()
    // // return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
};
