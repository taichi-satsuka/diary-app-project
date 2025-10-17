<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Follow;

use App\Models\Follow;
use App\GraphQL\Response;
use Exception;

final readonly class ToggleFollow
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $followed_id = $args['followed_id'];
        $user = auth()->user();

        // 自己フォローを防ぐ
        // graphqlは引数をstringで受け取る→ intでキャスト
        if ((int)$followed_id === $user->id) {
            return (new Response(
                success: false,
                message: "You can't folllow yourself."
            ))->toArray();
        }

        try {
            $follow = Follow::where('follower_id', $user->id)->where('followed_id', $followed_id)->first();

            if ($follow) {
                // Eloquentはidを使って削除しようとする。今回のようにfollower_id, followed_idの複合主キーの場合エラーになってしまう。そのときはEloquentを使わずに削除する
                // $follow->delete();
                Follow::where('follower_id', $user->id)->where('followed_id', $followed_id)->delete();

                return (new Response(
                    success: true,
                    message: "Unfollowed the user",
                ))->toarray();
            } else {
                $follow = Follow::create([
                    'follower_id' => $user->id,
                    'followed_id' => $followed_id
                ]);

                return (new Response(
                    success: true,
                    message: "Followed the user"
                ))->toarray();
            }
        } catch (Exception $e) {
            return (new Response(
                success: false,
                message: "Unexpected error was occurred.",
            ))->toArray();
        }
    }
}
