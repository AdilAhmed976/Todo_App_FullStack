import { Box, Button, CircularProgress, Flex, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLocalData } from '../../utils/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { EditModal } from '../editpage/EditModal'
import { DeleteModal } from '../delete/DeleteModal'
import { GettingTheTodosData } from '../../Redux/AppReducer/action'
import styles from "../../App.css"

export const Pending = () => {

  const toast = useToast()
    const [tokenof,setTokenof] = useState(getLocalData("token"))
    const [data,setData] = useState([])
  
    const perPage = 6;
    const [page,setPage] = useState(1);
    const totalPages = Math.ceil(useSelector((store) => store.AppReducer.todoData.length) / perPage);
    const todoData =useSelector((store) => store.AppReducer.todoData) ;
    const isLoading =useSelector((store) => store.AppReducer.isLoading) ;

    const isAuth = useSelector((store) => store.AuthReducer.isAuth);
    const  noOfButtons = new Array(totalPages).fill(0);
    const dispatch = useDispatch();
    const heightOf= window.window.innerHeight-120

    const navigate = useNavigate();
    
const getTodo = (page) => {

    let url = `https://todobackend-asac.onrender.com/todo`
    const config = {
        headers:{
            "Authorization": `Bearer ${tokenof}`
        }
    };

    axios.get(url , config)
    .then((response) => {
        setData(response.data.filter((el) => el.Status ==false))
    })  
    .catch(function (error) {
        // console.log(error);
    })
}
        
useEffect(() => {
    
    getTodo()
    if (isAuth && todoData.length===0) {
      dispatch(GettingTheTodosData(tokenof))  
  }
    
}, [])

  return (
    <Box bg={"rgb(0,104,74)"} minHeight={heightOf}   >

        { data.length>0 ? <Box  
            display={"grid"}  
            gap={"20px"} padding={'20px'}  
            gridTemplateColumns={{ base: "repeat(1,1fr)", sm: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(2,1fr)", xl: "repeat(3,1fr)",'2xl': 'repeat(4,1fr)'}}
            >
            {data?.map((e,i) => {
                return <Box key={e._id} 
                            border={'0.5px solid lightgray'} 
                            px={"40px"} py={"40px"} fontFamily="Roboto Mono" 
                            boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"} 
                            borderRadius={"20px"} bg={"rgb(0,30,43)"} 
                            color={"white"}
                            fontWeight="500"
                            className='scrollOf'
                        >
                            <Box display={"flex"} flexDirection={"column"} gap={"20px"} >
                                <Box> {`Heading : ${e.Heading}`}</Box>
                                <Box> {`Todo : ${e.Todo}`}</Box>
                                <Box> {`Status : ${e.Status?"Completed" : "Not Completed"}`}</Box>
                                <Box> {`Date : ${e.DateOf}`}</Box>
                            </Box>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py="10px" >
                            {/* <EditModal id={e._id} headProp={e.Heading} todoProp={e.Todo} getTodo={getAllTodo} />
                            
                            <DeleteModal id={e._id} getTodo={getAllTodo} /> */}
                            </Box>
                        </Box>
            })}
        </Box> : <Box display="flex" justifyContent={"center"} alignItems={'center'} minHeight={heightOf}  >  <CircularProgress isIndeterminate color='rgb(0,30,43)' /> </Box> }

        <Box>
            {/* <Box> { noOfButtons?.map((e,i) => {
                 return <Button key={e.id} value={i+1} onClick={(e)=>{getAllTodo(e.target.value)}}>{i+1}</Button>
            })
                }
            </Box>  */}
        </Box>
    </Box>
  )
}
