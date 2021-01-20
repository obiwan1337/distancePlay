"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tesseract_js_1 = __importDefault(require("tesseract.js"));
tesseract_js_1.default.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png', 'eng', { logger: function (m) { return console.log(m); } }).then(function (_a) {
    var text = _a.data.text;
    console.log(text);
});
document.addEventListener('DOMContentLoaded', init);
var videostream;
var image;
var canvas;
var context;
var ownCardList = [];
var constraints = {
    video: {
        cursor: "never",
        width: 1280,
        height: 720,
        frameRate: 15,
    }
};
function init() {
    var addButton = document.getElementById("add");
    var remButton = document.getElementById("stop");
    addButton.addEventListener("click", addCam);
    remButton.addEventListener("click", stopCamera);
    videostream = document.querySelector("#ownVideoElement");
    videostream.addEventListener("click", takeCardSC);
    image = document.querySelector("#shotOfCard");
    canvas = document.querySelector("#convertCanvas");
    context = canvas.getContext('2d');
}
function addCam() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
            videostream.srcObject = stream;
            canvas.style.width = videostream.width.toString() + "px";
            canvas.style.height = videostream.height.toString() + "px";
        })
            .catch(function (err0r) {
            console.log("Something went wrong!");
        });
    }
}
function stopCamera() {
    var stream = videostream.srcObject;
    var tracks = stream.getVideoTracks();
    for (var i = 0; i < tracks.length; i++) {
        tracks[0].stop();
    }
    videostream.srcObject = null;
}
function takeCardSC() {
    if (image.src == '') {
        context.drawImage(videostream, 0, 0, canvas.width, canvas.height);
        var url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse');
    }
    else {
        image.removeAttribute("src");
        context.drawImage(videostream, 0, 0, canvas.width, canvas.height);
        var url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse');
    }
}
//# sourceMappingURL=camAccess.js.map