'use client'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Provider } from 'react-redux';
import { store } from "@/stores/index";
import ProviderI18n from '@/services/i18n/ProviderI18n';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ProviderI18n>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="light">
                    <Provider store={store}> {children}</Provider>
                </NextThemesProvider>
            </NextUIProvider>
        </ProviderI18n>
    )
}

export default Providers
