import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

const MasterForm = () => {
  return (
    <Card mt={10}>
      <CardHeader pb={0}>
        <Heading size="md">Master Form</Heading>
      </CardHeader>
      <CardBody>
        <Text mb={2}>Choose Sales : </Text>
        <Flex flexWrap={"wrap"} gap={3}>
          <Checkbox>December 28</Checkbox>
          <Checkbox>December 28</Checkbox>
          <Checkbox>December 28</Checkbox>
          <Checkbox>December 28</Checkbox>
          <Checkbox>December 28</Checkbox>
          <Checkbox>December 28</Checkbox>
          <Checkbox>December 28</Checkbox>
        </Flex>

        <Box mt={4} textAlign={"right"}>
          <Button>Create Master</Button>
        </Box>
      </CardBody>
    </Card>
  );
};

export default MasterForm;
