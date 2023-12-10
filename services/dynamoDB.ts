//REF-client-dynamodb: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/
//REF-lib-dynamodb: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-lib-dynamodb/

import { EventForm } from '@/components/event-interface/eventInterface';
import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
  UpdateCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';

const dbClient = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_DYNAMO_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_DYNAMO_KEY_ID as string,
    secretAccessKey: process.env.NEXT_PUBLIC_DYNAMO_SECRET_KEY as string,
  },
});
const docClient = DynamoDBDocumentClient.from(dbClient);

// TABLE(eventId) -> add participant init data
export const createNewParticipant = async ({
  tableName,
  participantData,
}: {
  tableName: string;
  participantData: {
    userTelegramId: number;
    userIsSubmitted: boolean;
    userIsParticipated: boolean;
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

// TABLE(eventId) -> get participant data
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

// TABLE(eventId) -> delete participant data with updateParticipant function
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

// TABLE(eventId) -> update participant data with deleteParticipant function
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

// TABLE(eventId) -> update submitted participant data
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
    ReturnValues: 'UPDATED_NEW',
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

// TABLE(eventId) -> update participated participant data
export const participatedParticipant = async ({
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
    UpdateExpression: 'SET userIsParticipated = :participated',
    ExpressionAttributeValues: {
      ':participated': true,
    },
    ReturnValues: 'UPDATED_NEW',
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

// TABLE(eventId) -> get participants count
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

// TABLE(eventId) -> get all participant data
export const getEventParticipantsData = async ({
  eventId,
}: {
  eventId: string;
}) => {
  const command = new ScanCommand({
    TableName: eventId as string,
  });

  try {
    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

// TABLE(users) -> get user data
export const getUserData = async ({
  userTelegramId,
}: {
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
};

// TABLE(users) -> add user init data
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

// TABLE(users) -> update user participated event
export const addUserParticipated = async ({
  userTelegramId,
  participatedEvent,
}: {
  userTelegramId: number;
  participatedEvent: string;
}) => {
  const command = new UpdateCommand({
    TableName: process.env.NEXT_PUBLIC_DYNAMO_USERS_TABLE as string,
    Key: {
      id: userTelegramId,
    },
    UpdateExpression:
      'SET participatedEvents = list_append(participatedEvents, :newEvent)',
    ExpressionAttributeValues: {
      ':newEvent': [participatedEvent],
    },
    ReturnValues: 'UPDATED_NEW',
  });

  try {
    await docClient.send(command);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

// TABLE(allEvents) -> get event data
export const getEventData = async ({ eventId }: { eventId: string }) => {
  const command = new GetCommand({
    TableName: process.env.NEXT_PUBLIC_DYNAMO_ALL_EVENTS_TABLE as string,
    Key: {
      id: eventId,
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

// TABLE(allEvents) + TABLE(users) + TABLE(eventId) -> create new event
export const createNewEvent = async ({
  eventData,
}: {
  eventData: EventForm;
}) => {
  const addAllEvents = new PutCommand({
    TableName: process.env.NEXT_PUBLIC_DYNAMO_ALL_EVENTS_TABLE as string,
    Item: eventData,
  });

  const addUserHosted = new UpdateCommand({
    TableName: process.env.NEXT_PUBLIC_DYNAMO_USERS_TABLE as string,
    Key: {
      id: eventData.hostTelegramId[0],
    },
    UpdateExpression:
      'SET createdEvents = list_append(createdEvents, :newEvent)',
    ExpressionAttributeValues: {
      ':newEvent': [eventData.id],
    },
    ReturnValues: 'UPDATED_NEW',
  });

  const newEventTableForParticipants = new CreateTableCommand({
    TableName: eventData.id,
    KeySchema: [{ AttributeName: 'userTelegramId', KeyType: 'HASH' }],
    AttributeDefinitions: [
      { AttributeName: 'userTelegramId', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  });

  try {
    await docClient.send(addAllEvents);
    await docClient.send(addUserHosted);
    await dbClient.send(newEventTableForParticipants);
    console.log('Success');
  } catch (error) {
    throw error;
  }
};

// TABLE(publicEvents) -> get all public events id
export const getPublicEventsId = async () => {
  const command = new ScanCommand({
    TableName: process.env.NEXT_PUBLIC_DYNAMO_PUBLIC_EVENTS_TABLE as string,
  });

  try {
    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
