// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const conexao = require("./db.js");

import "dotenv/config";
import express from "express";
import cors from "cors";
import conexao from "./db.js";
import estudioRoute from "./src/routes/estudioRoute.js";
import jogoRoute from "./src/routes/jogosRoute.js";
import jogadoresRoute from "./src/routes/jogadoresRoute.js";
import tratarErro from "./src/middlewares/tratarErro.js";

const app = express();
const PORTA = Number(process.env.PORTA || 3000);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "API do GameHub funcionando" });
});

// #region estudios
app.use("/estudios", estudioRoute);
// #region jogos
app.use("/jogos", jogoRoute);
// #endregion jogos
app.use("/jogadores", jogadoresRoute);
// #endregion jogadores

app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});
app.use(tratarErro);

conexao.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar ao banco:", erro.code || erro.message);
        process.exit(1);
    }
    console.log("Conectado ao banco gamehub_db");
    const servidor = app.listen(PORTA, () => {
        console.log(`Servidor iniciado em http://localhost:${PORTA}`);
    });
    servidor.on("error", (erro) => {
        console.error("Erro ao iniciar servidor:", erro.code || erro.message);
        conexao.end(() => process.exit(1));
    });
});