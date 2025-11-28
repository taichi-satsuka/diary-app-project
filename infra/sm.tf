# DBのpassword
resource "aws_secretsmanager_secret" "app_db_password" {
  name        = "satsuka-diary-app-db-password-v1"
  description = "Using for RDS in diary-app"
}

resource "aws_secretsmanager_secret_version" "db_password_version" {
  secret_id     = aws_secretsmanager_secret.app_db_password.id
  secret_string = var.db_password
}

# laravelのapp key
resource "aws_secretsmanager_secret" "app_key" {
  name        = "satsuka-diary-app-key-v1"
  description = "using for laravel app key in diary-app"
}

resource "aws_secretsmanager_secret_version" "app_key_version" {
  secret_id     = aws_secretsmanager_secret.app_key.id
  secret_string = var.app_key
}

