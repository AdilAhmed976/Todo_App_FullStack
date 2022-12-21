import { Box, Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Radio, RadioGroup, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLocalData } from '../../utils/localStorage'



export const Edit = () => {

  const [todo,SetTodo] = useState("")
  const [heading,setHeading] = useState("")
  const [status,setStatus] = useState("false")
  const [tokenof,setTokenof] = useState(getLocalData("token"))
  const toast = useToast()
  const {id} = useParams()
  const navigate = useNavigate();

const addtodo = () => {
    console.log(id)
    if (todo&&heading&&status) {

      const data = {
        Heading:heading,
        Todo: todo,
        Status:status
      }
      let url = `https://todobackend-asac.onrender.com/todo/edit/${id}`
      const config = {
          headers:{
              "Authorization": `Bearer ${tokenof}`
          }
      };
      console.log(config)
      axios.patch(url,data,config)
      .then((response) => {

        if (response.data.msg=="success")
        toast({
          position: 'top',
          marginTop: '150px',
          description: response.data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate("/todo")
          // console.log(response.data.msg)
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
      display={"flex"} 
      justifyContent={"center"} 
      alignItems={"center"} 
      height={'80vh'} 
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

    </Box>
  )
}
