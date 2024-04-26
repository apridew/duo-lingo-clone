"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { HeaderLesson } from "./headerLesson";

type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialLessonPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any;
};

export const Quiz = ({
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
  initialLessonPercentage,
  userSubscription,
}: Props) => {
  return <HeaderLesson />;
};
