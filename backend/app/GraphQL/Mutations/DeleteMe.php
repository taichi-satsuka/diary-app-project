<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

final readonly class DeleteMe
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user = auth()->user();

        try {
            $user->delete();
            return [
                'success' => true,
                'message' => "Your account deleted successfully."
            ];
        } catch(\Exception $e) {
            return [
                'success' => false,
                'message' => "Failed to delete your account",
            ];
        }
    }
}
