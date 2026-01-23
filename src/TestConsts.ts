export interface IUser {
  userId: string;
  profilePhoto: string;
  username: string;
  email: string;
  description?: string;
}
export interface IComment {
  commentID: number;
  user: IUser;
  description: string;
}
export interface IPost {
  postId: string;
  user: IUser;
  postImg?: string;
  postTitle?: string;
  postDescription?: string;
  likes: number;
  comments: IComment[];
  postedAt: Date;
}

export interface ICommunity {
  name: string;
  followersCount: number;
  avatarPhoto: string;
}


export const generateMockPost = (index: number, users: IUser[]): IPost => {
  const user = users[index % users.length];
  const timeAgo = [
    60 * 2,
    2 * 60 * 60 * 1000,      // 2 часа
    5 * 60 * 60 * 1000,      // 5 часов
    1 * 24 * 60 * 60 * 1000, // 1 день
    2 * 24 * 60 * 60 * 1000, // 2 дня
    3 * 24 * 60 * 60 * 1000, // 3 дня
    4 * 24 * 60 * 60 * 1000, // 4 дня
    5 * 24 * 60 * 60 * 1000  // 5 дней
  ];
  
  const postTitles = [
    "Sunset over the mountains",
    "New café in town",
    "Morning workout routine",
    "Nutrition tips for beginners",
    "New personal record!",
    "Healthy meal prep Sunday",
    "Just launched my new project!",
    "Weekend hiking adventure",
    "Learning new framework",
    "Coffee and code ☕️"
  ];
  
  const postDescriptions = [
    "Beautiful sunset captured during my hiking trip last weekend.",
    "Tried this amazing new café downtown. Their latte art is incredible!",
    "Started my day with an intense workout session.",
    "Sharing some basic nutrition principles I wish I knew.",
    "Just completed a half marathon with my best time yet!",
    "Spent the afternoon preparing meals for the week.",
    "After months of hard work, I'm excited to announce the launch!",
    "Exploring new trails and enjoying nature.",
    "Diving deep into a new technology stack.",
    "Perfect combination for a productive day."
  ];
  
  const postImages = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    undefined, 
    undefined, 
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  ];

  return {
    postId: `post_${index + 1}`,
    user,
    postImg: postImages[index % postImages.length],
    postTitle: postTitles[index % postTitles.length],
    postDescription: postDescriptions[index % postDescriptions.length],
    likes: Math.floor(Math.random() * 1000) + 100,
    comments: generateMockComments(users, Math.floor(Math.random() * 5)),
    postedAt: new Date(Date.now() - timeAgo[index % timeAgo.length])
  };
};

export const generateMockComments = (users: IUser[], count: number) => {
  const commentTexts = [
    "Great post! Thanks for sharing.",
    "Love this! 🔥",
    "Interesting perspective.",
    "Can you share more details?",
    "This is amazing!",
    "Keep up the good work!",
    "Looking forward to more content.",
    "Very helpful, thank you!",
    "I totally agree with this.",
    "Beautiful work!"
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    commentID: i + 1,
    user: users[Math.floor(Math.random() * users.length)],
    description: commentTexts[Math.floor(Math.random() * commentTexts.length)]
  }));
};

export const generateMockUser = (index: number): IUser => {
  const usernames = [
    "alex_johnson", "maria_garcia", "tom_wilson", "sarah_chen", 
    "mike_roberts", "lisa_parker", "david_kim", "emma_williams",
    "james_brown", "olivia_davis"
  ];
  
  const descriptions = [
    "Digital artist and photographer",
    "Travel enthusiast",
    "Outdoor adventurer",
    "Fitness coach",
    "Marathon runner",
    "Nutritionist",
    "Software developer",
    "UI/UX Designer",
    "Data Scientist",
    "Product Manager"
  ];
  
  return {
    userId: `user_${index + 1}`,
    profilePhoto: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
    username: usernames[index % usernames.length],
    email: `${usernames[index % usernames.length]}@example.com`,
    description: descriptions[index % descriptions.length]
  };
};

export const generateMockCommunity = (index: number): ICommunity => {
  const names = [
    "Frontend Masters", "Backend Engineers", "Mobile Dev Hub",
    "DevOps & Cloud", "Open Source", "AI & Machine Learning",
    "Web3 & Blockchain", "UI/UX Design", "Data Science",
    "Cybersecurity", "Game Development", "AR/VR Enthusiasts"
  ];
  
  const photos = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  ];
  
  return {
    name: names[index % names.length],
    followersCount: Math.floor(Math.random() * 50000) + 10000,
    avatarPhoto: `${photos[index % photos.length]}?w=100&h=100&fit=crop`
  };
};

const USERS = Array.from({length: 7}, (_,i) => generateMockUser(i))

const POSTS = Array.from({length: 10}, (_,i) => generateMockPost(i, USERS))

const COMMUNITIES =  Array.from({length: 5}, (_,i) => generateMockCommunity(i))
 
export {USERS, POSTS, COMMUNITIES}