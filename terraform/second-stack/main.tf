data "terraform_remote_state" "cluster-state" {
  backend = "azurerm"
  config = {
    resource_group_name  = "amifelah-teraform-ressource-group"
    container_name       = "amin-teraform-container"
    storage_account_name = "aminteraformstorage"
    key                  = "dev.terraform.tfstate"
  }
}

locals {
  kube_config            = data.terraform_remote_state.cluster-state.outputs.kube_config.0
  host                   = local.kube_config.host
  username               = local.kube_config.username
  password               = local.kube_config.password
  client_certificate     = base64decode(local.kube_config.client_certificate)
  client_key             = base64decode(local.kube_config.client_key)
  cluster_ca_certificate = base64decode(local.kube_config.cluster_ca_certificate)
}

provider "kubernetes" {
  alias                  = "my-cluster"
  host                   = local.host
  username               = local.username
  password               = local.password
  client_certificate     = local.client_certificate
  client_key             = local.client_key
  cluster_ca_certificate = local.cluster_ca_certificate
}

provider "helm" {
  kubernetes {
    host                   = local.host
    username               = local.username
    password               = local.password
    client_certificate     = local.client_certificate
    client_key             = local.client_key
    cluster_ca_certificate = local.cluster_ca_certificate
  }
}

module "apply-infra" {
  source = "./modules/apply-infra"
  providers = {
    helm = helm
  }
  chart        = var.application_helm_chart
  release_name = var.application_helm_release_name
}

module "apply-ingress" {
  source = "./modules/apply-ingress"
  providers = {
    helm = helm
  }
}
