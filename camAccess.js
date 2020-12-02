document.addEventListener('DOMContentLoaded', init);
let videoTrack;
let video = document.querySelector('#myOwnVideo');
let ownVideoStream;
const constraints = {
    video: true, audio: false,
};
function init() {
    //create start and stop button
    let addButton = document.getElementById("add");
    let remButton = document.getElementById("stop");
    addButton.addEventListener("click", AddCamera);
    remButton.addEventListener("click", stopCamera);
    console.log("init done");
}
function AddCamera() {
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
    let stream = video.srcObject;
    let tracks = stream.getVideoTracks();
    for (let i = 0; i < tracks.length; i++) {
        tracks[0].stop();
    }
    video.srcObject = null;
}
//# sourceMappingURL=camAccess.js.map