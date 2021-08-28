import {Express} from "express";
import {datasets} from "./datasets";
import Validator from "./Validator";
import fs from "fs";
import {sendPng} from "./util";

const maxLimit = 100;
const defaultLimit = 100;
const defaultOffset = 0;

function readAllDatasetsAndItems(): Record<string, any> {
    const items: Record<string, any[]> = {};
    for (const dataset of Object.keys(datasets)) {
        const dataItems = JSON.parse(fs.readFileSync(`assets/datasets/${dataset}/items.json`, "utf-8")) as any[];
        dataItems.forEach((item, i) => item.id = i);
        items[dataset] = dataItems;
    }
    return items;
}
const datasetItems = readAllDatasetsAndItems();

export default (app: Express) => {
    app.get("/datasets/:datasetId/items", (req, res) => {
        const v = Validator.with(req, res);
        const [success, items, limit, offset] = Validator.check(
            v.param("datasetId").map(id => datasetItems[id]),
            v.query("limit").min(1).max(maxLimit).orElse(defaultLimit),
            v.query("offset").orElse(defaultOffset));
        if (!success) return;

        const relevantItems = (items as any[]).slice(offset, offset + limit);
        res.json(relevantItems);
    });

    app.get("/datasets/:datasetId/items/info", (req, res) => {
        const v = Validator.with(req, res);
        const [success, dataset, items] = Validator.check(
            v.param("datasetId").map(id => datasets[id]),
            v.param("datasetId").map(id => datasetItems[id]))
        if (!success) return;
        res.json({
            dataset,
            itemsCount: items.length
        });
    });

    app.get("/datasets/:datasetId/items/:itemId", (req, res) => {
        const v = Validator.with(req, res);
        const items = v.param("datasetId").map(id => datasetItems[id]).getOrError();
        if (items === undefined) return;
        const [success, item, dataset] = Validator.check(
            v.param("itemId").map(id => items[id]),
            v.param("datasetId").map(id => datasets[id]));
        if (!success) return;

        res.json({item, dataset});
    });

    app.get("/datasets/:datasetId/items/:itemId/:dataType", (req, res) => {
        const v = Validator.with(req, res);
        const items = v.param("datasetId").map(id => datasetItems[id]).getOrError();
        if (items === undefined) return;
        const [success, item, dataType, datasetId] = Validator.check(
            v.param("itemId").map(id => items[id]),
            v.param("dataType").in("heightmap", "original", "stl"),
            v.param("datasetId"));
        if (!success) return;

        const path = `assets/datasets/${datasetId}/${dataType.toString()}/${item.id}`;
        if (["heightmap", "original"].includes(dataType.toString())) {
            res.json({file: `${path}.png`});
        } else {
            res.json({file: `${path}.stl`});
        }
    });
};
