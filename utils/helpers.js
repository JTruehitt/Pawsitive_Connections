module.exports = {
    format_date: (date) => {
      const formattedDate = new Date(date);
  
      const options = {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
  
      return formattedDate.toLocaleString(undefined, options);
    },

    display_highest: (bids) => {
      const sortedBids = bids.sort((a,b) => b.bidAmount - a.bidAmount);
      const amount = sortedBids[0].bidAmount;
      const user = sortedBids[0].user.user_name;

      return `${amount} by ${user}`
    }
  };