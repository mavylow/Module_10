import type { IComment } from "@/TestConsts";

interface ICommentProps {
  comment: IComment;
  number: number;
}

export default function Comment({ comment, number }: ICommentProps) {
  return (
    <>
      <li data-number={`#${number}.`}>{comment.text}</li>
    </>
  );
}
