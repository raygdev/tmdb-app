import React, {useState} from 'react'
import loadingStyles from "./useLoading.module.css"

function useLoading(){
    const [isLoading, setIsLoading]  = useState(false)
    const loader = <div className={loadingStyles.loader}></div>

    return {isLoading, setIsLoading, loader}
}

export {useLoading}