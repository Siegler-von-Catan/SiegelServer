import {Request, Response} from "express";
import * as fs from "fs";

export function tryGetNumberParam(req: Request, res: Response, paramName: string): number | null {
    const param = Number(req.params[paramName]?.toString());
    if (!isNaN(param)) {
        return param;
    } else {
        res.sendStatus(400);
        return null;
    }
}

export function tryGetParam(req: Request, res: Response, paramName: string): any | null {
    const param = req.params[paramName];
    if (param === undefined) {
        res.sendStatus(400);
        return null;
    } else {
        return param;
    }
}

export function sendPng(res: Response, path: string) {
    fs.readFile(path, {encoding: "base64"}, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": data.length
        });
        res.end(data);
    });
}
