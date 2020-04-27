import React from 'react';
import axios from "axios"

function findAll(){
    return axios
            .get("http://localhost:8000/api/categories")
            .then(response =>response.data["hydra:member"])
        }

function findbyId(id){
    return axios
                .get("http://localhost:8000/api/categories/" + id)
                .then(response => response.data);
}

function deleteCategorie(id)
{
    return axios
                .delete("http://localhost:8000/api/categories/" + id)
                .then(response => console.log(response))
} 
     
 
export default{
    findAll,
    findbyId,
    deleteCategorie
};