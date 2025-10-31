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
        posts?: Post[],
        followings?: UserSummary[],
        followers?: UserSummary[],
        likedPosts?: Post[],
    }
}

export type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

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
