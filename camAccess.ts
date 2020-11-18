
document.addEventListener('DOMContentLoaded', init)
let videoTrack: HTMLVideoElement = document.querySelector("#videoElement");


function getstream(): void {
    let ownvideo: HTMLElement = document.getElementById("ownvideo");
    let myOwnVideo: HTMLVideoElement = document.createElement("video")
    myOwnVideo.setAttribute("id", "myStream");

    //let stream = ownVideoCanvas.captureStream
}
function init(): void {
    //create start and stop button
    let buttonDiv: HTMLElement = document.getElementById("button_Div");
    console.log(buttonDiv + "see the div");
    let addButton: HTMLButtonElement = document.createElement("button");
    addButton.setAttribute("id", "add");
    addButton.setAttribute("class", "button");
    buttonDiv.appendChild(addButton);
    addButton.addEventListener("click", addCamera);
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
    //div.appendChild(video);

}


function addCamera(): void {

    let constraints = { audio: false, video: { width: 640, hight: 360 } }
    navigator.mediaDevices.getUserMedia(constraints)
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                videoTrack.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });

        getstream();

    }
}
function stopCamera(e) {

    let stream: MediaProvider = videoTrack.srcObject;
    //let tracks: MediaProvider = stream.getTracks();
    //
    //for (let i = 0; i < tracks.length; i++) {
    //    var track = tracks[i];
    //    track.stop();
    //}

    videoTrack.srcObject = null;
}
