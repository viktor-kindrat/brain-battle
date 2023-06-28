const reducer = (state, action) => {
    switch(action.type) {
        case "changeVariant": {
            let newState = [...state].map((item, index)=>{
                if (index === parseInt(action.id)) {
                    let newVariants = item.variants.map((variant, index)=>{
                        return (index === parseInt(action.index)) ? {...variant, text: action.value} : variant
                    })
                    return {...item, variants: newVariants}
                } else {
                    return item
                }
            })
            return newState
        }
        case "setVariantTrue": {
            let newState = [...state].map((item, index)=>{
                if (index === parseInt(action.id)) {
                    let newVariants = item.variants.map((variant, index)=>{
                        return (index === parseInt(action.index)) ? {...variant, right: true} : {...variant, right: false}
                    })
                    return {...item, variants: newVariants}
                } else {
                    return item
                }
            })
            return newState
        }
        case "deleteVariant": {
            let newState = [...state].map((item, index)=>{
                if (index === parseInt(action.id)) {
                    let newVariants = item.variants.filter((item, index) => {
                        return index !== parseInt(action.index)
                    });
                    return {...item, variants: newVariants}
                } else {
                    return item
                }
            })
            return newState
        }
        case "addVariant": {
            let newState = [...state].map((item, index)=>{
                return (index === parseInt(action.id)) ? {...item, variants: [...item.variants, {text: `Variant ${item.variants.length}`, right: false}]} : item
            })
            console.log(newState)
            return newState
        }
        default: {
            return state
        }
    }
}

export default reducer