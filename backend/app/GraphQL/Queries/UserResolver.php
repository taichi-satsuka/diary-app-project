<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\User;

final readonly class UserResolver
{
    public function posts(User $user)
    {
        return $user->posts()
                    ->visibleTo()
                    ->orderByDesc('created_at')
                    ->get();
    }

    public function likedPosts(User $user) 
    {
        return $user->likedPosts()
                    ->visibleTo()
                    ->orderByDesc('created_at')
                    ->get();
    }
}
