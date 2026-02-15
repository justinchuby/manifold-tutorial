import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock } from '../components';

export default function Chapter10() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-orange-600 text-white text-xs rounded">{isZh ? '进阶' : 'Advanced'}</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 10 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch10.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch10.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Paper info */}
        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-700">
          <h2 className="text-xl font-semibold text-indigo-400 mb-4">
            📄 {isZh ? '原始论文' : 'Original Paper'}
          </h2>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-300 font-semibold">{isZh ? '王霞 & 李世杰 (2003)' : 'Wang, X. & Li, S.-J. (2003)'}</p>
            <p className="text-cyan-400">{isZh ? '「常曲率空间中有平行等周截面的子流形」' : '"Submanifolds with Parallel Isoperimetric Sections in Constant Curvature Spaces"'}</p>
            <p className="text-slate-400 text-sm">{isZh ? '华南师范大学学报(自然科学版), 2003(1), 38-41' : 'Journal of South China Normal University, 2003(1), 38-41'}</p>
          </div>
        </section>

        {/* Section 10.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '10.1 等周截面的定义' : '10.1 Definition of Isoperimetric Section'}
          </h2>
          
          <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-green-700 mb-4">
            <p className="text-green-400 font-semibold mb-2">
              🎯 {isZh ? '直观理解' : 'Intuitive Understanding'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '想象在子流形M上选择一个"指向外部"的方向。如果这个方向在整个M上以某种"均匀"的方式变化，我们就得到了一个等周截面。'
                : 'Imagine choosing a direction "pointing outward" on submanifold M. If this direction varies in a "uniform" way across all of M, we get an isoperimetric section.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定义' : 'Definition'}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {isZh 
                ? '设 M 是黎曼流形 R^m(c) 中的子流形。等周截面是 M 上整体定义的单位法向量场 ξ，满足：'
                : 'Let M be a submanifold in Riemannian manifold R^m(c). An isoperimetric section is a globally defined unit normal vector field ξ on M such that:'}
            </p>
            <MathBlock>{'M_1(\\xi) = \\text{constant}'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '其中 M₁(ξ) 是关于 ξ 的第一平均曲率（形状算子 A_ξ 的迹）。'
                : 'where M₁(ξ) is the first mean curvature with respect to ξ (trace of shape operator A_ξ).'}
            </p>
          </div>
        </section>

        {/* Section 10.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '10.2 平行等周截面' : '10.2 Parallel Isoperimetric Section'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '平行条件' : 'Parallel Condition'}
            </p>
            <MathBlock>{'D_X \\xi = 0 \\quad \\text{for all } X \\in TM'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">
              {isZh 
                ? '即 ξ 在法丛中的协变导数为零——沿任何方向移动，ξ 都"平行"不变。'
                : 'The covariant derivative of ξ in the normal bundle is zero—moving in any direction, ξ stays "parallel" unchanged.'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-purple-700">
            <p className="text-purple-400 font-semibold mb-2">
              🧭 {isZh ? '指南针类比' : 'Compass Analogy'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '平行等周截面就像一个"永远指向同一个方向"的指南针。无论你在M上怎么走，这个指针相对于曲面的朝向始终保持一致。'
                : 'A parallel isoperimetric section is like a compass that "always points in the same direction". No matter how you walk on M, the pointer\'s orientation relative to the surface remains consistent.'}
            </p>
          </div>
        </section>

        {/* Section 10.3 - Main Theorem */}
        <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-yellow-600">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            ⭐ {isZh ? '10.3 超球面包含定理' : '10.3 Hypersphere Containment Theorem'}
          </h2>
          
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定理 (王霞-李世杰 2003)' : 'Theorem (Wang-Li 2003)'}
            </p>
            <p className="text-slate-300">
              {isZh 
                ? '设 M 是常曲率黎曼流形 R^m(c) 中的紧致子流形。若 M 有平行等周截面且截面曲率 > 0，则：'
                : 'Let M be a compact submanifold in constant curvature Riemannian manifold R^m(c). If M has a parallel isoperimetric section and sectional curvature > 0, then:'}
            </p>
            <div className="bg-slate-800 rounded-lg p-3 mt-2">
              <p className="text-cyan-400 font-semibold text-center">
                {isZh ? 'M 含于 R^m(c) 的某个超球面内' : 'M is contained in some hypersphere of R^m(c)'}
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              💡 {isZh ? '几何意义' : 'Geometric Meaning'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '这个定理说明：如果一个子流形有足够"对称"的法方向（平行等周截面）且曲率为正，那么它不能"随意弯曲"，必须被一个超球面"包住"。'
                : 'This theorem says: if a submanifold has a sufficiently "symmetric" normal direction (parallel isoperimetric section) and positive curvature, then it cannot bend arbitrarily—it must be "enclosed" by a hypersphere.'}
            </p>
          </div>
        </section>

        {/* Section 10.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '10.4 与陈邦彦平行截面定理的关系' : '10.4 Relation to Chen\'s Parallel Section Theorem'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '陈邦彦教授之前证明了关于平行截面的定理。Wang-Li的工作将"平行截面"条件推广到更弱的"平行等周截面"条件。'
              : 'Professor Bang-Yen Chen previously proved theorems about parallel sections. Wang-Li\'s work generalizes the "parallel section" condition to the weaker "parallel isoperimetric section" condition.'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-slate-600">
                  <th className="py-2 text-slate-400"></th>
                  <th className="py-2 text-cyan-400">{isZh ? '平行截面' : 'Parallel Section'}</th>
                  <th className="py-2 text-purple-400">{isZh ? '平行等周截面' : 'Parallel Isoperimetric Section'}</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">{isZh ? '条件强度' : 'Condition Strength'}</td>
                  <td className="py-2">{isZh ? '较强' : 'Stronger'}</td>
                  <td className="py-2">{isZh ? '较弱' : 'Weaker'}</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">{isZh ? '要求' : 'Requirement'}</td>
                  <td className="py-2">Dξ = 0</td>
                  <td className="py-2">Dξ = 0 + M₁(ξ) = const</td>
                </tr>
                <tr className="border-b border-slate-700">
                  <td className="py-2 text-slate-400">{isZh ? '结论' : 'Conclusion'}</td>
                  <td className="py-2">{isZh ? '超球面包含' : 'Hypersphere containment'}</td>
                  <td className="py-2">{isZh ? '超球面包含（在正曲率条件下）' : 'Hypersphere containment (under positive curvature)'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Connection to Contact Number */}
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-700">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            🔗 {isZh ? '与接触数的联系' : 'Connection to Contact Number'}
          </h2>
          <p className="text-slate-300">
            {isZh 
              ? '等周截面的存在性与子流形的对称性有关。高接触数的子流形往往具有更多的对称性，更可能存在平行等周截面。这项研究展示了李世杰教授在子流形几何领域的广泛贡献。'
              : 'The existence of isoperimetric sections relates to submanifold symmetry. Submanifolds with higher contact numbers often have more symmetry and are more likely to have parallel isoperimetric sections. This research demonstrates Prof. Li\'s broad contributions to submanifold geometry.'}
          </p>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/9" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/11" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
            {t('common.next')}: {t('chapters.ch11.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
