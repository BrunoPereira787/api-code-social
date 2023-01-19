const mongoose = require("mongoose");
const Post = require("../models/Post");
const fs = require("fs").promises;
const path = require("path");
const User = require("../models/User");

class PostController {
  static getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(201).json({ posts });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  static createPost = async (req, res) => {
    try {
      let post = {};

      if (Object.keys(req.body).length === 0 && !req.file) {
        return res
          .status(422)
          .json({ message: "Digite algo ou poste uma foto para publicar" });
      }

      if (req.file) {
        post.image = req.file.filename;
      }

      if (Object.keys(req.body).length > 0) {
        post.desc = req.body.desc;
      }

      post.userId = req.userId;

      await Post.create(post);

      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  static getPostById = async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Post.findById(id);

      if (!post) {
        return res.status(422).json({ message: "Post invalido" });
      }

      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  static getPostByUser = async (req, res) => {
    try {
      const id = req.userId;

      const post = await Post.find({ userId: id });

      if (!post) {
        return res
          .status(422)
          .json({ message: "Não há posts para este usuário" });
      }

      res.status(200).json({ post });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  static deletePost = async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Post.findById(id);

      if (String(post.userId) !== req.userId) {
        return res.status(422).json({ message: "Operação invalida" });
      }

      const uploadImages = path.resolve(
        __dirname,
        "..",
        "public",
        "images",
        "posts"
      );

      if (post.image) {
        const PostsImages = path.join(uploadImages, post.image);
        const image = await fs.stat(PostsImages);

        if (image) {
          await fs.unlink(hoia);
        }
      }

      await Post.findByIdAndDelete(id);

      res.status(200).json({ message: "Post deletado com suceso" });
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  static updatePost = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (String(post.userId) !== req.userId) {
      return res.status(422).json({ message: "Operação invalida" });
    }

    const uploadImages = path.resolve(
      __dirname,
      "..",
      "public",
      "images",
      "posts"
    );

    if (req.file) {
      if (post.image) {
        const PostsImages = path.join(uploadImages, post.image);
        const image = await fs.stat(PostsImages);

        if (image) {
          await fs.unlink(PostsImages);
        }
      }

      post.image = req.file.filename;
    }

    if (Object.keys(req.body).length > 0) {
      post.desc = req.body.desc;
    }

    await Post.findByIdAndUpdate(id, post);

    res.status(200).json({ post });
  };

  static likePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    const post = await Post.findById(id);

    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      return res.status(200).json({ message: "deslike" });
    }

    await post.updateOne({ $push: { likes: userId } });
    res.status(200).json({ message: "like" });
  };

  static commentPost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const { comment } = req.body;

    if (!comment) {
      return res.status(422).json({ message: "Digite algo para comentar" });
    }

    const idComment = Math.floor(Date.now() * Math.random()).toString(36);

    const post = await Post.findById(id);

    await post.updateOne({
      $push: { comments: { idComment, userId, comment } },
    });

    res.status(200).json({ message: "Comentario adicionado" });
  };

  static deleteCommentPost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const { idComment } = req.params;

    if (!idComment) {
      return res.status(200).json({ message: "operação invalida" });
    }

    const post = await Post.findById(id);

    const commentDelete = post.comments.find(
      (comment) => comment.idComment === idComment
    );

    if (!commentDelete) {
      return res.status(422).json({ message: "Comentario invalido" });
    }

    if (commentDelete.userId !== userId) {
      return res.status(422).json({ message: "Operação invalidaaaa" });
    }

    await post.updateOne({
      $pull: {
        comments: {
          userId,
          idComment,
        },
      },
    });

    res.status(200).json({ message: "Comentario deletado com sucesso" });
  };

  static getPostsFromFollowers = async (req, res) => {
    try {
      const userId = req.userId;
      const user = await User.findById(userId);
      const currentUserPosts = await Post.find({ userId: userId });
      const followingPosts = await Post.find({
        userId: { $in: user.following },
      });

      res.status(200).json(currentUserPosts.concat(followingPosts));
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

module.exports = PostController;
