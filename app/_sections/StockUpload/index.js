import {
  checkStock,
  postStock,
  setStockStatus,
} from "@/app/_redux/slices/stockSlice";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

const StockUpload = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();
  const dispatch = useDispatch();
  const [stockData, stockStatus] = useSelector(
    (state) => [state.stock.data, state.stock.status],
    shallowEqual
  );

  const toast = useToast();
  const toastStockReff = useRef();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    if (data.stockFile[0].type != "application/vnd.ms-excel") {
      setError("stockFile", {
        type: "filetype",
        message: "File needs to be excel (.xls)",
      });
    } else {
      let formData = new FormData();
      formData.append("stockFile", data.stockFile[0]);
      dispatch(postStock(formData));
      reset();

      toastStockReff.current = toast({
        title: "Loading",
        description: "Data sedang diproses",
        status: "loading",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(checkStock());
  }, []);

  useEffect(() => {
    console.log("stock status kepanggil: ", stockStatus);
    let dataToast = {};
    if (stockStatus == 200) {
      dataToast = {
        title: "Success",
        description: "Data berhasil diupload",
        status: "success",
        duration: 8000,
        isClosable: true,
      };
    } else if (stockStatus == 404) {
      dataToast = {
        title: "Fail",
        description: "Data gagal diupload, coba upload kembali",
        status: "error",
        duration: 8000,
        isClosable: true,
      };
    }

    if (stockStatus == 200 || stockStatus == 404) {
      dispatch(setStockStatus(400));
      toast.update(toastStockReff.current, dataToast);
    }
  }, [stockStatus]);

  return (
    <Box w={{ base: "100%", md: "50%" }}>
      <Card>
        <CardHeader pb={0}>
          <Heading size="md">Stock</Heading>

          <Text mt={1} color={stockData === "exist" ? "orange" : "red"}>
            {stockData === "exist" ? "Stock Uploaded" : "Stock Empty"}
          </Text>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={errors.stockFile}>
              <FormLabel>StockFile</FormLabel>
              <Input
                name="stockFile"
                type="file"
                {...register("stockFile", {
                  required: "Need to upload stock file",
                })}
              />
              <FormErrorMessage>{errors?.stockFile?.message}</FormErrorMessage>
            </FormControl>
            <Box textAlign={"right"} mt={8}>
              <Button type="submit" isLoading={loading}>
                Upload
              </Button>
            </Box>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default StockUpload;
