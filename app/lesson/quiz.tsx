"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { HeaderLesson } from "./headerLesson";
import { useState } from "react";

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
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialLessonPercentage);

  return (
    <HeaderLesson
      hearts={hearts}
      percentage={percentage}
      hasActiveSubscription={!!userSubscription?.isActive}
    />
  );
};
