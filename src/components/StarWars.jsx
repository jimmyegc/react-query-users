
function fetchCharacters({
  pageParam = 'https://swapi.dev/api/people/?page=1'
}) {
  return fetch(pageParam).then((res) => res.json())
}

const StarWars = () => {

  const query = useInfiniteQuery(['users'], fetchCharacters, {
    getNextPageParam: (lastPage, page) => lastPage.next
  })
  return (<>

  
  </>)
}

export default StarWars