<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\GraphQL\Responses\AuthResponse;

final readonly class Logout
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user = auth()->user();

        // 現在のアクセストークンを削除
        $user->currentAccessToken()->delete();

        return (new AuthResponse(
            success: true,
            message: 'Logout successful.'
        ));
    }
}
