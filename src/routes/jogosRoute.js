import {Router} from "express";
import * as jogosController from "../controllers/jogosController.js";
import validarId from "../middlewares/validarId.js";

const router = Router();

router.get("/",  jogosController.listar );

router.get("/:id", validarId, jogosController.buscarPorId );

router.post("/", jogosController.criar );

router.put("/:id", validarId, jogosController.atualizar );

router.delete("/:id", validarId, jogosController.excluir );

export default router; // teste