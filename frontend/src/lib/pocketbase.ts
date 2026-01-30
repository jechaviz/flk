import PocketBase from 'pocketbase';

// Determine URL based on environment or fallback to standard local PB port
const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090";

export const pb = new PocketBase(PB_URL);

// Optional: Type definition for the Lead collection if helpful
export interface LeadRecord {
    id?: string;
    name: string;
    email: string;
    phone?: string; // Optional
    notes?: string;
    source?: string; // e.g., "Cal.com Flow"
    status?: "new" | "contacted" | "booked";
}
