import { Box, Button, Checkbox, CircularProgress, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GettingFilteredTodosData, GettingTheTodosData } from '../../Redux/AppReducer/action'
import { getLocalData } from '../../utils/localStorage'
import dayjs from 'dayjs'

export const Filters = () => {

    const [startDate,setStartDate]  = useState("")
    const [endDate,setEndDate]  = useState("")
    const filteredData = useSelector((store) => store.AppReducer.filteredData);
    const isLoading = useSelector((store) => store.AppReducer.isLoading);
    const dispatch = useDispatch();
    const heightOf= window.window.innerHeight-60
console.log(window.window.innerHeight)
    const filter = () => {
    
        let startX = dayjs(startDate).format('DD-MM-YYYY')
        let endDateX = dayjs(endDate).format('DD-MM-YYYY')
    
        const payload = {
            start:startX,
            end:endDateX
        }
        dispatch(GettingFilteredTodosData(payload))
    }


    useEffect(() => {
       
        dispatch(GettingTheTodosData(getLocalData("token")))  
    }, [])

  return (
    <Box 
        display={"flex"} 
        flexDirection={{ base: "column", sm: "column", md: "column", lg: "row", xl: "row",'2xl': 'row'}} 
    >
        <Box 
            width={{ base: "100%", sm: "100%", md: "100%", lg: "20%", xl: "20%",'2xl': '20%'}}
            position={{ base: "none", sm: "none", md: "none", lg: "sticky", xl: "sticky",'2xl': 'sticky'}}
            top={'60px'} 
            zIndex={"999"}
            maxHeight={heightOf} 
            display={"flex"}
            flexDirection={{ base: "column", sm: "column", md: "row", lg: "column", xl: "column",'2xl': 'column'}} 
            justifyContent={"center"}
            alignItems={"center"} 
            gap={"20px"} 
            p={"20px"}
            bg="lightgray"
            color={"black"}
        >
            <Box 
            >
                <Checkbox defaultChecked >Filter By Today Date</Checkbox>
            </Box>

            <Box 
                display={"flex"} 
                justifyContent="center" 
                alignItems={"center"} 
                // border={"1px solid black"} 
            >
                <Text   width={"40%"}  >Start Date</Text>
                <Input onChange={(e)=> { setStartDate(e.target.value)}}  width={"60%"}  type="date"/>
            </Box>

            <Box 
                display={"flex"} 
                justifyContent="center" 
                alignItems={"center"} 
                border={"1px solid black"} 
                >
                <Text width={"40%"}  >End Date</Text>
                <Input onChange={(e)=> { setEndDate(e.target.value)}} width={"60%"}  type="date"/>
            </Box>

            <Box 
                
                display={"flex"} 
                justifyContent="center" 
                alignItems={"center"} 
                // border={"1px solid black"} 
            >
                <Button color={"black"} onClick={filter} px={"80px"} >Search</Button>
            </Box>
        </Box>
 
        <Box width={{ base: "100%", sm: "100%", md: "100%", lg: "80%", xl: "80%",'2xl': '80%'}} >
        { isLoading==false ? 
        <Box  
            display={"grid"}  
            gap={"40px"} padding={'20px'}  
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
    </Box>
    :
    <Box 
        display="flex" 
        justifyContent={"center"} 
        alignItems={'center'} 
        minHeight={"600px"} 
    > 
        <CircularProgress isIndeterminate color='rgb(253,216,53)' /> 
        </Box> 
    }
    </Box>

    </Box>
  )
}
