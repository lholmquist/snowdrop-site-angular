const express = require("express");
const morgan = require('morgan')
const app = express();
const path = require("path");

app.use(morgan(':remote-addr [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'));

app.use("/", express.static('dist'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get("*", function(req, res) {
	res.sendfile(path.resolve(__dirname, "..", "dist", "index.html"));
});

app.listen(8080, () => { console.log("Server listening on port 8080"); });