import colors from 'windicss/colors'
import { init } from './googleMapsScript.js'

let gmap =/** @type {google.maps.Map} */(null)
let transitLayer =/** @type {google.maps.TransitLayer} */(null)
let placeService =/** @type {google.maps.places.PlacesService} */(null)
let autocomplete =/** @type {google.maps.places.AutocompleteService} */(null)

export const maps = await init(import.meta.env.VITE_GMAPS_API_KEY, {
	v: 'weekly',
	region: 'JP',
	libraries: 'places',
	language: window.navigator?.language ?? 'ja',
})

/**
 * somewhere in Tokyo
 * @type {google.maps.LatLngLiteral}
 */
export const base = { lat: 35.69, lng: 139.75 }

/**
 * Japan
 * @type {google.maps.LatLngBoundsLiteral}
 */
export const bounds = {
	south: 30.1, west: 128.4,
	north: 45.8, east: 146.5,
}

/**
 * [Style Reference](https://developers.google.com/maps/documentation/javascript/style-reference)
 * @param {string} elementType
 * @param {string} featureType
 * @return {google.maps.MapTypeStyle}
 */
const mapStyle = (featureType, elementType, ...stylers) => ({ featureType, elementType, stylers })

const styles = [
	mapStyle('all', 'labels.text.stroke', { color: colors.gray[900] }),
	mapStyle('all', 'labels.text.fill', { color: colors.gray[100] }),
	mapStyle('landscape', 'all', { color: colors.gray[800] }),
	mapStyle('water', 'all', { color: colors.slate[900] }),
	mapStyle('poi', 'geometry', { color: colors.cyan[900] }),
	mapStyle('transit', 'geometry.stroke', { color: colors.green[600] }),
	mapStyle('transit', 'geometry.fill', { color: colors.green[900] }),
	mapStyle('road.highway', 'geometry.stroke', { color: colors.yellow[900] }),
	mapStyle('road.highway', 'geometry.fill', { color: colors.black }),
	mapStyle('road.arterial', 'geometry.stroke', { color: colors.amber[900] }),
	mapStyle('road.arterial', 'geometry.fill', { color: colors.black }),
	mapStyle('road.local', 'geometry', { color: colors.gray[900] }),
	mapStyle('administrative', 'geometry.stroke', { color: colors.sky[900] }),
	mapStyle('administrative', 'geometry.fill', { color: colors.black }),
]

/**
 * @param {HTMLDivElement} el
 */
export const useMap = (el) => {
	if (gmap) {
		el.replaceWith(gmap.getDiv())
		return gmap
	}
	gmap = new maps.Map(el, {
		styles,
		zoom: 12,
		center: base,
		disableDefaultUI: true,
		keyboardShortcuts: false,
		backgroundColor: colors.dark[800],
		restriction: {
			strictBounds: false,
			latLngBounds: bounds,
		},
	})
	return gmap
}

/**
 * @param {google.maps.Map | null} map
 */
export const showTransit = (map) => {
	if (!transitLayer) {
		transitLayer = new maps.TransitLayer()
	}
	transitLayer.setMap(map)
}

/**
 * @param {string} input search input
 */
export const getPlacePredictions = (input) => {
	if (!autocomplete) {
		autocomplete = new maps.places.AutocompleteService()
	}

	return autocomplete.getPlacePredictions({
		input,
		fields: ['place_id', 'name'],
		componentRestrictions: { country: 'jp' },
	})
}

/**
 * @param {string} placeId place ID
 * @param {Partial<google.maps.places.PlaceDetailsRequest>} opts
 * @return {Promise<google.maps.places.PlaceResult>}
 */
export const getPlaceDetails = (placeId, opts) => new Promise((resolve) => {
	if (!placeService) {
		placeService = new maps.places.PlacesService(document.createElement('div'))
	}

	placeService.getDetails({
		placeId, fields: ['place_id'], ...opts,
	}, (r) => resolve(r))
})
