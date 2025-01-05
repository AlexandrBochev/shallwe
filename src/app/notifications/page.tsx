"use client";

import {
  getNotifications,
  markNotificationsAsRead,
} from "@/actions/notifications.actions";
import { NotificationSkeleton } from "@/components/NotificationSkeleton/NotificationSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NOTIFICATIONS } from "@/lib/constants";
import { Return } from "@prisma/client/runtime/library";
import { formatDistanceToNow } from "date-fns";
import { HeartIcon, MessageCircleIcon, UserPlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Notifications = Awaited<Return<typeof getNotifications>>;
type Notification = Notifications[number];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case NOTIFICATIONS.LIKE:
      return <HeartIcon className="size-4 text-red-500" />;
    case NOTIFICATIONS.COMMENT:
      return <MessageCircleIcon className="size-4 text-blue-500" />;
    case NOTIFICATIONS.FOLLOW:
      return <UserPlusIcon className="size-4 text-green-500" />;
    default:
      return null;
  }
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const data = await getNotifications();
        setNotifications(data);

        const unreadIds = data.filter((n) => !n.read).map((n) => n.id);
        if (unreadIds.length) await markNotificationsAsRead(unreadIds);
      } catch (error) {
        toast.error(NOTIFICATIONS.GET_NOTIFICATIONS.failedToFetchNotifications);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading) return <NotificationSkeleton />;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>{NOTIFICATIONS.TITLE}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {notifications.filter((n) => !n.read).length}{" "}
              {NOTIFICATIONS.UNREAD}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                {NOTIFICATIONS.NO_NOTIFICATIONS_YET}
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 border-b hover:bg-muted/25 transition-colors ${
                    !notification.read ? "bg-muted/50" : ""
                  }`}
                >
                  <Avatar className="mt-1 border-2">
                    <AvatarImage
                      src={notification.creator.image ?? "/avatar.png"}
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <span>
                        <span className="font-medium">
                          {notification.creator.name ??
                            notification.creator.username}
                        </span>{" "}
                        {notification.type === NOTIFICATIONS.FOLLOW
                          ? NOTIFICATIONS.STARTED_FOLLOWING_YOU
                          : notification.type === NOTIFICATIONS.LIKE
                          ? NOTIFICATIONS.LIKE_YOU_POST
                          : NOTIFICATIONS.COMMENTED_ON_YOUR_POST}
                      </span>
                    </div>

                    {notification.post &&
                      (notification.type === NOTIFICATIONS.LIKE ||
                        notification.type === NOTIFICATIONS.COMMENT) && (
                        <div className="pl-6 space-y-2">
                          <div className="text-sm text-muted-foreground rounded-md p-2 bg-muted/30 mt-2">
                            <p>{notification.post.content}</p>
                            {notification.post.image && (
                              <img
                                src={notification.post.image}
                                alt={NOTIFICATIONS.POST_CONTENT}
                                className="mt-2 rounded-md w-full max-w-[200px] h-auto object-cover"
                              />
                            )}
                          </div>

                          {notification.type === NOTIFICATIONS.COMMENT &&
                            notification.comment && (
                              <div className="text-sm p-2 bg-accent/50 rounded-md">
                                {notification.comment.content}
                              </div>
                            )}
                        </div>
                      )}

                    <p className="text-sm text-muted-foreground pl-6">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPage;
