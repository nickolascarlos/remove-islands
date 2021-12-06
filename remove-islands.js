// Try it recursively then

let input = [
	[1, 0, 0, 0, 0, 0],
	[0, 1, 0, 1, 1, 1],
	[0, 0, 1, 0, 1, 0],
	[1, 1, 0, 0, 1, 0],
	[1, 0, 1, 1, 0, 0],
	[1, 0, 0, 0, 0, 1]
]

function removeIslands(matrix) {
	let borderConnectedCells = Array() // [x, y]

	let dimensions = {x: matrix[0].length, y: matrix.length}
	
	// Initialize (border cells)
	for (let x = 0; x < dimensions.x; x++) {
		for (let y = 0; y < dimensions.y; y++) {
			if (matrix[y][x] == 1 && ((x == 0 || x == dimensions.x - 1) || (y == 0 || y == dimensions.y - 1)))
					borderConnectedCells.push([x, y])
		}
	}

	if (borderConnectedCells.length === 0) return getArray(dimensions.x, dimensions.y)

	// console.log(borderConnectedCells) // (0, 0); (5, 1); (0, 3); (0, 4); (0, 5); (5, 5)

	while (true) {
		let foundConnected = false // Until it doesn't find any new connected cell
		for (let x = 1; x < dimensions.x - 1; x++) {
			for (let y = 1; y < dimensions.y - 1; y++) {
				// If any horizontal or vertical (not diagonal) neighbour cell is borderConnected,
				// then this cell is also borderConnected

				if (matrix[y][x] == 1) {
					// Check Hor/Vert neigbours for connection
					if ((checkConnection(x-1, y, borderConnectedCells) ||
						checkConnection(x+1, y, borderConnectedCells) ||
						checkConnection(x, y-1, borderConnectedCells) ||
						checkConnection(x, y+1, borderConnectedCells)) && 
						!checkConnection(x, y, borderConnectedCells)) {
							borderConnectedCells.push([x, y])
							foundConnected = true
						}
				}
			}
		}
		
		if (!foundConnected) break
	}
	
	// Now we know the connected 1 cells. Let's create the result array
	let resultArray = getArray(dimensions.x, dimensions.y)
	
	for (let x = 0; x < dimensions.x; x++) {
		for (let y = 0; y < dimensions.y; y++) {
			if (matrix[y][x] == 1 && checkConnection(x, y, borderConnectedCells))
				resultArray[y][x] = 1
		}
	}

	return resultArray
}

function checkConnection(x, y, borderConnectedCells) {
	return borderConnectedCells.some(point => point[0] == x && point[1] == y)
}

function getArray(x, y) {
	// Returns a X x Y array filled with 0's
	return Array.apply(null, Array(y))
	.map(u => 
			Array.apply(null, 
				Array(x).fill(0)))
}