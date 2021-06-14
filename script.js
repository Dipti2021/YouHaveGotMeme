
const upperTextInput = document.getElementById('upper');
const lowerTextInput = document.getElementById('lower');
const upperTextSizeInput = document.getElementById('upper-size-input');
const lowerTextSizeInput = document.getElementById('lower-size-input');
const imageInput = document.getElementById('im');
const generateBtn = document.getElementById('generate-btn');
upperTextInput.value = 'write';
lowerTextInput.value = 'here';

// function for the button created
generateBtn.addEventListener('click', () => {
  const reader = new FileReader();  // used the File reader API
  reader.readAsDataURL(imageInput.files[0]) //DataURL for reading the template for the MEME

  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      create(img, upperTextInput.value, lowerTextInput.value, upperTextSizeInput.value, lowerTextSizeInput.value);
    };
  };

});



function create(img, upperText, lowerText, upperTextSize, lowerTextSize) {//created a function for the text and its sized for the image
  const canvas = document.getElementById('memes');// initialization of the canvas
  const twoD_canvas = canvas.getContext('2d');//rendering the 2d image

  //setting the dimensions
  canvas.width = img.width;
  canvas.height = img.height;

  //drawing the image by context, x, and y coordinates
  twoD_canvas.drawImage(img, 0, 0); //
  twoD_canvas.fillStyle = 'white';
  twoD_canvas.textAlign = 'center';

  let fontSize = canvas.width * upperTextSize; //font size will adjust as per the image
  twoD_canvas.font = `${fontSize}px Arial`;
  twoD_canvas.lineWidth = fontSize / 20;

  twoD_canvas.textBaseline = 'upper';//header values
  upperText.split('\n').forEach((t, i) => {
    x = canvas.width / 2;
    y = canvas.width / 13;
    twoD_canvas.fillText(t, x, y, canvas.height - i * fontSize); // text, x, y coordinates
    twoD_canvas.strokeText(t, x,y,  canvas.height - i * fontSize);
  });
  // Bottom text font size
  fontSize = canvas.width * lowerTextSize;
  twoD_canvas.font = `${fontSize}px Arial`;
  twoD_canvas.lineWidth = fontSize / 20;


  // Draw bottom text
  twoD_canvas.textBaseline = 'lower';
   lowerText.split('\n').reverse().forEach((t, i) => {
    twoD_canvas.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    twoD_canvas.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
  });
}

