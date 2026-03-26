export interface Launch {
  id: string;
  name: string;
  net: string;
  status: {
    id: number;
    name: string;
    abbrev: string;
    description: string;
  };
  launch_service_provider: {
    id: number;
    name: string;
    type: string;
  };
  rocket: {
    id: number;
    configuration: {
      id: number;
      name: string;
      full_name: string;
    };
  };
  mission: {
    id: number;
    name: string;
    description: string;
    type: string;
    orbit: { name: string } | null;
  } | null;
  pad: {
    id: number;
    name: string;
    location: {
      id: number;
      name: string;
      country_code: string;
    };
  };
  image: string | null;
  webcast_live: boolean;
  vidURLs: VidURL[];
}

export interface VidURL {
  priority: number;
  source: string;
  title: string;
  description: string | null;
  feature_image: string | null;
  url: string;
}

export interface LaunchesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Launch[];
}
