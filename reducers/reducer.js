const initstate = {
    data: [],
    loading: true
}

export const reducer = (state = initstate, action) => {
    let nextState

    switch (action.type) {
        case "ADD-DATA":
            nextState = {
                ...state,
                data: action.payload
            }
            return nextState
        case "SET-LOAD":
            nextState = {
                ...state,
                loading: action.payload
            }
            return nextState
        default:
            return state

    }

}

