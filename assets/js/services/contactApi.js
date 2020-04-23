import React from 'react';
import axios from "axios"

function findAll(){
    return axios
            .get("http://localhost:8000/api/contacts")
            .then(response =>response.data["hydra:member"])
        }
function PostItem(contact){
    return axios
            .post("http://localhost:8000/api/contacts" , contact)
            
        }

function findbyId(id){
    return axios
                .get("http://localhost:8000/api/produits/" + id)
                .then(response => response.data);
}

     
 
export default{
    findAll,
    findbyId,
    PostItem
};