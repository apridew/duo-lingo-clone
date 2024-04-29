"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { HeaderLesson } from "./headerLesson";
import { useState } from "react";
import { QuizAssist } from "./quizAssist";

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
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const challenge = challenges[activeIndex];
  const title =
    challenge.type === "ASSIST"
      ? "Select the correct answer"
      : challenge.question;

  return (
    <>
      <HeaderLesson
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {challenge.type === "SELECT" && (
                <QuizAssist question={challenge.question} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
