import React from 'react';
import axios from "axios"

function findAll(){
    return axios
            .get("http://localhost:8000/api/shops")
            .then(response =>response.data["hydra:member"])
        }

function findbyId(id){
    return axios
                .get("http://localhost:8000/api/clients/"+ id +"/shops")
                .then(response => response.data["hydra:member"]);
}

     
 
export default{
    findAll,
    findbyId,
};