import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MathBlock } from '../components';
import { GeodesicVizWithLabels } from '../visualizations';

export default function Chapter3() {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="chapter-anchor" aria-hidden="true">🛤️</span>
          <p className="text-cyan-400 text-sm">{t('nav.chapter', { num: 3 })}</p>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t('chapters.ch3.title')}</h1>
        <p className="text-slate-400">{t('chapters.ch3.subtitle')}</p>
      </header>

      <div className="space-y-8">
        {/* Intro analogy */}
        <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">{isZh ? '蚂蚁的视角' : "An Ant's Perspective"}
          </h2>
          <p className="text-slate-300 mb-4">{isZh
              ? '想象你是一只住在球面上的蚂蚁。你想从A点"直走"到B点。但什么是"直"？你看不到球的外部，只能感受脚下的曲面。你的"直线"就是测地线！'
              : 'Imagine you\'re an ant living on a sphere. You want to walk "straight" from point A to B. But what is "straight"? You can\'t see outside the sphere, only feel the surface under your feet. Your "straight line" is a geodesic!'}
          </p>
          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-2">{isZh ? '地球上的例子' : 'Example on Earth'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '飞机从北京飞往纽约，不是沿着地图上的"直线"飞，而是沿着大圆飞行。这是因为大圆是球面上的测地线——真正的最短路径！'
                : 'Planes flying from Beijing to New York don\'t follow the "straight line" on a map, but fly along a great circle. That\'s because great circles are geodesics on a sphere—the true shortest path!'}
            </p>
          </div>
        </section>

        {/* Section 3.1 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-3.1" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '3.1 什么是"直"？' : '3.1 What is "Straight"?'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? '在平面上，"直线"很容易理解：两点之间最短的路径。但在弯曲的曲面上呢？'
              : 'On a plane, a "straight line" is easy to understand: the shortest path between two points. But on a curved surface?'}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-2">{isZh ? '平面上的直线' : 'Straight Line on a Plane'}
              </h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>✓ {isZh ? '两点间最短路径' : 'Shortest path between two points'}</li>
                <li>✓ {isZh ? '不转弯' : 'No turning'}</li>
                <li>✓ {isZh ? '可以无限延伸' : 'Can extend infinitely'}</li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-2">{isZh ? '球面上的"直线"' : '"Straight Line" on a Sphere'}
              </h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>✓ {isZh ? '两点间最短路径（大圆弧）' : 'Shortest path (great circle arc)'}</li>
                <li>✓ {isZh ? '局部不转弯' : 'No local turning'}</li>
                <li>✓ {isZh ? '最终会绕回起点！' : 'Eventually returns to start!'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive visualization - after geodesic concept introduced */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '交互可视化：球面上的测地线' : 'Interactive: Geodesics on a Sphere'}
          </h2>
          <GeodesicVizWithLabels />
          <p className="text-slate-400 text-sm mt-4">{isZh
              ? '拖动旋转球面。青色实线是测地线（大圆），橙色虚线是纬线圈（不是测地线）。'
              : 'Drag to rotate. Cyan solid lines are geodesics (great circles), orange dashed lines are latitude circles (not geodesics).'}
          </p>
        </section>

        {/* Section 3.2 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-3.2" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '3.2 测地线的定义' : '3.2 Definition of Geodesic'}
          </h2>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-4 border border-amber-900/20 mb-4">
            <p className="text-blue-400 font-semibold mb-2">{isZh ? '🚗 开车类比' : '🚗 Driving Analogy'}
            </p>
            <p className="text-slate-300 text-sm mb-2">{isZh
                ? '想象在曲面上放一辆没有方向盘、也无法刹车的小车。一旦给它一个初始速度，它就只能凭着惯性往前滑——方向盘固定不动，只需要踩油门。在弯曲的曲面上，这种路径从外部看会弯曲，但对于曲面上的"居民"来说，它感觉是"直"的。'
                : 'Imagine placing a car with no steering wheel and no brakes on a curved surface. Once given an initial push, it just coasts on inertia—steering wheel locked, only the gas pedal matters. On a curved surface, this path appears curved from outside, but for "residents" on the surface, it feels perfectly "straight".'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '这辆小车划出的轨迹就是测地线——完全由曲面自身的形状决定，不受外界影响。这就是"内蕴"的含义：测地线只和脚下的"地形"有关。'
                : 'The path this car traces is a geodesic—determined entirely by the surface\'s own shape, with no external influence. This is what "intrinsic" means: geodesics depend only on the "terrain" beneath.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '内蕴定义' : 'Intrinsic Definition'}
            </p>
            <p className="text-slate-300 mb-2">{isZh
                ? '测地线是测地曲率为零的曲线。测地曲率测量曲线"在曲面内转弯"的程度。'
                : 'A geodesic is a curve with zero geodesic curvature. Geodesic curvature measures how much the curve "turns within the surface".'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '数学公式' : 'Mathematical Formula'}
            </p>
            <MathBlock>{'\\nabla_{\\gamma\'} \\gamma\' = 0'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">{isZh
                ? '含义：速度向量沿曲线的协变导数为零——"加速度"在切空间内为零。'
                : 'Meaning: The covariant derivative of the velocity vector along the curve is zero—"acceleration" within the tangent space is zero.'}
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '常见流形上的测地线' : 'Geodesics on Common Manifolds'}
            </p>
            <ul className="text-slate-300 text-sm space-y-2">
              <li>• <span className="text-cyan-400">{isZh ? '平面' : 'Plane'}</span>: {isZh ? '普通直线' : 'Ordinary straight lines'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '球面' : 'Sphere'}</span>: {isZh ? '大圆（如赤道、经线圈）' : 'Great circles (like equator, meridians)'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '圆柱面' : 'Cylinder'}</span>: {isZh ? '直线、圆、螺旋线' : 'Straight lines, circles, helices'}</li>
              <li>• <span className="text-cyan-400">{isZh ? '环面（甜甜圈）' : 'Torus (donut)'}</span>: {isZh ? '更复杂！有些会绕很多圈才闭合' : 'More complex! Some wind many times before closing'}</li>
            </ul>
          </div>
        </section>

        {/* Section 3.3 */}
        <section className="bg-slate-900 rounded-xl p-6">
          <h2 id="section-3.3" className="text-xl font-semibold text-cyan-400 mb-4">{isZh ? '3.3 单位切丛' : '3.3 Unit Tangent Bundle'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? '后续章节中，我们需要考虑流形上所有可能的"起点+方向"组合。'
              : 'In later chapters, we\'ll need to consider all possible "starting point + direction" combinations on the manifold.'}
          </p>

          <div className="bg-slate-800 rounded-lg p-4 mb-4">
            <p className="text-cyan-300 font-semibold mb-2">{isZh ? '定义' : 'Definition'}
            </p>
            <MathBlock>{'U_pM = \\{ u \\in T_pM : |u| = 1 \\}'}</MathBlock>
            <p className="text-slate-400 text-sm mt-2">{isZh
                ? '在点p处的单位切丛：所有长度为1的切向量的集合。'
                : 'Unit tangent bundle at point p: the set of all tangent vectors with length 1.'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-amber-900/20">
            <p className="text-green-400 font-semibold mb-2">{isZh ? '🧭 指南针类比' : '🧭 Compass Analogy'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '想象在流形上每一点放一个指南针。指南针可以指向任何方向（360°）。所有"位置+指针方向"的组合就是单位切丛UM。'
                : 'Imagine placing a compass at each point on the manifold. The compass can point in any direction (360°). All "position + pointer direction" combinations form the unit tangent bundle UM.'}
            </p>
          </div>
        </section>

        {/* Section 3.4 - Key connection */}
        <section className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-xl p-6 border-2 border-amber-900/20">
          <h2 id="section-3.4" className="text-xl font-semibold text-red-400 mb-4">{isZh ? '3.4 测地线的重要性' : '3.4 Why Geodesics Matter'}
          </h2>

          <p className="text-slate-300 mb-4">{isZh
              ? '给定任意 (p, u) ∈ UM，存在唯一的单位速度测地线：'
              : 'Given any (p, u) ∈ UM, there exists a unique unit-speed geodesic:'}
          </p>

          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <MathBlock>{'\\gamma_u(0) = p, \\quad \\gamma_u\'(0) = u'}</MathBlock>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-2">{isZh ? '预告' : 'Preview'}
            </p>
            <p className="text-slate-300 text-sm">{isZh
                ? '测地线 γ_u 代表流形的"内蕴"几何——完全由流形本身决定，不依赖于嵌入方式。在第四章中，我们将引入另一条曲线（法截线），然后比较这两条曲线的差异。'
                : 'Geodesic γ_u represents the "intrinsic" geometry of the manifold—completely determined by the manifold itself, independent of embedding. In Chapter 4, we\'ll introduce another curve (normal section) and compare the difference between these two curves.'}
            </p>
          </div>

          {/* Thinking Questions */}
          <div className="mt-4 bg-slate-800 rounded-lg p-4">
            <p className="text-yellow-400 font-semibold mb-3">{isZh ? '思考题' : 'Questions to Think About'}
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '1. 在环面（甜甜圈）上，从某点出发的测地线会绕回原点吗？'
                    : '1. On a torus (donut), will geodesics starting from a point return to that point?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '取决于方向！某些方向的测地线会闭合（绕回来），而另一些方向的测地线永远不会闭合——它会无限地缠绕在环面上，越来越密集地覆盖表面。'
                      : 'It depends on direction! Some directions give closed geodesics (return), while others never close—they wind infinitely around the torus, covering the surface more and more densely.'}
                  </p>
                </details>
              </div>
              <div>
                <p className="text-slate-300 text-sm">{isZh
                    ? '2. 为什么飞机从北京飞往纽约不走"直线"（地图上的直线）？'
                    : '2. Why don\'t planes fly in a "straight line" (straight on a map) from Beijing to New York?'}
                </p>
                <details className="mt-1">
                  <summary className="text-cyan-400 text-sm cursor-pointer hover:text-cyan-300">{isZh ? '点击查看答案' : 'Click to see answer'}
                  </summary>
                  <p className="text-slate-400 text-xs mt-1">{isZh
                      ? '因为地球是球面，最短路径是大圆弧（测地线），而不是地图上的直线！地图会扭曲距离，所以"地图直线"实际上比大圆弧更长。飞机走的弧形路线才是真正的"最短路径"。'
                      : 'Because Earth is a sphere, the shortest path is a great circle arc (geodesic), not a straight line on a map! Maps distort distances, so "map straight lines" are actually longer than great circle arcs. The curved flight path is the true "shortest path".'}
                  </p>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Summary */}
        <section className="bg-gradient-to-r from-green-900/50 to-cyan-900/50 rounded-xl p-6 border border-amber-900/20">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            ✓ {isZh ? '本章小结' : 'Chapter Summary'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-cyan-400 font-semibold mb-2">{isZh ? '核心概念' : 'Core Concepts'}</p>
              <ul className="text-slate-300 space-y-1">
                <li>✓ {isZh ? '测地线：流形上的"最短路径"，弯曲空间中的直线' : 'Geodesic: "shortest path" on manifold, straight line in curved space'}</li>
                <li>✓ {isZh ? '测地线只取决于流形本身（内蕴性质）' : 'Geodesic depends only on the manifold itself (intrinsic property)'}</li>
                <li>✓ {isZh ? '不同流形上测地线形态各异：球面大圆、环面螺旋线等' : 'Geodesics vary on different manifolds: great circles on sphere, spirals on torus, etc.'}</li>
              </ul>
            </div>
            <div>
              <p className="text-yellow-400 font-semibold mb-2">{isZh ? '关键要点' : 'Key Takeaways'}</p>
              <ul className="text-slate-300 space-y-1">
                <li>✓ {isZh ? '测地线的"直"是相对于流形而言的' : '"Straight" for geodesics is relative to the manifold'}</li>
                <li>✓ {isZh ? '地球上飞机沿大圆弧飞行就是测地线的实际应用' : 'Airplanes flying great circle arcs is a real application of geodesics'}</li>
                <li>✓ {isZh ? '测地线将在后续章节与法截线对比，引出接触数' : 'Geodesics will be compared with normal sections later to define contact number'}</li>
              </ul>
            </div>
          </div>
          <p className="text-green-400 text-sm mt-4">{isZh ? '下一章：我们将学习法截线——从外部空间切割子流形得到的曲线，它与测地线有何不同？' : 'Next: We\'ll learn about normal sections — curves from cutting the submanifold with ambient planes. How do they differ from geodesics?'}
          </p>
        </section>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link to="/chapter/2" className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors">
            ← {t('common.prev')}
          </Link>
          <Link to="/chapter/4" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">{t('common.next')}: {t('chapters.ch4.title')} →
          </Link>
        </div>
      </div>
    </div>
  );
}
