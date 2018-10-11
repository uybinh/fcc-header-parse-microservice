const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

const app = express();

app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .listen(PORT, () => console.log(`App is listening on port ${PORT}`));

app.get("/", (req, res) => res.render("pages/index"));

app.get('/api/whoami', (req, res) => {
  res.json({
    "ipaddress": req.ip,
    "language": req.headers["accept-language"],
    "software": req.headers["user-agent"]
  })
})

// respond status 404 with 'Not found' on other paths weren't catched by above routes
app.use((req, res, next) => {
  res.status(404)
     .type('text')
     .send('Not found')
})