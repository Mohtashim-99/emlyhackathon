import { Router } from "express";
import { createNebula, getNebulas } from "../controllers/nebula.controller";

const router = Router();

router.post("/", createNebula);
router.get("/", getNebulas);

export default router;
