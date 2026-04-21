# config
locals {
    vpc_satsuka_app = {
        name = "satsuka-app"
        cidr_block = "192.168.0.0/16"
        use_ec2_nat_instance = true
    }
}

# vpc
module "vpc_satsuka_app" {
    source = "git@github.com:bizmatesinc/terraform-template-module.git//aws_modules/module_vpc?ref=main"

    // Network
    availability_zones = ["ap-northeast-1a", "ap-northeast-1c"]
    internal_availability_zones = ["ap-northeast-1a", "ap-northeast-1c"]
    cidr_block = local.vpc_satsuka_app.cidr_block
    project_name = local.vpc_satsuka_app.name
    vpc_name_suffix = "-vpc"
    enable_termination = true

    // Subnet
    enable_public_subnet = true
    enable_private_subnet = true
    enable_internal_subnet = true

    // NAT Instance
    use_ec2_nat_instance = local.vpc_satsuka_app.use_ec2_nat_instance
    multi_az_nat = true

    // TGW
    enable_tgw_subnet = false

    // Bastion
    is_bastion_enabled = false

    // Route53
    is_nat_ip_record_enabled = false
}