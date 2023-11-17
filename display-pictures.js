const imageContainer = document.getElementById('imageContainer');
// const imageFolder = 'pictures/'; // Path to your pictures folder
const imageFolder = '/photography-db/pictures/'; // Path to your pictures folder

const imageModal = document.getElementById('imageModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');

function loadImages() {

    console.log('Image Folder:', imageFolder);





    
    fetchImageFiles(imageFolder)
        .then(imageFiles => {

            // Inside the forEach loop
imageFiles.forEach(imageFile => {
    const imageUrl = imageFolder + imageFile;
    console.log('Image URL:', imageUrl);

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageContainer.appendChild(imageElement);
});












            
            // Sort the picture files in reverse numeric order
            imageFiles.sort((a, b) => {
                const numA = parseInt(a.match(/\d+/)[0]);
                const numB = parseInt(b.match(/\d+/)[0]);
                return numB - numA;
            });

            imageFiles.forEach(imageFile => {
                const imageElement = document.createElement('img');
                imageElement.src = imageFolder + imageFile;
                imageContainer.appendChild(imageElement);

            });
        })
        .catch(error => {
            console.error('Error fetching image files:', error);
        });
}

async function fetchImageFiles(folderPath) {
    try {
        const response = await fetch(folderPath);
        const text = await response.text();
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(text, 'text/html');

        const links = htmlDoc.querySelectorAll('a');
        const imageFiles = Array.from(links)
            .filter(link => link.href.match(/\.(jpg|jpeg|png|gif|bmp)$/i))
            .map(link => link.href.split('/').pop());

        return imageFiles;
    } catch (error) {
        throw error;
    }

    // try {
    //     // const response = await fetch(`https://api.github.com/repos/DenisBuserski/photography-db/contents/${folderPath}`);
    //     const response = await fetch(folderPath);
    //     const data = await response.json();

    //     const imageFiles = data
    //         .filter(item => item.type === 'file' && item.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i))
    //         .map(item => item.download_url);

    //     return imageFiles;
    // } catch (error) {
    //     throw error;
    // }

    
}

window.addEventListener('load', loadImages);

