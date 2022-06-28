import express, { Request, Response } from "express"
const rootRouter = express.Router()
import logger from "../config/logger"

rootRouter.get("/", (req: Request, res: Response) => {
  try {
    res.send(`<h1>Main Page</h1>`)
  } catch (err) {
    res.status(500).json({ message: err.message })
    logger.error(err)
  }
})

export default rootRouter
