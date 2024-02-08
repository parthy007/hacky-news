function corsMiddleware(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://hacky-news-two.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  }
  
module.exports = corsMiddleware;