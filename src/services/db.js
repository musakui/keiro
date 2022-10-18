import { openDB } from 'idb/with-async-ittr'

/** @type {import('idb').IDBPDatabase<import('./schema').KeiroDB} */
export const db = await openDB('keiro-db', 1, {
	upgrade (db) {
		const places = db.createObjectStore('places', {
			keyPath: 'place_id',
		})
		const nodes = db.createObjectStore('nodes', {
			autoIncrement: true,
		})
		const edges = db.createObjectStore('edges', {
			keyPath: [
				'srcId',
				'dstId',
				'depart',
				'arrive',
			],
		})
		const paths = db.createObjectStore('paths', {
			autoIncrement: true,
		})

		const uniqueFalse = { unique: false }

		places.createIndex('geo', ['lat', 'lng'], uniqueFalse)
		places.createIndex('saved', 'savedName', { unique: true })
		places.createIndex('updated', 'updated', uniqueFalse)

		nodes.createIndex('place', 'place', uniqueFalse)
		nodes.createIndex('updated', 'updated', uniqueFalse)

		edges.createIndex('srcdst', ['srcId', 'dstId'], uniqueFalse)
		edges.createIndex('depart', ['srcId', 'depart'], uniqueFalse)
		edges.createIndex('arrive', ['dstId', 'arrive'], uniqueFalse)
		edges.createIndex('priority', 'priority', uniqueFalse)
		edges.createIndex('updated', 'updated')

		paths.createIndex('priority', 'priority', uniqueFalse)
		paths.createIndex('updated', 'updated', uniqueFalse)
	},
})

/** @param {string} id */
export const getPlace = (id) => db.get('places', id)

/** @param {Partial<import('./schema').Place>} pl */
export const putPlace = (pl) => db.put('places', { ...pl, updated: new Date() })

export const getSavedPlaces = () => db.getAllFromIndex('places', 'saved')

/** @param {string} place */
export const addNode = (place) => db.add('nodes', { place, updated: new Date() })

/** @param {number} id */
export const getNode = (id) => db.get('nodes', id)

/**
 * @param {number} id
 * @param {Partial<Omit<import('./schema').GraphNode, 'place' | 'updated'>>} no
 */
export const putNode = async (id, no) => {
	const n = await getNode(id)
	return await db.put('nodes', { ...n, ...no, updated: new Date() }, id)
}

/** @param {string} [query] */
export const getNodes = (query) => db.getAllFromIndex('nodes', 'place', query)

/**
 * @param {import('./schema').EdgeKey & Partial<import('./schema').GraphEdge>} edge
 */
export const addEdge = (edge) => db.add('edges', { ...edge, updated: new Date() })

/**
 * @param {IDBKeyRange | [number, number] | [number, Date]} [query]
 * @param {keyof import('./schema').KeiroDB['edges']['indexes']} [idx]
 */
export const getEdges = (query, idx = 'srcdst') => db.getAllFromIndex('edges', idx, query)
