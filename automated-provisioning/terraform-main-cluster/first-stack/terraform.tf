terraform {
  required_providers {
    azurerm = {
        source = "hashicorp/azurerm"
        version = "~>3.31.0"
    }
  }

  backend "azurerm" {
    resource_group_name = "amifelah-teraform-ressource-group"
    storage_account_name = "aminteraformstorage"
    container_name = "amin-teraform-container"
    key = "dev.terraform.tfstate"
  }
}

provider "azurerm" {
  skip_provider_registration = true
  features {}
}