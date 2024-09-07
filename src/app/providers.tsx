'use client'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from 'react-redux';
import {store} from "@/stores/index";

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
               <Provider store={store}> {children}</Provider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}

export default Providers
