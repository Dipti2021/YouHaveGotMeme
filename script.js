
  const upperTextInput = document.getElementById('upper');
  const bottomTextInput = document.getElementById('bottom-text');
  const upperTextSizeInput = document.getElementById('upper-size-input');
  const bottomTextSizeInput = document.getElementById('bottom-text-size-input');
  const imageInput = document.getElementById('im');
  const generateBtn = document.getElementById('generate-btn');
  upperTextInput.value = 'required';
  bottomTextInput.value = 'required';

  // function for the button created
  generateBtn.addEventListener('click', () => {
      const reader = new FileReader();  // used the File reader API
      reader.readAsDataURL(imageInput.files[0]) //DataURL for reading the template for the MEME
      
      reader.onload = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            create(img, upperTextInput.value, bottomTextInput.value, upperTextSizeInput.value, bottomTextSizeInput.value);
          };
      };

  });
  


function create(img, upperText, bottomText, upperTextSize, bottomTextSize) {//created a function for the text and its sized for the image
    const canvas = document.getElementById('memes');// initialization of the canvas
    const twoD_canvas = canvas.getContext('2d');//rendering the 2d image

    //setting the dimensions
    canvas.width = img.width;
    canvas.height = img.height;
    //clearing the rectangular part by removing pixels
    //twoD_canvas.clearRect(0, 0, canvas.width, canvas.height);
    //drawing the image by context, x, and y coordinates
    twoD_canvas.drawImage(img,0,0); //how to use the x and y coordinates??
    twoD_canvas.fillStyle = 'Blue';
    twoD_canvas.textAlign = 'center';

    let fontSize = canvas.width * upperTextSize; //font size will adjust as per the image
    twoD_canvas.font = `${fontSize}px Impact`;
    twoD_canvas.lineWidth = fontSize / 10; 
    twoD_canvas.textBaseline = 'upper';//header values
    upperText.split('\n').forEach((t,i) => {
    twoD_canvas.fillText(t, canvas.width / 2, i * fontSize, canvas.width); // text, x, y coordinates
    twoD_canvas.strokeText(t, canvas.width / 2, i * fontSize, canvas.width); 
  });
   // Bottom text font size
   fontSize = canvas.width * bottomTextSize;
   twoD_canvas.font = `${fontSize}px Impact`;
   twoD_canvas.lineWidth = fontSize / 20;
 
   // Draw bottom text
   twoD_canvas.textBaseline = 'bottom';
   bottomText.split('\n').reverse().forEach((t, i) => { 
    twoD_canvas.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    twoD_canvas.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
   });
} 

