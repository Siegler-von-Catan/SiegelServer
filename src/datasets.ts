import {Express, Request, Response} from "express";
import fs from "fs";
import {sendPng, tryGetParam} from "./util";

const datasets = JSON.parse(fs.readFileSync("assets/datasets.json", "utf-8"));
// Add id to fields of dataset
Object.keys(datasets).forEach(id => datasets[id].id = id);

function tryGetDataset(req: Request, res: Response): any | null {
    const id = tryGetParam(req, res, "id");
    if (id !== null) {
        const dataset = datasets[id];
        if (dataset) {
            return dataset;
        } else {
            res.sendStatus(404);
        }
    }
    return null;
}

export default (app: Express) => {
    app.get("/datasets", (req, res) => {
        res.json(datasets);
    });

    app.get("/datasets/:id", (req, res) => {
        const dataset = tryGetDataset(req, res);
        if (dataset) {
            res.json(dataset);
        }
    });

    app.get("/datasets/:id/thumb", (req, res) => {
        const dataset = tryGetDataset(req, res);
        if (dataset) {
            sendPng(res, `assets/dataset_thumbs/${dataset.thumb}`);
        }
    });
};
