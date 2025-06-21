import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const env = this.node.tryGetContext("env") || "dev";

    const vpcId =
      env === "prod" ? "vpc-xxxxxxxxxxxxxxxxx" : "vpc-054400b4877d53662";

    const lambdaSgId =
      env === "prod" ? "sg-prodxxxxxxxxxxxxxx" : "sg-0eb27e4182862dca8";

    const vpc = ec2.Vpc.fromLookup(this, "comparly-vpc", {
      vpcId,
    });

    const lambdaSg = ec2.SecurityGroup.fromSecurityGroupId(
      this,
      "comparly-lambda-sg",
      lambdaSgId
    );

    const lambdaRole = new iam.Role(this, "product-parser-lambda-role", {
      roleName: `${env}-product-parser-lambda-role`,
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaVPCAccessExecutionRole"
        ),
      ],
    });

    const productParserLambda = new NodejsFunction(
      this,
      "product-parser-lambda",
      {
        functionName: `${env}-product-parser-lambda`,
        entry: path.join(__dirname, "../src/product-parser/handler.ts"),
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_22_X,
        environment: {
          DATABASE_URL: "",
        },
        bundling: {
          nodeModules: ["@prisma/client"],
          commandHooks: {
            beforeBundling(inputDir: string, outputDir: string) {
              return [`cp -R ${inputDir}/prisma ${outputDir}/`];
            },
            afterBundling(inputDir: string, outputDir: string) {
              return [
                `npx prisma generate --schema=${outputDir}/prisma/schema.prisma`,
              ];
            },
            beforeInstall() {
              return [];
            },
          },
        },
        timeout: cdk.Duration.minutes(5),
        memorySize: 1024,
        vpc,
        securityGroups: [lambdaSg],
        role: lambdaRole,
      }
    );

    new cdk.CfnOutput(this, "ProductParserLambdaName", {
      value: productParserLambda.functionName,
    });
  }
}
