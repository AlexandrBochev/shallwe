import React from "react";
import { FollowButton } from "../FollowButton/FollowButton";
import { getRandomUsers } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { USER } from "@/lib/constants";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";

const WhoToFollow = async () => {
  const users = await getRandomUsers();
  if (!users.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{USER.WHO_TO_FOLLOW.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex gap-2 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Link href={`/profile/${user.username}`}>
                  <Avatar className="w-12 h-12 border-2">
                    <AvatarImage
                      src={user.image ?? "/avatar.png"}
                      className="object-cover"
                    />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link
                    href={`/profile/${user.username}`}
                    className="font-medium cursor-pointer"
                  >
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton userId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { WhoToFollow };
