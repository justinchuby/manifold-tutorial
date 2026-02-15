import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock } from '../components';

export default function Chapter7() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <p className="text-cyan-400 text-sm mb-2">{t('nav.chapter', { num: 7 })}</p>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch7.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch7.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Intro */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-700">
          <h2 className="text-xl font-semibold text-purple-400 mb-4">
            🏆 {isZh ? 'Chen-Li论文的重要发现' : 'Key Discoveries in Chen-Li Paper'}
          </h2>
          <p className="text-slate-300">
            {isZh 
              ? '除了建立接触数的一般理论外，Chen-Li论文还给出了具体的分类定理和令人惊喜的新发现。本章将介绍这些成果。'
              : 'Beyond establishing the general theory of contact number, Chen-Li\'s paper also provides specific classification theorems and surprising new discoveries. This chapter presents these results.'}
          </p>
        </section>

        {/* Section 7.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '7.1 余维数为2的子流形分类' : '7.1 Classification of Codimension-2 Submanifolds'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? '当余维数（codimension = m - n）为2时，即子流形嵌入的"额外维度"只有2个，Chen-Li给出了完整的分类：'
              : 'When codimension (= m - n) is 2, meaning the submanifold is embedded with only 2 "extra dimensions", Chen-Li provide a complete classification:'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定理 (Chen-Li)' : 'Theorem (Chen-Li)'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '设 M 是 E^(n+2) 中的 n 维子流形，c#(M) ≥ 3。则 M 是以下之一：'
                : 'Let M be an n-dimensional submanifold of E^(n+2) with c#(M) ≥ 3. Then M is one of:'}
            </p>
            <ul className="text-slate-300 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>{isZh ? '开部分的 n 维球面 S^n' : 'Open portion of n-sphere S^n'}</li>
              <li>{isZh ? '开部分的广义螺旋面' : 'Open portion of generalized helicoid'}</li>
              <li>{isZh ? 'C^(n/2) 中的非平面全纯曲线（当 n 为偶数）' : 'Non-planar holomorphic curve in C^(n/2) (when n is even)'}</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-blue-700">
            <p className="text-blue-400 font-semibold mb-2">
              🔍 {isZh ? '为什么是余维数2？' : 'Why Codimension 2?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '余维数2是一个"甜蜜点"：足够复杂以产生有趣的现象，又足够简单可以完全分类。余维数1（超曲面）太特殊，余维数≥3则太复杂。'
                : 'Codimension 2 is a "sweet spot": complex enough for interesting phenomena, yet simple enough for complete classification. Codim 1 (hypersurfaces) is too special, codim ≥3 is too complex.'}
            </p>
          </div>
        </section>

        {/* Section 7.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '7.2 E⁶中的曲面' : '7.2 Surfaces in E⁶'}
          </h2>
          
          <p className="text-slate-300 mb-4">
            {isZh 
              ? 'Chen-Li特别研究了6维欧氏空间中的曲面（2维子流形）。这里余维数为4，几何更加丰富。'
              : 'Chen-Li specifically studied surfaces (2-dimensional submanifolds) in 6-dimensional Euclidean space. Here codimension is 4, and geometry is richer.'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '定理：c# ≥ 4 的曲面' : 'Theorem: Surfaces with c# ≥ 4'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? 'E⁶ 中 c# ≥ 4 的曲面必须是常各向同性的，且具有非常特殊的几何结构。'
                : 'Surfaces in E⁶ with c# ≥ 4 must be constant isotropic and have very special geometric structure.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">
              🎯 {isZh ? '为什么研究E⁶？' : 'Why Study E⁶?'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? 'E⁶ = ℝ⁶ 可以看作 C³（3维复空间），这建立了与复几何的深刻联系。曲面在C³中的行为与全纯函数理论相关。'
                : 'E⁶ = ℝ⁶ can be viewed as C³ (3-dimensional complex space), establishing deep connections with complex geometry. Surface behavior in C³ relates to holomorphic function theory.'}
            </p>
          </div>
        </section>

        {/* Section 7.3 - Major discovery */}
        <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-yellow-600">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            ⭐ {isZh ? '7.3 重大发现：首例非球面 pseudo-umbilical 曲面' : '7.3 Major Discovery: First Non-Spherical Pseudo-Umbilical Surfaces'}
          </h2>
          
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">
                {isZh ? '什么是 Pseudo-Umbilical？' : 'What is Pseudo-Umbilical?'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">
                {isZh 
                  ? 'Umbilical（脐点）是指曲面上所有方向的法曲率相同的点。Pseudo-umbilical 是一个更弱的条件：平均曲率向量 H 是"伪脐"的。'
                  : 'Umbilical points are where normal curvature is the same in all directions. Pseudo-umbilical is a weaker condition: the mean curvature vector H is "pseudo-umbilical".'}
              </p>
              <MathBlock>{'A_H = \\lambda \\cdot I \\quad (\\text{shape operator is scalar multiple of identity})'}</MathBlock>
            </div>

            <div className="bg-slate-900 rounded-lg p-4">
              <h3 className="text-red-400 font-semibold mb-2">
                {isZh ? '之前的困境' : 'Previous Dilemma'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? '在Chen-Li论文之前，所有已知的pseudo-umbilical曲面要么是球面，要么是球面的一部分。数学家们开始怀疑：是否所有pseudo-umbilical曲面都必须是"球形的"？'
                  : 'Before Chen-Li\'s paper, all known pseudo-umbilical surfaces were either spheres or parts of spheres. Mathematicians began to wonder: must all pseudo-umbilical surfaces be "spherical"?'}
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-4 border border-green-600">
              <h3 className="text-green-400 font-semibold mb-2">
                🎉 {isZh ? 'Chen-Li的突破' : 'Chen-Li\'s Breakthrough'}
              </h3>
              <p className="text-slate-300 text-sm">
                {isZh 
                  ? 'Chen-Li构造出了显式的非球面pseudo-umbilical曲面例子！这些曲面存在于E⁶中，证明了pseudo-umbilical性质不蕴含球面性质。这是接触数理论的一个重要应用。'
                  : 'Chen-Li constructed explicit examples of non-spherical pseudo-umbilical surfaces! These surfaces exist in E⁶, proving that pseudo-umbilical does not imply spherical. This is an important application of contact number theory.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 7.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            {isZh ? '7.4 与复几何的联系' : '7.4 Connection with Complex Geometry'}
          </h2>
          
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">
              {isZh ? '全纯曲线定理回顾' : 'Holomorphic Curve Theorem Review'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '曲面 M² ⊂ E⁴ = C² 满足 c#(M) = 3 当且仅当 M 是非平面全纯曲线。'
                : 'A surface M² ⊂ E⁴ = C² has c#(M) = 3 if and only if M is a non-planar holomorphic curve.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">
              🌐 {isZh ? '意义' : 'Significance'}
            </p>
            <p className="text-slate-300 text-sm">
              {isZh 
                ? '这个定理在微分几何和复分析之间架起了桥梁。接触数3的条件完全等价于曲面满足Cauchy-Riemann方程！'
                : 'This theorem bridges differential geometry and complex analysis. The contact number 3 condition is completely equivalent to the surface satisfying Cauchy-Riemann equations!'}
            </p>
          </div>
        </section>

        {/* Citation */}
        <section className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-400 mb-4">
            📚 {isZh ? '论文引用' : 'Paper Citation'}
          </h2>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-400">
            <p>Chen, B.-Y. & Li, S.-J. (2004).</p>
            <p className="text-cyan-400">The Contact Number of a Euclidean Submanifold.</p>
            <p>Proc. Edinburgh Math. Soc., 47(1), 69-100.</p>
            <p className="text-slate-500 mt-2">DOI: 10.1017/S0013091503000038</p>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/6" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/8" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
            {t('common.next')}: {t('chapters.ch8.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
