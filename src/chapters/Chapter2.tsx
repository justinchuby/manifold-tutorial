import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';
import { TangentNormalVizWithLabels, EmbeddingVizWithLabels, SecondFundamentalFormVizWithLabels } from '../visualizations';

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
        {/* Interactive: Tangent and Normal visualization */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            🎮 {isZh ? '交互可视化：切空间与法空间' : 'Interactive: Tangent and Normal Spaces'}
          </h2>
          <TangentNormalVizWithLabels />
          <p className="text-slate-400 text-sm mt-4">
            {isZh 
              ? '观察点在球面上移动时，切平面和法向量如何随之变化。' 
              : 'Watch how the tangent plane and normal vector change as the point moves on the sphere.'}
          </p>
        </section>

        {/* Section 2.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.1 嵌入与浸入' : '2.1 Embeddings and Immersions'}
          </h2>

          {/* Intuitive analogy */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">
              🧵 {isZh ? '绳子类比' : 'String Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象把一根绳子放在桌面上。如果绳子没有打结、没有交叉，这就是"嵌入"。如果绳子像8字形那样交叉了，这就是"浸入"——局部看起来没问题，但整体上有交叉。'
                : 'Imagine placing a string on a table. If the string has no knots and no crossings, this is an "embedding". If the string crosses itself like a figure-8, this is an "immersion"—locally it looks fine, but globally there are crossings.'}
            </p>
          </div>
          
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
                  ? '光滑、单射、且保持拓扑结构。'
                  : 'Smooth, injective, and preserves topological structure.'}
              </p>
              <p className="text-slate-400 text-xs mt-2">
                🎯 {isZh ? '例：把橡皮筋放在桌上（不交叉）' : 'Example: rubber band on table (no crossing)'}
              </p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="text-yellow-400 font-semibold mb-2">
                {isZh ? '浸入 (Immersion)' : 'Immersion'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '局部光滑，但可能有自交。'
                  : 'Locally smooth, but may have self-intersections.'}
              </p>
              <p className="text-slate-400 text-xs mt-2">
                🎯 {isZh ? '例：8字形（有交叉点）' : 'Example: figure-8 (has crossing point)'}
              </p>
            </div>
          </div>

          {/* Embedding visualization */}
          <div className="mb-4">
            <EmbeddingVizWithLabels />
          </div>

          {/* More vivid examples */}
          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-2">
              🌟 {isZh ? '更多生动例子' : 'More Vivid Examples'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-green-400">{isZh ? '嵌入' : 'Embedding'}</span>: {isZh ? '戒指戴在手指上、水管的形状、耳机线（不打结时）' : 'Ring on finger, shape of a water pipe, earphone cord (when not tangled)'}</li>
              <li>• <span className="text-yellow-400">{isZh ? '浸入' : 'Immersion'}</span>: {isZh ? '打结的耳机线、交叉的铁路轨道、Klein瓶在3D中的表示' : 'Tangled earphone cord, crossing railway tracks, Klein bottle representation in 3D'}</li>
            </ul>
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

          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg p-4 border border-purple-700 mb-4">
            <h3 className="text-purple-400 font-semibold mb-2">
              🔑 {isZh ? '余维数 (Codimension) — 关键概念！' : 'Codimension — Key Concept!'}
            </h3>
            <p className="text-slate-300 mb-2">
              {isZh 
                ? '余维数 = m - n，表示子流形"缺少"的维数，也就是法空间的维数。'
                : 'Codimension = m - n, representing the "missing" dimensions of the submanifold, i.e., the dimension of the normal space.'}
            </p>
            <MathBlock>{'\\text{codim}(M) = m - n = \\dim(T^\\perp_p M)'}</MathBlock>
          </div>

          {/* Codimension analogy */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700 mb-4">
            <h3 className="text-yellow-400 font-semibold mb-2">
              🏊 {isZh ? '游泳池类比' : 'Swimming Pool Analogy'}
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              {isZh 
                ? '想象不同"自由度"的活动空间：'
                : 'Imagine activity spaces with different "degrees of freedom":'}
            </p>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold">{isZh ? '走钢丝' : 'Tightrope Walking'}</p>
                <p className="text-slate-400">{isZh ? '1维线 ⊂ 3维空间' : '1D line ⊂ 3D space'}</p>
                <p className="text-purple-400">{isZh ? '余维数 = 2' : 'codim = 2'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '你可以向左右/上下"掉落"' : 'You can "fall" left-right or up-down'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold">{isZh ? '溜冰场' : 'Ice Skating Rink'}</p>
                <p className="text-slate-400">{isZh ? '2维面 ⊂ 3维空间' : '2D surface ⊂ 3D space'}</p>
                <p className="text-purple-400">{isZh ? '余维数 = 1' : 'codim = 1'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '只能向上"跳起"' : 'Can only "jump" upward'}</p>
              </div>
              <div className="bg-slate-900 rounded p-3">
                <p className="text-cyan-400 font-semibold">{isZh ? '游泳池' : 'Swimming Pool'}</p>
                <p className="text-slate-400">{isZh ? '3维体 ⊂ 3维空间' : '3D volume ⊂ 3D space'}</p>
                <p className="text-purple-400">{isZh ? '余维数 = 0' : 'codim = 0'}</p>
                <p className="text-slate-500 text-xs mt-1">{isZh ? '完全自由移动' : 'Complete freedom'}</p>
              </div>
            </div>
          </div>

          {/* Why codimension matters */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <h3 className="text-cyan-400 font-semibold mb-2">
              💡 {isZh ? '为什么余维数重要？' : 'Why Does Codimension Matter?'}
            </h3>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-green-400">{isZh ? '余维数 = 1' : 'Codim = 1'}</span>: {isZh ? '超曲面，法空间只有一个方向，几何相对简单' : 'Hypersurface, normal space has only one direction, geometry is simpler'}</li>
              <li>• <span className="text-yellow-400">{isZh ? '余维数 = 2' : 'Codim = 2'}</span>: {isZh ? '"甜蜜点"——足够复杂但可以完全分类（Chen-Li论文重点）' : '"Sweet spot"—complex enough but fully classifiable (Chen-Li paper focus)'}</li>
              <li>• <span className="text-orange-400">{isZh ? '余维数 ≥ 3' : 'Codim ≥ 3'}</span>: {isZh ? '非常复杂，难以完全分类' : 'Very complex, difficult to fully classify'}</li>
            </ul>
          </div>

          {/* Examples with visualization */}
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-cyan-400 font-semibold mb-3">
              📊 {isZh ? '具体例子' : 'Concrete Examples'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-600">
                    <th className="py-2 text-slate-400">{isZh ? '子流形' : 'Submanifold'}</th>
                    <th className="py-2 text-slate-400">n</th>
                    <th className="py-2 text-slate-400">{isZh ? '环境' : 'Ambient'}</th>
                    <th className="py-2 text-slate-400">m</th>
                    <th className="py-2 text-purple-400">{isZh ? '余维数' : 'Codim'}</th>
                    <th className="py-2 text-slate-400">{isZh ? '法空间' : 'Normal'}</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '球面 S²' : 'Sphere S²'}</td>
                    <td className="py-2">2</td>
                    <td className="py-2">E³</td>
                    <td className="py-2">3</td>
                    <td className="py-2 text-green-400 font-semibold">1</td>
                    <td className="py-2">{isZh ? '1维（法线）' : '1D (normal line)'}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '空间曲线' : 'Space curve'}</td>
                    <td className="py-2">1</td>
                    <td className="py-2">E³</td>
                    <td className="py-2">3</td>
                    <td className="py-2 text-yellow-400 font-semibold">2</td>
                    <td className="py-2">{isZh ? '2维（法平面）' : '2D (normal plane)'}</td>
                  </tr>
                  <tr className="border-b border-slate-700">
                    <td className="py-2">{isZh ? '曲面 ⊂ E⁴' : 'Surface ⊂ E⁴'}</td>
                    <td className="py-2">2</td>
                    <td className="py-2">E⁴</td>
                    <td className="py-2">4</td>
                    <td className="py-2 text-yellow-400 font-semibold">2</td>
                    <td className="py-2">{isZh ? '2维法空间' : '2D normal space'}</td>
                  </tr>
                  <tr>
                    <td className="py-2">{isZh ? '曲面 ⊂ E⁶' : 'Surface ⊂ E⁶'}</td>
                    <td className="py-2">2</td>
                    <td className="py-2">E⁶</td>
                    <td className="py-2">6</td>
                    <td className="py-2 text-orange-400 font-semibold">4</td>
                    <td className="py-2">{isZh ? '4维法空间 ⭐' : '4D normal space ⭐'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-400 text-xs mt-2">
              ⭐ {isZh ? 'Chen-Li论文研究的关键对象：E⁶中余维数4的曲面，几何结构最丰富' : 'Key object in Chen-Li paper: surfaces in E⁶ with codimension 4, richest geometry'}
            </p>
          </div>
        </section>

        {/* Section 2.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '2.3 切空间与法空间' : '2.3 Tangent and Normal Spaces'}
          </h2>

          {/* Intuitive analogy */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-700 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🏔️ {isZh ? '爬山类比' : 'Mountain Climbing Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象你站在山坡上。切空间就是你脚下的"坡面"——所有你可以沿着山坡走的方向。法空间就是"垂直于坡面"的方向——你需要用绳索才能去的方向（比如悬崖下方）。'
                : 'Imagine standing on a mountainside. The tangent space is the "slope" under your feet—all directions you can walk along the mountain. The normal space is "perpendicular to the slope"—directions you need a rope to go (like down a cliff).'}
            </p>
            <p className="text-yellow-400 text-sm mt-2">
              💡 {isZh 
                ? '法空间的维数 = 余维数！例如：站在2维山坡（曲面）上，法空间是1维的（只有"上下"一个方向）。'
                : 'Dimension of normal space = codimension! E.g., standing on a 2D slope (surface), normal space is 1D (only "up-down" direction).'}
            </p>
          </div>
          
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

          {/* Second fundamental form visualization */}
          <div className="mt-4">
            <SecondFundamentalFormVizWithLabels />
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
