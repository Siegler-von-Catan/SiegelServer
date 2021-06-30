import Merger from "../src/merge";
import {fabric} from "fabric";
import { expect } from "chai";
import exp = require("constants");

type RenderFunc = (canvas: fabric.StaticCanvas) => void;
type ParseFunc = (data: object) => fabric.StaticCanvas;

describe("Merge", () => {
    it ("should parse the data to canvas", () => {
        const parseFunc: ParseFunc = (Merger as any).parseCanvas;
        const json = "{\n" +
            "  \"version\": \"4.5.0\",\n" +
            "  \"objects\": [\n" +
            "    {\n" +
            "      \"type\": \"circle\",\n" +
            "      \"version\": \"4.5.0\",\n" +
            "      \"originX\": \"left\",\n" +
            "      \"originY\": \"top\",\n" +
            "      \"left\": 0,\n" +
            "      \"top\": 0,\n" +
            "      \"width\": 500,\n" +
            "      \"height\": 500,\n" +
            "      \"fill\": \"red\",\n" +
            "      \"stroke\": null,\n" +
            "      \"strokeWidth\": 1,\n" +
            "      \"strokeDashArray\": null,\n" +
            "      \"strokeLineCap\": \"butt\",\n" +
            "      \"strokeDashOffset\": 0,\n" +
            "      \"strokeLineJoin\": \"miter\",\n" +
            "      \"strokeUniform\": false,\n" +
            "      \"strokeMiterLimit\": 4,\n" +
            "      \"scaleX\": 1,\n" +
            "      \"scaleY\": 1,\n" +
            "      \"angle\": 0,\n" +
            "      \"flipX\": false,\n" +
            "      \"flipY\": false,\n" +
            "      \"opacity\": 1,\n" +
            "      \"shadow\": null,\n" +
            "      \"visible\": true,\n" +
            "      \"backgroundColor\": \"\",\n" +
            "      \"fillRule\": \"nonzero\",\n" +
            "      \"paintFirst\": \"fill\",\n" +
            "      \"globalCompositeOperation\": \"source-over\",\n" +
            "      \"skewX\": 0,\n" +
            "      \"skewY\": 0,\n" +
            "      \"radius\": 250,\n" +
            "      \"startAngle\": 0,\n" +
            "      \"endAngle\": 6.283185307179586\n" +
            "    },\n" +
            "    {\n" +
            "      \"type\": \"image\",\n" +
            "      \"version\": \"4.5.0\",\n" +
            "      \"originX\": \"left\",\n" +
            "      \"originY\": \"top\",\n" +
            "      \"left\": 138.35,\n" +
            "      \"top\": 192.99,\n" +
            "      \"width\": 64,\n" +
            "      \"height\": 64,\n" +
            "      \"fill\": \"rgb(0,0,0)\",\n" +
            "      \"stroke\": null,\n" +
            "      \"strokeWidth\": 0,\n" +
            "      \"strokeDashArray\": null,\n" +
            "      \"strokeLineCap\": \"butt\",\n" +
            "      \"strokeDashOffset\": 0,\n" +
            "      \"strokeLineJoin\": \"miter\",\n" +
            "      \"strokeUniform\": false,\n" +
            "      \"strokeMiterLimit\": 4,\n" +
            "      \"scaleX\": 1.87,\n" +
            "      \"scaleY\": 2.76,\n" +
            "      \"angle\": 324.94,\n" +
            "      \"flipX\": false,\n" +
            "      \"flipY\": false,\n" +
            "      \"opacity\": 1,\n" +
            "      \"shadow\": null,\n" +
            "      \"visible\": true,\n" +
            "      \"backgroundColor\": \"\",\n" +
            "      \"fillRule\": \"nonzero\",\n" +
            "      \"paintFirst\": \"fill\",\n" +
            "      \"globalCompositeOperation\": \"source-over\",\n" +
            "      \"skewX\": 0,\n" +
            "      \"skewY\": 0,\n" +
            "      \"cropX\": 0,\n" +
            "      \"cropY\": 0,\n" +
            "      \"src\": \"http://localhost:8080/staticMerge/preRendered/1.png\",\n" +
            "      \"crossOrigin\": null,\n" +
            "      \"filters\": []\n" +
            "    }\n" +
            "  ]\n" +
            "}";
        const data = JSON.parse(json);
        const canvas = parseFunc(data);
        // expect(canvas.getWidth()).to.equal(500);
        // expect(canvas.getHeight()).to.equal(500);

        const objs = canvas.getObjects();
        expect(objs).to.have.lengthOf(1);

        const img = objs[0] as fabric.Image;
        expect(img.type).to.equal("image");
        expect(img.getSrc()).to.equal(__dirname + "/../staticMerge/heightmaps/test.png")
    });

    it("should have canvas and fabric installed and working", () => {
        expect(typeof require("fabric")).to.equal("object");
        expect(typeof require("canvas")).to.equal("function");
    });

    it("should render the canvas to file", () => {
        const renderFunc: RenderFunc = (Merger as any).renderCanvas;
        const canvas = new fabric.StaticCanvas(null, {width: 512, height: 512});
        canvas.add(new fabric.Rect({top: 200, left: 200, fill: "red", width: 200, height: 200}));
        renderFunc(canvas);
    });
});
