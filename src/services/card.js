import axios from "axios";

const baseUrl="http://localhost:3000";

export const createCard=(info)=> {
    return axios.post(baseUrl+"/bucket",info)
}

export const createBucket=(info)=> {
    return axios.post(baseUrl+"/bucket",info)
}

export const getAllBucket=()=>{
    return axios.get(baseUrl+"/bucket");
}

export const addCardInExistingBucket=(cardData)=>{
    return axios.post(baseUrl+'/cards/',cardData)
}

export const getEmbededBucketList=()=>{
    return axios.get(baseUrl+'/bucket?_embed=cards');
}

export const deleteCard=(cardId)=>{
    return axios.delete(baseUrl+'/cards/'+cardId);
}

export const addToHistory=(details)=> {
    return axios.post(baseUrl+'/history',details);
}

export const getAllHistory=()=>{
    return axios.get(baseUrl+'/history');
}

export const editCard=(cardInfo,cardId)=>{
    return axios.put(baseUrl+"/cards/"+cardId,cardInfo);
}