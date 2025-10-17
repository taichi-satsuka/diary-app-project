<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\GraphQL\Response;

final readonly class Register
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args): array
    {
        $input = $args['input'];

        $validator = Validator::make($input, [
            // 必須、文字列、最大256文字
            'name' => 'required|string|max:255',
            // 必須、メール形式、usersテーブルのemailカラムと重複不可
            'email' => 'required|email|unique:users,email',
            // 必須、文字列、8文字以上、確認フィールド(password_confirmation)と一致
            'password'=>'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            # returnで直接インスタンス化してメソッドにアクセスするときインスタンスを（）で括らないと -> をうまく認識しないでエラーになる
            return (new Response(
                success: false,
                message: $validator->errors()->first(),
                data: [
                    'user' => null
                ]
            ))->toArray();
        }

        try {
            $user = User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => Hash::make($input['password']),
            ]);
        } catch (\Exception $e) {
            return (new Response(
                success: false,
                message: "Failed to register user.",
                data: [
                    'user' => null
                ]
            ))->toArray();
        }

        return (new Response(
            success: true,
            message: "Registration successful.",
            data: [
                'user' => $user
            ]
        ))->toArray();
    }
}
