const express = require("express");
const loginRouter = require("./routes/user");
const musicRouter = require("./routes/song");
const playlistRouters = require("./routes/songlist");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("", loginRouter);
app.use("/songs", musicRouter);
app.use("/home", playlistRouters);

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

app.use((err, req, res, next) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Something is wrong! Try later' });
    }
});

app.listen(3000, () => console.log("listening to 3000..."));
