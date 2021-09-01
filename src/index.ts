/*
 * ShapeFromShading - Creating heightmaps out of 2D seal images.
 * Copyright (C) 2021
 * Joana Bergsiek, Leonard Geier, Lisa Ihde, Tobias Markus, Dominik Meier, Paul Methfessel
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import env from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Merger from "./merge";
import datasets from "./datasets";
import items from "./items";

env.config();

const port = process.env.PORT || 8080;
const useDev = process.env.USE_DEV || false;
const mergeFiles = process.env.STATIC_MERGE_FILES || "staticMerge"


const app = express();

require("express-zip");

if (useDev) {
    app.use(cors());
}

app.use("/staticMerge", express.static(mergeFiles));

app.use("/assets", express.static("assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/merge", async (req, res) => {
    const elements = req.body;
    res.writeHead(200, {"Content-Type": "image/png"});
    await Merger.merge(elements, res);
});

datasets(app);
items(app);

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`)
});
