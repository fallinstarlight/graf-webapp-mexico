// Get references to DOM elements
const greenSection = document.querySelector('.green-section');
const redSection = document.querySelector('.red-section');
const greenColorPicker = document.getElementById('green-color');
const redColorPicker = document.getElementById('red-color');

// Set initial colors from color pickers
let currentGreen = greenColorPicker.value;
let currentRed = redColorPicker.value;

// Function to ensure vibrant colors
function ensureVibrantColor(color) {
    const rgb = color.match(/\w\w/g).map(h => parseInt(h, 16));
    const max = Math.max(...rgb);
    const min = Math.min(...rgb);
    
    // If colors are too similar (grayish), boost the dominant channel
    if (max - min < 100) {
        const index = rgb.indexOf(max);
        rgb[index] = Math.min(255, rgb[index] + 50);
        return `#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`;
    }
    return color;
}

// Update gradient when green color changes
greenColorPicker.addEventListener('input', (e) => {
    currentGreen = ensureVibrantColor(e.target.value);
    greenSection.style.background = `linear-gradient(to right, ${currentGreen}, ${currentGreen})`;
});

// Update gradient when red color changes
redColorPicker.addEventListener('input', (e) => {
    currentRed = ensureVibrantColor(e.target.value);
    redSection.style.background = `linear-gradient(to left, ${currentRed}, ${currentRed})`;
});

// Initialize gradients on page load
window.addEventListener('load', () => {
    currentGreen = ensureVibrantColor(currentGreen);
    currentRed = ensureVibrantColor(currentRed);
    greenSection.style.background = `linear-gradient(to right, ${currentGreen}, ${currentGreen})`;
    redSection.style.background = `linear-gradient(to left, ${currentRed}, ${currentRed})`;
});
