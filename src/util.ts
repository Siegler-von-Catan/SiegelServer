import {Response} from "express";
import * as fs from "fs";

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
