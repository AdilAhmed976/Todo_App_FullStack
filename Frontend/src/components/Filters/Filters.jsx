import { Alert, AlertIcon, Box, Button, Checkbox, CircularProgress, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GettingFilteredTodosData, GettingTheTodosData } from '../../Redux/AppReducer/action'
import { getLocalData } from '../../utils/localStorage'
import dayjs from 'dayjs'
import { EditModal } from '../editpage/EditModal'
import { DeleteModal } from '../delete/DeleteModal'
import styles from "../../App.css"

export const Filters = () => {

    const [startDate,setStartDate]  = useState("")
    const [endDate,setEndDate]  = useState("")
    const filteredData = useSelector((store) => store.AppReducer.filteredData);
    const isLoading = useSelector((store) => store.AppReducer.isLoading);
    const dispatch = useDispatch();
    const heightOf= window.window.innerHeight-60
    const toast = useToast();


    const filter = () => {
    
        if (!!startDate==false && !!endDate==false) {
            toast({
                position: 'top',
                marginTop: '150px',
                description: "Please Select Start Date",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        else {
            let startX = dayjs(startDate).format('DD-MM-YYYY')
            let endDateX = dayjs(endDate).format('DD-MM-YYYY')
        
            const payload = {
                start:startX,
                end:endDateX
            }
            dispatch(GettingFilteredTodosData(payload))
        }
    }
const getAllTodo = () => {
    filter()  
}

    useEffect(() => {
       
        dispatch(GettingTheTodosData(getLocalData("token")))  
    }, [])

  return (
    <Box bg={"rgb(0,104,74)"} 
        display={"flex"} 
        flexDirection={{ base: "column", sm: "column", md: "column", lg: "row", xl: "row",'2xl': 'row'}} 
    >
        <Box 
            width={{ base: "100%", sm: "100%", md: "100%", lg: "20%", xl: "20%",'2xl': '20%'}}
            position={{ base: "sticky", sm: "sticky", md: "sticky", lg: "sticky", xl: "sticky",'2xl': 'sticky'}}
            top={{ base: "none", sm: "none", md: "none", lg: "60px", xl: "60px",'2xl': '60px'}}
            zIndex={"99"}
            maxHeight={heightOf} 
            display={"flex"}
            flexDirection={{ base: "column", sm: "column", md: "column", lg: "column", xl: "column",'2xl': 'column'}} 
            justifyContent={"center"}
            alignItems={"center"} 
            gap={"20px"} 
            p={"20px"}
            bg="rgb(0,30,43)"
            color={"white"}
            fontFamily={"Roboto Mono"}
        >
            <Box 
            >
                 <Alert bg={"none"} status='info' fontSize={"12px"} textAlign={"justify"} border={"1px solid white"}
                borderRadius={"20px"}  >
                    <AlertIcon /> 
                    If you want to filter from specific date please select the Start date & End date to get filtered Data!
                </Alert>
            </Box>

            <Box 
                bg={"rgb(0,30,43)"}
                boxShadow = {"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
                border={"2px solid rgb(0,104,74)"}
                borderRadius={"20px"} 
                py={{ base: "20px", sm: "30px", md: "30px", lg: "50px", xl: "60px",'2xl': '60px'}} 
                px={"10px"}
                display={"flex"} 
                flexDirection={{ base: "row", sm: "row", md: "row", lg: "column", xl: "column",'2xl': 'column'}}
                flexWrap={"wrap"} 
                gap={"10px"}
                justifyContent="center" 
                alignItems={"center"}  
            >
                <Box 
                >
                    <Text mb={"6px"} >Start Date</Text>
                    <Input _hover={{cursor:'pointer'}} onChange={(e)=> { setStartDate(e.target.value)}}  type="date"/>
                </Box>

                <Box 
                    >
                    <Text mb={"6px"} >End Date</Text>
                    <Input onChange={(e)=> { setEndDate(e.target.value)}}  type="date"/>
                </Box>

                <Box 
                    display={"flex"} 
                    justifyContent="center" 
                    alignItems={"center"} 
                    width={"80%"}
                    // border={"1px solid black"} 
                >
                    <Button 
                        bg={"rgb(23,194,46)"}
                        border={"1px solid rgb(23,194,46)"}
                        _hover={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
                        _focus={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
                        color="white"
                        shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
                        onClick={filter} 
                        px={"80px"} 
                    >
                        Search
                    </Button>
                </Box>
            </Box>
        </Box>
 
        <Box minHeight={heightOf}  width={{ base: "100%", sm: "100%", md: "100%", lg: "80%", xl: "80%",'2xl': '80%'}} >
        { isLoading==false ? 
        <Box  
            display={"grid"}  
            gap={"20px"} padding={'20px'}  
            gridTemplateColumns={{ base: "repeat(1,1fr)", sm: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(2,1fr)", xl: "repeat(3,1fr)",'2xl': 'repeat(3,1fr)'}}
        >
        {filteredData?.map((e,i) => {
            return <Box key={e._id} 
                        border={'0.5px solid lightgray'} 
                        px={"40px"} 
                        py={"40px"} 
                        fontFamily="Roboto Mono" 
                        boxShadow={"rgba(0, 0, 0, 0.16) 0px 1px 4px;"} 
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
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} py="10px" >
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

    </Box>
  )
}
