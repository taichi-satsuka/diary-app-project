<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

use App\Models\User;
use App\GraphQL\Response;
use Faker\Provider\ar_EG\Person;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

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

        // accountが存在しない、または、passwordが違う
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

        // ログイン中はトークンを発行しない（二重ログインを防ぐ）
        if (PersonalAccessToken::where('tokenable_id', $user->id)->first()) {
            return (new Response(
                success: false,
                message: "You already have logined.",
                data: [
                    'user' => null,
                    'token' => null,
                ]
                ));
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
