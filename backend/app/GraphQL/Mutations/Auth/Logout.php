<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

use App\GraphQL\Response;

final readonly class Logout
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user = auth()->user();

        if (!$user) {
            return (new Response(
                success: false,
                message: "Unauthenticated.",
                data: [
                    'user' => null,
                    'token' => null,
                ]
            ))->toArray();
        }

        // 現在のアクセストークンを削除
        $user->currentAccessToken()->delete();

        return (new Response(
            success: true,
            message: 'Logout successful.',
            data: [
                'user' => $user,
                'token' => null
            ]
        ))->toArray();
    }
}
