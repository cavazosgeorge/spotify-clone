import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { auth } from "../lib/mutations";

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const router = useRouter();

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex justify="center" align="center" height="100px">
        hello world
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px">
        Form
      </Flex>
    </Box>
  );
};

export default AuthForm;
