export const FETCH_MY_POKEMONS = "FETCH_MINE";
export const DELETE_MY_POKE = "DELETE_MY_POKE"
export const FAILED_DELETE = "FAILED_DELETE"

export const mainReducer = (state, {type, payload}) => {
    switch (type) {
        case FETCH_MY_POKEMONS:
            return {...state, mine: payload}
        case DELETE_MY_POKE:
            state.mine.pokex = state.mine.pokex.filter(val => val._id !== payload._id)
            return {...state, mine: state.mine}
        case FAILED_DELETE:
            return {...state, failedDelete: payload}
        default:
            return state
    }
}
