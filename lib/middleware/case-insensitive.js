module.exports = (req, res, next) => {
  for(const key in req.query){
    req.query[key.toLowerCase()] = req.query[key];
  } next();
};
