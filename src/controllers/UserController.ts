import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default new (class UserControllers {
  find(req: Request, res: Response) {
    UserService.find(req, res);
  }
  create(req: Request, res: Response) {
    UserService.create(req, res);
  }
  follow(req: Request, res: Response) {
    UserService.follow(req, res);
  }
  update(req: Request, res: Response) {
    UserService.update(req, res);
  }
})();