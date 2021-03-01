import {  postToApi } from './requestService';
export const sendMessageReq=async({phone,content,groupId}:{phone:string,content:string,groupId:number})=>{
    console.log('message submit');
    
    postToApi('/message',{phone,content,groupId})
}