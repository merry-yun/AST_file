document = {
    createElement: function() {
        return canvas
    }
};
canvas = {
    getContext: function getContext() {
        return CanvasRenderingContext2D
    },
    toDataURL: function toDataURL() {
        return "data:image/png;base64,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"
    },
};
CanvasRenderingContext2D = {
    arc: function arc() {},
    stroke: function stroke() {},
    fillText: function fillText() {},
};
