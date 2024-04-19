// Selecting elements from the DOM
const containerDiv = document.querySelector('.container');
const userValue = document.querySelector('.user-number');
const userSubmit = document.querySelector('.user-submit');
const promptText = document.querySelector('.prompt');
const copyInput = document.querySelector('.copy-input');
const clearButton = document.querySelector('.clear-button');

// Event listeners
userValue.addEventListener('focus', entryHint);
userValue.addEventListener('keyup', duplicateGrid);
userSubmit.addEventListener('click', makeGrid);
clearButton.addEventListener('click', clearGrid);

// Run makeGrid and draw functions on page load to make default 10x10 grid that is drawable
makeGrid();
draw();

// Indicates to user it's a square grid Y x Y
function duplicateGrid() {
    let userGrid = userValue.value;
    copyInput.textContent = "x " + userGrid;
    copyInput.style.marginRight = "12px";
}

// Save space and clutter on page with appear/disappearing user instructions for grid size
function entryHint() {
    promptText.textContent = "Enter a number between 2 and 99."; 
}

// Makes nested divs that are organized into a grid using CSS flexbox. 
// Invalid entries get warning, default grid is 10x10, else it is user a defined resolution.
function makeGrid() {
    let number = parseInt(userValue.value);
    if (isNaN(number) || number < 2 || number > 99) {
        promptText.textContent = "Make sure it's a number from 2 to 99!";
        number = 10; // Set default grid size if user input doesn't meet conditions
    } else {
        promptText.textContent = "";
    }
    
    copyInput.textContent = "";
    userValue.value = "";
    containerDiv.innerHTML = "";

    // Creating rows and columns
    Array.from({ length: number }).forEach(() => {
        let row = document.createElement('div');
        row.classList.add('row');
        containerDiv.appendChild(row);

        Array.from({ length: number }).forEach(() => {
            let column = document.createElement('div');
            column.classList.add('column');
            row.appendChild(column);
        });
    });
    
    // Call draw function here to allow drawing after new grid is made
    draw();
}

// Adds event listener to all divs with class "column"
// Added in global scope to allow drawing on page load
// 'this' refers to the element triggering the mouseover event listener
function draw() {
    document.querySelectorAll(".column").forEach(column => {
        column.addEventListener("mouseover", changeColor);
    });
}

// Changes color of the column based on selected radio button
function changeColor() {
    const radios = document.querySelectorAll('.pen');
    let color = '';

    radios.forEach(radio => {
        if (radio.checked) {
            switch (radio.id) {
                case 'black-pen':
                    color = '#2e2b2b';
                    break;
                case 'red-pen':
                    color = '#da2d2d';
                    break;
                case 'blue-pen':
                    color = '#3f33dd';
                    break;
                case 'eraser':
                    color = '';
                    break;
                case 'rainbow':
                    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
                    break;
            }
        }
    });

    this.style.backgroundColor = color;
}

// Eraser function loops through all column divs and sets background to "" in DOM
function clearGrid() {
    // Reset background color of columns
    document.querySelectorAll(".column").forEach(column => {
        column.style.backgroundColor = '';
    });

    // Uncheck all radio buttons
    document.querySelectorAll('.pen').forEach(radio => {
        radio.checked = false;
    });
}
