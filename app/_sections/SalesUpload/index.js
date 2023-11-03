"use client";

import { postSales } from "@/app/_redux/slices/salesSlice";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const SalesUpload = ({ salesList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
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
      const res = dispatch(postSales(formData));

      reset();
    }
  };

  console.log("errors", errors);
  return (
    <Box w={{ base: "100%", md: "50%" }}>
      <Card>
        <CardHeader>
          <Heading size="md">Sales</Heading>
          <Flex flexWrap={"wrap"} mt={4} gap={3}>
            {salesList.data &&
              salesList.data.map((item, idx) => {
                return <Tag key={idx}>{item}</Tag>;
              })}
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
    </Box>
  );
};

export default SalesUpload;
