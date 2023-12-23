"use client";

import DeleteModal from "@/app/_components/DeleteModal";
import { postSales, setSalesStatus } from "@/app/_redux/slices/salesSlice";
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
  Select,
  Tag,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const SalesUpload = ({ salesList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const salesStatus = useSelector((state) => state.sales.status, shallowEqual);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const toastSalesReff = useRef();

  const onSubmit = (data) => {
    if (data.fileSales[0].type != "application/vnd.ms-excel") {
      setError("fileSales", {
        type: "filetype",
        message: "File needs to be excel (.xls)",
      });
    } else {
      const periode = data.month + " " + data.year;
      let formData = new FormData();
      formData.append("periode", periode);
      formData.append("fileSales", data.fileSales[0]);

      dispatch(postSales(formData));
      reset();

      toastSalesReff.current = toast({
        title: "Loading",
        description: "Data Sales sedang diproses",
        status: "loading",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    let dataSalesToast = {};

    if (salesStatus == 200) {
      dataSalesToast = {
        title: "Success",
        description: "Data Sales berhasil diupload",
        status: "success",
        duration: 8000,
        isClosable: true,
        position: "top",
      };
    } else if (salesStatus == 404) {
      dataSalesToast = {
        title: "Fail",
        description: "Data Sales gagal diupload, coba upload kembali",
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top",
      };
    }

    if (salesStatus == 200 || salesStatus == 404) {
      dispatch(setSalesStatus(400));
      toast.update(toastSalesReff.current, dataSalesToast);
    }
  }, [salesStatus]);

  return (
    <Box w={{ base: "100%", md: "50%" }}>
      <Card>
        <CardHeader>
          <Heading size="md">Sales</Heading>
          <Flex justifyContent={"space-between"}>
            <Flex flexWrap={"wrap"} mt={4} gap={3}>
              {salesList.data &&
                salesList.data.map((item, idx) => {
                  return <Tag key={idx}>{item}</Tag>;
                })}
            </Flex>
            {salesList.data?.length > 0 && (
              <Box ml={2}>
                <Button colorScheme="red" variant="outline" onClick={onOpen}>
                  Delete Sales
                </Button>
              </Box>
            )}
          </Flex>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.month}>
              <FormLabel>Month</FormLabel>
              <Select
                id="month"
                placeholder="Select month"
                {...register("month", {
                  required: "Month needs to be fullfilled",
                })}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </Select>
              <FormErrorMessage>{errors.month?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors.year} mt={3}>
              <FormLabel>Year</FormLabel>
              <Input
                id="year"
                type="number"
                {...register("year", {
                  required: "Year needs to be filled",
                  max: { value: 2999, message: "Maximum year is 2999" },
                  min: { value: 2018, message: "Minimum year is 2018" },
                })}
              />
              <FormErrorMessage>{errors.year?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={5} isInvalid={errors.fileSales}>
              <FormLabel>Upload File</FormLabel>
              <Input
                name="uploadSales"
                type="file"
                {...register("fileSales", {
                  required: "Sales file need to be uploaded",
                })}
              />
              <FormErrorMessage>{errors.fileSales?.message}</FormErrorMessage>
            </FormControl>
            <Box textAlign={"right"} mt={8}>
              <Button type="submit">Upload</Button>
            </Box>
          </form>
        </CardBody>
      </Card>
      <DeleteModal isOpen={isOpen} onClose={onClose} salesList={salesList} />
    </Box>
  );
};

export default SalesUpload;
