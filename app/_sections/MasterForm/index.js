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

const MasterForm = ({ salesList }) => {
  return (
    <Box w={"100%"}>
      <Card>
        <CardHeader pb={0}>
          <Heading size="md">Master Form</Heading>
        </CardHeader>
        <CardBody>
          <Text mb={2}>Choose Sales : </Text>
          <Flex flexWrap={"wrap"} gap={3}>
            {salesList.data &&
              salesList?.data.map((item, idx) => {
                return <Checkbox key={idx}>{item}</Checkbox>;
              })}
          </Flex>

          <Box mt={4} textAlign={"right"}>
            <Button>Create Master</Button>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default MasterForm;
