import { DBSchema } from 'idb'

export interface Place {
	place_id: string
	lat?: number
	lng?: number
	name: string
	address: string
	viewport: google.maps.LatLngBoundsLiteral
	types: string[]
	updated: Date
}

export interface GraphNode {
	nodeId: string
	name: string
	updated: Date
}

export interface GraphEdge {
	from: string
	to: string
	updated: Date
}

export interface GraphPath {
	pathId: string
	updated: Date
}

export interface KeiroDB extends DBSchema {
	places: {
		key: string
		value: Place
		indexes: {
			geo: [number, number]
			updated: Date
		}
	}

	nodes: {
		key: string
		value: GraphNode
		indexes: {
			updated: Date
		}
	}

	edges: {
		key: [string, string]
		value: GraphEdge
		indexes: {
			updated: Date
		}
	}

	paths: {
		key: string
		value: GraphPath
		indexes: {
			updated: Date
		}
	}
}