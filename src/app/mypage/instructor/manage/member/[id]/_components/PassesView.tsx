import MemberPass from './MemberPass';
import Carousel from '@/components/Carousel/Carousel';
import { GetMyMemberPassesData } from '@/types/instructor';

interface PassesViewProps {
  passes: GetMyMemberPassesData[];
}

const PassesView = ({ passes }: PassesViewProps) => {
  if (passes.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold">보유 패스권 ({passes.length})</h2>
      {passes.length > 1 ? (
        <div className="relative sm:px-11">
          <div className="overflow-hidden sm:px-5">
            <div className="w-64 px-2 py-3 sm:px-0">
              <Carousel
                move={true}
                priority={4}
                gap={1}
                showCurrentElement={false}
              >
                {passes.map((pass) => (
                  <MemberPass key={pass.lecturePass.id} pass={pass} />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 w-64">
          <MemberPass pass={passes[0]} />
        </div>
      )}
    </div>
  );
};

export default PassesView;
