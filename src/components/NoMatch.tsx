import React from 'react';
import { useLocation } from 'react-router-dom';

export function NoMatch() {
    let url = useLocation();

    return (
        <div>
            <h3>
                Page not found for <code>{url.pathname}</code>
            </h3>
        </div>
    );
}