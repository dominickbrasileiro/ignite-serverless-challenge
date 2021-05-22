import { APIGatewayEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';

import { document } from '../utils/dynamodb-client';

export const handle = async (event: APIGatewayEvent) => {
  const { userId } = event.pathParameters;
  const {
    title,
    deadline,
  } = JSON.parse(event.body);

  const todo_id = uuid();

  await document.put({
    TableName: 'todos',
    Item: {
      id: todo_id,
      userId,
      title,
      done: false,
      deadline: new Date(deadline),
    },
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created successfully!',
      todo: {
        id: todo_id,
        userId,
        title,
        done: false,
        deadline,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}