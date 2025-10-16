<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Comment;

use Illuminate\Support\Facades\Validator;
use App\Models\Comment;
use App\GraphQL\Response;

final readonly class CreateComment
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user = auth()->user();
        $input = $args['input'];
        $post_id = $input['post_id'];
        $content = $input['content'];

        $validator = Validator::make($input, [
            // 必須、文字列
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return (new Response(
                success: false,
                message: $validator->errors()->first(),
                data: [
                    'comment' => null
                ]
            ))->toArray();
        }
        
        try {
            $comment = Comment::create([
                'user_id' => $user->id,
                'post_id' => $post_id,
                'content' => $content
            ]);

            return (new Response(
                success: true,
                message: "Comment was created successfully.",
                data: [
                    'comment' => $comment
                ]
            ))->toArray();
        } catch (\Exception $e) {
            return (new Response(
                success: false,
                message: "Failed to create comment.",
                data: [
                    'comment' => null
                ]
            ))->toArray();
        }

    }
}
