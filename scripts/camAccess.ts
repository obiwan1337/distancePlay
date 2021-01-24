document.addEventListener('DOMContentLoaded', init);
let videostream: HTMLVideoElement;

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let ocrRes: HTMLDivElement;
let ocrStat: HTMLDivElement;
let constraints = {
    video: {
        cursor: "never",
        width: 640,
    }

}
function init(): void {
    videostream = <HTMLVideoElement>document.querySelector("#ownVideoElement");
    videostream.addEventListener("click", takeCardSC);
    canvas = <HTMLCanvasElement>document.querySelector("#convertCanvas");
    ocrRes = document.querySelector("#ocr_result_p");
    ocrStat = document.querySelector("#ocr_status_p");
    context = <CanvasRenderingContext2D>canvas.getContext('2d');
    addCam();
}

async function recognizeTxt(i: any) {
    
    ocrStat.innerText = "Please wait. Your image is being processed.";
    Tesseract.recognize(
        './TEST/img/lotus.png',// @ts-ignore
        'eng', {
        logger: m => console.log(m)
    }
    ).then(({// @ts-ignore
        data: {
            text
        }
    }) => {
        ocrRes.innerText = text;
    })
    console.log("function end");
    
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

    context.drawImage(videostream, 0, 0, canvas.width, canvas.height)
    let url = canvas.toDataURL('image/png');
    clearout();
    recognizeTxt(url);

}
function clearout() {


}
