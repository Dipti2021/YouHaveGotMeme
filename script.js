window.addEventListener('DOMContentLoaded', () => {
  const upperTextInput = document.getElementById('upper');
  const bottomTextInput = document.getElementById('bottom-text');
  const upperTextSizeInput = document.getElementById('upper-size-input');
  const bottomTextSizeInput = document.getElementById('bottom-text-size-input');
  const imageInput = document.getElementById('image-input');
  const generateBtn = document.getElementById('generate-btn');
  upperTextInput.value = 'Header';
  bottomTextInput.value = 'Footer';
  generateBtn.addEventListener('click', () => {
      const reader = new FileReader();
      reader.readAsDataURL(imageInput.files[0])
      reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            generateMeme(img, upperTextInput.value, bottomTextInput.value, upperTextSizeInput.value, bottomTextSizeInput.value);
          };
      };
  });
  
});

function generateMeme(img, upperText, bottomText, upperTextSize, bottomTextSize) {
    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');

    //setting the dimensions
    canvas.width = img.width;
    canvas.height = img.height;
    //clearing the rectangular part by removing pixels
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //drawing the image by context, x, and y coordinates
    ctx.drawImage(img, 0, 0); 

    let fontSize = canvas.width * upperTextSize; 
    ctx.font = `${fontSize}px Impact`;
    ctx.lineWidth = fontSize / 20; 
    upperText.split('\n').forEach((t, i) => {
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width); 
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width); 
  });
   // Bottom text font size
   fontSize = canvas.width * bottomTextSize;
   ctx.font = `${fontSize}px Impact`;
   ctx.lineWidth = fontSize / 20;
 
   // Draw bottom text
   ctx.textBaseline = 'bottom';
   bottomText.split('\n').reverse().forEach((t, i) => { 
     ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
     ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
   });
} 

