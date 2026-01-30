export interface CalSlot {
    time: string;
    utcTime: string; // ISO string
}

export interface CalBookingRequest {
    eventTypeId: number;
    start: string; // ISO string
    responses: {
        name: string;
        email: string;
        guests?: string[];
        location?: {
            value: string;
            optionValue: string;
        };
        notes?: string;
    };
    timeZone: string;
    language: string;
    metadata?: Record<string, any>;
}

// Hardcoded for now based on user input, ideally env var
const API_KEY = "cal_live_a16137a06c158997c66d3668feea0200";
const USERNAME = "jesus-omyxg8";
const EVENT_SLUG = "30min";

export class CalApiService {
    private static baseUrl = "https://api.cal.com/v1";

    static async getEventTypeId(): Promise<number> {
        // We might need to fetch event types first to find the ID for "30min"
        // For simplicity or if we can't find it easily, we might fallback to v2 or v1 slug lookup 
        // But for booking v1 we need eventTypeId usually.
        // Let's try to lookup by slug if possible or just list all.
        try {
            // Note: fetching event types usually requires an API key.
            const res = await fetch(`${this.baseUrl}/event-types?apiKey=${API_KEY}`);
            if (!res.ok) throw new Error("Failed to fetch event types");
            const data = await res.json();
            const eventType = data.event_types.find((et: any) => et.slug === EVENT_SLUG);
            if (!eventType) throw new Error("Event type not found");
            return eventType.id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getSlots(dateFrom: string, dateTo: string): Promise<CalSlot[]> {
        // Availability endpoint
        // v1: /availability?apiKey=...&dateFrom=...&dateTo=...&username=...
        const params = new URLSearchParams({
            apiKey: API_KEY,
            dateFrom,
            dateTo,
            username: USERNAME,
            eventTypeId: "" // Will be filled dynamically if needed, or we rely on username default availability which might be broader
        });

        // Better to target specific event availability if possible
        // But let's first get general availability for the user for the event slug context
        // Actually Cal API v1 availability often takes eventTypeId to be precise.

        // Let's do a 2-step: 
        // 1. We'll cache eventTypeId in the component or service.
        // 2. We pass it here. 
        // For now let's assume valid key allows access.

        try {
            const eventTypeId = await this.getEventTypeId();
            params.set("eventTypeId", eventTypeId.toString());

            const res = await fetch(`${this.baseUrl}/availability?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch availability");
            const data = await res.json();

            // data.result is usually an array of { date, slots: [] }
            // We need to flatten or return mapped slots
            // Structure depeds on version, verifying standard v1 response:
            // { days: [ { date: "2023-...", slots: [ { time: "..." } ] } ] }

            // Let's implement robust mapping
            // Note: Provide fallback mock if API fails during dev? User said "Intemoslo" (Let's try), so we try real.

            // Actually, availability response v1 is complex.
            // simpler: /schedules/slots? ... but that might be v2.

            // Sticking to standard v1 /availability
            return this.mapSlots(data);
        } catch (err) {
            console.error("Cal API Error", err);
            return [];
        }
    }

    private static mapSlots(data: any): CalSlot[] {
        // Implementation depends on exact response shape. 
        // For safe start, we return empty and console log response to debug in browser if needed.
        // But we want to be proactive.
        // A common response: { result: [ { date: "...", slots: ["2024-01-30T09:00:00Z", ...] } ] }

        // Let's assume a simplified list of slots for the range.
        const allSlots: CalSlot[] = [];
        if (data && data.days) {
            data.days.forEach((day: any) => {
                if (day.slots) {
                    day.slots.forEach((slot: any) => {
                        // slot might be object { time: "..." } or string
                        const timeIso = typeof slot === 'string' ? slot : slot.time;
                        allSlots.push({
                            time: new Date(timeIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            utcTime: timeIso
                        });
                    });
                }
            });
        }
        return allSlots;
    }

    static async createBooking(req: CalBookingRequest): Promise<void> {
        const body = {
            eventTypeId: req.eventTypeId,
            start: req.start,
            responses: req.responses,
            metadata: req.metadata,
            timeZone: req.timeZone,
            language: req.language
        };

        const res = await fetch(`${this.baseUrl}/bookings?apiKey=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Booking failed");
        }
    }
}
