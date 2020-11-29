
document.addEventListener('DOMContentLoaded', init)
let videoTrack: HTMLMediaElement;
let ownVideoStream;
const constraints = {
    video: true,
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
    //create video element
    let div: HTMLElement = document.getElementById("ownVideoDiv");
    let video: HTMLVideoElement = document.createElement("video");
    video.setAttribute("id", "myOwnVideo");
    video.setAttribute("class", "video");
    //let legend: HTMLLegendElement = document.createElement("legend");
    //legend.innerText = "own Cam"
    //div.appendChild(legend);
    div.appendChild(video);
    
    console.log (navigator.mediaDevices.getUserMedia(constraints));
    console.log("video" + video + "ownmediastream " + ownVideoStream);
    
}

const fetchOwnCam = async () => {
    try {
        navigator.mediaDevices
        .getUserMedia(constraints)
        mediaStream => {
            ownVideoStream.srcObject = mediaStream;}
                       
    }
    catch (error) {
        console.log("this was an error " + error);

    }
}
//video = ownVideoStream.srcObject;

async function addCamera() {
//
 let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    /* use the stream */
    ownVideoStream = new MediaStream(stream)
  } catch(err) {
    /* handle the error */
  }
}
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
