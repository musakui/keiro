import { openDB } from 'idb/with-async-ittr'

/** @type {import('idb').IDBPDatabase<import('./schema').KeiroDB} */
export const db = await openDB('keiro-db', 1, {
	upgrade (db) {
		const places = db.createObjectStore('places', {
			keyPath: 'place_id',
		})
		const nodes = db.createObjectStore('nodes', {
			keyPath: 'nodeId',
		})
		const edges = db.createObjectStore('edges', {
			keyPath: ['from', 'to'],
		})
		const paths = db.createObjectStore('paths', {
			keyPath: 'pathId',
		})
		places.createIndex('geo', ['lat', 'lng'], { unique: false })
		places.createIndex('updated', 'updated')
		nodes.createIndex('updated', 'updated')
		edges.createIndex('updated', 'updated')
		paths.createIndex('updated', 'updated')
	},
})

export const getNodes = () => db.getAllFromIndex('nodes', 'updated')

/** @param {string} id */
export const getPlace = (id) => db.get('places', id)

/** @param {Partial<import('./schema').Place>} pl */
export const putPlace = (pl) => db.put('places', { ...pl, updated: new Date() })
