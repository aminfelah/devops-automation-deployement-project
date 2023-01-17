terraform {
  required_providers {
    helm = {
        source = "hashicorp/helm"
        version = "~>2.8.0"
    }
  }
  backend "azurerm" {
    resource_group_name = "amifelah-teraform-ressource-group"
    storage_account_name = "aminteraformstorage"
    container_name = "amin-teraform-container"
    key = "dev.terraform-application.tfstate"
  }
}