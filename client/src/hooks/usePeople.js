import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLoading } from './useLoading/useLoading'
import { API_URL } from '../utils/apiUrl'


export function usePeople() {
    const [person, setPerson] = useState('')
    const { isLoading, setIsLoading, loader } = useLoading(true)
    const { personId } = useParams()
  
    useEffect(() => {
      fetch(`${API_URL}/api/people/${personId}`)
          .then(res => res.json())
          .then(data => setPerson(data))
          .catch(e => console.log(e))
          .finally(() => setIsLoading(false))
      window.scrollTo(0,0)
    }, [personId])

    return { isLoading, loader, person }
}