document.addEventListener('DOMContentLoaded', init);
let video = document.querySelector("#videoElement");
function init() {
    let addButton = document.getElementById("add");
    let remButton = document.getElementById("stop");
    addButton.addEventListener("click", addCam);
    remButton.addEventListener("click", stopCam);
    addCam();
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
function stopCam(e) {
    let stream = video.srcObject;
    let tracks = stream.getVideoTracks();
    for (let i = 0; i < tracks.length; i++) {
        tracks[0].stop();
    }
    video.srcObject = null;
}
//# sourceMappingURL=camAccess.js.map