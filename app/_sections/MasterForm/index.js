import { getMaster, setMasterStatus } from "@/app/_redux/slices/masterSlice";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const MasterForm = ({ salesList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const dispatch = useDispatch();

  const master = useSelector((state) => state.master);

  useEffect(() => {
    console.log("masuk", master);
    if (master.status == 200) {
      const data = master.data.split("},");
      const newData = [];
      // for (const [key, value] of Object.entries(data.slice(0, 10))) {
      //   let newValue = "";
      //   if (key == 0) {
      //     newValue = value.substring(1);
      //     newValue = newValue + "}";
      //   } else if (key == data.length - 1) {
      //     newValue = value.slice(0, -1);
      //   } else {
      //     newValue = value + "}";
      //   }
      //   try {
      //     console.log("value", newValue);
      //     let object = JSON.parse(newValue);
      //     newData.push(object);
      //   } catch (error) {
      //     console.log("errors Parse", error);
      //   }
      // }
      console.log(JSON.parse(master.data.replace(/\bNaN\b/g, "null")));
      console.log("data abnru", newData);
      dispatch(setMasterStatus(400));
    }
  }, [master]);

  const onSubmit = (data) => {
    if (data.monthSales == false) {
      setError("monthSales", {
        type: "required",
        message: "Minimum choose one month",
      });
    } else {
      const periode = data.monthSales.join(",");
      let formData = new FormData();
      formData.append("periode", periode);

      dispatch(getMaster(formData));

      reset();
    }
  };

  return (
    <Box w={"100%"}>
      <Card>
        <CardHeader pb={0}>
          <Heading size="md">Master Form</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.monthSales}>
              <FormLabel mb={2}>Choose Sales : </FormLabel>

              <Flex flexWrap={"wrap"} gap={3}>
                {salesList.data &&
                  salesList?.data.map((item, idx) => {
                    return (
                      <Checkbox
                        key={idx}
                        {...register("monthSales")}
                        value={item}
                      >
                        {item}
                      </Checkbox>
                    );
                  })}
              </Flex>
              <FormErrorMessage>{errors.monthSales?.message}</FormErrorMessage>
            </FormControl>
            <Box mt={4} textAlign={"right"}>
              <Button type="submit">Create Master</Button>
            </Box>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default MasterForm;
