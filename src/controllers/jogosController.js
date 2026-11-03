import * as jogosModel from "../models/jogosModel.js";
import {textoValido} from "../utils/validacoes.js";

export function listar (req, res, next) {
    jogosModel.listar((erro, resultado) => { 
        if (erro) return next(erro);
        return res.status(200).json(resultado);

    });
}

export function buscarPorId (req, res, next) {
   jogosModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Estúdio não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
};

export function criar (req, res, next) {
    const { nome, pais } = req.body ?? {};
    if (!textoValido(nome, 100) || !textoValido(pais, 60)) {
        return res.status(400).json({ erro: "Informe nome (até 100 caracteres) e pais (até 60)" });
    }
    const dados = { nome: nome.trim(), pais: pais.trim() };

    jogosModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Estúdio cadastrado com sucesso",
            id: resultado.insertId
        });
    });
};

export function atualizar (req, res, next) {
    const { nome, pais } = req.body ?? {};
    if (!textoValido(nome, 100) || !textoValido(pais, 60)) {
        return res.status(400).json({ erro: "Informe nome (até 100 caracteres) e pais (até 60)" });
    }
    const dados = { nome: nome.trim(), pais: pais.trim() };

    // Consulta didática para confirmar que o registro existe antes de editar.
    jogosModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Estúdio não encontrado" });
        }
        jogosModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Estúdio atualizado com sucesso" });
        });
    });
};

export function excluir (req, res, next)  {
    jogosModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Estúdio não encontrado" });
        }
        return res.status(200).json({ mensagem: "Estúdio excluído com sucesso" });
    });
};