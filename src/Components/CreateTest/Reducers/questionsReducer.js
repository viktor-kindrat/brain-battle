const reducer = (state, action) => {
    sessionStorage.setItem("questions", JSON.stringify([...state]));
    switch(action.type) {
        case "question/addQuestion": {
            return [...state, {
                text: `Question ${state.length}`,
                variants: [{ text: "Variant 0", right: false }]
            }]
        }
        case "question/change": {
            return [...state].map((question, index)=>(index === parseInt(action.id)) ? {...question, text: action.value} : question)
        }
        case "question/remove": {
            return [...state].filter((item, index)=> index !== parseInt(action.id))
        }
        case "variant/changeVariant": {
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
        case "variant/setVariantTrue": {
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
        case "variant/deleteVariant": {
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
        case "variant/addVariant": {
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