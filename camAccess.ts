
document.addEventListener('DOMContentLoaded', init);
let video: HTMLVideoElement;
function init(): void {
    let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("add");
    let remButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("stop");
    addButton.addEventListener("click", addCam);
    remButton.addEventListener("click", stopCamera);
    video = document.querySelector("#videoElement");
    
    
}

function addCam() {
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
function stopCamera(): void {
    let stream: MediaStream = <MediaStream>video.srcObject;
    let tracks = stream.getVideoTracks();

    for (let i = 0; i < tracks.length; i++) {

        tracks[0].stop()
    }
    
    video.srcObject = null;
}
