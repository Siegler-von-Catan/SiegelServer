module.exports = (canvas, response) => {
    canvas.renderAll();

    const stream = canvas.createPNGStream();
    stream
        .on("data", chunk => response.write(chunk))
        .on("end", () => response.end());
}
