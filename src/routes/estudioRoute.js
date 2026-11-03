import {Router} from "express";
import * as estudioController from "../controllers/estudioController.js";
import validarId from "../middlewares/validarId.js";

const router = Router();

router.get("/", estudioController.listar );

router.get("/:id", validarId, estudioController.buscarPorId );

router.post("/", estudioController.criar );

router.put("/:id", validarId, estudioController.atualizar );

router.delete("/:id", validarId, estudioController.excluir );

export default router;