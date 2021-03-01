export interface User {
    phone: string,
    name: string,
    about: string
    groups: Group[],
    password?:string
}
export interface Group {
    
    id: number,
    name:string,
    users:User[],
    messages:Message[],
    isChat:boolean

}
export interface Message {
    id: number,
    content: string,
    sender: User,
    groups: Group[],
    sentTime: Date
}
