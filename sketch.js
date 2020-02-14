
var mode = prompt('1: manual generations\n2 : draw\n3: auto')

function make2DArray(cols, rows){
    let arr = new Array(cols);
    for(let i = 0; i< arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let resolution = 10;
let generation = 0;

function setup(){
    createCanvas(700, 500);

    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);

    for(let i = 0; i < cols ; i++){
        for(let j = 0; j < rows  ;j++){
            if(mode != 2){
                grid[i][j] = floor(random(2))
            }else{
                grid[i][j] = 0
            }
        }
    }
}


function paint(){
    background(255);
    noStroke()
    for(let i = 0; i < cols ; i++){
        for(let j = 0; j < rows  ;j++){
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j] == 1){
                fill(0);
                // stroke(0);
                rect(x, y, resolution-1, resolution-1)
            }else{
                fill(255);
                // stroke(0);
                rect(x, y, resolution-1, resolution-1)
            }
        }
    }

    let next = make2DArray(cols, rows)

    // compute next based on grid
    for(let i = 0; i < cols ; i++){
        for(let j = 0; j < rows; j++){
            
            let state = grid[i][j];

                // count live neighbors
                let neighbors = countNeighbors(grid, i, j);

                

                if(state == 0 && neighbors == 3){
                    next[i][j] = 1;
                }else if(state == 1 && (neighbors < 2 || neighbors > 3)){
                    next[i][j] = 0;
                }else{
                    next[i][j] = state;
                }
            
        }
    }

    grid = next;
    generation++;
    console.log("generation n° : "+ generation)
    document.getElementById('generation').innerText = generation;
}

function countNeighbors(grid, x, y){
    let sum = 0;
    for(let i = -1; i < 2 ; i++){
        for(let j = -1; j < 2 ; j++){
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum += grid[col][row];
        }
    }

    sum -= grid[x][y];
    return sum;
}

var spacePressed = false;

if(mode == 1 ){
    document.addEventListener('keydown', function(e){
            if(e.keyCode == '32'){
                paint()
            }
        })
    
}
else if(mode == 2){
    
    function mouseClicked(){
        var mX = round((mouseX-resolution/2)/resolution);
        var mY = round((mouseY-resolution/2)/resolution); 
        if(grid[mX][mY] == 0){
            grid[mX][mY] = 1;
        }else{
            grid[mX][mY] = 0;
        }
        for(let i = 0; i < cols ; i++){
            for(let j = 0; j < rows  ;j++){
                let x = i * resolution;
                let y = j * resolution;
    
                if(grid[i][j] == 1){
                    fill(0);
                    stroke(0);
                    rect(x, y, resolution-1, resolution-1)
                }else{
                    fill(255);
                    stroke(0);
                    rect(x, y, resolution-1, resolution-1)
                }
            }
        }
    
}
function mouseDragged(){
    var mX = round((mouseX-resolution/2)/resolution);
        var mY = round((mouseY-resolution/2)/resolution); 
        if(grid[mX][mY] == 0){
            grid[mX][mY] = 1;
        }
        for(let i = 0; i < cols ; i++){
            for(let j = 0; j < rows  ;j++){
                let x = i * resolution;
                let y = j * resolution;
    
                if(grid[i][j] == 1){
                    fill(0);
                    stroke(0);
                    rect(x, y, resolution-1, resolution-1)
                }else{
                    fill(255);
                    stroke(0);
                    rect(x, y, resolution-1, resolution-1)
                }
            }
        }
}
document.addEventListener('keydown', function(e){
        if(e.keyCode == '32'){
            paint()
        }
    })

}
else{
    setInterval(paint,1)
}
