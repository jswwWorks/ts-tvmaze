
interface IShow {
  id: number,
  name: string,
  summary: string,
  image: string
}


interface IEpisode {
  id: number,
  name: string,
  season: string,
  number: string
}



// look into this
export { IShow, IEpisode };
