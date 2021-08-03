import { Request, Response, Router } from 'express';

export const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.render("index");
})

router.get("/auth", (req: Request, res: Response) => {
    res.render("authentication");
})

router.get("/emotions", (req: Request, res: Response) => {
    res.render("emotions");
})

router.get("/records", (req: Request, res: Response) => {
    res.render("records");
})