import { Box, Button, Checkbox, CircularProgress, Flex, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getLocalData } from '../../utils/localStorage';
import {FaRegEdit} from "react-icons/fa"
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon } from '@chakra-ui/icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { EditModal } from '../editpage/EditModal';
import { DeleteModal } from '../delete/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { GettingFilteredTodosData, GettingTheTodosData } from '../../Redux/AppReducer/action'
import dayjs from 'dayjs';



export const AllTodo = () => {

    const [tokenof,setTokenof] = useState(getLocalData("token"));
    const [data,setData] = useState([]);
    const toast = useToast();
    const [searchParams,setSearchParams] = useSearchParams();
    const initialPageParams = searchParams.get("page") || 1;

 console.log("initialPageParams",initialPageParams)
    const perPage = 6;
    const [page,setPage] = useState(initialPageParams? initialPageParams : 1);
    const totalPages = Math.ceil(useSelector((store) => store.AppReducer.filteredData.length) / perPage);

    const todoData =useSelector((store) => store.AppReducer.todoData);

    const isLoading =useSelector((store) => store.AppReducer.isLoading);
    
    const end = page * perPage
    const start = end - perPage
    const heightOf= window.window.innerHeight-120
    
    
    const isAuth = useSelector((store) => store.AuthReducer.isAuth);
    const  noOfButtons = new Array(totalPages).fill(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values,setValues] = useState( noOfButtons.map((el,i) => i+1))
    const [isEmpty,setIsEmpty] = useState(false)

const getAllTodo = (page) => {
    setData([])
    let url = `https://todobackend-asac.onrender.com/todo?page=${initialPageParams}&limit=6`
    const config = {
        headers:{
            "Authorization": `Bearer ${tokenof}`
        }
    };

    axios.get(url , config)
    .then((response) => {
        if(response.data.length==0) {
            setIsEmpty(true)
            setData([
                {
                    DateOf: "No Date Beacause of data",
                    Heading: "No Data Available Please Add tasks",
                    Status: false,
                    Todo: "No Data",
                    userId: "",
                    __v: 0,
                    _id: "1"
                }
            ])
        }
        else {
            setIsEmpty(false)
            setData(response.data)
        }
        
    })  
    .catch(function (error) {

    })
}




        
useEffect(() => {
    
    if (isAuth && todoData.length===0) {
        dispatch(GettingTheTodosData(tokenof))  
    }
    getAllTodo()
    
}, [initialPageParams])

  return ( <Box bg={"rgb(0,104,74)"} >

    <Box minHeight={heightOf}  >
        {data.length>0 ? 
        <Box  
            display={"grid"}  
            gap={"20px"} padding={'20px'}  
            gridTemplateColumns={{ base: "repeat(1,1fr)", sm: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(2,1fr)", xl: "repeat(3,1fr)",'2xl': 'repeat(3,1fr)'}}
        >
        {data?.map((e,i) => {
            return <Box key={e._id} 
                        border={'0.5px solid lightgray'} 
                        px={"40px"} 
                        py={"40px"} 
                        fontFamily="Roboto Mono" 
                        shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
                        borderRadius={"20px"} 
                        bg={"rgb(0,30,43)"} 
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
                        <Box display={ isEmpty ? "none" :"flex"} justifyContent={"space-between"} alignItems={"center"} py="10px" >
                        <EditModal id={e._id} headProp={e.Heading} todoProp={e.Todo} getTodo={getAllTodo} />
                        
                        <DeleteModal id={e._id} getTodo={getAllTodo} />
                        </Box>
                    </Box>
    })}
    </Box>
    :
    <Box 
        display="flex" 
        justifyContent={"center"} 
        alignItems={'center'} 
        minHeight={"600px"} 
    > 
        <CircularProgress isIndeterminate color='rgb(0,30,43)' /> 
        </Box> 
    }
    </Box>

    <Box 
        display={ isEmpty ? "none" :"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        py={"20px"} 
    >
        <Button 
            disabled={page == 1 || data.length==0 ? true : false}
            border={"1px solid black"}
            value={page-1}
            onClick={(e) => {
                if(page===1) {
                    return
                }
                else {
                    setPage(prev=>prev-1)
                    // console.log("first",page,"BRK",e.target.value)
                    setSearchParams({page: +page-1})
                }
            }}
        >
            <ChevronLeftIcon/>
        </Button>

        <Box bg="green" px="16px" py={"8px"} mx="16px" borderRadius={"50px"} color="white" border={"2px solid white"} >
            {page}
        </Box>

        <Button
            value={page+1}
            disabled={page == totalPages || data.length==0 ?  true : false}
            border={"1px solid black"}
            onClick={(e) => {
                // console.log(totalPages)
                if(page===totalPages) {
                    return
                }
                else {
                    setPage(prev=>prev+1)
                    setSearchParams({page: +page+1})
                }
            }}
        >
            <ChevronRightIcon/>
        </Button>
    </Box>
  </Box>
  )
}

