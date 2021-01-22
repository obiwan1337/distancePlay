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
document.addEventListener('DOMContentLoaded', init);
let videostream;
let image;
let canvas;
let context;
let ocrRes;
let ocrStat;
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
    videostream = document.querySelector("#ownVideoElement");
    videostream.addEventListener("click", takeCardSC);
    image = document.querySelector("#shotOfCard");
    canvas = document.querySelector("#convertCanvas");
    ocrRes = document.getElementById("ocr_results");
    ocrStat = document.getElementById("ocr_status");
    context = canvas.getContext('2d');
}
function recognizeTxt(image) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("started function");
        Tesseract.recognize(image)
            .then(function (result) {
            ocrRes.innerText = result.text;
        }).progress(function (result) {
            ocrStat.innerText = result["status"] + " (" +
                (result["progress"] * 100) + "%)";
        });
        console.log("function end");
    });
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
    let stream = videostream.srcObject;
    let tracks = stream.getVideoTracks();
    for (let i = 0; i < tracks.length; i++) {
        tracks[0].stop();
    }
    videostream.srcObject = null;
}
function takeCardSC() {
    if (image.src == '') {
        context.drawImage(videostream, 0, 0, canvas.width, canvas.height);
        let url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse');
    }
    else {
        image.removeAttribute("src");
        context.drawImage(videostream, 0, 0, canvas.width, canvas.height);
        let url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse else');
        recognizeTxt(image.src);
    }
}
//# sourceMappingURL=camAccess.js.map