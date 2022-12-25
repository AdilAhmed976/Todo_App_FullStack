import { Box, Button, ButtonGroup, CircularProgress, FormControl, FormLabel, HStack, Input, Radio, RadioGroup, useToast } from '@chakra-ui/react'
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
import { useDispatch, useSelector } from 'react-redux'
import { GettingTheTodosData } from '../../Redux/AppReducer/action'


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
  const [todo,SetTodo] = useState("");
  const [heading,setHeading] = useState("");
  const [status,setStatus] = useState("false");
  const [tokenof,setTokenof] = useState(getLocalData("token"));
  const toast = useToast();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.AppReducer.todoData);
  const isLoading = useSelector((store) => store.AppReducer.isLoading);

  const [load,setLoad] = useState(false)
  const navigate = useNavigate();
  
const getTodo = () => {
dispatch(GettingTheTodosData(tokenof))
}
      
useEffect(() => {
  
  if (data.length===0) {
    getTodo()
  }
  
}, [])


const addtodo = () => {

    if (todo&&heading&&status) {
      setLoad(true)
      const data = {
        Heading:heading,
        Todo: todo,
        Status:status
      }
      let url = `https://todobackend-asac.onrender.com/todo/create`
      const config = {
          headers:{
              "Authorization": `Bearer ${tokenof}`
          }
      };
      
      axios.post(url ,data,config)
      .then((response) => {
        setLoad(false)
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
        SetTodo("")
        setHeading("")
      })  
      .catch(function (error) {
        setLoad(false)
          console.log(error);
          toast({
            position: 'top',
            marginTop: '150px',
            description: error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
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

}
  
  return (
    <Box >
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
          value={heading} 
          onChange={(e)=> {setHeading(e.target.value)} } 
        />
        <FormLabel>Todo</FormLabel>
        <Input 
          placeholder='Todo'
          value={todo} 
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

        <Button 
          // type={"submit"}
          isLoading={load ? load : false} 
          color={'white'} 
          bg={"rgb(48,112,240)"} 
          _hover={{
                bg: 'rgb(2,18,39)',
                color: 'white'
              }} onClick={() =>{addtodo()}} > Submit </Button>
        </FormControl  >
      </Box>

      {/* <Box> */}
      { isLoading ? <Box 
                      display={"flex"} 
                      justifyContent="center" 
                      alignItems={"center"}
                      alignSelf="center"
                      minHeight={"200px"} 
                    > 
                      <CircularProgress isIndeterminate color='rgb(253,216,53)' /> 
                    </Box> 
                  :
                <Carousel 
                  responsive={responsive} 
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
                      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py="10px" >
                        <EditModal id={e._id} getTodo={getTodo} />
                        <DeleteModal id={e._id} getTodo={getTodo} />
                      </Box>
                  </Box>
                  })}
                  </Carousel>}
                  </Box>)
}
