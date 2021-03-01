import { ChangeEvent } from 'react';
function getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    var ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, 100, 100);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;

}
const imgToLocalSt= (e: ChangeEvent<HTMLInputElement | null>,stateNum:number,rerender:(b:number)=>void)=>{
    var file = e.target.files![0];
        // Basic type checking.
        if (file.type.indexOf('image') < 0) {
            return;
        }
        // Create a file reader
        var fReader = new FileReader();
        // Add complete behavior
        fReader.onload = async function () {
            // Show the uploaded image to banner.
            let imads = new Image()
            imads.onload = () => {
                localStorage.setItem("imgData", getBase64Image(imads));
                console.log('render');
                rerender(stateNum + 1)
            }
            imads.src = fReader.result?.toString()!
            // Save it when data complete.
            // Use your function will ensure the format is png.
            // You can just use as its already a string.
            // localStorage.setItem("imgData", fReader.result!.toString());
        };
        // Read the file to DataURL format.
        fReader.readAsDataURL(file);
}
export  function fetchimage() {
    var dataImage = localStorage.getItem('imgData');
    return dataImage ? dataImage : '/image6.png';
}
export default imgToLocalSt