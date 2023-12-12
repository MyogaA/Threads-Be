// import { Repository } from "typeorm"
// import { AppDataSource } from "../data-source"
// import { EventEmitter } from "stream"
// import { Thread } from "../entities/Threads"
// import cloudinary  from "../claudinary/Claudinary"


// export default new class ThreadWorker {
//     private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)
//     private emitter = new EventEmitter()

//     async create(queueName: string, connection: any) {
//         try {
//             const channel = await connection.createChannel()
//             await channel.assertQueue(queueName)
//             await channel.consume(queueName, async (message) => {
//                 try {
//                     if (message !== null) {
//                         const payload = JSON.parse(message.content.toString())

//                         const cloudinaryResponse = payload.image ? await cloudinary.destination(payload.image) : null;


//                         const thread = this.threadRepository.create({
//                             content: payload.content,
//                             image: cloudinaryResponse,
//                             users: payload.user
//                         })

//                         await this.threadRepository.save(thread)

//                         this.emitter.emit("message")
//                         console.log("(Worker) : Thread is create");

//                         channel.ack(message)
//                     }
//                 } catch (err) {
//                     console.log("(Worker) : Thread is failed", err);
//                 }
//             })
//         } catch (err) {
//             console.log("(Worker) : Error while consume queue from thread");
//         }
//     }
// }