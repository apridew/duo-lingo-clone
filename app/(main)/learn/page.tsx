import { FeedWrapper } from "@/components/feedWrapper";
import { StickyWrapper } from "@/components/stickyWrapper";
import { HeaderFeed } from "./headerFeed";
import { UserProgress } from "@/components/userProgress";

const LearnPage = () => {
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
