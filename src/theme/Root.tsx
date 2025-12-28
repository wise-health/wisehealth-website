import React from 'react';
import CookieBanner from '../components/CookieBanner';

// Default implementation, that you can customize
export default function Root({ children }) {
    return (
        <>
            {children}
            <CookieBanner />
        </>
    );
}
