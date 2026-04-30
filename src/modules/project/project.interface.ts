export interface IProject {
  title: string;
  description?: string;
  images?: string[];
  category: string;
  technologies?: string[];
  price?: number;
  duration?: string;
  rating?: number;
  featured?: boolean;
  videoUrl?: string;
  liveUrl?: string;
}
