import { reactive, provide, inject } from 'vue'

const state = reactive({
	id: "",
})

function setId(id:string) {
	state.id = id
}

function getId() {
	return state.id
}

const globalSymbol = Symbol('global')

export function provideGlobal() {
	provide(globalSymbol, {
		setId,
		getId,
	})
}

export function useGlobal() {
	const global = inject(globalSymbol)
	if (!global) {
		throw new Error('useGlobal must be used inside a setup function')
	}
	return global
}