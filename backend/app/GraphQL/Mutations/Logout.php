<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\GraphQL\Responses\AuthResponse;

final readonly class Logout
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user = auth()->user();

        if (!$user) {
            return (new AuthResponse(
                success: false,
                message: "Unauthenticated."
            ));
        }

        // 現在のアクセストークンを削除
        $user->currentAccessToken()->delete();

        return (new AuthResponse(
            success: true,
            message: 'Logout successful.'
        ));
    }
}
