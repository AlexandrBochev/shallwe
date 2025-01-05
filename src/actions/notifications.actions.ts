"use server"

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "./user.action"
import { MAIN_LAYOUT, NOTIFICATIONS } from "@/lib/constants"
import { revalidatePath, revalidateTag } from "next/cache";

export const getNotifications = async () => {
  try {
    const userId = await getDbUserId()
    if (!userId) return [];

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  } catch (error) {
    console.error(
      NOTIFICATIONS.GET_NOTIFICATIONS.errorFetchingNotifications,
      error
    );
    throw new Error(NOTIFICATIONS.GET_NOTIFICATIONS.failedToFetchNotifications);
  }
};

export const markNotificationsAsRead = async (notificationIds: string[]) => {
  try {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(
      NOTIFICATIONS.GET_NOTIFICATIONS.errorMarkingNotifications,
      error
    );
    return { success: false };
  }
};
