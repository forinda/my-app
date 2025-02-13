export interface TeamMemberInterface {
  name: string
  role: string
  image: string
  social?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export const teamMembers: TeamMemberInterface[] = [
  {
    name: 'John Doe',
    role: 'CEO',
    image: '@/assets/team/john-doe.jpg',
  },
  {
    name: 'Jane Doe',
    role: 'CTO',
    image: '@/assets/team/jane-doe.jpg',
  },
  {
    name: 'John Smith',
    role: 'COO',
    image: '@/assets/team/john-smith.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'CFO',
    image: '@/assets/team/jane-smith.jpg',
  },
]
