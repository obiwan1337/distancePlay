document.addEventListener('DOMContentLoaded', init);
let video = document.querySelector("#videoElement");
function init() {
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
//# sourceMappingURL=camAccess.js.map