import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Like } from "../entities/Like";
import { User } from "../entities/User";

export default new class LikeService {

    private readonly likeRepository: Repository<Like> = AppDataSource.getRepository(Like);

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { user_id } = req.body;
            const thread_id = Number(req.params.id);
    
            const action = req.body.action;
            const isLiked = action === 'like';
    
            if (isLiked) {
                const like = this.likeRepository.create({ user: { id: user_id }, thread: { id: thread_id } });
    
                const savedLike = await this.likeRepository.save(like);
                return res.status(200).json({ data: savedLike });
            } else {
                return res.status(200).json({ message: 'Like tidak dipost karena kondisi like adalah false' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
    
    async delete(req: Request, res: Response): Promise<Response> {
        try {
          const user_id = Number(req.body.user_id);
          const thread_id = Number(req.params.id);
    
          const like = await this.likeRepository.findOne({
            where: {
              user: { id: user_id },
              thread: { id: thread_id }
            },
          });
    
          if (!like) return res.status(404).json({ Error: 'Like not found' });
    
          const response = await this.likeRepository.remove(like);
          return res.status(200).json(response);
        } catch (error) {
          res.status(500).json({ error: 'Bad Request' });
        }
    }
    
    

}