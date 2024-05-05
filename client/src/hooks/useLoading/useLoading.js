import React, {useState} from 'react'
import loadingStyles from "./useLoading.module.css"

function useLoading(value = false){
    const [isLoading, setIsLoading]  = useState(value)
    const loader = <div className={loadingStyles.loader}></div>

    return {isLoading, setIsLoading, loader}
}

export {useLoading}