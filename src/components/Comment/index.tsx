import type { IComment } from "@/TestConsts";

export default function Comment({
  comment,
  number,
}: {
  comment: IComment;
  number: number;
}) {
  return (
    <>
      <li data-number={`#${number}.`}>{comment.description}</li>
    </>
  );
}
