import { Router } from "express";
import { authValidation } from "../middlewares/validateToken.js";
import { 
    getPosts, 
    getPost, 
    createPost, 
    deletePost, 
    updatePost 
} from "../controllers/posts.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPostSchema } from "../schemas/posts.schema.js";

const router = Router();

router.get("/posts", authValidation, getPosts);
router.get("/posts/:id", authValidation, getPost);
router.post("/posts", authValidation, validateSchema(createPostSchema), createPost);
router.delete("/posts/:id", authValidation, deletePost);
router.put("/posts/:id", authValidation, updatePost);

export default router;

