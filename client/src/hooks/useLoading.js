import React, {useState} from 'react'

function useLoading(){
    const [isLoading, setIsLoading]  = useState(false)
    const loader = <div className='loader'></div>

    return {isLoading, setIsLoading, loader}
}

export {useLoading}