import { Express } from 'express';
import usersModel from './users';

export default (app: Express) => {
  app.set('usersModel', usersModel(app));
};
