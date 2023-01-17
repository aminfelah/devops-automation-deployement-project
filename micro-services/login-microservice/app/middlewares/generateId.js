const { v4: uuidv4 } = require("uuid");

const requestUUIDMiddleware = async (req, res, next) => {
  console.log("hereeee");
  req.headers["x-request-id"] = req.headers["x-request-id"] || uuidv4();
  next();
};
const generateId = {
  requestUUIDMiddleware,
};
module.exports = generateId;
