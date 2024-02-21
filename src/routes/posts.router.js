import express from "express";
import { prisma } from "../utils/prisma/index.js";
import { PostsController } from "../controllers/posts.controller.js";
import { PostsService } from "../services/posts.service.js";
import { PostsRepository } from "../repositories/posts.repository.js";

const router = express.Router();

const postsRepository = new PostsRepository(prisma);
const postsService = new PostsService(postsRepository);
const postsController = new PostsController(postsService); // PostsController를 인스턴스화 시킨다.

router.post("/", postsController.createPost);

router.get("/", postsController.getPosts);
router.get("/:postId", postsController.getSelectPost);
router.put("/:postId", postsController.updatePost);
router.delete("/:postId", postsController.deletePost);

export default router;
