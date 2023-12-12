import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Thread } from "../entities/Threads";
import { 
  updateThreadSchema,
} from "../utils/Thread";
import { v2 as cloudinary } from 'cloudinary';

export default new class ThreadServices {
  private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

  async find(req: Request, res: Response) : Promise<Response> {
    try {
      const threads = await this.threadRepository.find({
        relations: ["users", "likes","likes.user","replies","replies.user"],
        order: {
          id: "DESC",
        }
      })

      let newResponse = [];

      threads.forEach((data) => {
        newResponse.push({
          ...data,
          likeslength: data.likes.length
        });
      });

      return res.status(200).json(newResponse);
    } catch (err) {
      return res.status(500).json({ Error: "Error while getting threads" });
    }
  }

  async findOne(req: Request, res: Response) : Promise<Response> {
    try {
      const id = Number(req.params.id);
      const thread = await this.threadRepository.findOne({
        relations: ["users", "likes","likes.user","replies","replies.user"],
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
      const user = res.locals.loginSession.user.id;
      const image = req?.file.path;
      const data = {
        content: req.body.content,
        image,
      };
      console.log(data);
      
      const { error } = updateThreadSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: "Validation failed", details: error.details });
      }
      const thread = this.threadRepository.create({
        content: data.content,
        image: image,
        users: res.locals.loginSession.user.id,
      });
  
      const createdThread = await this.threadRepository.save(thread);
  
      return res.status(201).json(createdThread);
    } catch (err) {
      console.error("Error creating thread:", err);
      return res.status(500).json({ error: "Error while creating thread" });
    }
  }
  
  
  

  async update(req: Request, res: Response) : Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        },
      });

      if(!thread) return res.status(404).json({ Error: "Thread ID not found"})
      
      const data = req.body;

      const { error } = updateThreadSchema.validate(data);
      if(error) return res.status(400).json({ Error: error });

      if(data.content != "") {
        thread.content = data.content
      }

      if(data.image != "") {
        thread.image = data.image
      }

      await this.threadRepository.save(thread);
      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json({ Error: "Error while updating thread" });
    }
  }

  async delete(req: Request, res: Response) : Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);

      const thread = await this.threadRepository.findOne({
        where: {
          id: id,
        }
      })

      if(!thread) return res.status(404).json({ Error: "Thread ID not found"});
      
      await this.threadRepository.delete({
        id: id,
      }) 

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json({ Error: "Error while deleting thread" });
    }
  }
}