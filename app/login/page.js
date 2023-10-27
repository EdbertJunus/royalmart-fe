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

export default function Home() {
  const isError = true;

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
              <Input type="text" />
              <FormErrorMessage>Username is required.</FormErrorMessage>
            </FormControl>
            <FormControl mt={5} isInvalid={isError}>
              <FormLabel>Password</FormLabel>
              <PasswordInput />
              <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            <Box textAlign={"right"} mt={8}>
              <Button colorScheme="teal" type="submit">
                Submit
              </Button>
            </Box>
          </CardBody>
        </Card>
      </Center>
    </main>
  );
}
