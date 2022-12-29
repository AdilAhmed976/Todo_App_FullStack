import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  useToast,
  Stack,
  Button
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as local from "../../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck } from "../../Redux/AuthReducer/action";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isError = email === "";
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  const isLoading = useSelector((store) => store.AuthReducer.isLoading);

  const navigate = useNavigate();
  const parame = useParams()
console.log("parame",parame)
  const handleSignUp = () => {
    const payload = { email, password };

    dispatch(loginCheck(payload))
      .then(function (response) {

        if (response.payload != undefined && response.type == "LOGIN_SUCCESS") {
          toast({
            position: "top",
            marginTop: "150px",
            description: response.type,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          local.SaveTheToken("token", response.payload);
          navigate("/")
        } else {
          toast({
            position: "top",
            marginTop: "150px",
            description: "Invalid Details",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch(function (error) {
        console.log("ERROR", error);
      });
  };

  return (
    <Flex
      h={"100vh"}
      align={"center"}
      justify={"center"}
      fontFamily={"Roboto Mono"}
      bg={"rgb(0,104,74)"}
    >
      <Stack boxShadow = {"rgba(0, 0, 0, 0.35) 0px 5px 15px"}  bg={"rgb(0,30,43)"} borderRadius={"10px"}  spacing={8} mx={"auto"} maxW={"lg"} py={12} px={8}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} color={"white"} >Log in to your Account</Heading>
          <Text fontSize={"lg"} color={"white"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          bg={"rgb(0,30,43)"}
          boxShadow = {"rgba(0, 0, 0, 0.35) 0px 5px 15px"} 
          rounded={"lg"}
          color="white"
          border={"2px solid rgb(0,104,74)"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                focusBorderColor='rgb(0,104,74)'
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>

              <InputGroup>
                <Input
                  focusBorderColor='rgb(0,104,74)'
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={handleSignUp}
                bg={"rgb(23,194,46)"}
                border={"1px solid rgb(23,194,46)"}
                _hover={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
                _focus={{bg:"rgb(23,194,46)",borderColor:"2px solid white"}} 
                color="white"
                shadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                isLoading={isLoading ? isLoading : false}
              >
                Log in
              </Button>
              <Text>
                Don't have an Account ? <Link to="/signup" style={{textDecoration:"underline",color:"rgb(23,194,46)"}} > Sign-up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
