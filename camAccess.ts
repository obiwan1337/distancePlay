
document.addEventListener('DOMContentLoaded', init);
import tesseract from 'tesseract.js';
const worker = tesseract.createWorker();
let video: HTMLVideoElement;
let image: HTMLImageElement;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let ownCardList: { id: number, cardPictureLink: string, cardText: string }[] = [];
const recognitionImageInputElement = document.querySelector('#shotOfCard');

const recognitionConfidenceInputElement = document.querySelector('#recognition-confidence-input');
const recognitionProgressElement: HTMLProgressElement = document.querySelector('#recognition-progress');
const recognitionTextElement = document.querySelector('#recognition-text');
const originalImageElement = document.querySelector('#original-image');
const labeledImageElement = document.querySelector('#labeled-image');
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
    context = canvas.getContext('2d')


}
async function recognizeImage() {
    console.log('recognize started.')
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(image.src);
    console.log(text);
    await worker.terminate();
   
}
function addCam() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                video.srcObject = stream;
                canvas.style.width = video.width.toString() + "px";
                canvas.style.height = video.height.toString() + "px";
            }

            )
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
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        let url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse')
        recognizeImage();

    }
    else {
        image.removeAttribute("src");
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        let url = canvas.toDataURL('image/jpeg', 1.0);
        image.src = url;
        console.log('about to call analyse')
        recognizeImage();
    }
}