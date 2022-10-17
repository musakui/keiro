import colors from 'windicss/colors'

export default function colorsPlugin() {
	const vmId = 'virtual:windi-colors'
	const resolvedVMId = '\0' + vmId

	const vf = Object.entries(colors).flatMap(([c, v]) => {
		const base = `export const ${c} = ${JSON.stringify(v)}`
		return (typeof v === 'string') ? [base] : [
			base,
			...Object.entries(v).map(([n, h]) => `export const ${c}${n} = "${h}"`),
		]
	}).join('\n')

	return {
		name: 'windi-colors',
		resolveId: (id) => {
			if (id === vmId) return resolvedVMId
		},
		load: (id) => {
			if (id === resolvedVMId) return vf
		},
	}
}