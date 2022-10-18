const API_URL = 'https://maps.googleapis.com/maps/api/js'
const CALLBACK_FN = 'initMaps'

/**
 * @param {string} key Google Maps API Key
 * @param {object} [opts] [URL Params](https://developers.google.com/maps/documentation/javascript/url-params)
 * @param {string} [opts.v] release channel
 * @param {string} [opts.region] region code
 * @param {string} [opts.language] map language
 * @param {string} [opts.libraries] included libraries
 * @returns {Promise<google.maps>}
 */
export const init = (key, opts) => new Promise((resolve, reject) => {
	if (window.google) resolve(window.google.maps)

	const qs = new URLSearchParams({ key, ...opts, callback: CALLBACK_FN })
	const el = document.createElement('script')
	el.defer = true
	el.async = true
	el.onerror = reject
	el.src = `${API_URL}?${qs}`

	window[CALLBACK_FN] = () => resolve(window.google.maps)
	document.head.append(el)
})