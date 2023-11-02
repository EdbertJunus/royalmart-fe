"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";

const SalesUpload = ({ salesList }) => {
  return (
    <Box w={{ base: "100%", md: "50%" }}>
      <Card>
        <CardHeader>
          <Heading size="md">Sales</Heading>
          <Flex flexWrap={"wrap"} mt={4} gap={3}>
            {salesList.data &&
              salesList.data.map((item, idx) => {
                return <Badge key={idx}>{item}</Badge>;
              })}
          </Flex>
        </CardHeader>
        <CardBody>
          <form>
            <FormControl isRequired>
              <FormLabel>File Name</FormLabel>
              <Input name="fileName" type="text" />
              <FormErrorMessage>file name</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={5}>
              <FormLabel>Upload File</FormLabel>
              <Input name="uploadSales" type="file" />
              <FormErrorMessage>file name</FormErrorMessage>
            </FormControl>
            <Box textAlign={"right"} mt={8}>
              <Button type="submit">Upload</Button>
            </Box>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SalesUpload;
