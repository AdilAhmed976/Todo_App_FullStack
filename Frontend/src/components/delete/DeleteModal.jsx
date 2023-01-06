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
import { DeleteIcon } from '@chakra-ui/icons'
import { RiChatDeleteLine } from "react-icons/ri";
export const DeleteModal = ({id,getTodo}) => {
  //  export  function InitialFocus(e) {
        const { isOpen, onOpen, onClose } = useDisclosure()
      
        const initialRef = React.useRef(null)
        const finalRef = React.useRef(null)

        const [todo,SetTodo] = useState("")
        const [heading,setHeading] = useState("")
        const [status,setStatus] = useState("false")
        const [tokenof,setTokenof] = useState(getLocalData("token"))
        const toast = useToast()

        const navigate = useNavigate();

const addtodo = () => {
    

      
      let url = `https://todobackend-asac.onrender.com/todo/delete/${id}`
      const config = {
          headers:{
              "Authorization": `Bearer ${tokenof}`
          }
      };
 
      axios.delete(url,config)
      .then((response) => {
        console.log(response)
        if (response.data=="Deleted")
        toast({
          position: 'top',
          marginTop: '150px',
          description: response.data,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // navigate("/todo")
        // onClose(true)
        getTodo()
      })  
      .catch(function (error) {
          console.log(error);
      })
}


        return (
          < >
            <Button fontFamily={"Roboto Mono"}
              bg={"lightred"}
              border={"2px solid white"}
              _hover={{bg:"lightred",color:"red",borderColor:"red"}} 
              _focus={{bg:"lightred",color:"red",borderColor:"red"}} 
              leftIcon={<RiChatDeleteLine/>} 
              onClick={onOpen}
              shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
              color={"white"}
            >
              Delete
            </Button>     
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay color ={"white"} />
              <ModalContent bg={"rgb(0,30,43)"} >
                <ModalHeader color={"white"} >Delete TODO?</ModalHeader>
                <ModalCloseButton color={"white"} />     
                <ModalFooter>
                  <Button 
                   bg={"red"}
                   border={"2px solid red"}
                   _hover={{bg:"lightred",color:"white",borderColor:"black"}} 
                   _focus={{bg:"lightred",color:"white",borderColor:"black"}} 
                   color="white"  
                  mr={3}  
                  onClick={() =>{
                    addtodo()
                    onClose
                    }} >
                    Yes
                  </Button>
                  <Button onClick={onClose}>No</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )
      // }
}
