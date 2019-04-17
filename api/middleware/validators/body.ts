import { NextFunction, Request, Response } from "express";
const { isEmpty } = require("lodash");
const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateBody = {
    login: (req: Request, res: Response, next: NextFunction) => {
        const missing = (field: string) => res.send({ status: 403, message: `${field} is required` });
        const notEmail = () => res.send({ status: 401, message: "Email address is invalid" });

        if (isEmpty(req.body)) {
            missing("Email and Password");
        } else if (!req.body.email) {
            missing("Email Address");
        } else if (!emailRegEx.test(req.body.email)) {
            notEmail();
        } else if (!req.body.password) {
            missing("Password");
        } else {
            next();
        }
    }
}