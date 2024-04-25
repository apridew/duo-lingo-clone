import { lessons, units } from "@/db/schema";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  activeLesson:
    | (typeof lessons.$inferSelect & { unit: typeof units.$inferSelect })
    | undefined;
  activeLessonsPercentage: number;
};

const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
}: Props) => {
  return <>Unit</>;
};

export default Unit;
