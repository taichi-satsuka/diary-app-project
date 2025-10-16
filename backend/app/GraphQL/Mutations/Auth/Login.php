<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

use App\Models\User;
use App\GraphQL\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

final readonly class Login
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $input = $args['input'];
        
        $validator = Validator::make($input, [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return (new Response(
                success: false,
                message: $validator->errors()->first(),
                data: [
                    'user' => null,
                    'token' => null
                ]
            ))->toArray();
        }

        $user = User::where('email', $input['email'])->first();

        if (!$user || !Hash::check($input['password'], $user->password)) {
            return (new Response(
                success: false,
                message: "Invalid email or password.",
                data: [
                    'user' => null,
                    'token' => null,
                ]
            ))->toArray();
        }

        // パーソナルアクセストークン発行
        $token = $user->createToken('auth_token')->plainTextToken;

        return (new Response(
            success: true,
            message: "Login successful.",
            data: [
                'user'=> $user,
                'token' => $token
            ]
        ))->toArray();
    }
}
