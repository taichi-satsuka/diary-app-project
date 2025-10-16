<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Like;

use App\Models\Like;
use Illuminate\Support\Facades\Validator;
use App\GraphQL\Response;
use Exception;

final readonly class ToggleLike
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $post_id = $args['post_id'];
        $user = auth()->user();

        try {
            $like = Like::where('user_id', $user->id)->where('post_id', $post_id)->first();

            if ($like) {
                // Eloquentはidを使って削除しようとする。今回のようにuset_id, post_idの複合主キーの場合エラーになってしまう。そのときはEloquentを削除する
                // $like->delete();
                Like::where('user_id', $user->id)->where('post_id', $post_id)->delete();

                return (new Response(
                    success: true,
                    message: "Unlike ths post",
                ))->toarray();
            } else {
                $like = Like::create([
                    'user_id' => $user->id,
                    'post_id' => $post_id
                ]);

                return (new Response(
                    success: true,
                    message: "Liked the post",
                ))->toarray();
            }
        } catch (Exception $e) {
            return (new Response(
                success: false,
                message: "Unexpected error was occurred. $e",
            ))->toArray();
        }
    }
}
