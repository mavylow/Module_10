export const mockPost = {
    id: 101,
    authorId: 1,
    title: "I love this flowers",
    content: "Really nice flowers in San Francisco!",
    image: "/assets/post-image-1.png",
    likesCount: 2,
    commentsCount: 2,
    creationDate: "2025-08-20T10:00:00Z",
    modifiedDate: "2025-08-20T10:00:00Z",
    authorPhoto: "/assets/user-helena.png",
    likedByUsers: [
      {
        id: 1,
        username: "helenahills",
        firstName: "Helena",
        secondName: "Hills",
        email: "helena.hills@social.com",
        description: "Travel and design enthusiast.",
        profileImage: "/assets/user-helena.png",
        lastLogin: "2025-10-02T12:00:00Z",
        creationDate: "2023-11-01T09:00:00Z",
        modifiedDate: "2025-10-02T12:00:00Z",
      },
      {
        id: 2,
        username: "charles",
        firstName: "Charles",
        secondName: "Davis",
        email: "charles@mail.com",
        description: "Just a good dog.",
        profileImage: "/assets/user-charles.png",
        lastLogin: "2025-10-01T15:00:00Z",
        creationDate: "2023-05-20T11:00:00Z",
        modifiedDate: "2025-10-01T15:00:00Z",
      },
    ],
  };
  
  export const mockUser = {
    id: 1,
    username: "helenahills",
    firstName: "Helena",
    secondName: "Hills",
    email: "helena.hills@social.com",
    description: "Travel and design enthusiast.",
    profileImage: "/assets/user-helena.png",
    lastLogin: "2025-10-02T12:00:00Z",
    creationDate: "2023-11-01T09:00:00Z",
    modifiedDate: "2025-10-02T12:00:00Z",
  };

  export const mockGroup = {
    id: 1,
    photo: "/group-1.jpg",
    title: "Frontend Group",
    membersCount: 128,
  };
  
  export const mockComment = {
    id: 5,
    postId: 101,
    authorId: 1,
    text: "Adding detail here.",
    creationDate: "2025-09-04T18:00:00Z",
    modifiedDate: "2025-09-04T18:00:00Z",
  };
  

  export const mockPosts = [
    { ...mockPost, id: 1 },
    { ...mockPost, id: 2 },
    { ...mockPost, id: 3 },
  ]

  export const mockUsers = [
    { id: 1, firstName: "User", secondName: "1" },
    { id: 2, firstName: "User", secondName: "2" },
    { id: 3, firstName: "User", secondName: "3" },
    { id: 4, firstName: "User", secondName: "4" },
    { id: 5, firstName: "User", secondName: "5" },
    { id: 6, firstName: "User", secondName: "6" },
  ];
  
  export const mockGroups = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `Group ${i + 1}`,
  }));

  export const mockStatPosts = [{ id: 1, createdAt: "2024-01-01" }];
  export const mockStatLikes = [{ id: 1, createdAt: "2024-01-01" }];
  export const mockStatComments = [{ id: 1, createdAt: "2024-01-01" }];

  export const mockSideBarUser = {
    id: 1,
    username: "helena",
    firstName: "Helena",
    secondName: "Stone",
    description:
      "Team lead overseeing product development and architecture across multiple platforms.",
    photo: "/user.png",
  };