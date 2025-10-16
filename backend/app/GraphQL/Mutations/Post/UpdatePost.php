<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Post;

use App\Models\Post;
use App\GraphQL\Response;
use Exception;

final readonly class UpdatePost
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $input = $args['input'];
        $user = auth()->user();
        $id = $input['id'];
        $post = Post::find($id);
        $updated = false;

        if (!$post) {
            return (new Response(
                success: false,
                message: "The post was not found.",
            ))->toArray();
        }

        if ($user->id !== $post->user_id) {
            return (new Response(
                success: false,
                message: "You can't update other's post.",
            ))->toArray();
        }

        try {
            if (isset($input['title']) && $input['title'] !== $post->title) {
                $post->title = $input['title'];
                $updated = true;
            }
            
            if (isset($input['content']) && $input['content'] !== $post->content) {
                $post->content = $input['content'];
                $updated = true;
            }

            if (isset($input['visibility']) && $input['visibility'] !== $post->visibility) {
                $post->visibility = $input['visibility'];
                $updated = true;
            }
            
            if ($updated) {
                $post->save();
                return (new Response(
                    success: true,
                    message: "Your post was updated.",
                    data: [
                        'post' => $post,
                    ]
                ))->toArray();
            }

            return (new Response(
                success: true,
                message: "Nothing was updated.",
                data: [
                    'post' => $post,
                ]
            ))->toArray();
        } catch(Exception $e) {
            return (new Response(
                success: false,
                message: "unexpected error was occurred."
            ))->toArray();
        }

    }
}
