"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', init);
const { createWorker } = require('tesseract.js');
const worker = createWorker();
let video;
let image;
let canvas;
let context;
let ownCardList = [];
let constraints = {
    video: {
        cursor: "never",
        width: 1280,
        height: 720,
        frameRate: 15,
    }
};
function init() {
    let addButton = document.getElementById("add");
    let remButton = document.getElementById("stop");
    addButton.addEventListener("click", addCam);
    remButton.addEventListener("click", stopCamera);
    video = document.querySelector("#ownVideoElement");
    image = document.querySelector("#shotOfCard");
    canvas = document.querySelector("#convertCanvas");
    video.addEventListener("click", takeCardSC);
    context = canvas.getContext('2d');
}
function recognizeImage() {
    console.log("beginning with whatever it is doing");
    (() => __awaiter(this, void 0, void 0, function* () {
        yield worker.load();
        yield worker.loadLanguage('eng');
        yield worker.initialize('eng');
        const { data: { text } } = yield worker.recognize('image.src');
        console.log(text);
        yield worker.terminate();
    }))();
}
function addCam() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
            video.srcObject = stream;
            canvas.style.width = video.width.toString() + "px";
            canvas.style.height = video.height.toString() + "px";
        })
            .catch(function (err0r) {
            console.log("Something went wrong!");
        });
    }
}
function stopCamera() {
    let stream = video.srcObject;
    let tracks = stream.getVideoTracks();
    for (let i = 0; i < tracks.length; i++) {
        tracks[0].stop();
    }
    video.srcObject = null;
}
function takeCardSC() {
    if (image.src == '') {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse');
        recognizeImage();
    }
    else {
        image.removeAttribute("src");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse');
        recognizeImage();
    }
}
//# sourceMappingURL=camAccess.js.map