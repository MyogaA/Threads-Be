import { Request, Response } from "express"
import FollowingService from "../services/FolowingService"


export default new class FollowController{
    create(req: Request, res: Response) {
        FollowingService.create(req, res)
        
    }

}