const cols = 10;
const rows = 20;
const grid = [];
const cellSize = 30;
let currentPiece;
let holdPiece = null;
let nextPiece;
let score = 0;
let speed = 5; // Starting frame rate speed
const speedIncreaseInterval = 1000; // Increase speed every 1000 points (adjust as needed)
const colors = ['#88cccc', '#cccc88', '#aa88cc', '#88cc88', '#cc8888', '#ccaa88', '#8888cc']; // Reduced saturation, brighter colors
const lightColors = ['#bbdddd', '#ddddbb', '#cbaadd', '#aaddaa', '#ddaaaa', '#ddcbaa', '#aaaadd']; // Lighter colors for falling pieces
const bgColor = '#1a1a1a'; // Dark gray-black background
const borderColors = ['#558888', '#888855', '#774488', '#558855', '#885555', '#886644', '#555588']; // Darker border colors for placed pieces

const tetrominoes = [
    [[1, 1, 1, 1]], // I
    [
        [1, 1],
        [1, 1],
    ], // O
    [
        [0, 1, 0],
        [1, 1, 1],
    ], // T
    [
        [1, 1, 0],
        [0, 1, 1],
    ], // S
    [
        [0, 1, 1],
        [1, 1, 0],
    ], // Z
    [
        [1, 0, 0],
        [1, 1, 1],
    ], // L
    [
        [0, 0, 1],
        [1, 1, 1],
    ], // J
];

const sidePanelWidth = 150; // Additional space for hold/next piece

function setup() {
    createCanvas(cols * cellSize + sidePanelWidth, rows * cellSize);
    for (let row = 0; row < rows; row++) {
        grid[row] = Array(cols).fill(0);
    }
    currentPiece = new Piece();
    nextPiece = new Piece();
    frameRate(speed);
}

function draw() {
    background(bgColor);
    drawGrid();
    currentPiece.show();
    currentPiece.moveDown();
    displayScore();
    displayNextPiece();
    displayHoldPiece();
    displayInstructions();

    if (score >= speedIncreaseInterval) {
        speed += 1;
        frameRate(speed);
    }
}

function drawGrid() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            stroke(grid[row][col] ? borderColors[grid[row][col] - 1] : '#303030');
            strokeWeight(grid[row][col] ? 2 : 1);
            fill(grid[row][col] ? colors[grid[row][col] - 1] : bgColor);
            rect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

function displayScore() {
    fill('#ffffff');
    textSize(16);
    noStroke(); // Remove text border
    text(`Score: ${score}`, cols * cellSize + 10, 20);
}

function displayNextPiece() {
    fill('#ffffff');
    textSize(16);
    noStroke(); // Remove text border
    text("Next:", cols * cellSize + 10, 60);

    if (nextPiece) {
        for (let r = 0; r < nextPiece.shape.length; r++) {
            for (let c = 0; c < nextPiece.shape[r].length; c++) {
                if (nextPiece.shape[r][c]) {
                    fill(lightColors[nextPiece.color - 1]);
                    stroke(colors[nextPiece.color - 1]);
                    strokeWeight(2);
                    rect(
                        cols * cellSize + 10 + c * cellSize,
                        80 + r * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        }
    }
}

function displayHoldPiece() {
    fill('#ffffff');
    textSize(16);
    noStroke(); // Remove text border
    text("Hold:", cols * cellSize + 10, 200);

    if (holdPiece) {
        for (let r = 0; r < holdPiece.shape.length; r++) {
            for (let c = 0; c < holdPiece.shape[r].length; c++) {
                if (holdPiece.shape[r][c]) {
                    fill(colors[holdPiece.color - 1]);
                    stroke(borderColors[holdPiece.color - 1]);
                    strokeWeight(2);
                    rect(
                        cols * cellSize + 10 + c * cellSize,
                        220 + r * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        }
    }
}

function displayInstructions() {
    fill('#ffffff');
    textSize(14);
    noStroke(); // Remove text border
    const instructions = [
        "Instructions:",
        "- Use arrow keys to move",
        "",
        "- Space to drop instantly",
        "",
        "- 'C' to hold piece",
    ];

    let yOffset = 350;
    for (let line of instructions) {
        text(line, cols * cellSize + 10, yOffset, sidePanelWidth - 20, 50);
        yOffset += 20;
    }
}

class Piece {
    constructor() {
        this.shapeIndex = floor(random(tetrominoes.length));
        this.shape = tetrominoes[this.shapeIndex];
        this.color = this.shapeIndex + 1;
        this.row = 0;
        this.col = floor(cols / 2) - floor(this.shape[0].length / 2);
        this.lockEffectFrame = 0; // Tracks lock animation effect
    }

    show() {
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (this.shape[r][c]) {
                    // Outer border (based on piece color)
                    stroke(colors[this.color - 1]);
                    strokeWeight(2);
                    fill(lightColors[this.color - 1]); // Lighter fill for falling piece
                    rect(
                        (this.col + c) * cellSize,
                        (this.row + r) * cellSize,
                        cellSize,
                        cellSize
                    );

                    // Remove unnecessary inner border
                }
            }
        }

        // Show lock effect
        if (this.lockEffectFrame > 0) {
            this.lockEffectFrame--;
            noFill();
            stroke('#ff0000');
            strokeWeight(2);
            for (let r = 0; r < this.shape.length; r++) {
                for (let c = 0; c < this.shape[r].length; c++) {
                    if (this.shape[r][c]) {
                        rect(
                            (this.col + c) * cellSize,
                            (this.row + r) * cellSize,
                            cellSize,
                            cellSize
                        );
                    }
                }
            }
            strokeWeight(1);
        }
    }

    moveDown() {
        if (!this.collides(1, 0)) {
            this.row++;
        } else {
            this.lock();
            currentPiece = nextPiece;
            nextPiece = new Piece();

            if (this.row === 0) {
                resetGame();
            }
        }
    }

    moveLeft() {
        if (!this.collides(0, -1)) {
            this.col--;
        }
    }

    moveRight() {
        if (!this.collides(0, 1)) {
            this.col++;
        }
    }

    rotate() {
        const newShape = [];
        for (let c = 0; c < this.shape[0].length; c++) {
            newShape[c] = [];
            for (let r = this.shape.length - 1; r >= 0; r--) {
                newShape[c].push(this.shape[r][c]);
            }
        }
        const prevShape = this.shape;
        this.shape = newShape;
        if (this.collides(0, 0)) {
            this.shape = prevShape;
        }
    }

    collides(deltaRow, deltaCol) {
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (this.shape[r][c]) {
                    const newRow = this.row + r + deltaRow;
                    const newCol = this.col + c + deltaCol;
                    if (
                        newRow >= rows ||
                        newCol < 0 ||
                        newCol >= cols ||
                        (newRow >= 0 && grid[newRow][newCol])
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    lock() {
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (this.shape[r][c]) {
                    grid[this.row + r][this.col + c] = this.color;
                }
            }
        }
        this.lockEffectFrame = 10; // Trigger lock effect
        this.clearLines();
    }

    clearLines() {
        for (let row = rows - 1; row >= 0; row--) {
            if (grid[row].every((cell) => cell)) {
                grid.splice(row, 1);
                grid.unshift(Array(cols).fill(0));
                score += 10;
                row++;
            }
        }
    }
}

function resetGame() {
    for (let row = 0; row < rows; row++) {
        grid[row].fill(0);
    }
    score = 0;
    currentPiece = new Piece();
    nextPiece = new Piece();
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        currentPiece.moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
        currentPiece.moveRight();
    } else if (keyCode === DOWN_ARROW) {
        currentPiece.moveDown();
    } else if (keyCode === UP_ARROW) {
        currentPiece.rotate();
    } else if (key === ' ') {
        while (!currentPiece.collides(1, 0)) {
            currentPiece.moveDown();
        }
    } else if (key === 'c' || key === 'C') {
        if (!holdPiece) {
            holdPiece = currentPiece;
            currentPiece = nextPiece;
            nextPiece = new Piece();
        } else {
            [currentPiece, holdPiece] = [holdPiece, currentPiece];
        }
    }
}
