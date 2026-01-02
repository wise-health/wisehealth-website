/**
 * MyDr API Service - Future integration placeholder
 * 
 * This file contains TypeScript interfaces for potential future MyDr API integration.
 * Currently, the website uses the MyDr widget for appointment booking.
 * 
 * API Documentation: https://api.mydr.pl/docs/
 * 
 * @note This file is currently unused but kept for future reference.
 * The MyDr widget handles all booking functionality via the PatientsPlugin.
 */

/**
 * Represents a time slot for appointments
 */
export interface TimeSlot {
  id: string;
  doctorId: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  available: boolean;
  visitType: 'in-person' | 'online';
}

/**
 * Parameters for fetching available time slots
 */
export interface AvailableSlotsParams {
  doctorId?: string;
  dateFrom: string; // ISO 8601 format
  dateTo: string; // ISO 8601 format
  visitType?: 'in-person' | 'online';
}

/**
 * Payload for creating a new visit
 */
export interface CreateVisitPayload {
  slotId: string;
  patientData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    pesel?: string;
  };
  notes?: string;
}

/**
 * Represents a visit/appointment
 */
export interface Visit {
  id: string;
  slotId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string;
  doctorId: string;
  patientId: string;
}

/**
 * Configuration for MyDr API client
 */
export interface MyDrApiConfig {
  apiKey: string;
  baseUrl?: string;
}

/**
 * Fetches available appointment slots from MyDr API
 * 
 * @param params - Search parameters for available slots
 * @param config - API configuration
 * @returns Promise with list of available time slots
 * 
 * @example
 * ```typescript
 * const slots = await getAvailableSlots(
 *   { dateFrom: '2025-12-20T00:00:00Z', dateTo: '2025-12-27T23:59:59Z' },
 *   { apiKey: process.env.MYDR_API_KEY }
 * );
 * ```
 */
export async function getAvailableSlots(
  params: AvailableSlotsParams,
  config: MyDrApiConfig
): Promise<TimeSlot[]> {
  const baseUrl = config.baseUrl || 'https://api.mydr.pl';
  
  const queryParams = new URLSearchParams({
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
    ...(params.doctorId && { doctorId: params.doctorId }),
    ...(params.visitType && { visitType: params.visitType }),
  });

  const response = await fetch(`${baseUrl}/api/v1/slots?${queryParams}`, {
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`MyDr API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.slots;
}

/**
 * Creates a new visit in the MyDr system
 * 
 * @param payload - Visit and patient data
 * @param config - API configuration
 * @returns Promise with created visit details
 * 
 * @example
 * ```typescript
 * const visit = await createVisit(
 *   {
 *     slotId: 'slot-123',
 *     patientData: { firstName: 'Jan', lastName: 'Kowalski', email: 'jan@example.com', phone: '+48123456789' }
 *   },
 *   { apiKey: process.env.MYDR_API_KEY }
 * );
 * ```
 */
export async function createVisit(
  payload: CreateVisitPayload,
  config: MyDrApiConfig
): Promise<Visit> {
  const baseUrl = config.baseUrl || 'https://api.mydr.pl';

  const response = await fetch(`${baseUrl}/api/v1/visits`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`MyDr API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.visit;
}
