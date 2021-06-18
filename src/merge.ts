import { createCanvas } from "canvas";
import { fabric } from "fabric";
import fs from "fs";

type Vector = [number, number];

interface DrawnCanvas {
    width: number
    height: number
    elements: DrawnElement[]
}

interface DrawnElement extends fabric.Image {
    sealElementId: number
}

export interface SealElement {
    id: number
    heightmap: string
}

const elements = JSON.parse(fs.readFileSync("staticMerge/components.json", "utf-8")).components as SealElement[];

export function merge(data: object) {
    const jsonCanvas = data as DrawnCanvas;

    const canvas = new fabric.StaticCanvas(null, { width: jsonCanvas.width, height: jsonCanvas.height});

    jsonCanvas.elements.forEach(elem => {
        canvas.loadFromJSON(elem, () => {}, (image: DrawnElement) => {
            const heightmap = "staticMerge/heightmaps/" + elements.find(elem => elem.id === image.sealElementId);
            image.setSrc(heightmap);
        });
    });

    canvas.add(new fabric.Rect({left: 200, top: 100, fill: "blue", width: 100, height: 100}));

    canvas.renderAll();

    const out = fs.createWriteStream(__dirname + "/helloworld.png");
    const stream = (canvas as any).createPNGStream();
    stream.on("data", (chunk: any) => out.write(chunk))
}
