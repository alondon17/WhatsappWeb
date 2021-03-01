const apiLink = 'http://localhost:3003'

export const getFromApi = async (path: string) => {
    const data = await fetch(apiLink + path)
    return await data.json()
}

export const postToApi = async (path: string, body: object) => {
    return fetch(apiLink + path, {
        body: JSON.stringify(body), method: 'post', mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(res=>res.json()).catch(e=>console.log(e.message))

}
export const putAndGetToApi = async (path: string, body: object) => {
    const data=await fetch(apiLink + path, {
        body: JSON.stringify(body), method: 'put', mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    })
    return data.json()

}
export const postAndGetToApi = async (path: string, body: object) => {
    const data = await fetch(apiLink + path, {
        body: JSON.stringify(body), method: 'post', mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    })
    return await data.json()
}