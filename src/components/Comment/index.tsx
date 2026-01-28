import type { IComment } from "@/TestConsts";

interface ICommentItem {
  comment: IComment;
  number: number;
}

export default function Comment({ comment, number }: ICommentItem) {
  return (
    <>
      <li data-number={`#${number}.`}>{comment.description}</li>
    </>
  );
}
