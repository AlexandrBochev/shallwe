export const MAIN_LAYOUT = {
  METADATA: {
    title: "ShallWe",
    description: "ShallWe | sociality for all",
  },
  NAVBAR: {
    home: {
      name: "Home",
      href: "/",
    },
    notifications: {
      name: "Notifications",
      href: "/notifications",
    },
    profile: {
      name: "Profile",
      href: "/profile",
    },
    signIn: "Sign In",
    logout: "Logout",
    menu: "Menu",
  },
}

export const SIDEBAR = {
  TITLE: "Welcome Back!",
  DESCRIPTION: "Login to access your profile and connect with others.",
  CONTENT: {
    noLocation: "No location",
    noWbsite: "No website"
  },
  BUTTONS: {
    login: "Login",
    signUp: "Sign Up"
  }
}

export const USER = {
  ACTION: {
    errorInSyncUser: "Error in syncUser",
    errorFetchingRandomUsers: "Error fetching random users",
    userNotFound: "User not found"
  },
  WHO_TO_FOLLOW: {
    title: "Who to follow",
    follow: "Follow",
    errorFollowingUser: "Error following user",
    userFollowed: "User followed successfully",
    youCanntFollowYourself: "You can't follow yourself"
  },
}

export const POST = {
  CREATE_POST: {
    placeholder: "What's on your mind?",
    photo: "Photo",
    post: "Post",
    posting: "Posting...",
    postCreated: "Post created successfully",
    failedToCreatePost: "Failed to create post"
  },
  GET_POSTS: {
    errorFetchingPosts: "Error fetching posts",
    errorInGetPosts: "Error in getPosts"
  },
  TOGGLE_LIKE: {
    failedToToggleLike: "Failed to toggle like"
  },
  CREATE_COMMENT: {
    contentIsRequired: "Content is required",
    failedToCreateComment: "Failed to create comment",
  },
  DELETE_POST: {
    failedToDeletePost: "Failed to delete post",
    unauthorizedNoDeletePermission: "Unauthorized - no delete permission",
  },
  POST_CARD: {
    commentPosted: "Comment posted successfully",
    failedToAddComment: "Failed to add comment",
    postDeleted: "Post deleted successfully",
    failedToDeletePost: "Failed to delete post",
    writeComment: "Write a comment...",
    posting: "Posting...",
    comment: "Comment",
    signInToComment: "Sign in to comment",
  },
  DELETE_ALERT_DIALOG: {
    title: "Delete Post",
    description: "This action cannot be undone.",
    cancel: "Cancel",
    deleting: "Deleting...",
    delete: "Delete",
  },
  postNotFound: "Post not found",
}

export const NOTIFICATIONS = {
  TITLE: "Notifications",
  FOLLOW: "FOLLOW",
  LIKE: "LIKE",
  COMMENT: "COMMENT",
  NO_NOTIFICATIONS_YET: "No notifications yet",
  STARTED_FOLLOWING_YOU: "started following you",
  LIKE_YOU_POST: "liked your post",
  COMMENTED_ON_YOUR_POST: "commented on your post",
  POST_CONTENT: "Post content",
  UNREAD: "unread",
  GET_NOTIFICATIONS: {
    errorFetchingNotifications: "Error fetching notifications:",
    failedToFetchNotifications: "Failed to fetch notifications",
    errorMarkingNotifications: "Error marking notifications as read:",
  },
}

export const PROFILE = {
  ERROR_FETCHING_PROFILE: "Error fetching profile",
  FAILED_TO_FETCH_PROFILE: "Failed to fetch profile",
  ERROR_FETCHING_USER_POSTS: "Error fetching user posts",
  FAILED_TO_FETCH_USER_POSTS: "Failed to fetch user posts",
  ERROR_FETCHING_USER_LIKED_POSTS: "Error fetching user liked posts",
  FAILED_TO_FETCH_USER_LIKED_POSTS: "Failed to fetch user liked posts",
  ERROR_CHECKING_FOLLOW_STATUS: "Error checking follow status",
  FAILED_TO_UPDATE_FOLLOW_STATUS: "Failed to update follow status",
  ERROR_UPDATING_PROFILE: "Error updating profile",
  FAILED_TO_UPDATE_PROFILE: "Failed to update profile",
  UNAUTHORIZED: "Unauthorized",
  NAME: "Name",
  BIO: "Bio",
  LOCATION: "Location",
  WEBSITE: "Website",
  USER_PROFILE: "User Profile",
  PROFILE_UPDATED_SUCCESSFULLY: "Profile updated successfully",
  FOLLOW: "Follow",
  UNFOLLOW: "Unfollow",
  FOLLOWING: "Following",
  FOLLOWERS: "Followers",
  POSTS: "Posts",
  EDIT_PROFILE: "Edit Profile",
  JOINED: "Joined",
  LIKES: "Likes",
  NO_POSTS_YET: "No posts yet",
  NO_LIKED_POSTS_YET: "No liked posts yet",
  YOUR_NAME: "Your name",
  TELL_US_ABOUT_YOURSELF: "Tell us about yourself",
  WHERE_ARE_YOU_FROM: "Where are you from?",
  YOU_PERSONAL_WEBSITE: "Your personal website",
  CANCEL: "Cancel",
  SAVE_CHANGES: "Save changes",
  NOT_FOUND: {
    USER_NOT_FOUND: "User not found",
    USER_NOT_EXIST: "The user you're looking for doesn't exist.",
    FOUR_HUNDRED_FOUR: "404",
    BACK_TO_HOME: "Back to Home",
  },
  ERROR_IN_ONUPLOAD: "Error in onUploadComplete",
}

export const ERROR = {
  SOMETHING_WENT_WRONG: "Something went wrong!",
  TRY_AGAIN: "Try again",
}