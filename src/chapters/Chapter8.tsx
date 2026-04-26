import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock, Math } from '../components';

export default function Chapter8() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="chapter-anchor" aria-hidden="true">🧲</span>
          <span className="px-2 py-1 bg-[#9b6a3a] text-[#fffaf1] text-xs rounded">{isZh ? '进阶' : 'Advanced'}</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 8 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch8.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch8.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Introduction */}
        <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">{isZh ? '本章导读' : 'Chapter Overview'}
          </h2>
          <p className="text-slate-300 mb-4">{isZh
              ? '本章介绍李世杰教授与王美娇1998年的合作研究。这篇论文研究了球面中具有"平行平均曲率向量"的子流形，得到了重要的刚性定理。这项工作展示了一种精妙的"几何侦探"手法——通过"夹挤"（Pinching），让形状自己"招供"真实身份。'
              : 'This chapter introduces Prof. Li\'s 1998 collaboration with Wang Mei-Jiao. This paper studies submanifolds with "parallel mean curvature vector" in spheres, obtaining important rigidity theorems. This work showcases an elegant "geometric detective" technique—using "pinching" to force shapes to reveal their true identity.'}
          </p>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-slate-400 text-sm font-semibold">{isZh ? '原始论文' : 'Original Paper'}</p>
            <p className="text-cyan-400">Wang, M.-J. & Li, S.-J. (1998)</p>
            <p className="text-slate-300">"Submanifolds with Parallel Mean Curvature Vector in a Sphere"</p>
            <p className="text-slate-500 text-sm">Kodai Mathematical Journal, 21, 201-207</p>
          </div>
        </section>

        {/* Prerequisites */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '预备知识回顾' : 'Prerequisites Review'}
          </h2>
          <p className="text-slate-300 mb-4">{isZh
              ? '在深入本章内容之前，让我们回顾几个关键概念：'
              : 'Before diving into this chapter, let\'s review some key concepts:'}
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">{isZh ? '第二基本形式 h' : 'Second Fundamental Form h'}
              </h3>
              <p className="text-slate-400 text-sm">{isZh
                  ? '测量子流形如何"弯曲"地嵌入外部空间（第2章介绍）'
                  : 'Measures how the submanifold "bends" in ambient space (introduced in Chapter 2)'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '法丛 T⊥M' : 'Normal Bundle T⊥M'}
              </h3>
              <p className="text-slate-400 text-sm">{isZh
                  ? '所有法向量组成的向量丛，维数 = 余维数'
                  : 'Vector bundle of all normal vectors, dimension = codimension'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 8.1 - Mean Curvature */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-8.1" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '8.1 什么是平均曲率？' : '8.1 What is Mean Curvature?'}
          </h2>

          {/* Intuitive explanation first */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '🎈 气球类比' : '🎈 Balloon Analogy'}
            </p>
            <p className="text-slate-300 text-sm mb-3">{isZh
                ? '想象一个气球表面。在每一点，曲面都有一个"想要移动"的方向：'
                : 'Imagine a balloon surface. At each point, the surface has a direction it "wants to move":'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• {isZh ? '气球内压力小：表面想向内凹' : 'Low pressure inside: surface wants to curve inward'}</li>
              <li>• {isZh ? '气球内压力大：表面想向外凸' : 'High pressure inside: surface wants to curve outward'}</li>
              <li>• {isZh ? '压力平衡（肥皂膜）：表面哪儿都不想去' : 'Balanced pressure (soap film): surface doesn\'t want to go anywhere'}</li>
            </ul>
            <p className="text-yellow-400 text-sm mt-3">{isZh ? '平均曲率向量H就是这个"想要移动的方向和强度"的数学描述！' : 'The mean curvature vector H is the mathematical description of this "direction and intensity of wanting to move"!'}
            </p>
          </div>

          {/* Mathematical definition */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '数学定义' : 'Mathematical Definition'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? '平均曲率向量是第二基本形式的"平均值"：'
                : 'The mean curvature vector is the "average" of the second fundamental form:'}
            </p>
            <MathBlock>{'H = \\frac{1}{n} \\sum_{i=1}^{n} h(e_i, e_i) = \\frac{1}{n} \\text{trace}(h)'}</MathBlock>
            <div className="mt-3 text-slate-400 text-sm space-y-1">
              <p>• <Math>{'\\{e_1, \\ldots, e_n\\}'}</Math>: {isZh ? '切空间的正交基' : 'orthonormal basis of tangent space'}</p>
              <p>• <Math>{'h'}</Math>: {isZh ? '第二基本形式' : 'second fundamental form'}</p>
              <p>• <Math>{'H \\in T^\\perp_p M'}</Math>: {isZh ? 'H是法向量！' : 'H is a normal vector!'}</p>
            </div>
          </div>

          {/* Why "mean"? */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-purple-400 font-semibold mb-2">{isZh ? '为什么叫"平均"曲率？' : 'Why "Mean" Curvature?'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '因为它是所有方向上"法曲率"的平均值。在每个方向u上，h(u,u)给出那个方向的弯曲程度，H是所有这些弯曲的平均。'
                : 'Because it\'s the average of "normal curvatures" over all directions. In each direction u, h(u,u) gives the bending in that direction, and H is the average of all these bendings.'}
            </p>
          </div>

          {/* Examples */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-2">{isZh ? '球面' : 'Sphere'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">{isZh ? '半径为r的球面：' : 'Sphere of radius r:'}
              </p>
              <p className="text-slate-400 text-sm">• H {isZh ? '指向球心' : 'points to center'}</p>
              <p className="text-slate-400 text-sm">• |H| = 1/r</p>
              <p className="text-yellow-400 text-xs mt-2">{isZh ? '小球弯曲大，大球弯曲小' : 'Small sphere bends more'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '肥皂膜' : 'Soap Film'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">{isZh ? '极小曲面：' : 'Minimal surface:'}
              </p>
              <p className="text-slate-400 text-sm">• H = 0</p>
              <p className="text-yellow-400 text-xs mt-2">{isZh ? '曲面不"想"收缩或膨胀' : 'Surface doesn\'t "want" to shrink'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-orange-400 font-semibold mb-2">{isZh ? '圆柱面' : 'Cylinder'}
              </h3>
              <p className="text-slate-300 text-sm mb-2">{isZh ? '半径为r的圆柱：' : 'Cylinder of radius r:'}
              </p>
              <p className="text-slate-400 text-sm">• H {isZh ? '指向轴心' : 'points to axis'}</p>
              <p className="text-slate-400 text-sm">• |H| = 1/(2r)</p>
              <p className="text-yellow-400 text-xs mt-2">{isZh ? '只在一个方向弯曲' : 'Bends in only one direction'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 8.2 - Parallel Mean Curvature */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-8.2" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '8.2 什么是"平行"平均曲率？' : '8.2 What is "Parallel" Mean Curvature?'}
          </h2>

          {/* Intuitive explanation */}
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '🧭 指南针类比' : '🧭 Compass Analogy'}
            </p>
            <p className="text-slate-300 text-sm mb-3">{isZh
                ? '想象你在曲面上走，手里拿着一个"曲率指南针"，指针指向H的方向：'
                : 'Imagine walking on a surface with a "curvature compass" pointing in the direction of H:'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-green-400">{isZh ? '平行' : 'Parallel'}</span>: {isZh ? '无论你怎么走，指针始终保持相同的"姿态"' : 'No matter how you walk, the pointer maintains the same "attitude"'}</li>
              <li>• <span className="text-red-400">{isZh ? '不平行' : 'Not parallel'}</span>: {isZh ? '走动时指针会"旋转"或"摆动"' : 'The pointer "rotates" or "wobbles" as you walk'}</li>
            </ul>
          </div>

          {/* Mathematical definition */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '数学定义' : 'Mathematical Definition'}
            </p>
            <MathBlock>{'\\nabla^\\perp H = 0'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">{isZh
                ? '其中 ∇⊥ 是法丛上的联络（法向协变导数）。这个条件说H在法丛中"不变化"。'
                : 'where ∇⊥ is the connection on the normal bundle. This condition says H "doesn\'t change" in the normal bundle.'}
            </p>
          </div>

          {/* Why is this important */}
          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-purple-400 font-semibold mb-2">{isZh ? '为什么这个条件重要？' : 'Why is This Condition Important?'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• {isZh ? '它是极小曲面（H=0）的自然推广' : 'It\'s a natural generalization of minimal surfaces (H=0)'}</li>
              <li>• {isZh ? '满足这个条件的子流形有特殊的几何结构' : 'Submanifolds satisfying this condition have special geometric structure'}</li>
              <li>• {isZh ? '可以用来证明"刚性定理"——某些条件下子流形必须是特殊形状' : 'Can be used to prove "rigidity theorems"—under certain conditions, submanifolds must be special shapes'}</li>
            </ul>
          </div>

          {/* Examples */}
          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-amber-900/20">
            <p className="text-green-400 font-semibold mb-2">
              ✓ {isZh ? '哪些子流形有平行平均曲率？' : 'Which Submanifolds Have Parallel Mean Curvature?'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• {isZh ? '所有极小子流形（H=0，当然"平行"）' : 'All minimal submanifolds (H=0, trivially "parallel")'}</li>
              <li>• {isZh ? '球面中的"小球面"（全脐子流形）' : '"Small spheres" in spheres (totally umbilical submanifolds)'}</li>
              <li>• {isZh ? '球面中的环面 S¹×Sⁿ⁻¹' : 'Tori S¹×Sⁿ⁻¹ in spheres'}</li>
            </ul>
          </div>
        </section>

        {/* Section 8.3 - Simons Formula */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-8.3" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '8.3 Simons公式简介' : '8.3 Introduction to Simons Formula'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? 'Simons公式是子流形几何中的"超级工具"，以数学家James Simons（后来创立了文艺复兴科技公司）命名。'
              : 'The Simons formula is a "super tool" in submanifold geometry, named after mathematician James Simons (who later founded Renaissance Technologies).'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '公式的作用' : 'What the Formula Does'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? 'Simons公式将第二基本形式h的"Laplacian"（一种二阶导数）与曲率联系起来。这让我们可以用分析学的工具研究几何问题。'
                : 'The Simons formula relates the "Laplacian" of the second fundamental form h (a type of second derivative) to curvature. This allows us to use analytical tools to study geometric problems.'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? 'Laplacian可以理解为一个"张力计"：在曲面上的任何一点，它测量这个点的某个数值与它周围邻居们的平均值之间的差异。如果一个点的值比周围高，就有"向下"的张力；如果比周围低，就有"向上"的张力。通过分析整个曲面上的张力分布，就能洞察形状的内在性质。'
                : 'Think of the Laplacian as a "tension meter": at any point on the surface, it measures the difference between that point\'s value and the average of its neighbors. If a point is higher than its surroundings, there\'s "downward" tension; if lower, "upward" tension. By analyzing the tension distribution across the entire surface, we can reveal the shape\'s intrinsic properties.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-purple-400 font-semibold mb-2">{isZh ? 'Wang-Li的贡献' : 'Wang-Li\'s Contribution'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? 'Wang-Li将Simons公式推广到球面S^(n+p)中有平行平均曲率向量的子流形。他们的版本考虑了球面的曲率（不同于欧氏空间），得到了新的不等式。'
                : 'Wang-Li extended the Simons formula to submanifolds with parallel mean curvature vector in spheres S^(n+p). Their version accounts for the sphere\'s curvature (different from Euclidean space), obtaining new inequalities.'}
            </p>
          </div>
        </section>

        {/* Section 8.4 - Main Theorem */}
        <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border-2 border-purple-600">
          <h2 id="section-8.4" className="text-xl font-semibold text-purple-400 mb-4">{isZh ? '8.4 主要定理：Pinching定理' : '8.4 Main Theorem: Pinching Theorem'}
          </h2>

          {/* What is Pinching */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '什么是"Pinching"？' : 'What is "Pinching"?'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? '"Pinching"意为"夹挤"或"束缚"。数学家先证明某个积分表达式永远 ≥ 0，然后追问：什么情况下它恰好等于零？这个"等于零"就是最关键的临界状态——绝大部分形状都过不了这个筛子。'
                : '"Pinching" means "squeezing". Mathematicians first prove some integral expression is always ≥ 0, then ask: when exactly does it equal zero? This "equals zero" is the critical threshold—most shapes fail this filter.'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? ' 钱包类比：如果你告诉我一个钱包里装的全是正面额的硬币，但总金额是零元，唯一的可能就是钱包是空的——一枚硬币都没有。同理，如果积分等于零而每一项都非负，那每一项都必须恰好为零。这就逼迫所有方向上的主曲率必须相等——形状被完全"锁定"了。'
                : ' Wallet analogy: If all coins in a wallet have positive denomination but the total is zero, the only possibility is the wallet is empty. Similarly, if the integral is zero and every term is non-negative, every term must be exactly zero. This forces all principal curvatures to be equal—the shape is completely "locked down".'}
            </p>
            <p className="text-yellow-400 text-sm">{isZh
                ? '而"平行"条件在这里扮演了"奥卡姆剃刀"的角色——它就像按下了一个"简化按钮"，让Laplacian公式里的大量变化项都自动消失，只留下一个异常简洁的等式，使证明成为可能。'
                : 'The "parallel" condition plays the role of "Occam\'s razor" here—it\'s like pressing a "simplify button" that makes many terms in the Laplacian formula vanish, leaving an exceptionally clean equation that makes the proof possible.'}
            </p>
          </div>

          {/* The theorem */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '定理 (Wang-Li 1998)' : 'Theorem (Wang-Li 1998)'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? '设 M 是单位球面 S^(n+p) 中的紧致子流形，有平行平均曲率向量。若第二基本形式的范数平方 S 满足：'
                : 'Let M be a compact submanifold in the unit sphere S^(n+p) with parallel mean curvature vector. If the squared norm of the second fundamental form S satisfies:'}
            </p>
            <MathBlock>{'S < \\frac{n}{\\alpha}, \\quad \\alpha = \\max\\left\\{\\frac{3}{2}, \\frac{n}{2\\sqrt{n-1}}\\right\\}'}</MathBlock>
            <p className="text-slate-300 text-sm mt-3">{isZh ? '则 M 必须是以下之一：' : 'Then M must be one of:'}
            </p>
            <ul className="text-slate-300 text-sm mt-2 space-y-1 list-disc list-inside">
              <li>{isZh ? '全脐子流形（"小球面" S^n(r)）' : 'Totally umbilical submanifold ("small sphere" S^n(r))'}</li>
              <li>{isZh ? 'S^(n+1) 中的超曲面 S^n(r₀)' : 'Hypersurface S^n(r₀) in S^(n+1)'}</li>
              <li>{isZh ? '环面 S¹(r) × S^(n-1)(s)' : 'Torus S¹(r) × S^(n-1)(s)'}</li>
            </ul>
          </div>

          {/* Intuitive meaning */}
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '直观理解' : 'Intuitive Understanding'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? 'S 测量子流形的"弯曲程度"。定理说：如果一个子流形弯曲得"不太厉害"（S足够小），又有平行平均曲率，那它一定是几种标准的对称形状之一。没有"奇怪"的形状可以满足这些条件！'
                : 'S measures how much the submanifold "bends". The theorem says: if a submanifold doesn\'t bend "too much" (S is small enough), and has parallel mean curvature, then it must be one of a few standard symmetric shapes. No "weird" shapes can satisfy these conditions!'}
            </p>
          </div>
        </section>

        {/* Connection to Contact Number */}
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-red-400 mb-4">{isZh ? '与接触数理论的联系' : 'Connection to Contact Number Theory'}
          </h2>
          <div className="space-y-3 text-slate-300">
            <p>{isZh
                ? '平行平均曲率条件与各向同性条件有深刻联系：'
                : 'The parallel mean curvature condition is deeply connected to the isotropic condition:'}
            </p>
            <ul className="text-sm space-y-2">
              <li>• {isZh ? '全脐子流形（接触数 = ∞）是最特殊的平行平均曲率子流形' : 'Totally umbilical submanifolds (contact number = ∞) are the most special parallel mean curvature submanifolds'}</li>
              <li>• {isZh ? '高接触数蕴含更强的对称性，这与平行平均曲率条件相关' : 'Higher contact number implies stronger symmetry, which relates to parallel mean curvature condition'}</li>
              <li>• {isZh ? 'Pinching定理可以看作是"接近全脐"条件下的刚性结果' : 'Pinching theorem can be viewed as a rigidity result under "nearly umbilical" conditions'}</li>
            </ul>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✓ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>✓ {isZh ? '平均曲率向量H描述曲面"想要移动"的方向' : 'Mean curvature vector H describes the direction a surface "wants to move"'}</li>
            <li>✓ {isZh ? '∇⊥H = 0 表示H在法丛中"不变化"（平行）' : '∇⊥H = 0 means H "doesn\'t change" in the normal bundle (parallel)'}</li>
            <li>✓ {isZh ? 'Simons公式连接几何与分析' : 'Simons formula connects geometry and analysis'}</li>
            <li>✓ {isZh ? 'Pinching定理：弯曲程度有界 → 形状受限' : 'Pinching theorem: bounded bending → restricted shape'}</li>
          </ul>

          {/* Thinking Questions */}
          <div className="mt-6 bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">{isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '1. 肥皂泡是极小曲面（H=0）的经典例子。为什么肥皂泡总是球形的？'
                    : '1. Soap bubbles are classic examples of minimal surfaces (H=0). Why are soap bubbles always spherical?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '准确地说，肥皂泡不是极小曲面（H≠0），而是常平均曲率曲面！极小曲面如肥皂膜（有边界）才是H=0。肥皂泡由于内外压力差，H是非零常数，而球面恰好是闭合的常平均曲率曲面。'
                      : 'Actually, soap bubbles are NOT minimal surfaces (H≠0), but constant mean curvature surfaces! Soap films (with boundaries) have H=0. Due to pressure difference inside/outside, bubbles have constant nonzero H, and spheres are exactly closed constant mean curvature surfaces.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '2. Pinching定理为什么需要"弯曲程度有上界"的条件？如果去掉这个条件会怎样？'
                    : '2. Why does the Pinching theorem need "bounded bending" condition? What happens if we remove it?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '如果允许任意大的弯曲，子流形可以有非常复杂的形状——想象一张纸被随意揉皱。Pinching条件限制了"皱"的程度，使得子流形必须相对"平滑"，从而只能是少数几种规则形状。'
                      : 'If arbitrary bending is allowed, submanifolds can have very complex shapes—imagine paper crumpled arbitrarily. Pinching condition limits the "wrinkliness", forcing the submanifold to be relatively "smooth", leaving only a few regular shapes possible.'}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/7" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/9" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">{t('common.next')}: {t('chapters.ch9.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
