import { Box, Flex, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLocalData } from '../../utils/localStorage'

export const Completed = () => {

  const toast = useToast()
    const [tokenof,setTokenof] = useState(getLocalData("token"))
    const [data,setData] = useState([])
    const [noOfpage,setPage] = useState("")

    const navigate = useNavigate();
    
const getTodo = (page) => {

    let url = `http://localhost:8080/todo`
    const config = {
        headers:{
            "Authorization": `Bearer ${tokenof}`
        }
    };

    axios.get(url , config)
    .then((response) => {
        setData(response.data)
    })  
    .catch(function (error) {
        // console.log(error);
    })
}
        
useEffect(() => {
    
    getTodo()
    
}, [])

  return (
    <div>
      <Flex border={'5px solid green'} w={'100%'} >
        <Box>
          {data.map((e) => {
            if (e.Status==true) {
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
              {/* <EditModal id={e._id} getTodo={getTodo} />
              
              <DeleteModal id={e._id} getTodo={getTodo} /> */}
              </Box>
          </Box>
            }
          })}
        </Box>
      </Flex>
      {/* <Outlet/> */}
    </div>
  )
}
