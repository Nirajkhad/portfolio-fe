const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

// General Types
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  sort_order: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// GeneralInfo Types
export interface PortfolioGeneralInfo {
  id: string;
  full_name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  social_links: SocialLink[];
}

// Experience Types
export interface ExperienceBullet {
  id: string;
  experience_id: string;
  content: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string | null;
  employment_type: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  bullets?: ExperienceBullet[];
}

// Project Types
export interface ProjectTechStack {
  id: string;
  project_id: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  github_url: string | null;
  live_url: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  tech_stacks?: ProjectTechStack[];
}

// Skill Types
export interface Skill {
  id: string;
  category: string;
  name: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SkillCategoryResponse {
  [category: string]: Skill[];
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// Post Types
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image: string | null;
  tags: string[] | null;
  status: 'draft' | 'published';
  published_at: string | null;
  read_time: number;
  created_at: string;
  updated_at: string;
}

// API Functions
async function fetchApi<T>(endpoint: string): Promise<T> {
  try {
    console.log(`Fetching from API: ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
      throw new Error('API returned success: false');
    }

    return result.data;
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

export async function fetchPortfolioGeneralInfo(): Promise<PortfolioGeneralInfo> {
  return fetchApi<PortfolioGeneralInfo>('/portfolio');
}

export async function fetchExperiences(): Promise<Experience[]> {
  return fetchApi<Experience[]>('/experiences');
}

export async function fetchExperience(id: string): Promise<Experience> {
  return fetchApi<Experience>(`/experiences/${id}`);
}

export async function fetchProjects(): Promise<Project[]> {
  return fetchApi<Project[]>('/projects');
}

export async function fetchFeaturedProjects(): Promise<Project[]> {
  return fetchApi<Project[]>('/projects/featured');
}

export async function fetchSkills(): Promise<Skill[]> {
  return fetchApi<Skill[]>('/skills');
}

export async function fetchSkillsGrouped(): Promise<SkillCategory[]> {
  const response = await fetchApi<SkillCategoryResponse>('/skills/grouped');
  
  // Convert object with category keys to array of category objects
  return Object.entries(response).map(([category, skills]) => ({
    category,
    skills: Array.isArray(skills) ? skills : [],
  }));
}

export async function fetchPosts(): Promise<Post[]> {
  return fetchApi<Post[]>('/posts');
}

export async function fetchPublishedPosts(): Promise<Post[]> {
  return fetchApi<Post[]>('/posts/published');
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  return fetchApi<Post>(`/posts/${slug}`);
}
