const validateDynamoPolicies = (policies) =>
  policies.every((p) => !p.startsWith("dynamodb:"));

/**
 * Custom macro to add additional dynamodb actions on the
 * default dynamo policy provisioned by arc.
 */
module.exports = function addDynamoPolicies(arc, cloudformation) {
  const dynamoPolicies = arc["dynamo-policies"] || [];

  if (!validateDynamoPolicies(dynamoPolicies).length) {
    const policies = cloudformation.Resources.Role.Properties.Policies;
    const dynamoPolicy = policies.find(
      ({ PolicyName }) => PolicyName === "ArcDynamoPolicy"
    );

    if (dynamoPolicy) {
      const actions = dynamoPolicy.PolicyDocument.Statement[0].Action;
      dynamoPolicy.PolicyDocument.Statement[0].Action = [
        ...actions,
        ...dynamoPolicies,
      ];
    }
  } else {
    console.error("Check @dynamo-policies for invalid policies!");
  }

  return cloudformation;
};
