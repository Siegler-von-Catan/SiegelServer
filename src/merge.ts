import {fabric} from "fabric";
import fs from "fs";
import { last } from "lodash";
import path from "path";

const renderer = require("./canvasRenderer");

interface DrawnCanvas {
    width: number
    height: number
    objects: DrawnElement[]
}

interface DrawnElement extends fabric.Image {
    sealElementId: number
}

export interface SealElement {
    id: number
    heightmap: string
}

interface Streamable {
    write(chunk: any): void;
    end(): void;
}

const elements = JSON.parse(fs.readFileSync("staticMerge/components.json", "utf-8")).components as SealElement[];

export default class Merger {
    public static async merge(data: object, response: Streamable) {
        const canvas = await this.parseCanvas(data as DrawnCanvas);
        const out = fs.createWriteStream(__dirname + '/helloworld.png');
        this.renderCanvas(canvas, out);
        this.renderCanvas(canvas, response);
    }

    private static async createImageFromUrl(url: string): Promise<fabric.Image> {
        return new Promise(resolve => fabric.Image.fromURL(url, resolve));
    }

    private static allowedFields = ["cropX", "cropY", "originX", "originY", "top", "left", "width", "height", "scaleX", "scaleY", "flipX", "flipY", "opacity", "angle", "skewX", "skewY"];

    private static async parseCanvas(data: DrawnCanvas): Promise<fabric.StaticCanvas> {
        const canvas = new fabric.StaticCanvas(null, {width: data.width, height: data.height});
        for (const elem of data.objects) {
            if (isNaN(elem.sealElementId)) continue;
            const url = "file://" + path.join(__dirname, `/../staticMerge/heightmaps/${elem.sealElementId}.png`);
            const img = await this.createImageFromUrl(url);

            // Only copy allowed fields
            for (const allowedField of Merger.allowedFields) {
                if (allowedField in elem) {
                    (img as any)[allowedField] = (elem as any)[allowedField];
                }
            }
            canvas.add(img);
        }
        return canvas;
    }

    private static renderCanvas(canvas: fabric.StaticCanvas, response: Streamable) {
        renderer(canvas, response);
    }
}
