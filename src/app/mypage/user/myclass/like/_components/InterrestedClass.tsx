import { getLikesClassList } from '@/lib/apis/serverApis/classApi';
import { transformToCardData } from '@/utils/apiDataProcessor';
import InterrestedClassViewer from './InterrestedClassViewer';

const InterrestedClass = async () => {
  const resLikesClassList = await getLikesClassList();

  if (!resLikesClassList) return;

  const cardDatas = transformToCardData(resLikesClassList);

  return <InterrestedClassViewer cardDatas={cardDatas} />;
};

export default InterrestedClass;
