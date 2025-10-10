<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Support\facades\Auth;

final readonly class UpdateMe
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $input = $args['input'];
        $user = Auth::user();
        $updated = false;

        if (isset($input['bio']) && $input['bio'] !== $user->bio) {
            $user->bio = $input['bio'];
            $updated = true;
        }
        
        if (isset($input['profile_image_url']) && $input['profile_image_url'] !== $user->profile_image_url) {
            $user->profile_image_url = $input['profile_image_url'];
            $updated = true;
        }

        if ($updated) {
            $user->updated_at = now();
            $user->save();

            return [
                'success' => true,
                'message' => "Your profile was updated.",
                'user' => $user,
            ];
        }

        return [
            'success' => false,
            'message' => "Nothing was updated",
            'user' => null,
        ];
    }
}
