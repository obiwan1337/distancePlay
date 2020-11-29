
document.addEventListener('DOMContentLoaded', init)
let videoTrack: HTMLMediaElement;
let ownVideoStream: MediaStreamTrack = null;
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
}


function init(): void {
    //create start and stop button
    let buttonDiv: HTMLElement = document.getElementById("button_Div");
    console.log(buttonDiv + "see the div");
    let addButton: HTMLButtonElement = document.createElement("button");
    addButton.setAttribute("id", "add");
    addButton.setAttribute("class", "button");
    buttonDiv.appendChild(addButton);
    //addButton.addEventListener("click", runAddCamera);
    //
    let remButton: HTMLButtonElement = document.createElement("button");
    remButton.setAttribute("id", "remove");
    remButton.setAttribute("class", "button");
    buttonDiv.appendChild(remButton);
    remButton.addEventListener("click", stopCamera);
    //create video element
    let div: HTMLElement = document.getElementById("ownVideoDiv");
    let video: HTMLVideoElement = document.createElement("video");
    video.setAttribute("id", "myOwnVideo");
    video.setAttribute("class", "video");
    //let legend: HTMLLegendElement = document.createElement("legend");
    //legend.innerText = "own Cam"
    //div.appendChild(legend);
    div.appendChild(video);

}


async function addCamera() {

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(
            mediaStream => {
                document.querySelector('video').srcObject = mediaStream;
                const track = mediaStream.getVideoTracks()[0];
                
            })
}
function stopCamera(): void {

    let stream: MediaProvider = videoTrack.srcObject;
    //let tracks: MediaProvider = stream.getTracks();
    //
    //for (let i = 0; i < tracks.length; i++) {
    //    let track = tracks[i];
    //    track.stop();
    //}

    videoTrack.srcObject = null;
}
