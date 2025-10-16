<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Comment;

use Illuminate\Support\Facades\Validator;
use App\Models\Comment;
use App\GraphQL\Response;
use Exception;

final readonly class DeleteComment
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $comment_id = $args['comment_id'];
        $user = auth()->user();
        $comment = Comment::find($comment_id);

        if (!$comment) {
            return (new Response(
                success: false,
                message: "The comment was not found.",
            ))->toArray();
        }

        if ($user->id !== $comment->user_id) {
            return (new Response(
                success: false,
                message: "You can't delete other's comment.",
           ))->toArray();
        }

        try {
            $comment->delete();
            return (new Response(
                success: true,
                message: "Your comment was deleted successfully.",
            ))->toArray();
        } catch (Exception $e) {
            return (new Response(
                success: false,
                message: "Unexpected error was occurred.",
            ))->toArray();
        }
    }
}
