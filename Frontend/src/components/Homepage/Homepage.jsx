import { Box, Button, ButtonGroup, CircularProgress, FormControl, FormLabel, HStack, Input, Radio, RadioGroup, Text, useToast } from '@chakra-ui/react'
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
import { GettingTheTodosData, GettingTodaysTodosData } from '../../Redux/AppReducer/action'
import { useRef } from 'react'
import styles from "../../App.css"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'


export const Homepage = () => {
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
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
  const todayData = useSelector((store) => store.AppReducer.todayData);
  const isLoading = useSelector((store) => store.AppReducer.isLoading);
  const [noTask,setNoTask] = useState(false)
console.log("firsttaks",noTask)
  // // checking the screen size so that well set the count of slide according to it
  // const [countOfSlide,setCountOfSlide] = useState(
  //   window.window.innerWidth<=responsive.desktop.breakpoint.max&& window.window.innerWidth>=responsive.desktop.breakpoint.min ? 3  :
  //   window.window.innerWidth<=responsive.tablet.breakpoint.max&& window.window.innerWidth>=responsive.tablet.breakpoint.min ? 2 
  //   :1
  //   )

  const [load,setLoad] = useState(false)
  const navigate = useNavigate();
  const carouselRef = useRef(null)
  let [count,setcount]=useState(0)
  
const getTodo = () => {
  setcount(count+1)
  dispatch(GettingTodaysTodosData(tokenof))
}
    
useEffect(() => {
  
  if (data.length===0) {
    dispatch(GettingTheTodosData(tokenof)) 
  }
  
  dispatch(GettingTodaysTodosData(tokenof))
  .then((res) => {
    
    if (res.payload.length===0) {
      setNoTask(true)
    }
    else {
      setNoTask(false)
    }
  })
  
}, [count])

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
    <Box bg={"rgb(0,104,74)"} p={{ base: "10px", sm: "20px", md: "30px", lg: "40px", xl: "40px",'2xl': '40px'}} >
      <Box 
        display={"flex"} 
        justifyContent={"center"} 
        alignItems={"center"} 
        borderRadius={"50px"}  
        boxShadow = {"rgba(0, 0, 0, 0.35) 0px 5px 15px"} 
        // height={'60vh'} 
        py="40px"
        // py={{ base: "10px", sm: "20px", md: "30px", lg: "40px", xl: "40px",'2xl': '40px'}}
        w={{ base: "90%", sm: "80%", md: "60%", lg: "50%", xl: "50%",'2xl': '40%'}}
        margin={"auto"}
        // py="40px"
        bg={"rgb(0,30,43)"}
        color={"white"} fontFamily="Roboto Mono"
      >
      <FormControl 
        width={"80%"} 
        display={"flex"} 
        flexDirection={"column"} 
        gap={"10px"} 
      >
        <FormLabel>Heading</FormLabel>
        <Input 
        focusBorderColor='rgb(0,104,74)'
          placeholder='Heading'
          value={heading} 
          onChange={(e)=> {setHeading(e.target.value)} } 
        />
        <FormLabel>Todo</FormLabel>
        <Input 
        focusBorderColor='rgb(0,104,74)'
          placeholder='Todo'
          value={todo} 
          onChange={(e)=> {SetTodo(e.target.value)} } 
        />
        <FormLabel as='legend'>Status</FormLabel>
          <RadioGroup colorScheme={"green"}
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
          bg={"rgb(23,194,46)"}
          border={"1px solid rgb(23,194,46)"}
          _hover={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
          _focus={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
          color="white"
          shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
          onClick={() =>{addtodo()}} > Add Today's Task </Button>
        </FormControl  >
      </Box>

<Box textAlign={"center"} padding={"20px"} color="white" fontFamily="Roboto Mono" fontSize={"26px"} fontWeight={"600"} >
  <Text>
  Today's Tasks
  </Text>
</Box>
      {/* <Box> */}
      { isLoading ? <Box 
                      display={"flex"} 
                      justifyContent="center" 
                      alignItems={"center"}
                      alignSelf="center"
                      minHeight={"200px"} 
                    > 
                      <CircularProgress isIndeterminate color='rgb(0,30,43)' /> 
                    </Box> :
                    noTask ? 
                    <Box 
                      display={"flex"} 
                      justifyContent="center" 
                      alignItems={"center"}
                      alignSelf="center"
                    >
                      <Box 
                      width={{ base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%",'2xl': '50%'}}
                        // minWidth={"50%"}
                        minHeight={"100px"}
                        border={'0.5px solid lightgray'} 
                        px={"40px"} py={"40px"} 
                        fontFamily="Roboto Mono" 
                        boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"} 
                        borderRadius={"20px"} 
                        bg={"rgb(0,30,43)"} 
                        color={"white"}
                        fontWeight="500"
                        m={"10px"} 
                        textAlign="center"
                      > 
                      <Text>No Task's Added for today, Start Adding your today's Task now!</Text>
                       </Box>
                      
                    </Box>
                    :
                  
                  <Box>
                <Carousel ref={carouselRef}
                  responsive={responsive} 
                  showDots={true} 
                  // renderDotsOutside={true}
                  swipeable={true} 
                  arrows={true}
                  centerMode={false}
                  dotListClass={{backgroundColor:"red"}}
                  border={"1px solid black"}
                >
                  {!!todayData && todayData?.map((e) => {
                    return <Box key={e._id} 
                    border={'0.5px solid lightgray'} 
                    px={"40px"} py={"40px"} fontFamily="Roboto Mono" 
                    boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"} 
                    borderRadius={"20px"} bg={"rgb(0,30,43)"} 
                    color={"white"}
                    fontWeight="500"
                    m={"10px"}
                    className='scrollOf'
                  >
                      <Box display={"flex"} flexDirection={"column"} gap={"20px"} >
                          <Box> {`Heading : ${e.Heading}`}</Box>
                          <Box> {`Todo : ${e.Todo}`}</Box>
                          <Box> {`Status : ${e.Status?"Completed" : "Not Completed"}`}</Box>
                          <Box> {`Date : ${e.DateOf}`}</Box>
                      </Box>
                      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py="10px" >
                        <EditModal id={e._id} getTodo={getTodo} />
                        <DeleteModal id={e._id} getTodo={getTodo} />
                      </Box>
                  </Box>
                  })}
                  </Carousel>
                  
                  </Box>
                  }
                  </Box>)
}
