import React from 'react';
import axios from "axios"

function findAll(){
    return axios
            .get("http://localhost:8000/api/posts")
            .then(response =>response.data["hydra:member"])
        }

function findbyId(id){
    return axios
                .get("http://localhost:8000/api/posts/" + id)
                .then(response => response.data);
}

     
 
export default{
    findAll,
    findbyId,
};