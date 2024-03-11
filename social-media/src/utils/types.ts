export type User = {
    _id: string,
    username: string,
    password: string,
    email:string,
    img: string,
}

export type Post = {
    _id: string | undefined,
    userId: string,
    email: string,
    password: string,
    img: string,
    desc: string,
    date: Date,
}

export type Form = {
    email: string,
    username: string,
    password: string,
}
  