const imageContainer = document.getElementById('imageContainer');
const imageFolder = 'pictures/'; // Path to your pictures folder
// const imageFolder = 'https://denisbuserski.github.io/photography-db/pictures/'; // Path to your pictures folder

const imageModal = document.getElementById('imageModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');

function loadImages() {
    fetchImageFiles(imageFolder)
        .then(imageFiles => {
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

    
}

window.addEventListener('load', loadImages);

