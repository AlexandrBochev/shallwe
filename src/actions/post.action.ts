"use server";

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.action";
import { revalidatePath } from "next/cache";
import { MAIN_LAYOUT, POST } from "@/lib/constants";

export const createPost = async (content: string, image: string) => {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    const post = await prisma.post.create({
      data: {
        content,
        image,
        authorId: userId,
      },
    });

    revalidatePath(MAIN_LAYOUT.NAVBAR.home.href);
    return { success: true, post };
  } catch (error) {
    console.error(POST.CREATE_POST.failedToCreatePost, error);
    return { success: false, error: POST.CREATE_POST.failedToCreatePost };
  }
};

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                image: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return posts;
  } catch (error) {
    console.error(POST.GET_POSTS.errorInGetPosts, error);
    throw new Error(POST.GET_POSTS.errorFetchingPosts);
  }
};

export const toggleLike = async (postId: string) => {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    // check if like exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error(POST.postNotFound);

    if (existingLike) {
      // unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      // like and create notification (only if liking someone else's post)
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            postId,
          },
        }),
        ...(post.authorId !== userId
          ? [
              prisma.notification.create({
                data: {
                  type: "LIKE",
                  userId: post.authorId, // recipient (post author)
                  creatorId: userId, // person who liked
                  postId,
                },
              }),
            ]
          : []),
      ]);
    }

    revalidatePath(MAIN_LAYOUT.NAVBAR.home.href);
    return { success: true };
  } catch (error) {
    console.error(POST.TOGGLE_LIKE.failedToToggleLike, error);
    return { success: false, error: POST.TOGGLE_LIKE.failedToToggleLike };
  }
};

export const createComment = async (postId: string, content: string) => {
  try {
    const userId = await getDbUserId();

    if (!userId) return;
    if (!content) throw new Error(POST.CREATE_COMMENT.contentIsRequired);

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error(POST.postNotFound);

    // Create comment and notification in a transaction
    const [comment] = await prisma.$transaction(async (tx) => {
      // Create comment first
      const newComment = await tx.comment.create({
        data: {
          content,
          authorId: userId,
          postId,
        },
      });

      // Create notification if commenting on someone else's post
      if (post.authorId !== userId) {
        await tx.notification.create({
          data: {
            type: "COMMENT",
            userId: post.authorId,
            creatorId: userId,
            postId,
            commentId: newComment.id,
          },
        });
      }

      return [newComment];
    });

    revalidatePath(MAIN_LAYOUT.NAVBAR.home.href);
    return { success: true, comment };
  } catch (error) {
    console.error(POST.CREATE_COMMENT.failedToCreateComment, error);
    return { success: false, error: POST.CREATE_COMMENT.failedToCreateComment };
  }
};

export const deletePost = async (postId: string) => {
  try {
    const userId = await getDbUserId();

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error(POST.postNotFound);
    if (post.authorId !== userId)
      throw new Error(POST.DELETE_POST.unauthorizedNoDeletePermission);

    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath(MAIN_LAYOUT.NAVBAR.home.href);
    return { success: true };
  } catch (error) {
    console.error(POST.DELETE_POST.failedToDeletePost, error);
    return { success: false, error: POST.DELETE_POST.failedToDeletePost };
  }
};
