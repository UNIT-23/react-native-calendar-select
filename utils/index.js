export function hexToRgb (hex) {
	return hex
		.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => "#" + r + r + g + g + b + b)
		.substring(1)
		.match(/.{2}/g)
		.map(x => parseInt(x, 16))
		.join()
}

/**
 * Darken any RGB color by factor
 *
 * @export
 * @param {String} color RGB Color
 * @param {Number} factor Factor to darken by
 * @returns RBG Color
 */
export function darkenRgb (color, factor) {
	return color
		.split(",")
		.map(c => Number(c) * (1 - factor))
		.join()
}
