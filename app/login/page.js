"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  StackDivider,
  Box,
  Stack,
  Text,
  Center,
  Divider,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import PasswordInput from "../_components/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Router, useRouter } from "next/navigation";
import { login, setStatus } from "../_redux/slices/authSlice";

export default function Home() {
  const isError = true;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const { push } = useRouter();

  const handleSubmit = () => {
    dispatch(
      login({
        username: "hardy",
        password: "hardy123",
      })
    );
  };

  useEffect(() => {
    console.log("auth state: ", state);
    if (state && state.status == 200) {
      push("/");
    }
  }, [state, push]);

  return (
    <main>
      <Center w="100%" h={"100vh"} p={4}>
        <Card w="50%">
          <CardHeader>
            <Heading size="lg" textAlign={"center"}>
              Login
            </Heading>
          </CardHeader>
          <CardBody>
            <FormControl isRequired isInvalid={isError}>
              <FormLabel>Username</FormLabel>
              <Input name="username" type="text" />
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            <FormControl mt={5} isInvalid={isError}>
              <FormLabel>Password</FormLabel>
              <PasswordInput />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <Box textAlign={"right"} mt={8}>
              <Button colorScheme="teal" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </CardBody>
        </Card>
      </Center>
    </main>
  );
}
