(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();i18next.init({lng:navigator.language.startsWith("ja")?"ja":"en",fallbackLng:"en",resources:{ja:{translation:{appTitle:"SVG グラデーションエディタ",appSubtitle:"リアルタイムにグラデーションを調整し、SVGコードとして出力できます。",chartTypeLabel:"チャートタイプ",presetTitle:"プリセット",preset1:"シンプルグラデ（2色）",preset2:"複雑グラデ（5色）",preset3:"クール系（3色）",preset4:"ウォーム系（3色）",directionTitle:"グラデーション方向",coordinatesLabel:"座標:",upBtn:"↑ 上",rightBtn:"→ 右",downBtn:"↓ 下",leftBtn:"← 左",centerToEdgeBtn:"中心 → 外周",edgeToCenterBtn:"外周 → 中心",x1Label:"開始点 X (%)",y1Label:"開始点 Y (%)",x2Label:"終点 X (%)",y2Label:"終点 Y (%)",colorStopsTitle:"カラーストップ",addStopBtnLabel:"+ ストップを追加",previewLabel:"プレビュー",exportCodeLabel:"エクスポートコード",createdGradientLabel:"作成したグラデーション",gradientDefLabel:"コード例：グラデーション定義",applyExampleLabel:"コード例：チャートへの適用",areaChartOption:"エリアチャート",barChartOption:"棒グラフ",pieChartOption:"円グラフ",minStopsRequired:"最低2つのストップが必要です",stopLabel:"ストップ",removeLabel:"削除",offsetLabel:"オフセット (%)",opacityLabel:"不透明度",modeLabel:"モード",centerToEdge:"中心 → 外周",edgeToCenter:"外周 → 中心"}},en:{translation:{appTitle:"SVG Gradient Editor",appSubtitle:"Adjust gradients in real-time and export them as SVG code.",chartTypeLabel:"Chart Type",presetTitle:"Presets",preset1:"Simple Gradient (2 colors)",preset2:"Complex Gradient (5 colors)",preset3:"Cool Tones (3 colors)",preset4:"Warm Tones (3 colors)",directionTitle:"Gradient Direction",coordinatesLabel:"Coordinates:",upBtn:"↑ Up",rightBtn:"→ Right",downBtn:"↓ Down",leftBtn:"← Left",centerToEdgeBtn:"Center → Edge",edgeToCenterBtn:"Edge → Center",x1Label:"Start X (%)",y1Label:"Start Y (%)",x2Label:"End X (%)",y2Label:"End Y (%)",colorStopsTitle:"Color Stops",addStopBtnLabel:"+ Add Stop",previewLabel:"Preview",exportCodeLabel:"Export Code",createdGradientLabel:"Created Gradient",gradientDefLabel:"Code Example: Gradient Definition",applyExampleLabel:"Code Example: Apply to Chart",areaChartOption:"Area Chart",barChartOption:"Bar Chart",pieChartOption:"Pie Chart",minStopsRequired:"At least 2 stops are required",stopLabel:"Stop",removeLabel:"Remove",offsetLabel:"Offset (%)",opacityLabel:"Opacity",modeLabel:"Mode",centerToEdge:"Center → Edge",edgeToCenter:"Edge → Center"}}}});function S(){document.title=i18next.t("appTitle"),Object.entries({appTitle:"appTitle",appSubtitle:"appSubtitle",chartTypeLabel:"chartTypeLabel",presetTitle:"presetTitle",preset1:"preset1",preset2:"preset2",preset3:"preset3",preset4:"preset4",directionTitle:"directionTitle",coordinatesLabel:"coordinatesLabel",upBtn:"upBtn",rightBtn:"rightBtn",downBtn:"downBtn",leftBtn:"leftBtn",centerToEdgeBtn:"centerToEdgeBtn",edgeToCenterBtn:"edgeToCenterBtn",x1Label:"x1Label",y1Label:"y1Label",x2Label:"x2Label",y2Label:"y2Label",colorStopsTitle:"colorStopsTitle",addStopButton:"addStopBtnLabel",previewLabel:"previewLabel",exportCodeLabel:"exportCodeLabel",createdGradientLabel:"createdGradientLabel",gradientDefLabel:"gradientDefLabel",applyExampleLabel:"applyExampleLabel",areaChartOption:"areaChartOption",barChartOption:"barChartOption",pieChartOption:"pieChartOption"}).forEach(([e,o])=>{const r=document.getElementById(e);r&&(r.textContent=i18next.t(o))})}const t={chartType:"area",previousChartType:null,barRotationApplied:!1,dataset:[],stops:[],gradient:{angle:90,x1:50,y1:0,x2:50,y2:100,radialDirection:"center-to-edge"}},E={oneColor:{stops:[{offset:0,color:"#21825C",opacity:.6},{offset:80,color:"#FFFFFF",opacity:0}],angle:90},multipleColors:{stops:[{offset:0,color:"#FF3757",opacity:.9},{offset:20,color:"#FF715A",opacity:.7},{offset:40,color:"#FFA974",opacity:.6},{offset:60,color:"#FFDE74",opacity:.4},{offset:100,color:"#FFFFFF",opacity:.2}],angle:90},coolTones:{stops:[{offset:0,color:"#1E90FF",opacity:.8},{offset:50,color:"#87CEEB",opacity:.5},{offset:100,color:"#E0F6FF",opacity:.1}],angle:90},warmTones:{stops:[{offset:0,color:"#FF6B35",opacity:.8},{offset:50,color:"#F7931E",opacity:.5},{offset:100,color:"#FFFACD",opacity:.1}],angle:90}},h={area:j,bar:q,pie:N};function F(){document.documentElement.lang=i18next.language,S()}window.addEventListener("DOMContentLoaded",function(){F(),H(),B(),C("oneColor"),u()});function B(){d3.json("data.json",function(a,e){if(a){console.error("Error loading data:",a);return}t.dataset=e;const o=d3.time.format("%Y-%m-%d").parse,r=d3.time.format("%m/%d");t.dataset.forEach(function(n){n.date=o(n.date),n.dateLabel=r(n.date)}),g()})}function $(a){if(!h[a]){console.warn("Unsupported chart type:",a);return}t.previousChartType=t.chartType,t.chartType=a,T(),u(),g()}function C(a){const e=E[a];if(!e)return;t.stops=JSON.parse(JSON.stringify(e.stops)),t.gradient.angle=e.angle;const o=b(t.gradient.angle);Object.assign(t.gradient,o),T(),u(),g()}function b(a){a=(a%360+360)%360;const e=a*Math.PI/180,o=Math.cos(e),r=Math.sin(e),n=100,i=f(50-o*n/2,0,100),s=f(50-r*n/2,0,100),c=f(50+o*n/2,0,100),p=f(50+r*n/2,0,100);return{x1:i,y1:s,x2:c,y2:p}}function w(a){const e=a.x2-a.x1,o=a.y2-a.y1;let r=Math.atan2(-o,e)*180/Math.PI;return r=(r%360+360)%360,r}function A(){t.gradient.x1=parseFloat(document.getElementById("x1Input").value),t.gradient.y1=parseFloat(document.getElementById("y1Input").value),t.gradient.x2=parseFloat(document.getElementById("x2Input").value),t.gradient.y2=parseFloat(document.getElementById("y2Input").value),t.gradient.angle=w(t.gradient),u(),g()}function I(a){if(t.chartType==="pie")return;t.gradient.angle=a;const e=b(a);Object.assign(t.gradient,e),u(),g()}function G(a){a!=="center-to-edge"&&a!=="edge-to-center"||(t.gradient.radialDirection=a,u(),g())}function u(){const a=document.getElementById("x1Input"),e=document.getElementById("y1Input"),o=document.getElementById("x2Input"),r=document.getElementById("y2Input"),n=document.getElementById("chartTypeSelect");n&&(n.value=t.chartType);const i=document.getElementById("directionControls"),s=document.getElementById("radialControls"),c=document.getElementById("coordinatesInputs"),p=document.getElementById("addStopButton");i&&(i.style.display=t.chartType==="pie"?"none":"grid"),c&&(c.style.display=t.chartType==="pie"?"none":"grid"),s&&(s.style.display=t.chartType==="pie"?"flex":"none",t.chartType==="pie"&&s.querySelectorAll("button[data-mode]").forEach(l=>{l.getAttribute("data-mode")===t.gradient.radialDirection?l.classList.add("is-active"):l.classList.remove("is-active")})),p&&(p.style.display="inline-block"),a&&e&&o&&r&&(a.value=t.gradient.x1.toFixed(0),e.value=t.gradient.y1.toFixed(0),o.value=t.gradient.x2.toFixed(0),r.value=t.gradient.y2.toFixed(0));const d=document.getElementById("coordinatesDisplay");if(d)if(t.chartType==="pie"){const y=t.gradient.radialDirection==="center-to-edge"?i18next.t("centerToEdge"):i18next.t("edgeToCenter");d.innerHTML=`${i18next.t("modeLabel")}: ${y}`}else d.innerHTML=`x1: ${t.gradient.x1.toFixed(0)}%, y1: ${t.gradient.y1.toFixed(0)}%<br>x2: ${t.gradient.x2.toFixed(0)}%, y2: ${t.gradient.y2.toFixed(0)}%`;P(),R(),Y()}function D(){const a=t.stops.length>0?t.stops[t.stops.length-1].offset+20:50;t.stops.push({offset:Math.min(100,a),color:"#0000FF",opacity:.5}),u(),g()}function O(a){t.stops.length>2?(t.stops.splice(a,1),u(),g()):alert(i18next.t("minStopsRequired"))}function M(a,e,o){const r=t.stops[a];r&&(e==="offset"?r.offset=f(parseInt(o,10),0,100):e==="color"?r.color=o:e==="opacity"&&(r.opacity=f(parseFloat(o),0,1)),u(),g())}function P(){const a=document.getElementById("stopsContainer");a&&(a.innerHTML="",t.stops.forEach((e,o)=>{const r=document.createElement("div");r.className="stop-item",r.innerHTML=`
			<div class="stop-header">
				<span class="stop-number">${i18next.t("stopLabel")} ${o+1}</span>
				${t.stops.length>2?`<button class="btn-danger" onclick="removeStop(${o})">${i18next.t("removeLabel")}</button>`:""}
			</div>
			<div class="color-input-wrapper">
				<input type="color" value="${e.color}" onchange="updateStop(${o}, 'color', this.value)">
					<input type="text" class="color-value" value="${e.color}" onchange="updateStop(${o}, 'color', this.value)">
				</div>
				<div class="stop-controls">
					<div>
						<label class="control-label">${i18next.t("offsetLabel")}</label>
						<input type="number" min="0" max="100" value="${e.offset}" onchange="updateStop(${o}, 'offset', this.value)">
				</div>
				<div>
					<label class="control-label">${i18next.t("opacityLabel")}</label>
					<input type="number" min="0" max="1" step="0.1" value="${e.opacity}" onchange="updateStop(${o}, 'opacity', this.value)">
				</div>
			</div>
		`,a.appendChild(r)}))}function R(){const a=document.getElementById("gradientPreview");if(!a)return;let e=`linear-gradient(${t.gradient.angle}deg`;t.stops.forEach(o=>{e+=`, ${o.color} ${o.offset}%`}),e+=")",a.style.background=e}function g(){if(t.dataset.length===0)return;const a=d3.select("#chart");a.selectAll("*").remove();const e={top:30,right:30,bottom:60,left:50},o=800-e.left-e.right,r=400-e.top-e.bottom,n=a.append("svg").attr("width",o+e.left+e.right).attr("height",r+e.top+e.bottom),i=n.append("defs"),s="chartGradient";let c,p=t.stops;t.chartType==="pie"?(c=i.append("radialGradient").attr("id",s).attr("cx","50%").attr("cy","50%").attr("r","75%"),p=k()):c=i.append("linearGradient").attr("id",s).attr("x1",`${t.gradient.x1}%`).attr("y1",`${t.gradient.y1}%`).attr("x2",`${t.gradient.x2}%`).attr("y2",`${t.gradient.y2}%`),c.selectAll("stop").data(p).enter().append("stop").attr("offset",m=>`${m.offset}%`).attr("stop-color",m=>m.color).attr("stop-opacity",m=>m.opacity);const d=n.append("g").attr("transform",`translate(${e.left},${e.top})`),y={margin:e,width:o,height:r,svgRoot:n};(h[t.chartType]||h.area)(d,y,s)}function j(a,e,o){const{width:r,height:n}=e,i=d3.time.scale().domain(d3.extent(t.dataset,l=>l.date)).range([0,r]),s=d3.scale.linear().domain([0,d3.max(t.dataset,l=>l.number)*1.1]).range([n,0]),c=d3.svg.axis().scale(i).orient("bottom").ticks(6),p=d3.svg.axis().scale(s).orient("left").ticks(5),d=d3.svg.area().interpolate("monotone").x(l=>i(l.date)).y0(n).y1(l=>s(l.number)),y=d3.svg.line().interpolate("monotone").x(l=>i(l.date)).y(l=>s(l.number));a.append("g").attr("class","x axis").attr("transform",`translate(0,${n})`).call(c),a.append("g").attr("class","y axis").call(p),a.append("path").attr("class","area").style("fill",`url(#${o})`).attr("d",d(t.dataset)),a.append("path").attr("class","line").attr("d",y(t.dataset)),a.selectAll(".lineDots").data(t.dataset).enter().append("circle").attr("class","lineDots").attr("r",3).attr("cx",l=>i(l.date)).attr("cy",l=>s(l.number))}function q(a,e,o){const{width:r,height:n}=e,i=d3.scale.ordinal().domain(t.dataset.map(d=>d.date)).rangeRoundBands([0,r],.1),s=d3.scale.linear().domain([0,d3.max(t.dataset,d=>d.number)*1.1]).range([n,0]),c=d3.svg.axis().scale(i).orient("bottom").tickFormat(d3.time.format("%m/%d")),p=d3.svg.axis().scale(s).orient("left").ticks(5);a.append("g").attr("class","x axis").attr("transform",`translate(0,${n})`).call(c).selectAll("text").style("text-anchor","end").attr("dx","-0.6em").attr("dy","0.15em").attr("transform","rotate(-40)"),a.append("g").attr("class","y axis").call(p),a.selectAll(".bar").data(t.dataset).enter().append("rect").attr("class","bar").attr("x",d=>i(d.date)).attr("y",d=>s(d.number)).attr("width",i.rangeBand()).attr("height",d=>n-s(d.number)).style("fill",`url(#${o})`)}function N(a,e,o){const{width:r,height:n}=e,i=Math.min(r,n)/2,s=a.append("g").attr("transform",`translate(${r/2},${n/2})`),c=d3.layout.pie().sort(null).value(d=>d.number),p=d3.svg.arc().outerRadius(i).innerRadius(0);s.selectAll(".slice").data(c(t.dataset)).enter().append("path").attr("class","slice").attr("d",p).style("fill",`url(#${o})`)}function k(){const a=t.stops.map(e=>({offset:f(e.offset,0,100),color:e.color,opacity:f(e.opacity,0,1)}));return t.gradient.radialDirection==="edge-to-center"?a.map(e=>({offset:f(100-e.offset,0,100),color:e.color,opacity:e.opacity})).sort((e,o)=>e.offset-o.offset):a.sort((e,o)=>e.offset-o.offset)}function Y(){const a=t.gradient,e=t.stops.map(i=>`  { offset: "${i.offset}%", color: "${i.color}", opacity: ${i.opacity} }`).join(`,
`);let o;t.chartType==="pie"?o=`const gradient = {
  type: "radial",
  direction: "${t.gradient.radialDirection}",
  stops: [
${e}
  ]
};`:o=`const gradient = {
  x1: "${a.x1.toFixed(0)}%",
  y1: "${a.y1.toFixed(0)}%",
  x2: "${a.x2.toFixed(0)}%",
  y2: "${a.y2.toFixed(0)}%",
  stops: [
${e}
  ]
};`;const r={area:`const chartGradient = svg.append('defs')
  .append("linearGradient")
  .attr('id', 'chartGradient')
  .attr("x1", gradient.x1)
  .attr("y1", gradient.y1)
  .attr("x2", gradient.x2)
  .attr("y2", gradient.y2);

chartGradient.selectAll("stop")
  .data(gradient.stops)
  .enter()
  .append("stop")
  .attr("offset", d => d.offset)
  .attr("stop-color", d => d.color)
  .attr("stop-opacity", d => d.opacity);`,bar:`const chartGradient = svg.append('defs')
  .append("linearGradient")
  .attr('id', 'chartGradient')
  .attr("x1", gradient.x1)
  .attr("y1", gradient.y1)
  .attr("x2", gradient.x2)
  .attr("y2", gradient.y2);

chartGradient.selectAll("stop")
  .data(gradient.stops)
  .enter()
  .append("stop")
  .attr("offset", d => d.offset)
  .attr("stop-color", d => d.color)
  .attr("stop-opacity", d => d.opacity);`,pie:`const chartGradient = svg.append('defs')
  .append("radialGradient")
  .attr('id', 'chartGradient')
  .attr("cx", "50%")
  .attr("cy", "50%")
  .attr("r", "75%");

const stops = gradient.direction === "edge-to-center"
  ? gradient.stops.map(stop => ({
      offset: \`\${100 - parseFloat(stop.offset)}%\`,
      color: stop.color,
      opacity: stop.opacity
    })).sort((a, b) => parseFloat(a.offset) - parseFloat(b.offset))
  : gradient.stops;

chartGradient.selectAll("stop")
  .data(stops)
  .enter()
  .append("stop")
  .attr("offset", d => d.offset)
  .attr("stop-color", d => d.color)
  .attr("stop-opacity", d => d.opacity);`},n={area:`svg.append("path")
  .attr("class", "area")
  .style("fill", "url(#chartGradient)")
  .attr("d", areaFunction(dataset));`,bar:`svg.selectAll(".bar")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d.date))
  .attr("y", d => yScale(d.number))
  .attr("width", xScale.rangeBand())
  .attr("height", d => height - yScale(d.number))
  .style("fill", "url(#chartGradient)");`,pie:`svg.selectAll(".slice")
  .data(pie(dataset))
  .enter()
  .append("path")
  .attr("class", "slice")
  .attr("d", arc)
  .style("fill", "url(#chartGradient)");`};document.getElementById("exportCode").textContent=o,document.getElementById("svgCode").textContent=r[t.chartType]||"",document.getElementById("applyCode").textContent=n[t.chartType]||""}function T(){if(t.chartType==="bar"&&L(t.gradient.angle,270))x(),t.barRotationApplied=!0;else if(t.chartType==="bar")t.barRotationApplied=!1;else if(t.chartType==="area")t.previousChartType==="bar"&&t.barRotationApplied&&L(t.gradient.angle,90)&&x(),t.barRotationApplied=!1;else if(t.chartType==="pie"){const a=t.stops[0],e=t.stops[t.stops.length-1];a&&(a.offset=0),e&&(e.offset=100),t.barRotationApplied=!1}}function H(){document.querySelectorAll("[data-accordion]").forEach(e=>{const o=e.querySelector("[data-accordion-toggle]"),r=e.querySelector("[data-accordion-content]");if(!o||!r)return;const n=i=>{i?(e.classList.add("is-open"),r.style.display="block"):(e.classList.remove("is-open"),r.style.display="none"),o.setAttribute("aria-expanded",i?"true":"false")};n(e.classList.contains("is-open")),o.addEventListener("click",()=>{const i=!e.classList.contains("is-open");n(i)})})}function x(){t.gradient.angle=v(t.gradient.angle+180);const a=b(t.gradient.angle);Object.assign(t.gradient,a)}function v(a){return(a%360+360)%360}function L(a,e){return Math.abs(v(a)-e)<.1}function f(a,e,o){return isNaN(a)?e:Math.max(e,Math.min(o,a))}window.setChartType=$;window.applyPreset=C;window.setDirection=I;window.setPieDirection=G;window.updateFromCoordinates=A;window.addStop=D;window.removeStop=O;window.updateStop=M;
