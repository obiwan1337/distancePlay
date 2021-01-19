document.addEventListener('DOMContentLoaded', init);



    document.addEventListener('DOMContentLoaded', init);
    const { createWorker } = require('tesseract.js');
    const worker = createWorker();



    let video: HTMLVideoElement;
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
        video = document.querySelector("#ownVideoElement");
        image = document.querySelector("#shotOfCard");
        canvas = document.querySelector("#convertCanvas");
        video.addEventListener("click", takeCardSC);
        context = canvas.getContext('2d')

    }
    function recognizeImage() {
        console.log("beginning with whatever it is doing");
        (async () => {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize('image.src');
            console.log(text);
            await worker.terminate();
        })();
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
