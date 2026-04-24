module "ecr_satsuka_app" {
    source = "git@github.com:bizmatesinc/terraform-template-module.git//aws_modules/module_ecr_repository?ref=main"

    repository_name = "satsuka-app"
    
    // リポジトリの強制削除を許可。本番環境はfalseにすることでterraform destroy時に削除されない
    enable_termination = true

    // ECRリポジトリ内のイメージタグを上書き可能かどうかを制御　デフォルト：true
    image_tag_mutability = true

    // イメージをpushした際に自動的に脆弱性スキャンを実行するかどうかを制御　デフォルト：true
    // AWSの脆弱性スキャン（amazon inspectorベース）が自動実行
    image_scan_on_push = false

    // lifecycle policyの有効/無効
    lifecycle_enabled = false
}