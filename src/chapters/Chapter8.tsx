import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock } from '../components';

export default function Chapter8() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-orange-600 text-white text-xs rounded">{isZh ? '进阶' : 'Advanced'}</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 8 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch8.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch8.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Paper info */}
        <section className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-700">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">
            📄 {isZh ? '原始论文' : 'Original Paper'}
          </h2>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-300 font-semibold">Wang, M.-J. & Li, S.-J. (1998)</p>
            <p className="text-cyan-400">"Submanifolds with Parallel Mean Curvature Vector in a Sphere"</p>
            <p className="text-slate-400 text-sm">Kodai Mathematical Journal, 21, 201-207</p>
          </div>
        </section>

        {/* Section 8.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '8.1 平均曲率向量' : '8.1 Mean Curvature Vector'}
          </h2>
          
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-700 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🎈 {isZh ? '气球类比' : 'Balloon Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象一个气球表面。平均曲率向量指向气球"想要收缩"的方向——就像气球内部气压小于外部时，表面会向内凹。'
                : 'Imagine a balloon surface. The mean curvature vector points in the direction the balloon "wants to shrink"—like when internal pressure is less than external, the surface curves inward.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义' : 'Definition'}
            </p>
            <MathBlock>{'H = \\frac{1}{n} \\sum_{i=1}^{n} h(e_i, e_i) = \\frac{1}{n} \\text{trace}(h)'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '其中 {e₁, ..., eₙ} 是切空间的正交基，h 是第二基本形式。'
                : 'where {e₁, ..., eₙ} is an orthonormal basis of the tangent space, h is the second fundamental form.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">
                {isZh ? '例：球面' : 'Example: Sphere'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '半径为r的球面S²：H指向球心，|H| = 1/r。小球面曲率大，大球面曲率小。'
                  : 'Sphere S² of radius r: H points to center, |H| = 1/r. Small sphere has large curvature, large sphere has small curvature.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">
                {isZh ? '例：极小曲面' : 'Example: Minimal Surface'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '肥皂膜是极小曲面：H = 0。曲面不"想"向任何方向收缩。'
                  : 'Soap films are minimal surfaces: H = 0. The surface doesn\'t "want" to shrink in any direction.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 8.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '8.2 平行平均曲率向量' : '8.2 Parallel Mean Curvature Vector'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义' : 'Definition'}
            </p>
            <MathBlock>{'\\nabla^\\perp H = 0'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? 'H的法向协变导数为零，即H在法丛中"平行移动"。'
                : 'The normal covariant derivative of H is zero, meaning H "parallel transports" in the normal bundle.'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-700">
            <p className="text-yellow-400 font-semibold mb-2">
              🚶 {isZh ? '走路类比' : 'Walking Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象你在曲面上走，手里拿着一根指向"曲率方向"的棍子。平行平均曲率意味着无论你怎么走，棍子相对于曲面的方向始终"平行"不变。'
                : 'Imagine walking on a surface holding a stick pointing in the "curvature direction". Parallel mean curvature means no matter how you walk, the stick\'s direction relative to the surface stays "parallel" unchanged.'}
            </p>
          </div>
        </section>

        {/* Section 8.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '8.3 Simons型公式' : '8.3 Simons-Type Formula'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? 'Simons公式是子流形几何中的重要工具，它将第二基本形式的Laplacian与曲率联系起来。'
              : 'The Simons formula is a key tool in submanifold geometry, relating the Laplacian of the second fundamental form to curvature.'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? 'Wang-Li的贡献' : 'Wang-Li\'s Contribution'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? 'Wang-Li将Simons公式推广到球面S^(n+p)中有平行平均曲率向量的子流形，得到了新的不等式和刚性定理。'
                : 'Wang-Li extended the Simons formula to submanifolds with parallel mean curvature vector in sphere S^(n+p), obtaining new inequalities and rigidity theorems.'}
            </p>
          </div>
        </section>

        {/* Section 8.4 - Main Theorem */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border-2 border-purple-600">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">
            ⭐ {isZh ? '8.4 Pinching定理' : '8.4 Pinching Theorem'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定理 (Wang-Li 1998)' : 'Theorem (Wang-Li 1998)'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '设 M 是单位球面 S^(n+p) 中的紧致子流形，有平行平均曲率向量。若第二基本形式的范数平方 S 满足：'
                : 'Let M be a compact submanifold in the unit sphere S^(n+p) with parallel mean curvature vector. If the squared norm of the second fundamental form S satisfies:'}
            </p>
            <MathBlock>{'S < \\frac{n}{\\alpha}, \\quad \\alpha = \\max\\left\\{\\frac{3}{2}, \\frac{n}{2\\sqrt{n-1}}\\right\\}'}</MathBlock>
            <p className="text-slate-300 text-sm mt-2">
              {isZh ? '则 M 是以下之一：' : 'Then M is one of:'}
            </p>
            <ul className="text-slate-300 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>{isZh ? '全脐子流形（小球面 S^n(r)）' : 'Totally umbilical submanifold (small sphere S^n(r))'}</li>
              <li>{isZh ? 'S^(n+1) 中的超曲面 S^n(r₀) 或 S¹(r) × S^(n-1)(s)' : 'Hypersurface in S^(n+1): S^n(r₀) or S¹(r) × S^(n-1)(s)'}</li>
            </ul>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              💡 {isZh ? '直观理解' : 'Intuitive Understanding'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '"Pinching"意为"夹挤"。如果子流形的弯曲程度（S）被"夹"在某个界限以下，那么它只能是几种非常特殊的形状。这是刚性定理的典型形式。'
                : '"Pinching" means "squeezing". If the bending degree (S) of a submanifold is "squeezed" below a certain bound, it can only be one of a few very special shapes. This is a typical form of rigidity theorem.'}
            </p>
          </div>
        </section>

        {/* Section 8.5 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '8.5 后续发展：Chen-Ricci不等式' : '8.5 Later Development: Chen-Ricci Inequality'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? 'Wang-Li的工作与陈邦彦的Chen-Ricci不等式密切相关。2024年，Chen和Blaga综述了30年来这个领域的发展。'
              : 'Wang-Li\'s work is closely related to Bang-Yen Chen\'s Chen-Ricci inequality. In 2024, Chen and Blaga surveyed 30 years of development in this field.'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-cyan-300 font-semibold mb-2">
              📚 {isZh ? '参考文献' : 'Reference'}
            </p>
            <p className="text-slate-400 text-sm">
              Chen, B.-Y. & Blaga, A.M. (2024). "Recent developments on Chen-Ricci inequalities"
            </p>
            <p className="text-slate-500 text-sm">
              In: <em>Geometry of Submanifolds and Applications</em>, Springer
            </p>
          </div>
        </section>

        {/* Connection to Contact Number */}
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-700">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            🔗 {isZh ? '与接触数的联系' : 'Connection to Contact Number'}
          </h2>
          <p className="text-slate-300">
            {isZh 
              ? '平行平均曲率向量条件与各向同性条件有深刻联系。全脐子流形（接触数为∞）是最特殊的平行平均曲率子流形。Wang-Li的Pinching定理可以看作是"接近全脐"条件下的刚性结果。'
              : 'The parallel mean curvature vector condition is deeply connected to the isotropic condition. Totally umbilical submanifolds (contact number ∞) are the most special parallel mean curvature submanifolds. Wang-Li\'s Pinching theorem can be viewed as a rigidity result under "nearly umbilical" conditions.'}
          </p>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/7" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/9" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
            {t('common.next')}: {t('chapters.ch9.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
