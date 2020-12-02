
document.addEventListener('DOMContentLoaded', init)
let videoTrack: HTMLMediaElement;
let video: HTMLVideoElement = <HTMLVideoElement>document.querySelector('#myOwnVideo');
let ownVideoStream;
const constraints = {
    video: true, frameRate: { ideal: 10, max: 15 },
    audio: false,
}


function init(): void {

    //create start and stop button
    let buttonDiv: HTMLElement = document.getElementById("button_Div");
    console.log(buttonDiv + "see the div");
    let addButton: HTMLButtonElement = document.createElement("button");
    addButton.setAttribute("id", "add");
    addButton.setAttribute("class", "button");
    buttonDiv.appendChild(addButton);
    //addButton.addEventListener("click", runAddCamera);
    //
    let remButton: HTMLButtonElement = document.createElement("button");
    remButton.setAttribute("id", "remove");
    remButton.setAttribute("class", "button");
    buttonDiv.appendChild(remButton);
    remButton.addEventListener("click", stopCamera);

    console.log(navigator.mediaDevices.getUserMedia(constraints));
    console.log("video" + video + "ownmediastream " + ownVideoStream);
    AddownCam();

}
function AddownCam() {
    const fetchOwnCam = async () => {
        //try {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(
                function (stream) {
                    //ownVideoStream.srcObject = mediaStream;

                    video.srcObject = stream;
                }
            )
        //}
        //catch (error) {
        //console.log("this was an error " + error);

        //}
    }
    console.log(video);

}
//video = ownVideoStream.srcObject;


function stopCamera(): void {

    let stream: MediaProvider = videoTrack.srcObject;
    //let tracks: MediaProvider = stream.getTracks();
    //
    //for (let i = 0; i < tracks.length; i++) {
    //    let track = tracks[i];
    //    track.stop();
    //}

    videoTrack.srcObject = null;
}
