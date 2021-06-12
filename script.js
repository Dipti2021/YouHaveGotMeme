function generateMeme(img, upperText, bottomText, upperTextSize, bottomTextSize) {
    const canvas = document.getElementById('meme-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0); // 0, 0 are our X and Y coordinates
    // Text style: white with black borders
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    let fontSize = canvas.width * upperTextSize; //Font Size will change based on our input sliders
    ctx.font = `${fontSize}px Impact`; // We'll be using Impact font, which is used by most memes
    ctx.lineWidth = fontSize / 20; // lineWidth will be the outline of our text, and we're setting it to be 20th of our fontSize here.
    
    ctx.textBaseline = 'upper'; // textBaseline property specifies the current text baseline used when drawing text.
    upperText.split('\n').forEach((t, i) => {
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width); // fillText takes 3 arguments: first is our text, second and third arguments are our X and Y coordinates of the point at which to begin drawing the text.
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width); // Arguments are same as fillText but strokeText draws outlines on our text.
  });
   // Bottom text font size
   fontSize = canvas.width * bottomTextSize;
   ctx.font = `${fontSize}px Impact`;
   ctx.lineWidth = fontSize / 20;
 
   // Draw bottom text
   ctx.textBaseline = 'bottom';
   bottomText.split('\n').reverse().forEach((t, i) => { // .reverse() because it's drawing the bottom text from the bottom up
     ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
     ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
   });
} // End of our generateMeme() function

window.addEventListener('DOMContentLoaded', () => {
    const upperTextInput = document.getElementById('upper');
    const bottomTextInput = document.getElementById('bottom-text');
    const upperTextSizeInput = document.getElementById('upper-size-input');
    const bottomTextSizeInput = document.getElementById('bottom-text-size-input');
    const imageInput = document.getElementById('image-input');
    const generateBtn = document.getElementById('generate-btn');
    upperTextInput.value = 'upper';
    bottomTextInput.value = 'Bottom\nValue';
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

