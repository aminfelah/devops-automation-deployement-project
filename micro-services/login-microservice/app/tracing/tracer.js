/*tracing.ts*/
// Require dependencies
const opentelemetry = require("@opentelemetry/sdk-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-http");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
require("dotenv").config();

exports.runTracing = function () {
  console.log("tracing started");
  try {
    const exporterOptions = {
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
    };

    const exporter = new OTLPTraceExporter(exporterOptions);

    // For troubleshooting, set the log level to DiagLogLevel.DEBUG
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

    const sdk = new opentelemetry.NodeSDK({
      traceExporter: exporter,
      spanProcessor: new opentelemetry.tracing.SimpleSpanProcessor(exporter),
      instrumentations: [getNodeAutoInstrumentations()],
      resource: new opentelemetry.resources.Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "login-service",
      }),
    });
    sdk.start();
  } catch (error) {
    console.log("dev env");
  }
};
