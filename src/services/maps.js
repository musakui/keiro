import { init } from './googleMapsScript.js'

let placeService =/** @type {google.maps.places.PlacesService} */(null)
let autocomplete =/** @type {google.maps.places.AutocompleteService} */(null)

export const maps = await init(import.meta.env.VITE_GMAPS_API_KEY, {
	v: 'weekly',
	region: 'JP',
	libraries: 'places',
	language: window.navigator?.language ?? 'ja',
})

/** somewhere in Tokyo */
export const base = { lat: 35.69, lng: 139.75 }

/** Japan */
export const bounds = new maps.LatLngBounds(...[
	[30.1, 128.4],
	[45.8, 146.5],
].map(([lat, lng]) => ({ lat, lng })))

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