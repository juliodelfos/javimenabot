import Bree from "bree";

const bree = new Bree({
  jobs: [{ name: "tweet-schedule", interval: "at 23:32 pm" }],
});

bree.start();
