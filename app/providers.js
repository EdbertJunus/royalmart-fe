"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./_redux/store";
import AuthWrapper from "./_components/AuthWrapper";

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <Provider store={store}>
          <AuthWrapper>{children}</AuthWrapper>
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
