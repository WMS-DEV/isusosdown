import * as Sentry from "@sentry/react";
import React from "react";
import {createRoutesFromChildren, matchRoutes, useLocation, useNavigationType} from "react-router-dom";

export function initializeSentry() {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [
            new Sentry.BrowserTracing({
                routingInstrumentation: Sentry.reactRouterV6Instrumentation(
                    React.useEffect,
                    useLocation,
                    useNavigationType,
                    createRoutesFromChildren,
                    matchRoutes
                ),
            }),
            new Sentry.Replay(),
        ],

        tracesSampleRate: 1.0,

        tracePropagationTargets: ["localhost", /^https:\/\/wmsdev\.pl\//],

        replaysSessionSampleRate: 1.0,
        replaysOnErrorSampleRate: 1.0,
    });
}