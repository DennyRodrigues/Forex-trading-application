const jwt = require("jsonwebtoken");


export const generateToken = (id:string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
