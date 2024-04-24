import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { HeaderFeed } from "./headerFeed";
import { UserProgress } from "@/components/userProgress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={{ title: "English", imageSrc: "/US.svg" }}
          hearts={5}
          points={100}
          subscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <HeaderFeed title="English" />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
