export class PostsService {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }

  findAllPosts = async () => {
    const posts = await this.postsRepository.findAllPosts();

    // 내림차순 정렬
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // password, content를 뺀 상태로, Controller 에게 respones를 전달한다.
    return posts.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  createPost = async (nickname, password, title, content) => {
    const createdPost = await this.postsRepository.createPost(
      nickname,
      password,
      title,
      content
    );

    return {
      postId: createdPost.postId,
      nickname: createdPost.nickname,
      title: createdPost.title,
      content: createdPost.content,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  findPost = async (postId) => {
    const post = await this.postsRepository.findPost(postId);

    if(!post)
        throw new Error('존재하지 않는 게시글입니다.');

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  updatePost = async (postId, password, title, content) => {
    const checkPost = await this.postsRepository.findPost(postId);

    if (!checkPost) {
      throw new Error("존재하지 않는 게시글입니다.");
    }

    if (checkPost.password !== password) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    const post = await this.postsRepository.updatePost(postId, title, content);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  deletePost = async (postId, password) => {
    const post = await this.postsRepository.findPost(postId);

    if (!post) {
      throw new Error("존재하지 않는 게시글입니다.");
    }

    if (post.password !== password) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    await this.postsRepository.deletePost(postId);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };
}
