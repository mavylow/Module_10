import styled from "styled-components";

export const PostArticle = styled.article`
  width: 100%;
  font-size: 16px;

  .frame {
  display: flex;
  flex-direction: column;
  gap: 16px
  }

  h2 {
    font-size: 16px;
    margin: 0;
  }

  h3,
  p {
    font-size: clamp(14px, 3vw, 20px);
    margin: 0;
  }

  span {
    font-size: clamp(12px, 1.2vw, 16px);
  }

  label,
  input::placeholder {
    font-size: 14px;
  }

  svg {
    height: 24px;
  }

  @media (max-width: 375px) {
    svg {
      height: 18px;
    }

    span {
      font-size: 10px;
    }
  }
`;

export const WithoutComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PostFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: none;

  &:last-child {
    border-bottom: 1px solid var(--border-color);
  }
`;

export const PostHeader = styled.div`
  display: grid;
  grid-template-rows: 24px 1fr;
  grid-template-columns: 48px 1fr;
  padding: 0;

  h2,
  time {
    padding-left: min(1em, 3%);
    margin: 0;
    align-self: center;
  }

  time {
    color: var(--light-text-color);
  }
`;

export const PostAvatar = styled.img`
  height: 48px;
  width: 48px;
  align-self: center;
  justify-self: center;
  border-radius: 50%;
  object-fit: cover;
  grid-row: 1 / span 2;
`;

export const Figure = styled.figure`
  margin: 0;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
`;

export const Likes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
`;

export const Comments = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
`;

export const PostComments = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
  margin: 0;
  gap: 16px;
`;

export const AddComment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input {
    width: 100%;
    height: 58px;
  }

  button {
    width: clamp(163px, 40%, 211px);
    height: 44px;
    font-size: 14px;
  }

  label {
    padding: 0.5em 0;
  }

  @media (max-width: 350px) {
    button {
      height: 36px;
    }
  }
`;