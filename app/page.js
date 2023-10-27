import {
  Box,
  Card,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import Profile from "./_components/Profile";
import StockUpload from "./_sections/StockUpload";
import SalesUpload from "./_sections/SalesUpload";
import FileUpload from "./_components/FileUpload";
import MasterForm from "./_sections/MasterForm";

export default function Home() {
  return (
    <main>
      <Box w="100%" p={10} h={"100vh"}>
        <Flex>
          <Heading>Master Stock</Heading>
          <Spacer />
          <Profile />
        </Flex>
        <Flex
          justifyContent={"space-around"}
          flexDirection={{ base: "column", "2xl": "row" }}
        >
          <Flex flexDirection={{ base: "column", md: "row" }} gap={8}>
            <StockUpload />
            <SalesUpload />
          </Flex>
          <MasterForm />
        </Flex>
      </Box>
    </main>
  );
}
