<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Post;

use Illuminate\Support\Facades\Validator;
use App\Models\Post;
use App\GraphQL\Response;

final readonly class createPost
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user = auth()->user();
        $input = $args['input'];

        $validator = Validator::make($input, [
            // 必須、文字列、最大256文字
            'title' => 'required|string|max:255',
            // 必須、文字列
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return (new Response(
                success: false,
                message: $validator->errors()->first(),
                data: [
                    'post' => null
                ]
            ))->toArray();
        }
        
        try {
            $post = Post::create([
                'user_id' => $user->id,
                'title' => $input['title'],
                'content' => $input['content']
            ]);
        } catch (\Exception $e) {
            return (new Response(
                success: false,
                message: "Failed to create post.",
                data: [
                    'post' => null
                ]
            ))->toArray();
        }

        return (new Response(
            success: true,
            message: "Post was created successfully.",
            data: [
                'post' => $post
            ]
        ))->toArray();

    }
}
