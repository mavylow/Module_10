import { createContext, type ReactNode } from "react";

const mockUser = {
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

const mockPost = {
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
const mockContext = createContext({
  mockUser,
  mockPost,
});

interface MockProviderI {
  children: ReactNode;
}

function MockProvider({ children }: MockProviderI) {
  return (
    <mockContext.Provider value={{ mockUser, mockPost }}>
      {children}
    </mockContext.Provider>
  );
}

export default MockProvider;
