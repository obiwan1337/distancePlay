document.addEventListener('DOMContentLoaded', init);
function init() {
    let video = document.querySelector("#videoElement");
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