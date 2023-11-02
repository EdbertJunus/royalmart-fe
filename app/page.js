"use client";
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSalesList } from "./_redux/slices/salesSlice";
import { wrap } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const salesList = useSelector((state) => state.sales.data);

  useEffect(() => {
    dispatch(getSalesList());
  }, []);
  return (
    <main>
      <Box w="100%" p={10} h={"100vh"}>
        <Flex>
          <Heading>Master Stock</Heading>
          <Spacer />
          <Profile />
        </Flex>
        <Flex justifyContent={"space-around"} flexDirection={"column"} py={5}>
          <Flex flexDirection={{ base: "column", md: "row" }} gap={6} mb={5}>
            <StockUpload />
            <SalesUpload salesList={salesList} />
          </Flex>
          <MasterForm salesList={salesList} />
        </Flex>
      </Box>
    </main>
  );
}
