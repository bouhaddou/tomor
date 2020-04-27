import React from 'react';
import axios from "axios"

function findAll(){
    return axios
            .get("http://localhost:8000/api/annonces")
            .then(response =>response.data["hydra:member"])
        }
function PostItem(post){
    return axios
            .post("http://localhost:8000/api/annonces" , post)
            
        }

function findbyId(id){
    return axios
                .get("http://localhost:8000/api/annonces/" + id)
                .then(response => response.data);
}

function deletePosts(id)
{
    return axios
                .delete("http://localhost:8000/api/annonces/" + id)
                .then(response => console.log(response))
}        
 
export default{
    findAll,
    findbyId,
    PostItem
};