const { register } = require("../metrics/metrics");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/metrics',async (req,res)=>{
    res.setHeader('Content-Type',register.contentType);
    res.send(await register.metrics())
  })
};
