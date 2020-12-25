document.addEventListener('DOMContentLoaded', init);
let video;
let image;
let canvas;
let context = canvas.getContext('2d');
let ownCardList = [];
let constraints = {
    video: {
        cursor: "never",
        width: 1280,
        height: 720,
        frameRate: 15,
    }
};
function init() {
    let addButton = document.getElementById("add");
    let remButton = document.getElementById("stop");
    addButton.addEventListener("click", addCam);
    remButton.addEventListener("click", stopCamera);
    video = document.querySelector("#ownVideoElement");
    image = document.querySelector("#shotOfCard");
    canvas = document.querySelector("#convertCanvas");
    video.addEventListener("click", takeCardSC);
}
function addCam() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
            video.srcObject = stream;
        })
            .catch(function (err0r) {
            console.log("Something went wrong!");
        });
    }
}
function stopCamera() {
    let stream = video.srcObject;
    let tracks = stream.getVideoTracks();
    for (let i = 0; i < tracks.length; i++) {
        tracks[0].stop();
    }
    video.srcObject = null;
}
function takeCardSC() {
    if (image.src == '') {
        context.drawImage(video, 0, 0, video.width, video.height);
        let url = canvas.toDataURL();
        image.src = url;
    }
    else {
        image.removeAttribute("src");
        context.drawImage(video, 0, 0, video.width, video.height);
        let url = canvas.toDataURL();
        image.src = url;
    }
}
//# sourceMappingURL=camAccess.js.map