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
let canvas;
let context;
let ocrRes;
let ocrStat;
let constraints = {
    video: {
        cursor: "never",
        width: 640,
    }
};
function init() {
    videostream = document.querySelector("#ownVideoElement");
    videostream.addEventListener("click", takeCardSC);
    canvas = document.querySelector("#convertCanvas");
    ocrRes = document.querySelector("#ocr_result_p");
    ocrStat = document.querySelector("#ocr_status_p");
    context = canvas.getContext('2d');
    addCam();
}
function recognizeTxt(i) {
    return __awaiter(this, void 0, void 0, function* () {
        ocrStat.innerText = "Please wait. Your image is being processed.";
        Tesseract.recognize(i, // @ts-ignore
        'eng', {
            logger: m => console.log(m)
        }).then(({ // @ts-ignore
        data: { text } }) => {
            ocrRes.innerText = text;
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
    context.drawImage(videostream, 0, 0, canvas.width, canvas.height);
    let url = canvas.toDataURL('image/png');
    clearout();
    recognizeTxt(url);
}
function clearout() {
}
//# sourceMappingURL=camAccess.js.map