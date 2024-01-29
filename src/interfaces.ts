
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

interface IError {
  cause: string,
  columnNumber?: number,
  fileName?: string,
  lineNumber?: number,
  message: string,
  prototype: {name: string, stack?: string}
}



// look into this
export { IShow, IEpisode, IError };
