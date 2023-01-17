resource "helm_release" "helm-app" {
  name = var.release_name
  chart = var.chart
}