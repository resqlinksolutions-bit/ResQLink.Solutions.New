
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  path: string;
  protected?: boolean;
}
