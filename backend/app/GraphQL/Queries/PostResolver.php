<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Post;

final readonly class PostResolver
{
    /** @param  array{}  $args */
    public function __invoke()
    {
        return Post::query()
                    ->visibleTo()
                    ->orderByDesc("created_at")
                    ->get();
    }
}
