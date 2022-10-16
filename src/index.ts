import authentication from "./middlewares/authentication";
import { ThrowableRouter, withContent } from "itty-router-extras";
import authController from "./controllers/auth.controller";
import usersController from "./controllers/users.controller";
import gardenSectionsController from "./controllers/garden-sections.controller";
import creaturesController from "./controllers/creatures.controller";

const router = ThrowableRouter();

/*
Our index route, a simple hello world.
*/
router.get("/", authentication, () => {
  return new Response(`Hello, world!`);
});

/**
 * Auth
 */
router.post("/auth/signin", withContent, authController.signIn);
router.post("/auth/signup", withContent, authController.signUp);

/**
 * Users
 */
router.get("/users/all", authentication, usersController.findAll);
router.get("/users/:id", authentication, usersController.findById);
router.put("/users/:id", authentication, withContent, usersController.update);

router.get("/garden-sections/all", authentication, gardenSectionsController.findAll);
router.get("/garden-sections/:id", authentication, gardenSectionsController.findById);
router.put("/garden-sections/:id", authentication, withContent, gardenSectionsController.update);
router.delete("/garden-sections/:id", authentication, gardenSectionsController.remove);

router.get("/creatures/all", authentication, creaturesController.findAll);
router.get("/creatures/:id", authentication, creaturesController.findById);
router.post("/creatures", authentication, withContent, creaturesController.save);
router.put("/creatures/:id", withContent, creaturesController.update);
router.delete("/creatures/:id", authentication, creaturesController.remove);

router.all("*", () => new Response("404, not found!", { status: 404 }));

addEventListener("fetch", (e) => {
  e.respondWith(router.handle(e.request));
});
