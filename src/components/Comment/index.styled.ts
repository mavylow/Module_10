import styled from "styled-components";

export const CommentStyled = styled.li<{$number: number}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding-left: 2em;

  & span {
    display: inline-flex;
    align-items: end;
    font-size: clamp(14px, 1.2vw, 16px);
  }
  }

  & button {
    visibility: hidden;
  }

  &:hover button {
    visibility: visible;
  }

  &::before {
    content: "#${props => props.$number}";
    position: absolute;
    left: 0;
    bottom: 0;
    font-weight: bold;
    color: var(--text-color);
    margin: 0;
    font-size: clamp(12px, 1.2vw, 16px);
  }
`;
