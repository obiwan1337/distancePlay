
document.addEventListener('DOMContentLoaded', init)
let videoTrack: HTMLMediaElement;
let video = <HTMLVideoElement>document.querySelector('#myOwnVideo');
let ownVideoStream;
const constraints = {
    video: true, audio: false,
}


function init(): void {

    //create start and stop button

    let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("add");
    let remButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("stop");

    addButton.addEventListener("click", AddCamera);
    remButton.addEventListener("click", stopCamera);

    console.log("init done");
}

function AddCamera(): void {
    console.log("starting add");
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
}
function stopCamera(e) {
    let stream: MediaStream = <MediaStream>video.srcObject;
    let tracks = stream.getVideoTracks();

    for (let i = 0; i < tracks.length; i++) {

        tracks[0].stop()
    }

    video.srcObject = null;
}
