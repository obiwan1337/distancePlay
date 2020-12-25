document.addEventListener('DOMContentLoaded', init);
let video;
let image;
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
        let imageSRC = document.createAttribute("src");
        imageSRC.value = 'benis';
        image.setAttributeNode(imageSRC);
    }
    else {
        image.removeAttribute("src");
        let imageSRC = document.createAttribute("src");
        imageSRC.value = video.src;
        image.setAttributeNode(imageSRC);
    }
}
//# sourceMappingURL=camAccess.js.map