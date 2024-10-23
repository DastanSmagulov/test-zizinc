"use client";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../lib/store";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Products catalog app</title>
        <meta name="description" content="Products catalog app with cart" />
      </Head>
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
