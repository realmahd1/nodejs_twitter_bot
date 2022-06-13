const { quotes } = require("./functions/quotes");
const { jokes } = require("./functions/jokes");

const threeHoursInMiliSeconds = 10800000;

// run set interval every 3'h if index is even run jokes function and if odd run quotes function
index = 0;
setInterval(() => {
  if (index % 2 === 0) {
    jokes();
    index++;
  } else {
    quotes();
    index++;
  }
}, threeHoursInMiliSeconds);
