import { NextFunction, Request, Response } from "express";
const { isEmpty } = require("lodash");
const emailRegEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateBody = (req: Request, res: Response, next: NextFunction) => {
    const route = req.originalUrl.split("/api")[1];
    const method = req.method;
    const bodyIsEmpty = isEmpty(req.body);

    const missing = (field: string) => res.send({ status: 403, message: `${field} is required` });
    const notEmail = () => res.send({ status: 401, message: "Email address is invalid" });

    const users = () => {
        if (bodyIsEmpty) {
            missing("Email and Password");
        } else if (!req.body.email) {
            missing("Email Address");
        } else if (!emailRegEx.test(req.body.email)) {
            notEmail();
        } else if (!req.body.password) {
            missing("Password");
        } else {
            next();
        };
    }

    switch (route) {
        case "/users/login": {
            users();
            break;
        }
        case "/users": {
            switch (method) {
                case "POST": {
                    users();
                }
            }
            break;
        };
        default: next();
    }
}