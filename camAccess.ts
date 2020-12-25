
document.addEventListener('DOMContentLoaded', init);
let video: HTMLVideoElement;
let image: HTMLImageElement;
let canvas: HTMLCanvasElement;
let context = canvas.getContext('2d');
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
function stopCamera(): void {
    let stream: MediaStream = <MediaStream>video.srcObject;
    let tracks = stream.getVideoTracks();

    for (let i = 0; i < tracks.length; i++) {

        tracks[0].stop()
    }

    video.srcObject = null;
}
function takeCardSC(): void {
    if (image.src == '') {
        context.drawImage(video, 0, 0, video.width, video.height)
        let url = canvas.toDataURL();
        image.src = url;
    }
    else {
        image.removeAttribute("src");
        context.drawImage(video, 0, 0, video.width, video.height)
        let url = canvas.toDataURL();
        image.src = url;

    }
}