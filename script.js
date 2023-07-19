const canvas = document.getElementById("canvasID");
const ctx = canvas.getContext("2d");

var cell_size = 5
var canvas_width = canvas.width;
var canvas_height = canvas.height;
var x_array = canvas_width / cell_size;
var y_array = canvas_height / cell_size;
   
var current_board = [...Array(x_array)].map(() => Array(y_array));
var next_board = [...Array(x_array)].map(() => Array(y_array));

start_board();
var update = setInterval(update_board, 150);

// --- Functions ---------------------------------------------------- //

function start_board() {
    for (var x = 0; x < x_array; x++) {
        for (var y = 0; y < y_array; y++) {
            if (Math.floor(Math.random() * 2) == 1) {
                current_board[x][y] = 1;
            } else {
                current_board[x][y] = 0;
            }
            next_board[x][y] = 0;
        }
    }
    draw_cells();
}

function update_board() {
    for (var x = 0; x < x_array; x++) {
        for (var y = 0; y < y_array; y++) {
            var neighbours = count_neighbours(x, y);
            //Apply the rules.
            if (current_board[x][y] == 1) {
                if (neighbours < 2) {
                    //Rule 1.
                    next_board[x][y] = 0;
                } else if (neighbours == 2 || neighbours == 3) {
                    //Rule 2.
                    next_board[x][y] = 1;
                } else {
                    //Rule 3.
                    next_board[x][y] = 0;
                }
            } else {
                if (neighbours == 3) {
                    //Rule 4.
                    next_board[x][y] = 1;
                }
            }
        }
    }
    copy_next_to_corrent();
    draw_cells();
}

function copy_next_to_corrent(){
    //Copy 'next_board' array to 'current_board'.
    //Reset 'next_board'.
    for (var x = 0; x < x_array; x++) {
        for (var y = 0; y < y_array; y++) {
            current_board[x][y] = next_board[x][y];
            next_board[x][y] = 0;
        }
    }
}

function count_neighbours(x, y) {
    var neighbours = 0;
    //Count the living cells around (x,y).
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            //The position itself does not count.
            if (x + dx != x || y + dy != y) {
                //Avoid the edges.
                if (x + dx >= 0 && x + dx < x_array) {
                    if (y + dy >= 0 && y + dy < y_array) {
                        if (current_board[x + dx][y + dy] == 1) {
                            neighbours++;
                        }
                    }
                }
            }
        }
    }   
    return neighbours;
}

function draw_cells() {
    for (var x = 0; x < x_array; x++) {
        for (var y = 0; y < y_array; y++) {
            if (current_board[x][y] == 0) {
                ctx.fillStyle = "black";
                ctx.fillRect(x * cell_size , y * cell_size, cell_size, cell_size);
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(x * cell_size , y * cell_size, cell_size, cell_size);
            }
        }
    }
    draw_grid();
}

function draw_grid() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 0.3;

    for (var x = 0; x < canvas_width; x = x + cell_size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas_height);
        ctx.stroke();
    }

    for (var y = 0; y < canvas_height; y = y + cell_size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas_width, y);
        ctx.stroke();      
    }

}
