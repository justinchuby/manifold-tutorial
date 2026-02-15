import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';

export default function Chapter2() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">{t('nav.chapter', { num: 2 })}</p>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch2.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch2.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Section 2.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.1 嵌入与浸入' : '2.1 Embeddings and Immersions'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '子流形是"住在"另一个流形里的流形。我们需要精确定义这种"住在"的含义。'
              : 'A submanifold is a manifold that "lives inside" another manifold. We need to precisely define what "lives inside" means.'}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
              <h3 className="text-green-400 font-semibold mb-2">
                {isZh ? '嵌入 (Embedding)' : 'Embedding'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '一个光滑映射 f: M → N 是嵌入，如果它是单射、浸入，且是到其像的同胚。'
                  : 'A smooth map f: M → N is an embedding if it is injective, an immersion, and a homeomorphism onto its image.'}
              </p>
              <p className="text-slate-400 text-xs mt-2">
                {isZh ? '例：圆嵌入平面' : 'Example: Circle embedded in plane'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-yellow-400 font-semibold mb-2">
                {isZh ? '浸入 (Immersion)' : 'Immersion'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '一个光滑映射 f: M → N 是浸入，如果它在每点的微分是单射。'
                  : 'A smooth map f: M → N is an immersion if its differential is injective at every point.'}
              </p>
              <p className="text-slate-400 text-xs mt-2">
                {isZh ? '例：8字形浸入平面（有自交）' : 'Example: Figure-8 immersed in plane (self-intersection)'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 2.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.2 欧氏空间中的子流形' : '2.2 Submanifolds in Euclidean Space'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '李世杰教授的接触数理论主要研究欧氏空间中的子流形。'
              : "Prof. Shi-Jie Li's contact number theory primarily studies submanifolds in Euclidean space."}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（欧氏空间）' : 'Definition (Euclidean Space)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? 'm维欧氏空间是配备标准内积的实向量空间：'
                : 'm-dimensional Euclidean space is a real vector space with the standard inner product:'}
            </p>
            <MathBlock>{'E^m = (\\mathbb{R}^m, \\langle \\cdot, \\cdot \\rangle)'}</MathBlock>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（子流形）' : 'Definition (Submanifold)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? 'n维子流形M是欧氏空间的一个子集，局部是n维的：'
                : 'An n-dimensional submanifold M is a subset of Euclidean space that is locally n-dimensional:'}
            </p>
            <MathBlock>{'M^n \\subset E^m \\quad (n < m)'}</MathBlock>
          </div>

          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg p-4 border border-purple-700">
            <h3 className="text-purple-400 font-semibold mb-2">
              🔑 {isZh ? '余维数 (Codimension)' : 'Codimension'}
            </h3>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '余维数 = m - n，表示子流形"缺少"的维数。这在接触数理论中非常重要！'
                : 'Codimension = m - n, representing the "missing" dimensions of the submanifold. This is crucial in contact number theory!'}
            </p>
            <div className="text-slate-400 text-sm space-y-1">
              <p>• <Math>{'S^2 \\subset E^3'}</Math>: {isZh ? '余维数 1' : 'codimension 1'}</p>
              <p>• {isZh ? '曲线' : 'Curve'} <Math>{'\\subset E^3'}</Math>: {isZh ? '余维数 2' : 'codimension 2'}</p>
              <p>• {isZh ? '曲面' : 'Surface'} <Math>{'\\subset E^6'}</Math>: {isZh ? '余维数 4（接触数论文重要研究对象）' : 'codimension 4 (key in contact number paper)'}</p>
            </div>
          </div>
        </section>

        {/* Section 2.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.3 切空间与法空间' : '2.3 Tangent and Normal Spaces'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-cyan-500">
              <h3 className="text-cyan-400 font-semibold mb-2">
                {isZh ? '切空间' : 'Tangent Space'} <Math>{'T_pM'}</Math>
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '在点p处与M相切的所有向量构成的空间。'
                  : 'The space of all vectors tangent to M at point p.'}
              </p>
              <MathBlock>{'\\dim(T_pM) = n'}</MathBlock>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-pink-500">
              <h3 className="text-pink-400 font-semibold mb-2">
                {isZh ? '法空间' : 'Normal Space'} <Math>{'T_p^\\perp M'}</Math>
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? '与切空间正交的所有向量构成的空间。'
                  : 'The space of all vectors orthogonal to the tangent space.'}
              </p>
              <MathBlock>{'\\dim(T_p^\\perp M) = m - n'}</MathBlock>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '直和分解' : 'Direct Sum Decomposition'}
            </p>
            <MathBlock>{'T_p E^m = T_p M \\oplus T_p^\\perp M'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '欧氏空间的切空间等于子流形的切空间与法空间的直和。'
                : "Euclidean space's tangent space equals the direct sum of submanifold's tangent and normal spaces."}
            </p>
          </div>
        </section>

        {/* Section 2.4 - Key for Contact Number */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.4 第二基本形式' : '2.4 Second Fundamental Form'}
          </h2>
          
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-lg p-4 border border-red-700 mb-4">
            <h3 className="text-red-400 font-semibold mb-2">
              ⭐ {isZh ? '核心概念——接触数理论的关键！' : 'Core Concept—Key to Contact Number Theory!'}
            </h3>
            <p className="text-slate-300">
              {isZh 
                ? '第二基本形式h测量子流形如何"弯曲"地嵌入外部空间。接触数的所有定理都与h的性质密切相关！'
                : 'The second fundamental form h measures how the submanifold "bends" in the ambient space. All contact number theorems are closely related to properties of h!'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? 'Gauss公式' : 'Gauss Formula'}
            </p>
            <MathBlock>{'\\tilde{\\nabla}_X Y = \\nabla_X Y + h(X, Y)'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '其中 ∇̃ 是外部空间的联络，∇ 是子流形的联络，h(X,Y) 是法向量。'
                : 'Where ∇̃ is the ambient connection, ∇ is the submanifold connection, and h(X,Y) is a normal vector.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义（第二基本形式）' : 'Definition (Second Fundamental Form)'}
            </p>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '第二基本形式是一个对称双线性映射：'
                : 'The second fundamental form is a symmetric bilinear map:'}
            </p>
            <MathBlock>{'h: T_pM \\times T_pM \\to T_p^\\perp M'}</MathBlock>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-2">
              💡 {isZh ? '与接触数的联系' : 'Connection to Contact Number'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• {isZh ? '接触数 ≥ 3 的条件涉及 h(u,u) 的性质' : 'Contact number ≥ 3 condition involves properties of h(u,u)'}</li>
              <li>• {isZh ? '各向同性条件：' : 'Isotropy condition:'} <Math>{'\\langle h(u,u), h(u,v) \\rangle = 0'}</Math></li>
              <li>• {isZh ? '接触数越高，对h的约束越强' : 'Higher contact number means stronger constraints on h'}</li>
            </ul>
          </div>
        </section>

        {/* Section 2.5 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.5 形状算子' : '2.5 Shape Operator'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? 'Weingarten公式' : 'Weingarten Formula'}
            </p>
            <MathBlock>{'\\tilde{\\nabla}_X \\xi = -A_\\xi X + D_X \\xi'}</MathBlock>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '形状算子与第二基本形式的关系' : 'Relation to Second Fundamental Form'}
            </p>
            <MathBlock>{'\\langle A_\\xi X, Y \\rangle = \\langle h(X, Y), \\xi \\rangle'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '形状算子 A_ξ 是第二基本形式的"切空间版本"。'
                : 'The shape operator A_ξ is the "tangent space version" of the second fundamental form.'}
            </p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            to="/chapter/1"
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            ← {t('common.prev')}
          </Link>
          <Link
            to="/chapter/3"
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors"
          >
            {t('common.next')}: {t('chapters.ch3.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
