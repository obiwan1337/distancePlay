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
let videoTrack;
let video = document.querySelector('#myOwnVideo');
let ownVideoStream;
const constraints = {
    video: true, frameRate: { ideal: 10, max: 15 },
    audio: false,
};
function init() {
    //create start and stop button
    let buttonDiv = document.getElementById("button_Div");
    console.log(buttonDiv + "see the div");
    let addButton = document.createElement("button");
    addButton.setAttribute("id", "add");
    addButton.setAttribute("class", "button");
    buttonDiv.appendChild(addButton);
    //addButton.addEventListener("click", runAddCamera);
    //
    let remButton = document.createElement("button");
    remButton.setAttribute("id", "remove");
    remButton.setAttribute("class", "button");
    buttonDiv.appendChild(remButton);
    remButton.addEventListener("click", stopCamera);
    console.log(navigator.mediaDevices.getUserMedia(constraints));
    console.log("video" + video + "ownmediastream " + ownVideoStream);
    AddownCam();
}
function AddownCam() {
    const fetchOwnCam = () => __awaiter(this, void 0, void 0, function* () {
        try {
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {
                //ownVideoStream.srcObject = mediaStream;
                console.log("stream in then " + stream);
                video.srcObject = stream;
            });
            console.log(ownVideoStream.active + " active?" + "");
        }
        catch (error) {
            console.log("this was an error " + error);
        }
    });
    console.log(video);
}
//video = ownVideoStream.srcObject;
function stopCamera() {
    let stream = videoTrack.srcObject;
    //let tracks: MediaProvider = stream.getTracks();
    //
    //for (let i = 0; i < tracks.length; i++) {
    //    let track = tracks[i];
    //    track.stop();
    //}
    videoTrack.srcObject = null;
}
//# sourceMappingURL=camAccess.js.map