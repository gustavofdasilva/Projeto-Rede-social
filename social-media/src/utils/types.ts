export type UserType = {
    _id: string,
    username: string,
    password: string,
    email:string,
    img: string,
}

export type HomePostType = { // Type do post para home, onde precisa também aparecer o nome e imagem do usuário
    _id: string | undefined,
    userId: string,
    email: string,
    password: string,
    img: string,
    desc: string,
    date: Date,
    username: string,
    userImg: string,
}    


export type PostType = {
    _id: string | undefined,
    userId: string,
    email: string,
    password: string,
    img: string,
    desc: string,
    date: Date,
}

export type FormType = {
    email: string,
    username: string,
    password: string,
}
  