<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Post;

use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use App\GraphQL\Response;
use Exception;

final readonly class DeletePost
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $post_id = $args['post_id'];
        $user = auth()->user();
        $post = Post::find($post_id);

        if (!$post) {
            return (new Response(
                success: false,
                message: "The post was not found.",
            ))->toArray();
        }

        if ($user->id !== $post->user_id) {
            return (new Response(
                success: false,
                message: "You can't delete other's post.",
           ))->toArray();
        }

        try {
            $post->delete();
            return (new Response(
                success: true,
                message: "Your post was deleted successfully.",
            ))->toArray();
        } catch (Exception $e) {
            return (new Response(
                success: false,
                message: "Unexpected error was occurred.",
            ))->toArray();
        }
    }
}
