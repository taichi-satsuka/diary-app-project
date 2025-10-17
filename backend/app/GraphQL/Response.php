<?php

namespace App\GraphQL;

readonly class Response {
    public function __construct(
        public bool $success,
        public string $message,
        public array $data = []
    ) {}

    public function toArray(): array
    {
        return array_merge([
                'success' => $this->success,
                'message' => $this->message,
            ],
            $this->data
        );
    }
}