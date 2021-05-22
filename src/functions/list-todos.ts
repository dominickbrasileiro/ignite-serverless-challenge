import { APIGatewayEvent } from 'aws-lambda';

import { document } from '../utils/dynamodb-client';

export const handle = async (event: APIGatewayEvent) => {
  const { userId } = event.pathParameters;

  const response = await document.query({
    TableName: 'todos',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId' :userId,
    },
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(response.Items),
    headers: {
      'Content-Type': 'application/json',
    },
  }

}