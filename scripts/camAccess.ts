document.addEventListener('DOMContentLoaded', init);
let videostream: HTMLVideoElement;
let image: HTMLImageElement;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let ocrRes: any;
let ocrStat: any;
let ownCardList: { id: number, cardPictureLink: string, cardText: string }[] = [];
let constraints = {
    video: {
        cursor: "never",
        facingMode:'environment',
        width: 480,
        height: 360,
        frameRate: 30,
    }

}
function init(): void {

    let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("add");
    let remButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("stop");
    addButton.addEventListener("click", addCam);
    remButton.addEventListener("click", stopCamera);
    videostream = <HTMLVideoElement>document.querySelector("#ownVideoElement");
    videostream.addEventListener("click", takeCardSC);
    image = <HTMLImageElement>document.querySelector("#shotOfCard");
    canvas = <HTMLCanvasElement>document.querySelector("#convertCanvas");
    ocrRes = document.getElementById("ocr_results");
    ocrStat = document.getElementById("ocr_status");
    context = <CanvasRenderingContext2D>canvas.getContext('2d');

}

async function recognizeTxt(i: any) {
    console.log("started function");
    Tesseract.recognize(
        i,// @ts-ignore
        'eng', { 
        logger: m => console.log(m)
    }
    ).then(({// @ts-ignore
        data: {
            text
        }
    }) => {
        console.log(text);
    })
    console.log("function end")
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
        let url = canvas.toDataURL('image/png');
        image.src = url;
        recognizeTxt(url); 
    }
    else {
        image.removeAttribute("src");
        context.drawImage(videostream, 0, 0, canvas.width, canvas.height)
        let url = canvas.toDataURL('image/png');
        image.src = url;
        recognizeTxt(url);
    }
}
