const validator = require("validator");
const sanitizeHtml = require("sanitize-html");

/*
  Validate and sanitize registration requests.
*/
function validateRegister(req, res, next) {
  let { username, email, password } = req.body;

  username = sanitizeHtml(username || "");
  email = sanitizeHtml(email || "");
  password = password || "";

  if (
    !validator.isLength(username, {
      min: 3,
      max: 30,
    })
  ) {
    return res.status(400).json({
      success: false,
      message: "Username must be between 3 and 30 characters",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({
      success: false,
      message: "Password must contain uppercase, lowercase, number and symbol",
    });
  }

  req.body.username = username;
  req.body.email = email;

  next();
}

/*
  Validate login requests.
*/
function validateLogin(req, res, next) {
  let { email } = req.body;

  email = sanitizeHtml(email || "");

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address",
    });
  }

  req.body.email = email;

  next();
}

/*
  Validate task creation requests.
*/
function validateTask(req, res, next) {
  let { title } = req.body;

  title = sanitizeHtml(title || "");

  if (
    !validator.isLength(title, {
      min: 1,
      max: 200,
    })
  ) {
    return res.status(400).json({
      success: false,
      message: "Task title must be between 1 and 200 characters",
    });
  }

  req.body.title = title;

  next();
}

module.exports = {
  validateRegister,
  validateLogin,
  validateTask,
};
