document.addEventListener('DOMContentLoaded', init);
let videoTrack;
let video = document.querySelector('#myOwnVideo');
let ownVideoStream;
const constraints = {
    video: true, frameRate: { ideal: 10, max: 15 },
    audio: false,
};
function init() {
    //create start and stop button
    let buttonDiv = document.getElementById("button_Div");
    console.log(buttonDiv + "see the div");
    let addButton = document.getElementById("add");
    let remButton = document.getElementById("stop");
    addButton.addEventListener("click", AddCamera);
    remButton.addEventListener("click", stopCamera);
    console.log(navigator.mediaDevices.getUserMedia(constraints));
    console.log("video" + video + "ownmediastream " + ownVideoStream);
}
function AddCamera() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
            video.srcObject = stream;
        })
            .catch(function (err0r) {
            console.log("Something went wrong!");
        });
    }
    //const fetchOwnCam = async () => {
    //    try {
    //    navigator.mediaDevices.getUserMedia(constraints)
    //        .then(
    //            function (stream) {
    //                //ownVideoStream.srcObject = mediaStream;
    //
    //                video.srcObject = stream;
    //            }
    //        )
    //    }
    //    catch (error) {
    //    console.log("this was an error " + error)
    //    }
    //}
    //console.log(video);
    //video = ownVideoStream.srcObject;
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