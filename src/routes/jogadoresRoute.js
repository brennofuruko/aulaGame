import {Router} from "express";
import * as jogadoresController from "../controllers/jogadoresController.js";
import validarId from "../middlewares/validarId.js";

const router = Router();

router.get("/",  jogadoresController.listar );

router.get("/:id", validarId, jogadoresController.buscarPorId );

router.post("/", jogadoresController.criar );

router.put("/:id", validarId, jogadoresController.atualizar );

router.delete("/:id", validarId, jogadoresController.excluir );

export default router;