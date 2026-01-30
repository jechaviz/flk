export interface BookingWidgetProps {
    link: string;
    theme?: "light" | "dark";
    onBookingComplete?: () => void;
    className?: string;
    user?: {
        name?: string;
        email?: string;
    };
    mode?: "inline" | "popup";
    children?: React.ReactNode;
}
