import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Reply } from '../entities/Reply';
import { createRepliesSchema } from '../utils/valid';
const cloudinary = require('cloudinary').v2;

export default new (class RepliesService {
  private readonly RepliesRepository: Repository<Reply> = AppDataSource.getRepository(Reply);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const replies = await this.RepliesRepository.find({
        relations: ['user', 'thread'],
        order: {
          id: 'DESC',
        },
      });
      return res.status(200).json(replies);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error while getting replies' });
    }
  }
  async findOne(req: Request, res: Response) : Promise<Response> {
    try {
      const id = Number(req.params.id);
      const thread = await this.RepliesRepository.findOne({
        relations: ["users", "likes","likes.user","threads","threads.user"],
        where: {
          id: id,
        },
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json({ Error: "Error while getting a thread" });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        content: req.body.content,
        image: req?.file.path,
        user: res.locals.loginSession.user.id,
        thread: req.body.thread,
      };
      
      const { error } = createRepliesSchema.validate(data);

      if (error) {
        return res.status(400).json({ Error: error.details[0].message });
      }


    //   const cloudinaryResponse = await cloudinary.uploader.upload(data.image, { folder: 'replies' });

      const replies = this.RepliesRepository.create({
        content: data.content,
        image: data.image,
        user: res.locals.loginSession.user.id,
        thread: data.thread,
      });
      
      const createReplies = await this.RepliesRepository.save(replies);
      res.status(200).json(createReplies);
    } catch (err) {
      return res.status(500).json({ err});
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const reply = await this.RepliesRepository.findOne({
        where: { id: id },
      });

      if (!reply) return res.status(404).json({ Error: 'Reply ID not found' });

      const response = await this.RepliesRepository.delete({ id: id });
      return res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'Bad Request' });
    }
  }
})();