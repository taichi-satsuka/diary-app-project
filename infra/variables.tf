variable "db_connection" {
  type        = string
  description = "DB connection"
}

variable "db_database" {
  type        = string
  description = "DB name"
}

variable "db_username" {
  type        = string
  description = "DB username"
}

variable "db_password" {
  type        = string
  description = "DB password"
}

variable "db_port" {
  type        = string
  description = "DB port"
}

variable "app_key" {
  type        = string
  description = "laravel app key"
}