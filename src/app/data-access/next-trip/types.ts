export interface Routes {
  route_id: string;
  agency_id: number;
  route_label: string;
}

export interface Direction {
  direction_id: number;
  direction_name: string;
}

export interface Stop {
  description: string;
  place_code: string;
}

export interface NextTripDetails {
  stops: StopsInfo[];
  alerts: Alerts[];
  departures: Departures[];
}

export interface Alerts {
  stop_closed: boolean;
  alert_text: string;
}

export interface StopsInfo {
  stop_id: number;
  latitude: number;
  longitude: number;
  description: string;
}

export interface Departures {
  actual: boolean;
  trip_id: string;
  stop_id: number;
  departure_text: string;
  departure_time: number;
  description: string;
  gate: string;
  route_id: string;
  route_short_name: string;
  direction_id: number;
  direction_text: string;
  terminal: string;
  schedule_relationship: string;
}

export interface TripDetails {
  id: string | number;
  description: string;
}
