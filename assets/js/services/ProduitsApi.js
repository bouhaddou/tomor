import React from 'react';
import axios from "axios"

function findAll(){
    return axios
            .get("http://localhost:8000/api/produits")
            .then(response =>response.data["hydra:member"])
        }

function findbyId(id){
    return axios
                .get("http://localhost:8000/api/produits/" + id)
                .then(response => response.data);
}


function deleteProduits(id)
{
    return axios
                .delete("http://localhost:8000/api/produits/" + id)
                .then(response => console.log(response))
}     
 
export default{
    findAll,
    findbyId,
    deleteProduits
};