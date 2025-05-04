"use client";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/redux/store";
import { SnackbarProvider } from "notistack";
import InitAuth from "@/components/InitAuth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
        >
          <Provider store={store}>
            <InitAuth />
            {children}
          </Provider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
