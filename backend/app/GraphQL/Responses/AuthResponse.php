<?php

namespace App\GraphQL\Responses;

use App\Models\User;

readonly class AuthResponse {
    public function __construct(
        public bool $success,
        public string $message,
        public ?User $user = null,
        public ?string $token = null
    ) {}

    public function toArray(): array
    {
        return [
            'success' => $this->success,
            'message' => $this->message,
            'user' => $this->user,
            'token' => $this->token
        ];
    }
}