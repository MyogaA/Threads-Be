import { Request, Response } from "express"
import ReplyService from "../services/ReplyService"


export default new class ReplyController{
    create(req: Request, res: Response) {
        ReplyService.create(req, res)
        console.log(req);
        
    }
    find(req: Request, res: Response) {
        ReplyService.find(req, res)
    }
    findOne(req: Request, res: Response) {
        ReplyService.findOne(req, res)
    }
    delete(req: Request, res: Response) {
        ReplyService.delete(req, res)
    }

}