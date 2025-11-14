<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\User;

use Illuminate\Support\facades\Auth;
use App\GraphQL\Response;

final readonly class UpdateMe
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $input = $args['input'];
        $user = Auth::user();
        $updated = false;

        if (isset($input['name']) && $input['name'] !== $user->name) {
            $user->name = $input['name'];
            $updated = true;
        }
 
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

            return (new Response(
                success: true,
                message: "Your profile was updated.",
                data: [
                    'user' => $user,
                ]
            ))->toArray();
        }

        return (new Response(
            success: true,
            message: "Notning was updated.",
            data: [
                'user' => $user,
            ]
        ))->toArray();
    }
}
