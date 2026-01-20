import type { IPost, IUser } from "./components/Post";
import type { ICommunity } from "./components/SidebarElement";


export const COMMUNITIES: ICommunity[] = [
  {
    name: "Frontend Masters",
    followersCount: 54210,
    avatarPhoto: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop"
  },
  {
    name: "Backend Engineers",
    followersCount: 32876,
    avatarPhoto: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop"
  },
  {
    name: "Mobile Dev Hub",
    followersCount: 21789,
    avatarPhoto: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=100&fit=crop"
  },
  {
    name: "DevOps & Cloud",
    followersCount: 18943,
    avatarPhoto: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop"
  },
  {
    name: "Open Source",
    followersCount: 45678,
    avatarPhoto: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop"
  }
];

export const USERS: IUser[] = [
  {
    userId: "user1",
    profilePhoto: "https://i.pravatar.cc/150?img=1",
    username: "alex_johnson",
    email: "alex@example.com",
    description: "Digital artist and photographer"
  },
  {
    userId: "user2",
    profilePhoto: "https://i.pravatar.cc/150?img=2",
    username: "maria_garcia",
    email: "maria@example.com",
    description: "Travel enthusiast"
  },
  {

    userId: "user3",
    profilePhoto: "https://i.pravatar.cc/150?img=3",
    username: "tom_wilson",
    email: "tom@example.com",
    description: "Outdoor adventurer"
  },
  {
    userId: "user4",
    profilePhoto: "https://i.pravatar.cc/150?img=4",
    username: "sarah_chen",
    email: "sarah@example.com",
    description: "Fitness coach"
  },
 {
    userId: "user5",
    profilePhoto: "https://i.pravatar.cc/150?img=5",
    username: "mike_roberts",
    email: "mike@example.com",
    description: "Marathon runner"
  },
  {
    userId: "user6",
    profilePhoto: "https://i.pravatar.cc/150?img=6",
    username: "lisa_parker",
    email: "lisa@example.com",
    description: "Nutritionist"
  },
  {
    userId: "user7",
    profilePhoto: "https://i.pravatar.cc/150?img=7",
    username: "david_kim",
    email: "david@example.com",
    description: "Software developer"
  },

]

export const POSTS: IPost[] = [
    {
      postId: "1",
      user: {
        userId: "user1",
        profilePhoto: "https://i.pravatar.cc/150?img=1",
        username: "alex_johnson",
        email: "alex@example.com",
        description: "Digital artist and photographer"
      },
      postImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      postTitle: "Sunset over the mountains",
      postDescription: "Beautiful sunset captured during my hiking trip last weekend. Nature always finds a way to amaze me!",
      likes: 245,
      comments: [
        {
          commentID: 1,
          user: {
            userId: "user2",
            profilePhoto: "https://i.pravatar.cc/150?img=2",
            username: "maria_garcia",
            email: "maria@example.com",
            description: "Travel enthusiast"
          },
          description: "Stunning view! Where was this taken?"
        },
        {
          commentID: 2,
          user: {

            userId: "user3",
            profilePhoto: "https://i.pravatar.cc/150?img=3",
            username: "tom_wilson",
            email: "tom@example.com",
            description: "Outdoor adventurer"
          },
          description: "Great shot! The colors are amazing."
        }
      ],
      postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      postId: "2",
      user: {
        userId: "user2",
        profilePhoto: "https://i.pravatar.cc/150?img=2",
        username: "maria_garcia",
        email: "maria@example.com",
        description: "Travel enthusiast"
      },
      postImg: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      postTitle: "New café in town",
      postDescription: "Tried this amazing new café downtown. Their latte art is incredible! ☕️",
      likes: 189,
      comments: [
        {
          commentID: 3,
          user: {
            userId: "user1",
            profilePhoto: "https://i.pravatar.cc/150?img=1",
            username: "alex_johnson",
            email: "alex@example.com",
            description: "Digital artist and photographer"
          },
          description: "What's the address? I need to check it out!"
        }
      ],
      postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    },
    {
      postId: "3",
      user: {
        userId: "user3",
        profilePhoto: "https://i.pravatar.cc/150?img=3",
        username: "tom_wilson",
        email: "tom@example.com",
        description: "Outdoor adventurer"
      },
      postImg: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
      postTitle: "Morning workout routine",
      postDescription: "Started my day with an intense workout session. Feeling energized and ready to conquer the day! 💪",
      likes: 312,
      comments: [
        {
          commentID: 4,
          user: {
            userId: "user4",
            profilePhoto: "https://i.pravatar.cc/150?img=4",
            username: "sarah_chen",
            email: "sarah@example.com",
            description: "Fitness coach"
          },
          description: "Great motivation! What's your routine?"
        },
        {
          commentID: 5,
          user: {
            userId: "user5",
            profilePhoto: "https://i.pravatar.cc/150?img=5",
            username: "mike_roberts",
            email: "mike@example.com",
            description: "Marathon runner"
          },
          description: "Keep it up! Consistency is key."
        }
      ],
      postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      postId: "4",
      user: {
        userId: "user4",
        profilePhoto: "https://i.pravatar.cc/150?img=4",
        username: "sarah_chen",
        email: "sarah@example.com",
        description: "Fitness coach"
      },
      postTitle: "Nutrition tips for beginners",
      postDescription: "Sharing some basic nutrition principles I wish I knew when I started my fitness journey. Remember: progress, not perfection!",
      likes: 421,
      comments: [
        
        {
          commentID: 6,
          user: {
            userId: "user6",
            profilePhoto: "https://i.pravatar.cc/150?img=6",
            username: "lisa_parker",
            email: "lisa@example.com",
            description: "Nutritionist"
          },
          description: "Excellent advice! Especially about hydration."
        }
      ],
      postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      postId: "5",
      user: {
        userId: "user5",
        profilePhoto: "https://i.pravatar.cc/150?img=5",
        username: "mike_roberts",
        email: "mike@example.com",
        description: "Marathon runner"
      },
      postImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
      postTitle: "New personal record!",
      postDescription: "Just completed a half marathon with my best time yet! All those early morning runs paid off. 🏃‍♂️",
      likes: 567,
      comments: [
        {
          commentID: 7,
          user: {
            userId: "user3",
            profilePhoto: "https://i.pravatar.cc/150?img=3",
            username: "tom_wilson",
            email: "tom@example.com",
            description: "Outdoor adventurer"
          },
          description: "Congratulations! That's amazing!"
        },
        {
          commentID: 8,
          user: {
            userId: "user4",
            profilePhoto: "https://i.pravatar.cc/150?img=4",
            username: "sarah_chen",
            email: "sarah@example.com",
            description: "Fitness coach"
          },
          description: "So proud of you! What was your time?"
        }
      ],
      postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      postId: "6",
      user: {
        userId: "user6",
        profilePhoto: "https://i.pravatar.cc/150?img=6",
        username: "lisa_parker",
        email: "lisa@example.com",
        description: "Nutritionist"
      },
      postImg: "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
      postTitle: "Healthy meal prep Sunday",
      postDescription: "Spent the afternoon preparing meals for the week. These veggie bowls are packed with nutrients and flavor! 🥗",
      likes: 278,
      comments: [
        {
          commentID: 9,
          user: {
            userId: "user2",
            profilePhoto: "https://i.pravatar.cc/150?img=2",
            username: "maria_garcia",
            email: "maria@example.com",
            description: "Travel enthusiast"
          },
          description: "Looks delicious! Can you share the recipe?"
        }
      ],
      postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
    },
    {
      postId: "7",
      user: {
        userId: "user7",
        profilePhoto: "https://i.pravatar.cc/150?img=7",
        username: "david_kim",
        email: "david@example.com",
        description: "Software developer"
      },
      postTitle: "Just launched my new project!",
      postDescription: "After months of hard work, I'm excited to announce the launch of my open-source library. Check out the GitHub repo! 🚀",
      likes: 634,
      comments: [
        {
          commentID: 10,
          user: {
            userId: "user1",
            profilePhoto: "https://i.pravatar.cc/150?img=1",
            username: "alex_johnson",
            email: "alex@example.com",
            description: "Digital artist and photographer"
          },
          description: "Congratulations David! What's the project about?"
        },
        {
          commentID: 11,
          user: {
            userId: "user5",
            profilePhoto: "https://i.pravatar.cc/150?img=5",
            username: "mike_roberts",
            email: "mike@example.com",
            description: "Marathon runner"
          },
          description: "Amazing achievement! Link?"
        }
      ],
      postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    }
  ];