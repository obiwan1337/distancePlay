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
const constraints = {
    video: {
        width: {
            min: 180,
            ideal: 337,
            max: 360,
        },
        height: {
            min: 120,
            ideal: 190,
            max: 240
        },
    }
};
function getstream() {
}
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
    //create video element
    let div = document.getElementById("ownVideoDiv");
    let video = document.createElement("video");
    video.setAttribute("id", "myOwnVideo");
    video.setAttribute("class", "video");
    //let legend: HTMLLegendElement = document.createElement("legend");
    //legend.innerText = "own Cam"
    //div.appendChild(legend);
    //div.appendChild(video);
}
function addCamera(video) {
    return __awaiter(this, void 0, void 0, function* () {
        let videoAsker;
        try {
            videoAsker = yield navigator.mediaDevices.getUserMedia({ video: true });
        }
        catch (e) {
            console.log("catch did get you");
        }
        finally {
            return videoAsker;
        }
    });
}
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