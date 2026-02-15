import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Chapter() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const chapterNum = parseInt(id || '1', 10);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">
          {t('nav.chapter', { num: chapterNum })}
        </p>
        <h1 className="text-3xl font-bold text-white mb-2">
          {t(`chapters.ch${chapterNum}.title`)}
        </h1>
        <p className="text-slate-400">{t(`chapters.ch${chapterNum}.subtitle`)}</p>
      </header>

      <div className="prose prose-invert max-w-none">
        <div className="bg-slate-900 rounded-xl p-6">
          <p className="text-slate-300">
            第 {chapterNum} 章内容正在开发中...
          </p>
          <p className="text-slate-400 text-sm mt-4">
            Chapter {chapterNum} content is under development...
          </p>
        </div>
      </div>
    </div>
  );
}
