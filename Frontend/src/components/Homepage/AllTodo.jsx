import { Box, Button, useToast } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getLocalData } from '../../utils/localStorage';
import {FaRegEdit} from "react-icons/fa"
import { DeleteIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { EditModal } from '../editpage/EditModal';
import { DeleteModal } from '../delete/DeleteModal';


export const AllTodo = () => {

    const toast = useToast()
    const [tokenof,setTokenof] = useState(getLocalData("token"))
    const [data,setData] = useState([])
    const [noOfpage,setPage] = useState("")

    const navigate = useNavigate();
    
const getTodo = (page) => {

    let url = `https://todobackend-asac.onrender.com/todo?page=${page}&limit=6`
    const config = {
        headers:{
            "Authorization": `Bearer ${tokenof}`
        }
    };

        axios.get(url , config)
    .then((response) => {
        setData(response.data)
        // console.log(response.headers.content-length)
    })  
    .catch(function (error) {
        // console.log(error);
    })
}
        
useEffect(() => {
    
    getTodo()
    
}, [])
    

  return (
    <Box>
        <Box  
            border={'1px solid red'} 
            display={"grid"}  
            gap={"40px"} padding={'20px'}  
            gridTemplateColumns={{ base: "repeat(1,1fr)", sm: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(2,1fr)", xl: "repeat(3,1fr)",'2xl': 'repeat(3,1fr)'}}
            >
            {data?.map((e,i) => {
                return <Box key={e._id} 
                            border={'0.5px solid lightgray'} 
                            px={"40px"} py={"40px"} fontFamily="Roboto Mono" 
                            boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"} 
                            borderRadius={"20px"} bg={"rgb(244,248,254)"} 
                        >
                            <Box display={"flex"} flexDirection={"column"} gap={"20px"} >
                                <Box> {`Heading : ${e.Heading}`}</Box>
                                <Box> {`Todo : ${e.Todo}`}</Box>
                                <Box> {`Status : ${e.Status?"Completed" : "Not Completed"}`}</Box>
                            </Box>
                            <Box border={"1px solid red"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} py="10px" >
                            {/* <Link to={`edit/${e._id}`} >
                                <Button leftIcon={<FaRegEdit/>} >
                                        Edit 
                                </Button>
                            </Link> */}
                            <EditModal id={e._id} getTodo={getTodo} />
                            
                            <DeleteModal id={e._id} getTodo={getTodo} />
                            </Box>
                        </Box>
            })}
        </Box>
        <Box>
            <Box>
                <Button value={1} onClick={(e)=>{getTodo(e.target.value)}} >1</Button>
                <Button value={2} onClick={(e)=>{getTodo(e.target.value)}} >2</Button>
                <Button value={3} onClick={(e)=>{getTodo(e.target.value)}} >3</Button>
                <Button value={4} onClick={(e)=>{getTodo(e.target.value)}} >4</Button>
            </Box> 
        </Box>
    </Box>
  )
}
