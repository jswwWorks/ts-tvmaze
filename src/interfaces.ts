
interface IShow {
  id: number,
  name: string,
  summary: string,
  image: string
}

interface IShowDataAPI { //TODO: IShow, this is the data
  id: number,
  name: string,
  summary: string,
  image: {medium: string}
}

interface IShowAPI { //TODO: IScoreAndShow, be more obvious in this
  score: number,
  show: IShowDataAPI
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
export type { IShow, IEpisode, IError, IShowDataAPI, IShowAPI };
