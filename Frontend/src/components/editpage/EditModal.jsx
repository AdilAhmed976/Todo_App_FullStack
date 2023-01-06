import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    HStack,
    Radio,
    RadioGroup,
    useToast,
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { getLocalData } from '../../utils/localStorage'
import axios from 'axios'
import { FaRegEdit } from 'react-icons/fa'
import { BiMessageEdit } from "react-icons/bi";

export const EditModal = ({id,getTodo,headProp,todoProp}) => {
  //  export  function InitialFocus(e) {
        const { isOpen, onOpen, onClose } = useDisclosure()
      
        const initialRef = React.useRef(null)
        const finalRef = React.useRef(null)

        const [todo,SetTodo] = useState(todoProp || "")
        const [heading,setHeading] = useState(headProp || "")
        const [status,setStatus] = useState("false")
        const [tokenof,setTokenof] = useState(getLocalData("token"))
        const toast = useToast()

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
        console.log(response)
        if (response.data.msg=="success")
        toast({
          position: 'top',
          marginTop: '150px',
          description: response.data.msg,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // navigate("/todo")
        onClose(true)
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
          <>
            <Button 
              bg={"rgb(23,194,46)"}
              border={"1px solid rgb(23,194,46)"}
              _hover={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
              _focus={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
              color="white"
              shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;" 
              leftIcon={<BiMessageEdit/>} 
              onClick={onOpen}
            >
              Edit
            </Button>     
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
              fontFamily="Roboto Mono" 
            >
              <ModalOverlay />
              <ModalContent bg={"rgb(0,30,43)"}  >
                <ModalHeader 
                  color={"white"} 
                  fontFamily="Roboto Mono"  
                >
                  Edit Todo
                </ModalHeader>
                <ModalCloseButton fontWeight={"500"} color={"rgb(0,104,74)"} />
                <ModalBody pb={6} color={"white"} fontFamily="Roboto Mono"  >
                  <FormControl>
                    <FormLabel  >Heading</FormLabel>
                    <Input focusBorderColor='rgb(0,104,74)' ref={initialRef} value={heading} placeholder='Heading' onChange={(e)=> {setHeading(e.target.value)} }  />
                  </FormControl>
      
                  <FormControl mt={4}>
                    <FormLabel >Todo</FormLabel>
                    <Input focusBorderColor='rgb(0,104,74)' _focus={{borderColor:"rgb(0,104,74)"}} value={todo} placeholder='Todo' onChange={(e)=> {SetTodo(e.target.value)} }  />
                  </FormControl>

                  <FormControl mt={4}>
                  <FormLabel as='legend'>Status</FormLabel>
                    <RadioGroup 
                        defaultValue='false'
                        colorScheme={"green"}
                        onClick={(e)=> {setStatus(e.target.value)}} 
                    >
                        <HStack spacing='24px'>
                        <Radio value={"true"}>Completed</Radio>
                        <Radio value={"false"}>Not Completed</Radio>
                        </HStack>
                    </RadioGroup>
                  </FormControl>
                </ModalBody>
      
                <ModalFooter>
                  <Button 
                    bg='rgb(0,104,74)'
                    color="white"
                    mr={3}  
                    _hover={{bg:"rgb(0,104,74)"}} 
                    _focus={{bg:"rgb(0,104,74)"}} 
                    onClick={() =>{
                      addtodo()
                    }} 
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      // }
}
