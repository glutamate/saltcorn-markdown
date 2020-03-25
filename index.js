const State = require("saltcorn-data/db/state");
const markdown = require("./markdown");
const register = () => {
  State.addType(markdown);
};

module.exports = { register };
