import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const productParserLambda = new NodejsFunction(
      this,
      "ProductParserLambda",
      {
        entry: path.join(__dirname, "../../lamdas/product-parser.ts"),
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_20_X,
        environment: {
          DATABASE_URL: process.env.DATABASE_URL || "",
          POSTGRES_USER: process.env.POSTGRES_USER || "",
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "",
          POSTGRES_DB: process.env.POSTGRES_DB || "",
          POSTGRES_HOST: process.env.POSTGRES_HOST || "",
          POSTGRES_PORT: process.env.POSTGRES_PORT || "5432",
        },
        bundling: {
          externalModules: ["@prisma/client", "prisma"],
          nodeModules: ["@prisma/client"],
        },
        timeout: cdk.Duration.minutes(5),
        memorySize: 1024,
      }
    );
  }
}
