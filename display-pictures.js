const imageContainer = document.getElementById('imageContainer');
const imageFolder = '/photography-db/pictures/'; // Path to your pictures folder

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
    const apiUrl = `https://api.github.com/repos/denisbuserski/photography-db/contents${folderPath}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch images. Status: ${response.status}`);
    }

    const json = await response.json();

    const imageFiles = json
      .filter(item => item.type === 'file' && item.name.match(/\.(jpg|jpeg|png|gif|bmp)$/i))
      .map(item => item.name);

    return imageFiles;
  } catch (error) {
    throw error;
  }
}

window.addEventListener('load', loadImages);

