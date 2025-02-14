import image from '@/assets/img/tm-1.png'
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
    image,
  },
  {
    name: 'Jane Doe',
    role: 'CTO',
    image,
  },
  {
    name: 'John Smith',
    role: 'COO',
    image,
  },
  {
    name: 'Jane Smith',
    role: 'CFO',
    image,
  },
]
