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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import PasswordInput from "../_components/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Router, useRouter } from "next/navigation";
import { login, setStatus } from "../_redux/slices/authSlice";
import { useForm } from "react-hook-form";

export default function Home() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setStatus("loading"));
    dispatch(login(data));
  };

  const isLoading = authState.status == "loading";

  useEffect(() => {
    console.log("auth state: ", authState);
    if (authState) {
      if (authState.status == 200) push("/");
    }
  }, [authState, push]);

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired isInvalid={errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  type="text"
                  isReadOnly={isLoading}
                  {...register("username", {
                    required: "Username needs to be filled",
                  })}
                />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mt={5} isRequired isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <PasswordInput
                  register={register}
                  error={errors.password}
                  isReadOnly={isLoading}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              {authState?.status == 401 && (
                <Alert status="error" mt={5}>
                  <AlertIcon />
                  No active account found
                </Alert>
              )}
              <Box textAlign={"right"} mt={8}>
                <Button isLoading={isLoading} colorScheme="teal" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </CardBody>
        </Card>
      </Center>
    </main>
  );
}
