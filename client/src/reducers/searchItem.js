export const searchItemReducer = (state, action) => {
    
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.item]
        
        case 'REMOVE_ITEM':
            return state.filter((item, index) => {
                if (index === action.id){
                    return;
                }
                return item;
            });
        
        default:
            return state;
    }
} 