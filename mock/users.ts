import { UserForm } from './userInterface';
import allUsers from './users.json';

export const getUserById = (userId: number): UserForm | undefined => {
  const userData = (allUsers as Record<string, any>)[userId.toString()];
  if (userData) {
    return {
      userId: userId,
      ...userData,
    } as UserForm;
  }
  return undefined;
};
