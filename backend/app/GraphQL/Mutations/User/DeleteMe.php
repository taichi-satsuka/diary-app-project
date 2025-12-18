<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\User;

use App\GraphQL\Response;
use Symfony\Component\HttpFoundation\Exception\SuspiciousOperationException;

final readonly class DeleteMe
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user = auth()->user();

        try {
            $user->delete();
            return (new Response(
                success: true,
                message: "Your account was deleted successfully."
            ));
        } catch(\Exception $e) {
            return (new Response(
                success: true,
                message: "Failed to delete your account"
            ));
        }
    }
}
