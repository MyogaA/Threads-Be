import { Request, Response } from "express";
import LikeService from "../services/LikeService";

export default new (class LikesControllers {
    // find(req: Request, res: Response) {
    //     LikeService.find(req, res)
    // }

    create(req: Request, res: Response) {
        LikeService.create(req, res)
    }

    delete(req: Request, res: Response) {
        LikeService.delete(req, res)
    }
})