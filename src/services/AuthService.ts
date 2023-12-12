import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { Repository } from "typeorm"
import { User } from "../entities/User"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { loginSchema, registerSchema } from "../utils/Auth"


export default new class AuthSrevice {
    private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User)

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            const { error, value } = registerSchema.validate(data)

            if (error) return res.status(400).json({Error: error})

            const isCheckEmail = await this.AuthRepository.count({
                where: {
                    email: data.email
                }
            })

            if (isCheckEmail > 0) return res.status(400).json({Error: "Email already exists"})
                
            const hashedPassword = await bcrypt.hash(data.password, 10)
            
            const user = this.AuthRepository.create({
                username: data.username,
                full_name: data.full_name,
                email: data.email,
                password: hashedPassword
                 
            })

            const createdUser = await this.AuthRepository.save(user)
            return res.status(200).json(createdUser)
        } catch (err) {
            return res.status(500).json({error: "Error while creating user"})
          
        }
      }
      async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            const { error, value } = loginSchema.validate(data)
            
            const isCheckEmail = await this.AuthRepository.findOne({
                where: {
                    email: data.email
                },
                select: ["id", "email", "password","full_name","username"]
            })
            if (!isCheckEmail) return res.status(400).json({Error: "Email not found"})

            const isCheckPassword = await bcrypt.compare(data.password, isCheckEmail.password)

            if (!isCheckPassword) return res.status(400).json({Error: "Invalid password"})

            const user = this.AuthRepository.create({
                id: isCheckEmail.id,
                username: isCheckEmail.username,
                full_name: isCheckEmail.full_name,
                email: isCheckEmail.email,
                password: isCheckEmail.password,
                
            })

            const token = jwt.sign({user}, "token", {expiresIn: "24h"})
            
            return res.status(200).json({token,user})
        } catch (err) {
            return res.status(500).json({error: err})
        }
      }

      async check(req: Request, res: Response): Promise<Response> {
           try {
            const loginSession = res.locals.loginSession

            const user = await this.AuthRepository.findOne({
                where: {
                    id: loginSession.user.id
                },
                relations: ["following", "followers"],
            })

            return res.status(200).json({user, message: "success"})

           } catch (err) {
            return res.status(500).json({errsor: err})
            
           }
      }
}
