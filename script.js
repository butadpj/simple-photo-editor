const uploadLabel = document.getElementById('uploadLabel');
const uploadAgainLabel = document.getElementById('uploadAgainLabel');
const imgFile = document.getElementById('imgFile');
const imgOutput = document.getElementById('imgOutput');

const adjustRanges = document.querySelectorAll('.adjust__range');

let canvasImgName;
let canvasImgSrc;

const getUploadedImg = (e) => {
  canvasImgName = e.target.files[0].name;
  canvasImgSrc = URL.createObjectURL(e.target.files[0]);
  imgOutput.src = canvasImgSrc;
}

const showLabels = () => {
  uploadLabel.style.display = 'none';
  uploadAgainLabel.style.display = 'block';
  imgOutput.style.display = 'block';
}

const enableAdjustRanges = () => {
  adjustRanges.forEach((range) => {
    range.disabled = false;
  })
}

const adjustValue = (valueObject) => {
  imgOutput.style.filter = `
    brightness(${valueObject.brightness}%) 
    contrast(${valueObject.contrast}%) 
    saturate(${valueObject.saturation}%) 
    blur(${valueObject.blur / 10}px)
  `;
}

// ADJUST PROPERTIES
const adjustContainer = document.getElementById('adjustContainer');
const adjustProperties = adjustContainer.querySelectorAll('li');

const initialAdjustValues = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0
}

adjustProperties.forEach(property => {
  const inputRange = property.querySelector('input');
  const output = property.querySelector('#outputValue');

  const manipulateAdjustProperties = (e) => {
    const inputValue = Number(e.target.value);
    const inputName = e.target.name;
    
    const newAdjustValues = {...initialAdjustValues}
    newAdjustValues[inputName] = inputValue;

    output.textContent = inputValue; // Update output value

    adjustValue(newAdjustValues);
  } 

  inputRange.oninput = (e) => manipulateAdjustProperties(e);
});
//

// FILTER PROPERTIES
const filterContainer = document.getElementById('filterContainer');
const filterProperties = filterContainer.querySelectorAll('li');

const filterValues = {
  joy: {
    brightness: 120,
    contrast: 142,
    saturation: 148,
    blur: 0
  },
  summer: {
    brightness: 120,
    contrast: 128,
    saturation: 136,
    blur: 0
  },
  'b&w': {
    brightness: 97,
    contrast: 110,
    saturation: 0,
    blur: 0
  }
  ,
  chill: {
    brightness: 144,
    contrast: 80,
    saturation: 74,
    blur: 0
  }
}

filterProperties.forEach(property => {
  property.addEventListener('click', (e) => {
    let selectedFilter = e.target.id
    adjustValue(filterValues[selectedFilter]);
  })
})
//

imgFile.onchange = (e) => {
  getUploadedImg(e);
  showLabels();
  // updateDownloadLink();
  enableAdjustRanges();
}

// const downloadLink = document.getElementById('downloadLink');
// const downloadImg = document.querySelector('img');

// const updateDownloadLink = () => {
//   downloadImg.download = canvasImgName;
//   downloadLink.href = canvasImgSrc;
//   downloadLink.innerHTML = 'Download Image';
// }
