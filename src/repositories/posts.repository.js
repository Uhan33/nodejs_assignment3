// import { prisma } from "../utils/prisma/index.js"

export class PostsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    findAllPosts = async() => {
        const posts = await this.prisma.posts.findMany();

        return posts;
    }

    createPost = async(nickname, password, title, content) => {
        const createdPost = await this.prisma.posts.create({
            data: {
                nickname,
                password,
                title,
                content,
            }
        });

        return createdPost;
    }

    findPost = async(postId) => {
        const post = await this.prisma.posts.findFirst({
            where: {postId: +postId},
        });
        
        return post;
    }

    updatePost = async(postId, title, content) => {
        const post = await this.prisma.posts.update({
            where: {postId: +postId},
            data: {
                title,
                content,
            }
        });

        return post;
    }

    deletePost = async (postId) => {
        const post = await this.prisma.posts.delete({
            where: {postId: +postId}
        });

        return post;
    }

}
