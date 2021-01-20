
document.addEventListener('DOMContentLoaded', init);
let videostream: HTMLVideoElement;
let image: HTMLImageElement;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let ownCardList: { id: number, cardPictureLink: string, cardText: string }[] = [];
let constraints = {
    video: {
        cursor: "never",
        width: 1280,
        height: 720,
        frameRate: 15,
    }

}
function init(): void {
    
    let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("add");
    let remButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("stop");
    addButton.addEventListener("click", addCam);
    remButton.addEventListener("click", stopCamera);
    videostream = document.querySelector("#ownVideoElement");
    videostream.addEventListener("click", takeCardSC);
    image = document.querySelector("#shotOfCard");
    canvas = document.querySelector("#convertCanvas");

    context = canvas.getContext('2d');

}


function addCam() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                videostream.srcObject = stream;
                canvas.style.width = videostream.width.toString() + "px";
                canvas.style.height = videostream.height.toString() + "px";
            }

            )
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
}
function stopCamera(): void {
    let stream: MediaStream = <MediaStream>videostream.srcObject;
    let tracks = stream.getVideoTracks();

    for (let i = 0; i < tracks.length; i++) {

        tracks[0].stop();
    }

    videostream.srcObject = null;
}
function takeCardSC(): void {
    if (image.src == '') {
        context.drawImage(videostream, 0, 0, canvas.width, canvas.height)
        let url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse');
        

    }
    else {
        image.removeAttribute("src");
        context.drawImage(videostream, 0, 0, canvas.width, canvas.height)
        let url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse');
        
    }
}
