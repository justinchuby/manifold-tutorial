import { useParams } from 'react-router-dom';
import NotFound from './NotFound';

const VALID_CHAPTERS = new Set([1,2,3,4,5,6,7,8,9,10,11,12]);

export default function Chapter() {
  const { id } = useParams<{ id: string }>();
  const chapterNum = parseInt(id || '', 10);

  if (!VALID_CHAPTERS.has(chapterNum)) {
    return <NotFound />;
  }

  // Valid but no dedicated component yet — show placeholder
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-xl p-6">
        <p className="text-slate-300">
          第 {chapterNum} 章内容正在开发中...
        </p>
        <p className="text-slate-400 text-sm mt-4">
          Chapter {chapterNum} content is under development...
        </p>
      </div>
    </div>
  );
}
