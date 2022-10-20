const DIAMETER_OF_EARTH_KM = 6371 * 2
const DEGREE_TO_RADIANS = Math.PI / 180

/** @param {number} a */
const toRadians = (a) => DEGREE_TO_RADIANS * a

/** @param {number} a */
const haversine = (a) => {
	const hs = Math.sin(a / 2)
	return hs * hs
}

/**
 * @param {number} delay time to wait in ms
 * @returns {Promise<void>}
 */
export const millis = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

/**
 * distance (km) between `a` and `b`
 * @param {google.maps.LatLngLiteral} a point A
 * @param {google.maps.LatLngLiteral} b point B
 */
export const haversineDistance = (a, b) => {
	const hLat = haversine(toRadians(b.lat - a.lat))
	const hLng = haversine(toRadians(b.lng - a.lng))
	const cc = Math.cos(toRadians(b.lat)) * Math.cos(toRadians(a.lat))
	return DIAMETER_OF_EARTH_KM * Math.asin(Math.sqrt(hLat + hLng * cc))
}