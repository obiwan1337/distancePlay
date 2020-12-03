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
let video = document.querySelector("#videoElement");
function init() {
    let addButton = document.getElementById("add");
    let remButton = document.getElementById("stop");
    addButton.addEventListener("click", addCam);
    remButton.addEventListener("click", stopCam);
}
function addCam() {
    return __awaiter(this, void 0, void 0, function* () {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                video.srcObject = stream;
            })
                .catch(function (err0r) {
                console.log("Something went wrong!");
            });
        }
    });
}
function stopCam(e) {
    let stream = video.srcObject;
    let tracks = stream.getVideoTracks();
    for (let i = 0; i < tracks.length; i++) {
        tracks[0].stop();
    }
    video.srcObject = null;
}
//# sourceMappingURL=camAccess.js.map