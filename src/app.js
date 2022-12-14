import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

const tweetMaxQuantity = 10;

let user = [];
let tweets = [];

server.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if (!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    user.push(req.body);
    res.status(201).send("OK");
});

server.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;
    if (!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    tweets.push(req.body);
    res.status(201).send("OK");
});

server.get("/tweets", (req, res) => {
    let tweetList = [];
    let tweetUser = {};
    let tweetListToSend = [];
    if (tweets.length >= tweetMaxQuantity) {
        tweetList = tweets.slice(-tweetMaxQuantity);
    } else {
        tweetList = tweets.slice(-tweets.length);
    };
    tweetList.map(tweet => {
        tweetUser = user.find(item => item.username === tweet.username);
        tweetListToSend.push({
            username: tweet.username,
            avatar: tweetUser.avatar,
            tweet: tweet.tweet
        });
    });
    res.send(tweetListToSend);
});

server.listen(5000, () => console.log("App running in port: 5000"));