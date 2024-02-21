// import { PostsService } from "../services/posts.service.js";

export class PostsController {
  constructor(postsService) {
    this.postsService = postsService;
  }
  /** 게시글 조회 API */
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();

      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  /** 게시글 생성 API */
  createPost = async (req, res, next) => {
    try {
      const { nickname, password, title, content } = req.body;

      if(!nickname || !password || !title || !content) {
        throw new Error("InvalidParamsError");
      }

      const createdPost = await this.postsService.createPost(
        nickname,
        password,
        title,
        content
      );

      return res.status(201).json({ data: createdPost });
    } catch (err) {
      next(err);
    }
  };

  getSelectPost = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const post = await this.postsService.findPost(postId);

      return res.status(200).json({ data: post });
    } catch (err) {
      next(err);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { password, title, content } = req.body;

      const post = await this.postsService.updatePost(
        postId,
        password,
        title,
        content
      );

      return res.status(200).json({ data: post });
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { password } = req.body;

      const post = await this.postsService.deletePost(postId, password);

      return res.status(200).json({ message: post });
    } catch (err) {
      next(err);
    }
  };
}
