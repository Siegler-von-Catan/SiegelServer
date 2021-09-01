import {Express, Request, Response} from "express";
import fs from "fs";
import {sendPng} from "./util";
import Validator, {ValidatorInstance} from "./Validator";

function readAllDatasets(): Record<string, any> {
    const d = JSON.parse(fs.readFileSync("assets/datasets.json", "utf-8"));
    // Add id to fields of dataset
    Object.keys(d).forEach(id => d[id].id = id);
    return d;
}
export const datasets = readAllDatasets();


export function datasetValidator(req: Request, res: Response, idParam: string = "id"): ValidatorInstance {
    return Validator.with(req, res)
        .param(idParam)
        .map(id => datasets[id]);
}

export default (app: Express) => {
    app.get("/datasets", (req, res) => {
        res.json(datasets);
    });

    app.get("/datasets/:id", (req, res) => {
        const dataset = datasetValidator(req, res).getOrError();
        if (dataset) {
            res.json(dataset);
        }
    });

    app.get("/datasets/:id/thumb", (req, res) => {
        const dataset = datasetValidator(req, res).getOrError();
        if (dataset) {
            res.json({file: `assets/dataset_thumbs/${dataset.id}.png`});
        }
    });
};
