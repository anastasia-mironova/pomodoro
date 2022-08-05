const initialState = {
    workTime: 25,
    breakTime: 5,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BREAK_TIME_CHANGE':
            return {
                ...state,
                breakTime: action.payload,
            };
        case 'WORK_TIME_CHANGE':
            return {
                ...state,
                workTime: action.payload,
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

export default rootReducer;
