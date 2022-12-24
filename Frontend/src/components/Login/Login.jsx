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
import { Link, useNavigate } from "react-router-dom";
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
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Log in to your Account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
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
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={isLoading ? isLoading : false}
              >
                Log in
              </Button>
              <Text>
                Don't have an Account ? <Link to="/signup"> Sign-up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
