const promClient = require("prom-client");

const register = new promClient.Registry();
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register });
const httpCounter = new promClient.Counter({
  name: "login_service_counter",
  help: "login_service_counter",
  labelNames: ["method", "path"],
  registers: [register],
});

const PublicContentCounter = new promClient.Counter({
  name: "login_service_public_content_counter",
  help: "login_service_public_content_counter",
  registers: [register],
});
const UserContentCounter = new promClient.Counter({
  name: "login_service_user_content_counter",
  help: "login_service_user_content_counter",
  registers: [register],
});
const AdminContentCounter = new promClient.Counter({
  name: "login_service_admin_content_counter",
  help: "login_service_admin_content_counter",
  registers: [register],
});
const ModeratorContentCounter = new promClient.Counter({
  name: "login_service_moderator_content_counter",
  help: "login_service_moderator_content_counter",
  registers: [register],
});

const registerSuccessCounter = new promClient.Counter({
  name: "login_service_sign_in_success_counter",
  help: "login_service_sign_in_success_counter",
  registers: [register],
});

const registerTotalCounter = new promClient.Counter({
  name: "login_service_sign_in_total_counter",
  help: "login_service_sign_in_total_counter",
  registers: [register],
});
const loginUserNotFoundCounter = new promClient.Counter({
  name: "login_service_user_not_found_error_counter",
  help: "login_service_user_not_found_error_counter",
  registers: [register],
});
const loginUserWrongPasswordCounter = new promClient.Counter({
  name: "login_service_wrong_password_counter",
  help: "login_service_wrong_password_counter",
  registers: [register],
});
const loginSuccessCounter = new promClient.Counter({
  name: "login_service_login_success_counter",
  help: "login_service_login_success_counter",
  registers: [register],
});

const loginTotalCounter = new promClient.Counter({
  name: "login_service_login_total_counter",
  help: "login_service_login_total_counter",
  registers: [register],
});
const myMetrics = {
  register,
  collectDefaultMetrics,
  httpCounter,
  registerSuccessCounter,
  registerTotalCounter,
  loginSuccessCounter,
  loginTotalCounter,
  PublicContentCounter,
  UserContentCounter,
  AdminContentCounter,
  ModeratorContentCounter,
  loginUserNotFoundCounter,
  loginUserWrongPasswordCounter,
};
module.exports = myMetrics;
