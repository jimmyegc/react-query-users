import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const getUsers = ({ queryKey }) => {
  const [_key, page] = queryKey   
  return fetch(`https://reqres.in/api/users?page=${page}`)
    .then((res) => res.json())      
}

const Users = () => {
  const [page, setPage] = useState(1)
  const [userId, setUserId] = useState(null)

  const query = useQuery({
    queryKey: ['users', page],
    queryFn: getUsers
  })  

  const userQuery = useQuery({
    queryKey: ['user', "userId"], 
    queryFn: async () => { 
      const response = await fetch(`https://reqres.in/api/users/${userId}`)
      return response.json()    
    },
      enabled: userId !== null
  })

  //console.log('Status: ', query.status)
  //console.log('Fetch status: ', query.fetchStatus)

  if(query.isLoading) {
    return <div>Cargando...</div>
  }

  if(query.isError) {
    return (<div>{query.error instanceof Error ? query.error.message : 'Error'}</div>)
  }

  return (
    <div>
      <ul>{query.data.data.map(user =>(
        <li key={user.id}
          onClick={() => setUserId(user.id)}
        >
          <img src={user.avatar} />
          {user.email}
        </li>        
      ))}</ul>
      <div>
        <p>Página: {page}</p>
        <button disabled={ page===1 } onClick={() => setPage((p)=> p-1)}>Anterior</button>
        <button disabled={ page===query.data.total_pages } onClick={() => setPage((p)=> p+1)}>Siguiente</button>
      </div>
    </div>)
}

export default Users 