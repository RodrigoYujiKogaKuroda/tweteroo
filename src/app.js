import express from 'express';
import cors from 'cors';

const server = express();
server.use(express.json());
server.use(cors());

let user = [];
let tweets = [];

server.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;
    if (!username || !avatar) {
        res.status(422).send("ERRO: Todos os campos são obrigatórios!");
        return;
    }
    user.push(req.body);
    res.status(200).send("OK");
});

server.post("/tweets", (req, res) => {
    
});

server.get("/tweets", (req, res) => {
    console.log(user);
});

server.listen(5000, () => console.log("App running in port: 5000"));