photos = [
    {photoName:"flamingo.jpg", alt:"Flamings herd"},
    {photoName:"owl.jpg", alt:"Owl face"},
    {photoName:"sparrow.jpg", alt:"Sparrow on the branch"},
    {photoName:"spring-bird.jpg", alt:"Spring bird on the branch"},
    {photoName:"swan.jpg", alt:"Swan in the lake"},
]
let photoIndex = Math.floor(Math.random() * photos.length);

function returnNextOrLeastIndex(array, currentIndex, symbol){
    if (!Array.isArray(array)) throw "function returnIndex: Array parameter isn't array";

    const arrayLength = array.length;
    if (symbol === "+"){
        if (++currentIndex >= arrayLength) return 0;
        else return currentIndex;
    }
    else if (symbol === '-'){
        if (--currentIndex < 0) return arrayLength-1;
        else return currentIndex;
    }
    else throw "function returnIndex: Symbol isn't + or -"
}

function updateGalleryData(gallery, photosArray, currentPhotoIndex){
    // Gallery is div with store <img> tag
    const PHOTOS_DIRECTORY_LOCATION = "birds-photos/";
    const photo = gallery.querySelector('img');

    photo.src = PHOTOS_DIRECTORY_LOCATION + photosArray[currentPhotoIndex].photoName;
    photo.alt = photosArray[currentPhotoIndex].alt ?? "Unknown photo";
}
(() =>{

    const buttons = document.querySelectorAll(".btn");
    const gallery = document.querySelector("#photo-gallery");

    updateGalleryData(gallery, photos, photoIndex);

    buttons.forEach((button) =>{

        if(button.classList.contains("btn-left"))
            button.addEventListener('click', () =>{
                photoIndex = returnNextOrLeastIndex(photos, photoIndex, '-');
                updateGalleryData(gallery, photos, photoIndex);
            });

        if(button.classList.contains("btn-right"))
            button.addEventListener('click', () =>{
                photoIndex = returnNextOrLeastIndex(photos, photoIndex, '+');
                updateGalleryData(gallery, photos, photoIndex);
            });
    });
})()
