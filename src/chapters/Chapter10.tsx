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
          <span className="chapter-anchor" aria-hidden="true">🎯</span>
          <span className="px-2 py-1 bg-[#9b6a3a] text-[#fffaf1] text-xs rounded">{isZh ? '进阶' : 'Advanced'}</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 10 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch10.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch10.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Chapter Overview */}
        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-indigo-400 mb-4">{isZh ? '本章概览' : 'Chapter Overview'}
          </h2>
          <p className="text-slate-300 mb-4">{isZh
              ? '这一章介绍王霞与李世杰教授合作的研究：等周截面。这个概念看似抽象，但它捕捉了子流形"在某个方向上均匀弯曲"的性质。定理告诉我们：满足这种对称性的子流形必须被一个"超级球面"包住。'
              : 'This chapter introduces the collaborative research of Wang Xia and Prof. Li Shi-Jie: isoperimetric sections. While the concept seems abstract, it captures when a submanifold "bends uniformly in some direction". The theorem tells us: submanifolds with this symmetry must be enclosed by a "hypersphere".'}
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-xs font-serif tracking-[0.18em] text-teal-800/70 mb-1">§</div>
              <p className="text-slate-300 text-sm">{isZh ? '等周截面定义' : 'Isoperimetric Section'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-xs font-serif tracking-[0.18em] text-teal-800/70 mb-1">§</div>
              <p className="text-slate-300 text-sm">{isZh ? '平行条件' : 'Parallel Condition'}</p>
            </div>
            <div className="bg-slate-800 rounded-lg p-3 text-center">
              <div className="text-xs font-serif tracking-[0.18em] text-teal-800/70 mb-1">§</div>
              <p className="text-slate-300 text-sm">{isZh ? '超球面包含定理' : 'Hypersphere Theorem'}</p>
            </div>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-400 mb-4">{isZh ? '前置知识回顾' : 'Prerequisites Review'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">{isZh ? '法丛（第二章）' : 'Normal Bundle (Ch. 2)'}</h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '子流形M在每点p有法空间T⊥_pM。所有法空间合起来形成法丛。法向量场是在每点选一个法向量的连续选择。'
                  : 'Submanifold M has normal space T⊥_pM at each point p. All normal spaces together form the normal bundle. A normal vector field is a continuous choice of normal vector at each point.'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '形状算子（第二章）' : 'Shape Operator (Ch. 2)'}</h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '给定法向量ξ，形状算子A_ξ描述子流形沿ξ方向的弯曲。它的迹tr(A_ξ)称为关于ξ的平均曲率。'
                  : 'Given normal vector ξ, shape operator A_ξ describes submanifold bending in ξ direction. Its trace tr(A_ξ) is called the mean curvature with respect to ξ.'}
              </p>
            </div>
          </div>
        </section>

        {/* Paper info */}
        <section className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-400 mb-4">{isZh ? '原始论文' : 'Original Paper'}
          </h2>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-300 font-semibold">{isZh ? '王霞 & 李世杰 (2003)' : 'Wang, X. & Li, S.-J. (2003)'}</p>
            <p className="text-cyan-400">{isZh ? '「常曲率空间中有平行等周截面的子流形」' : '"Submanifolds with Parallel Isoperimetric Sections in Constant Curvature Spaces"'}</p>
            <p className="text-slate-400 text-sm">{isZh ? '华南师范大学学报(自然科学版), 2003(1), 38-41' : 'Journal of South China Normal University, 2003(1), 38-41'}</p>
          </div>
        </section>

        {/* Section 10.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-10.1" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '10.1 等周截面的定义' : '10.1 Definition of Isoperimetric Section'}
          </h2>

          {/* Why isoperimetric */}
          <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-blue-400 font-semibold mb-2">{isZh ? '"等周"名称的由来' : 'Origin of "Isoperimetric"'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '"等周"(isoperimetric)来自希腊语，意为"相等的周长"。经典等周问题问：给定周长，什么形状面积最大？答案是圆。在这里，"等周"表示某种"均匀性"——法方向ξ对应的平均曲率处处相等。'
                : '"Isoperimetric" comes from Greek, meaning "equal perimeter". The classical isoperimetric problem asks: given a perimeter, what shape has maximum area? The answer is a circle. Here, "isoperimetric" indicates a kind of "uniformity"—the mean curvature corresponding to normal direction ξ is equal everywhere.'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '直观理解："黄金视角"' : 'Intuition: The "Golden Viewing Angle"'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '想象你找到了一个非常特殊的观察视角（一个法向量方向）。从这个视角看过去，子流形的平均弯曲程度是一个恒定的常数——无论你走到哪个点，这个数字都不变。我们称这个特殊方向为"黄金视角"。而"平行"条件意味着这个黄金视角在整个曲面上都不会改变——无论你怎么走动，这个能让一切看起来很规整的观察方向始终不变。'
                : 'Imagine finding a very special viewing angle (a normal direction). From this angle, the surface\'s average bending is a constant—the same no matter which point you visit. We call this the "golden viewing angle". The "parallel" condition means this golden angle never changes across the entire surface—no matter where you walk, this neatly-organized viewing direction stays the same.'}
            </p>
          </div>

          {/* Step by step */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '分步理解' : 'Step by Step'}
            </p>
            <div className="space-y-3 text-slate-300 text-sm">
              <div className="flex items-start gap-3">
                <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs">1</span>
                <p>{isZh ? '选取一个单位法向量场ξ（在M的每一点选一个单位法向量，连续变化）' : 'Choose a unit normal vector field ξ (a unit normal at each point of M, varying continuously)'}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs">2</span>
                <p>{isZh ? '计算形状算子 A_ξ（描述M沿ξ方向弯曲的线性映射）' : 'Compute shape operator A_ξ (linear map describing M\'s bending in ξ direction)'}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs">3</span>
                <p>{isZh ? '计算M₁(ξ) = tr(A_ξ)（形状算子的迹，即"平均弯曲程度"）' : 'Compute M₁(ξ) = tr(A_ξ) (trace of shape operator, i.e., "average bending")'}</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-cyan-600 text-white px-2 py-0.5 rounded text-xs">4</span>
                <p>{isZh ? '若M₁(ξ)在整个M上是常数，则ξ是等周截面' : 'If M₁(ξ) is constant over all M, then ξ is an isoperimetric section'}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '数学定义' : 'Mathematical Definition'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? '设 M 是黎曼流形 R^m(c) 中的子流形。等周截面是 M 上整体定义的单位法向量场 ξ，满足：'
                : 'Let M be a submanifold in Riemannian manifold R^m(c). An isoperimetric section is a globally defined unit normal vector field ξ on M such that:'}
            </p>
            <MathBlock>{'M_1(\\xi) = \\text{tr}(A_\\xi) = \\text{constant}'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">{isZh
                ? '其中 M₁(ξ) = tr(A_ξ) 是关于 ξ 的第一平均曲率。'
                : 'where M₁(ξ) = tr(A_ξ) is the first mean curvature with respect to ξ.'}
            </p>
          </div>

          {/* Examples */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">{isZh ? '例：球面 S²(r) ⊂ E³' : 'Example: Sphere S²(r) ⊂ E³'}
              </h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '向外指的单位法向量ξ。处处M₁(ξ) = 2/r。这是等周截面！'
                  : 'Outward unit normal ξ. Everywhere M₁(ξ) = 2/r. This is an isoperimetric section!'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '例：圆柱面 ⊂ E³' : 'Example: Cylinder ⊂ E³'}
              </h3>
              <p className="text-slate-300 text-sm">{isZh
                  ? '向外法向量ξ。处处M₁(ξ) = 1/r（半径倒数）。也是等周截面！'
                  : 'Outward normal ξ. Everywhere M₁(ξ) = 1/r (inverse radius). Also an isoperimetric section!'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 10.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-10.2" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '10.2 平行等周截面' : '10.2 Parallel Isoperimetric Section'}
          </h2>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '平行条件' : 'Parallel Condition'}
            </p>
            <MathBlock>{'D_X \\xi = 0 \\quad \\text{for all } X \\in TM'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">{isZh
                ? '即 ξ 在法丛中的协变导数为零——沿任何方向移动，ξ 都"平行"不变。'
                : 'The covariant derivative of ξ in the normal bundle is zero—moving in any direction, ξ stays "parallel" unchanged.'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-purple-400 font-semibold mb-2">{isZh ? '🧭 指南针类比' : '🧭 Compass Analogy'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '平行等周截面就像一个"永远指向同一个方向"的指南针。无论你在M上怎么走，这个指针相对于曲面的朝向始终保持一致。'
                : 'A parallel isoperimetric section is like a compass that "always points in the same direction". No matter how you walk on M, the pointer\'s orientation relative to the surface remains consistent.'}
            </p>
          </div>

          {/* Combined definition */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-amber-900/20">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '平行等周截面 = 两个条件' : 'Parallel Isoperimetric Section = Two Conditions'}
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="bg-slate-900 rounded-lg p-3">
                <p className="text-cyan-400 font-semibold mb-1">{isZh ? '条件1：等周' : 'Condition 1: Isoperimetric'}</p>
                <p className="text-slate-300 text-sm">M₁(ξ) = const</p>
                <p className="text-slate-400 text-xs mt-1">{isZh ? '沿ξ方向的平均弯曲处处相等' : 'Average bending in ξ direction is equal everywhere'}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-3">
                <p className="text-purple-400 font-semibold mb-1">{isZh ? '条件2：平行' : 'Condition 2: Parallel'}</p>
                <p className="text-slate-300 text-sm">D_X ξ = 0</p>
                <p className="text-slate-400 text-xs mt-1">{isZh ? 'ξ在法丛中"不旋转"' : 'ξ "doesn\'t rotate" in normal bundle'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10.3 - Main Theorem */}
        <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-yellow-600">
          <h2 id="section-10.3" className="text-xl font-semibold text-yellow-400 mb-4">{isZh ? '10.3 超球面包含定理' : '10.3 Hypersphere Containment Theorem'}
          </h2>

          <div className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-lg p-4 border border-teal-700 mb-4">
            <p className="text-teal-400 font-semibold mb-2">{isZh ? '"紧致"是什么？' : 'What is "Compact"?'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '一个简单的理解方式：想象一个甜甜圈或一个篮球的表面。你可以在上面一直走，永远不会"掉下去"——因为它没有边界。但同时，它的总面积是有限的。这种"无边又有限"的性质就是紧致的核心思想。紧致性在定理证明中至关重要，因为它允许我们使用积分工具，并保证极值的存在。'
                : 'A simple way to understand: imagine a donut or a basketball\'s surface. You can walk on it forever without "falling off"—it has no boundary. Yet its total area is finite. This combination of "boundless yet finite" is the essence of compactness. Compactness is crucial in proofs because it allows integral methods and guarantees existence of extrema.'}
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '定理 (王霞-李世杰 2003)' : 'Theorem (Wang-Li 2003)'}
            </p>
            <p className="text-slate-300">{isZh
                ? '设 M 是常曲率黎曼流形 R^m(c) 中的紧致子流形。若 M 有平行等周截面且截面曲率 > 0，则：'
                : 'Let M be a compact submanifold in constant curvature Riemannian manifold R^m(c). If M has a parallel isoperimetric section and sectional curvature > 0, then:'}
            </p>
            <div className="bg-slate-800 rounded-lg p-3 mt-2">
              <p className="text-cyan-400 font-semibold text-center">{isZh ? 'M 含于 R^m(c) 的某个超球面内' : 'M is contained in some hypersphere of R^m(c)'}
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '几何意义' : 'Geometric Meaning'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '这个定理说明：如果一个子流形有足够"对称"的法方向（平行等周截面）且曲率为正，那么它不能"随意弯曲"，必须被一个超球面"包住"。'
                : 'This theorem says: if a submanifold has a sufficiently "symmetric" normal direction (parallel isoperimetric section) and positive curvature, then it cannot bend arbitrarily—it must be "enclosed" by a hypersphere.'}
            </p>
          </div>
        </section>

        {/* Section 10.4 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-10.4" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '10.4 与陳邦彦平行截面定理的关系' : '10.4 Relation to Chen\'s Parallel Section Theorem'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? '陳邦彦教授之前证明了关于平行截面的定理。Wang-Li的工作将"平行截面"条件推广到更弱的"平行等周截面"条件。'
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
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-red-400 mb-4">{isZh ? '与接触数的联系' : 'Connection to Contact Number'}
          </h2>
          <p className="text-slate-300 mb-3">{isZh
              ? '等周截面的存在性与子流形的对称性有关。高接触数的子流形往往具有更多的对称性，更可能存在平行等周截面。'
              : 'The existence of isoperimetric sections relates to submanifold symmetry. Submanifolds with higher contact numbers often have more symmetry and are more likely to have parallel isoperimetric sections.'}
          </p>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-2">{isZh ? '联系要点' : 'Key Connections'}</p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• {isZh ? '全脐子流形（c# = ∞）自动有平行等周截面' : 'Totally umbilical submanifolds (c# = ∞) automatically have parallel isoperimetric sections'}</li>
              <li>• {isZh ? '接触数≥3的各向同性子流形有更强的对称性' : 'Isotropic submanifolds with contact number ≥3 have stronger symmetry'}</li>
              <li>• {isZh ? '两种研究都探索"对称性条件"如何约束子流形的几何' : 'Both studies explore how "symmetry conditions" constrain submanifold geometry'}</li>
            </ul>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✓ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '等周截面：M₁(ξ)处处相等的单位法向量场' : 'Isoperimetric section: unit normal field with constant M₁(ξ)'}</li>
            <li>✓ {isZh ? '平行等周截面：等周 + 在法丛中平行（D_X ξ = 0）' : 'Parallel isoperimetric section: isoperimetric + parallel in normal bundle (D_X ξ = 0)'}</li>
            <li>✓ {isZh ? 'Wang-Li定理：有平行等周截面且正曲率 → 含于超球面' : 'Wang-Li theorem: parallel isoperimetric section + positive curvature → contained in hypersphere'}</li>
            <li>✓ {isZh ? '这项工作推广了陳邦彦的平行截面定理' : 'This work generalizes Chen\'s parallel section theorem'}</li>
          </ul>

          {/* Thinking Questions */}
          <div className="mt-6 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">{isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '1. "含于超球面"意味着什么？这对子流形的形状有什么限制？'
                    : '1. What does "contained in a hypersphere" mean? How does this restrict the shape of a submanifold?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '这意味着子流形整体"包裹"在一个球面上！就像所有国家都在地球表面上一样。这是很强的几何约束——子流形不能"伸展"到无穷远，也不能太"扁平"。'
                      : 'This means the entire submanifold is "wrapped" on a sphere! Like all countries being on Earth\'s surface. This is a strong geometric constraint—the submanifold cannot "stretch" to infinity, nor be too "flat".'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '2. 为什么需要"正曲率"条件？负曲率或零曲率的情况会有什么不同？'
                    : '2. Why is "positive curvature" needed? What would be different with negative or zero curvature?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '正曲率使得流形"向内弯曲"（像球面），这自然导致它被"包住"。负曲率流形会"向外展开"（像马鞍），可能无限延伸。零曲率（平面）也可以无限延伸。正曲率是唯一导致"有界"几何的情况。'
                      : 'Positive curvature makes the manifold "curve inward" (like a sphere), naturally leading to it being "enclosed". Negative curvature manifolds "spread outward" (like saddles), potentially extending infinitely. Zero curvature (planes) can also extend infinitely. Positive curvature is the only case leading to "bounded" geometry.'}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/9" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/11" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">{t('common.next')}: {t('chapters.ch11.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
