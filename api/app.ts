import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import BlueBird from "bluebird";
import Router from "./router";
import { connect, Mongoose } from "mongoose";

const { MONGODB_PASSWORD, MONGODB_USERNAME } = process.env;

class App {
  public app: express.Application;
  private appRouter: any;
  constructor() {
    this.app = express();
    this.appRouter = new Router(this.app);
    this.config(this.app);
    this.routes(this.app, this.appRouter.router);
    (<any>Mongoose).Promise = BlueBird;
  }

  public config(app: express.Application) {
    app.use(morgan("dev"));
    app.use(bodyParser.json({ limit: 1024 * 1024 * 50 }));
    app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 10000, limit: 1024 * 1024 * 50 }));
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,PUT,DELETE");
        res.send(200);
      } else {
        next();
      }
    });
  }
 
  public routes(app: express.Application, routerLink: express.Router) {
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      if (!app.get("mongoConnection")) {
        const conn = await connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0-shard-00-00-fprc1.mongodb.net:27017,cluster0-shard-00-01-fprc1.mongodb.net:27017,cluster0-shard-00-02-fprc1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`);
        app.set("mongoConnection", conn);
      }
      next();
    });

    app.use("/api/", routerLink);

    app.use((req: Request, res: Response) => {
      res.status(404).json({ status: "Invalid Request!" });
    });
  }
}

export default new App();