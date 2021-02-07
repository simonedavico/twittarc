import arc from "@architect/functions";
import aws from "aws-sdk";

/**
 * Scheduled function to backup tweets table to S3.
 */
export async function handler(_event: unknown) {
  try {
    const db = new aws.DynamoDB();
    const tables = await arc.tables();
    const TableName = tables._name("tweets");
    const { Table } = await db.describeTable({ TableName }).promise();

    const result = await db
      .exportTableToPointInTime({
        S3Bucket: process.env.ARC_STORAGE_PRIVATE_TWEETS_BACKUP,
        TableArn: Table.TableArn,
      })
      .promise();

    console.log({ result });
  } catch (e) {
    console.log("Backup failed", e);
  }
}
