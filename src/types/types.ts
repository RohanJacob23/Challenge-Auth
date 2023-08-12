export interface Profile {
  id: string;
  name: string;
  image: string | null;
  email: string;
  bio: string;
  phone: null | string;
  password: null | string;
  userid: string;
}

export interface UploadResponse {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: [];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}

export interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string | undefined;
}
