"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { BookingWidgetProps } from "./types";

export function BookingWidget({
    link,
    theme = "dark",
    className,
    user,
    onBookingComplete,
    mode = "inline",
    children
}: BookingWidgetProps) {

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", {
                "theme": theme,
                "styles": {
                    "branding": {
                        "brandColor": "#D4AF37"
                    },
                    "body": {
                        "background": "transparent"
                    }
                },
                "hideEventTypeDetails": true,
                "layout": "column_view"
            });

            // Listen for booking success
            cal("on", {
                action: "bookingSuccessful",
                callback: (e: any) => {
                    if (onBookingComplete) onBookingComplete();
                }
            });
        })();
    }, [theme, onBookingComplete]);

    const config = {
        name: user?.name || "",
        email: user?.email || "",
        theme: theme,
        layout: 'column_view' as any
    };

    if (mode === "popup") {
        return (
            <button
                data-cal-link={link}
                data-cal-config={JSON.stringify(config)}
                className={className}
            >
                {children || "Agendar Cita"}
            </button>
        );
    }

    return (
        <div className={className}>
            <Cal
                namespace="consultation"
                calLink={link}
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={config}
            />
        </div>
    );
}
