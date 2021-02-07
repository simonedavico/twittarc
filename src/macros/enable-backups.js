const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Simple macro to enable point in time recovery
 * on a DynamoDB table.
 *
 * Receives the table names for which to enable backups as input;
 * assumes tables are defined in the CloudFormation template as
 * resources with name `${capitalize(tableName)}Table`
 *
 * Ex: table "tweets" will enable recovery on "TweetsTable" resource.
 */
module.exports = function enableBackups(arc, cloudformation) {
  const tablesToBackup = arc["enable-backups"] || [];

  tablesToBackup.forEach((tableName) => {
    const tableResource =
      cloudformation.Resources[`${capitalize(tableName)}Table`];
    tableResource.Properties.PointInTimeRecoverySpecification = {
      PointInTimeRecoveryEnabled: true,
    };
  });

  return cloudformation;
};
