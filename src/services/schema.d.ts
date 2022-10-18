import { DBSchema } from 'idb'

export interface Place {
	place_id: string
	lat?: number
	lng?: number
	name: string
	types: string[]
	address: string
	viewport?: google.maps.LatLngBoundsLiteral
	savedName?: string
	description?: string
	updated: Date
}

export interface GraphNode {
	place: string
	dtType?: string
	datetime?: Date
	duration?: number
	updated: Date
}

interface EdgeKey {
	srcId: number
	dstId: number
	depart: Date
	arrive: Date
}

export interface GraphEdge extends EdgeKey {
	mode: string
	description: string
	priority: number
	updated: Date
}

export interface GraphPath {
	items: EdgeKey[]
	priority: number
	updated: Date
}

export interface KeiroDB extends DBSchema {
	places: {
		key: string
		value: Place
		indexes: {
			geo: [number, number]
			saved: string
			updated: Date
		}
	}

	nodes: {
		key: number
		value: GraphNode
		indexes: {
			place: string
			updated: Date
		}
	}

	edges: {
		key: [number, number, Date, Date]
		value: GraphEdge
		indexes: {
			srcdst: [number, number]
			depart: [number, Date]
			arrive: [number, Date]
			priority: number
			updated: Date
		}
	}

	paths: {
		key: number
		value: GraphPath
		indexes: {
			priority: number
			updated: Date
		}
	}
}