import { di } from "@/common/di";
import { Router } from "express";
import { GetAllUsersController } from "./controllers";

type Props = {
  app: Router;
};

export function setupUsersRoutes({ app }: Props) {
    console.log('setupUsersRoutes');
    
  const router = Router();

  router.get("/", di.resolve(GetAllUsersController).get);

  app.use("/users", router);
}
