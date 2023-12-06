//TODO: https://medium.com/@2018.itsuki/dynamo-db-with-next-js-ea24b0cf78a4

import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

const dbClient = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_DYNAMO_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_DYNAMO_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_DYNAMO_SECRET_KEY as string,
  },
});
const docClient = DynamoDBDocumentClient.from(dbClient);

export const createNewParticipant = async ({
  tableName,
  participantData,
}: {
  tableName: string;
  participantData: {
    userTelegramId: number;
    userIsSubmitted: boolean;
  };
}) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: participantData,
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

export const getParticipant = async ({
  tableName,
  userTelegramId,
}: {
  tableName: string;
  userTelegramId: number;
}) => {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      userTelegramId: userTelegramId,
    },
  });

  try {
    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteParticipant = async ({
  tableName,
  userTelegramId,
}: {
  tableName: string;
  userTelegramId: number;
}) => {
  const command = new DeleteCommand({
    TableName: tableName,
    Key: {
      userTelegramId: userTelegramId,
    },
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

export const updateParticipant = async ({
  tableName,
  participantData,
}: {
  tableName: string;
  participantData: any;
}) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: participantData,
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

export const submitParticipant = async ({
  tableName,
  userTelegramId,
}: {
  tableName: string;
  userTelegramId: number;
}) => {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: {
      userTelegramId: userTelegramId,
    },
    UpdateExpression: 'SET userIsSubmitted = :submitted',
    ExpressionAttributeValues: {
      ':submitted': true,
    },
    ReturnValues: 'ALL_NEW',
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

export const getParticipantCount = async ({
  tableName,
}: {
  tableName: string;
}) => {
  const command = new ScanCommand({
    TableName: tableName,
    Select: 'COUNT',
  });

  try {
    const response = await docClient.send(command);
    console.log(response);
    return response.Count;
  } catch (error) {
    throw error;
  }
};


export const createNewEvent = async ({
  tableName,
  participantData,
}: {
  tableName: string;
  participantData: any;
}) => {
  const command = new PutCommand({
    TableName: tableName,
    Item: participantData,
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

export const getUserData = async({
  userTelegramId
} : {
  userTelegramId: number;
}) => {
  const command = new GetCommand({
    TableName: process.env.NEXT_PUBLIC_DYNAMO_USERS_TABLE as string,
    Key: {
      id: userTelegramId,
    },
  });

  try {
    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}

export const createNewUser = async ({
  firstUserData,
}: {
  firstUserData: {
    id: number;
    createdEvents: string[];
    participatedEvents: string[];
    walletAddress: string;
  };
}) => {
  const command = new PutCommand({
    TableName: process.env.NEXT_PUBLIC_DYNAMO_USERS_TABLE as string,
    Item: firstUserData,
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};