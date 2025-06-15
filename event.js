import events from "events";
import http from "http";

const eventOne = new events.EventEmitter();
const eventTwo = new events.EventEmitter();

eventOne.on("signin", () => {
  console.log("user signed in");
});

eventOne.on("signin", () => {
  console.log("user signed in again");
});

eventOne.on("signin", () => {
  console.log("user signed in again and again");
});


eventTwo.on("payment", (name, email) => {
  console.log(`payment done for ${name} and ${email}`);
})


const server = http.createServer((req, res) => {
  eventTwo.emit("payment", "prateek", "prateek@gmail.com");-
  eventOne.emit("signin");
  res.end();
});

server.listen(3001);
