import type { IComment, ILike, YearStats } from "@/interfaces"

export const LIKES: ILike[] = [
    {
        "id": 1,
        "userId": 1,
        "postId": 102,
        "creationDate": "2024-09-02T09:00:00Z"
    },
    {
        "id": 2,
        "userId": 1,
        "postId": 103,
        "creationDate": "2024-09-03T11:30:00Z"
    },
    {
        "id": 7,
        "userId": 1,
        "postId": 101,
        "creationDate": "2025-09-04T13:00:00Z"
    },
    {
        "id": 8,
        "userId": 1,
        "postId": 104,
        "creationDate": "2025-09-04T13:15:00Z"
    },
    {
        "id": 9,
        "userId": 1,
        "postId": 105,
        "creationDate": "2026-09-05T14:00:00Z"
    },
    {
        "id": 10,
        "userId": 1,
        "postId": 102,
        "creationDate": "2026-09-05T15:00:00Z"
    }
]

export const RESULT_LIKE_STATS: YearStats = {
    "2024": [
        {
            "month": 0,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 1,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 2,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 3,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 4,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 5,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 6,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 7,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 8,
            "count": 2,
            "previousCount": 0
        },
        {
            "month": 9,
            "count": 0,
            "previousCount": 2
        },
        {
            "month": 10,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 11,
            "count": 0,
            "previousCount": 0
        }
    ],
    "2025": [
        {
            "month": 0,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 1,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 2,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 3,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 4,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 5,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 6,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 7,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 8,
            "count": 2,
            "previousCount": 0
        },
        {
            "month": 9,
            "count": 0,
            "previousCount": 2
        },
        {
            "month": 10,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 11,
            "count": 0,
            "previousCount": 0
        }
    ],
    "2026": [
        {
            "month": 0,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 1,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 2,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 3,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 4,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 5,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 6,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 7,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 8,
            "count": 2,
            "previousCount": 0
        },
        {
            "month": 9,
            "count": 0,
            "previousCount": 2
        },
        {
            "month": 10,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 11,
            "count": 0,
            "previousCount": 0
        }
    ]
}

export const COMMENTS: IComment[] = [
    {
        "id": 2,
        "postId": 102,
        "authorId": 1,
        "text": "Wow! Nice post.",
        "creationDate": "2024-09-01T10:15:00Z",
        "modifiedDate": "2025-09-01T10:15:00Z"
    },
    {
        "id": 4,
        "postId": 103,
        "authorId": 1,
        "text": "My opinion on this topic.",
        "creationDate": "2022-09-03T15:00:00Z",
        "modifiedDate": "2025-09-03T15:00:00Z"
    },
    {
        "id": 5,
        "postId": 101,
        "authorId": 1,
        "text": "Adding detail here.",
        "creationDate": "2025-09-04T18:00:00Z",
        "modifiedDate": "2025-09-04T18:00:00Z"
    },
    {
        "id": 6,
        "postId": 105,
        "authorId": 1,
        "text": "A quick thought.",
        "creationDate": "2024-09-04T18:30:00Z",
        "modifiedDate": "2024-09-04T18:30:00Z"
    },
    {
        "id": 7,
        "postId": 104,
        "authorId": 1,
        "text": "Interesting perspective!",
        "creationDate": "2025-09-05T09:00:00Z",
        "modifiedDate": "2025-09-05T09:00:00Z"
    }
]

export const RESULT_COMMENT_STATS = {
    "2022": [
        {
            "month": 0,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 1,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 2,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 3,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 4,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 5,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 6,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 7,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 8,
            "count": 1,
            "previousCount": 0
        },
        {
            "month": 9,
            "count": 0,
            "previousCount": 1
        },
        {
            "month": 10,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 11,
            "count": 0,
            "previousCount": 0
        }
    ],
    "2024": [
        {
            "month": 0,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 1,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 2,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 3,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 4,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 5,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 6,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 7,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 8,
            "count": 2,
            "previousCount": 0
        },
        {
            "month": 9,
            "count": 0,
            "previousCount": 2
        },
        {
            "month": 10,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 11,
            "count": 0,
            "previousCount": 0
        }
    ],
    "2025": [
        {
            "month": 0,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 1,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 2,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 3,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 4,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 5,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 6,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 7,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 8,
            "count": 2,
            "previousCount": 0
        },
        {
            "month": 9,
            "count": 0,
            "previousCount": 2
        },
        {
            "month": 10,
            "count": 0,
            "previousCount": 0
        },
        {
            "month": 11,
            "count": 0,
            "previousCount": 0
        }
    ]
}


export const POSTS = [
    {
        "id": 101,
        "authorId": 1,
        "title": "I love this flowers",
        "content": "Really nice flowers in San Francisco!",
        "image": "/assets/post-image-1.png",
        "likesCount": 2,
        "commentsCount": 2,
        "creationDate": "2025-08-20T10:00:00Z",
        "modifiedDate": "2025-08-20T10:00:00Z",
        "likedByUsers": [
            {
                "id": 1,
                "username": "helenahills",
                "firstName": "Helena",
                "secondName": "Hills",
                "email": "helena.hills@social.com",
                "description": "Travel and design enthusiast.",
                "profileImage": "/assets/user-helena.png",
                "lastLogin": "2025-10-02T12:00:00Z",
                "creationDate": "2023-11-01T09:00:00Z",
                "modifiedDate": "2025-10-02T12:00:00Z"
            },
            {
                "id": 2,
                "username": "charles",
                "firstName": "Charles",
                "secondName": "Davis",
                "email": "charles@mail.com",
                "description": "Just a good dog.",
                "profileImage": "/assets/user-charles.png",
                "lastLogin": "2025-10-01T15:00:00Z",
                "creationDate": "2023-05-20T11:00:00Z",
                "modifiedDate": "2025-10-01T15:00:00Z"
            },
            {
                "id": 3,
                "username": "oscardavis",
                "firstName": "Oscar",
                "secondName": "Davis",
                "email": "oscar.davis@app.net",
                "description": "Front-end developer | React Query fan.",
                "profileImage": "/assets/user-oscar.png",
                "lastLogin": "2025-10-03T09:30:00Z",
                "creationDate": "2024-03-10T14:00:00Z",
                "modifiedDate": "2025-10-03T09:30:00Z"
            }
        ]
    },
    {
        "id": 104,
        "authorId": 1,
        "title": "Best coffee in the city? Need recommendations!",
        "content": "Just tried a new batch of Ethiopian beans for the first time today. The aroma is incredible! Please share your favorite coffee shops in the Downtown area—I'm searching for the perfect cappuccino.",
        "image": "/assets/post-image-3.png",
        "likesCount": 0,
        "commentsCount": 0,
        "creationDate": "2025-09-04T10:00:00Z",
        "modifiedDate": "2025-09-04T10:00:00Z",
        "likedByUsers": [
            {
                "id": 1,
                "username": "helenahills",
                "firstName": "Helena",
                "secondName": "Hills",
                "email": "helena.hills@social.com",
                "description": "Travel and design enthusiast.",
                "profileImage": "/assets/user-helena.png",
                "lastLogin": "2025-10-02T12:00:00Z",
                "creationDate": "2023-11-01T09:00:00Z",
                "modifiedDate": "2025-10-02T12:00:00Z"
            }
        ]
    },
    {
        "id": 105,
        "authorId": 1,
        "title": "Planning and productivity: My recent hack.",
        "content": "I finally moved away from paper planners to using Trello for everything. It has saved me hours! Sharing the template I use for my weekly task organization. What tools are you currently relying on?",
        "image": "",
        "likesCount": 0,
        "commentsCount": 0,
        "creationDate": "2025-09-05T10:00:00Z",
        "modifiedDate": "2025-09-05T10:00:00Z",
        "likedByUsers": [
            {
                "id": 1,
                "username": "helenahills",
                "firstName": "Helena",
                "secondName": "Hills",
                "email": "helena.hills@social.com",
                "description": "Travel and design enthusiast.",
                "profileImage": "/assets/user-helena.png",
                "lastLogin": "2025-10-02T12:00:00Z",
                "creationDate": "2023-11-01T09:00:00Z",
                "modifiedDate": "2025-10-02T12:00:00Z"
            }
        ]
    }
]