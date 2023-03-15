let input = [
	[1, 0, 0, 0, 0, 0],
	[0, 1, 0, 1, 1, 1],
	[0, 0, 1, 0, 1, 0],
	[1, 1, 0, 0, 1, 0],
	[1, 0, 1, 1, 0, 0],
	[1, 0, 0, 0, 0, 1]
]


function removeIslands(matrix) {
    let [matrix_x, matrix_y] = getMatrixDimensions(matrix)

    // Matrix resultante, inicialmente com 0's
    let resultMatrix = getArray(matrix_x, matrix_y)

    let foundConnected = true
    while (foundConnected) {
        foundConnected = false
        for (let i = 0; i < matrix_x; i++)
            for (let j = 0; j < matrix_y; j++)
                if (matrix[j][i] === 1 && resultMatrix[j][i] !== 1 && isBorderConnected(i, j, resultMatrix)) {
                    resultMatrix[j][i] = 1
                    foundConnected = true
                }
    }

    return resultMatrix
}

function isBorderConnected(x, y, matrix) {
    return isInBorder(x, y, matrix) || isFourConnected(x, y, matrix)
}

function isInBorder(x, y, matrix) {
    let [matrix_x, matrix_y] = getMatrixDimensions(matrix)
    return (x === 0 || x === matrix_x - 1) || (y === 0 || y === matrix_y - 1)
}

function isFourConnected(x, y, matrix) {
    return [matrix[y][x-1], matrix[y][x+1], matrix[y-1][x], matrix[y+1, x]].includes(1)
}

function getArray(x, y) {
	return Array.apply(null, Array(y))
	    .map(u => Array.apply(null, Array(x).fill(0)))
}

function getMatrixDimensions(matrix) {
    return [matrix[0].length, matrix.length]
}

removeIslands(input)
