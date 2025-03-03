const defaultImage = 'https://i.pravatar.cc/300';

export default function useAuth() {
  return {
    user: {
      name: 'John Doe',
      email: '',
      image: defaultImage,
    },
  };
}
