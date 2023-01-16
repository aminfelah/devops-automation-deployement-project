const promClient = require("prom-client");

const register = new promClient.Registry();
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });
const httpCounter = new promClient.Counter({
  name: "song_service_counter",
  help: "song_service_counter",
  labelNames: ["method", "path"],
  registers: [register],
});

const SongListenerCounter = new promClient.Counter({
  name: "song_listener_counter",
  help: "song_listener_counter",
  registers: [register],
});

const myMetrics = {
  register,
  collectDefaultMetrics,
  httpCounter,
  SongListenerCounter
};
module.exports = myMetrics;
