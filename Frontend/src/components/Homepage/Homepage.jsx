import { Box, Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Radio, RadioGroup, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { getLocalData } from '../../utils/localStorage'
import { AllTodo } from './AllTodo'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from 'react-router-dom'
import { EditModal } from '../editpage/EditModal'
import { DeleteModal } from '../delete/DeleteModal'


export const Homepage = () => {
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const [todo,SetTodo] = useState("")
  const [heading,setHeading] = useState("")
  const [status,setStatus] = useState("false")
  const [tokenof,setTokenof] = useState(getLocalData("token"))
  const toast = useToast()
  const [data,setData] = useState([])


  const navigate = useNavigate();
  
const getTodo = () => {

  let url = `http://localhost:8080/todo`
  const config = {
      headers:{
          "Authorization": `Bearer ${tokenof}`
      }
  };

      axios.get(url , config)
  .then((response) => {
    console.log(response.data)
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
  console.log("HOOKS",data)

const addtodo = () => {

    if (todo&&heading&&status) {

      const data = {
        Heading:heading,
        Todo: todo,
        Status:status
      }
      let url = `http://localhost:8080/todo/create`
      const config = {
          headers:{
              "Authorization": `Bearer ${tokenof}`
          }
      };
      
      axios.post(url ,data,config)
      .then((response) => {
        if (response.data=="Todo Created Successfully")
        toast({
          position: 'top',
          marginTop: '150px',
          description: response.data,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        getTodo()
      })  
      .catch(function (error) {
          console.log(error);
      })
    }
    else {
      toast({
        position: 'top',
        marginTop: '150px',
        description: "Please fill all the inputs",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
// return
}
  
  return (
    <Box 
      // // display={"flex"} 
      // justifyContent={"center"} 
      // alignItems={"center"} 
      // height={'80vh'} 
    >
      <Box 
        display={"flex"} 
        justifyContent={"center"} 
        alignItems={"center"} 
        borderRadius={"50px"}  
        boxShadow = {"rgba(0, 0, 0, 0.35) 0px 5px 15px"} 
        height={'60vh'} 
        w={{ base: "90%", sm: "80%", md: "60%", lg: "50%", xl: "50%",'2xl': '50%'}}
        margin={"auto"} 
      >
      <FormControl 
        width={"80%"} 
        display={"flex"} 
        flexDirection={"column"} 
        gap={"10px"} 
      >
        <FormLabel>Heading</FormLabel>
        <Input 
          placeholder='Heading' 
          onChange={(e)=> {setHeading(e.target.value)} } 
        />
        <FormLabel>Todo</FormLabel>
        <Input 
          placeholder='Todo' 
          onChange={(e)=> {SetTodo(e.target.value)} } 
        />
        <FormLabel as='legend'>Status</FormLabel>
          <RadioGroup 
            defaultValue='false' 
            onClick={(e)=> {setStatus(e.target.value)}} 
          >
            <HStack spacing='24px'>
              <Radio value={"true"}>Completed</Radio>
              <Radio value={"false"}>Not Completed</Radio>
            </HStack>
          </RadioGroup>

        <Input 
          type={"submit"} 
          color={'white'} 
          bg={"rgb(48,112,240)"} 
          _hover={{
                bg: 'rgb(2,18,39)',
                color: 'white'
              }} onClick={() =>{addtodo()}} />
        </FormControl  >
      </Box>

      {/* <Box> */}
        <Carousel responsive={responsive} 
  showDots={true} swipeable={true} arrows={true}

  >
    {!!data && data?.map((e) => {
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
        <EditModal id={e._id} getTodo={getTodo} />
        <DeleteModal id={e._id} getTodo={getTodo} />
      </Box>
  </Box>
    })}
        </Carousel>;
      </Box>
  )
}