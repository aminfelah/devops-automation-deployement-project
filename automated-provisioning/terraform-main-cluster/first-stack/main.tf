data "azurerm_resource_group" "terra-resource" {
  name = "amifelah-teraform-ressource-group"
}

resource "azurerm_kubernetes_cluster" "terra-kubernetes-cluster" {
  name                = "my-second-cluster"
  location            = data.azurerm_resource_group.terra-resource.location
  resource_group_name = data.azurerm_resource_group.terra-resource.name
  http_application_routing_enabled = true
  dns_prefix          = "kub-dns"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "Standard_B2s"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = "Development"
  }
}

