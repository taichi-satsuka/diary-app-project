import Id from "~/pages/posts/[id].vue";

interface BaseResponse {
    success: boolean,
    message: string,
}

export type RegisterResponse = {
    register: BaseResponse;
}

export type LoginResponse = {
    login: BaseResponse & {
        token?: string
    };
}

export type ToggleFollowResponse = {
    toggleFollow: BaseResponse 
}

export type MeResponse = {
    me: UserResponse['user']
}

export type UserResponse = {
    user : {
        id: number,
        name: string,
        email: string,
        bio: string | null,
        profile_image_url: string | null,
        created_at: string,
        posts?: PostSummary[],
        followings?: UserSummary[],
        followers?: UserSummary[],
        likedPosts?: PostSummary[],
    }
}

export type PostDetail = {
    id: number
    title: string
    content: string
    created_at: string
    user: UserSummary
};

export type PostResponse = {
    post: PostDetail
}

export interface PostSummary {
    id: number,
    title: string,
    user: UserSummary
}

export type PostsResponse = {
    posts: PostSummary[]
}

export type Comment = {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
  post_id: number;
  user_id: number;
};

export type UserSummary = {
  id: number;
  name: string;
  email: string;
  profile_image_url: string | null;
};
