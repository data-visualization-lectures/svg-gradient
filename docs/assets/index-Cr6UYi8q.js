(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const t={chartType:"area",previousChartType:null,barRotationApplied:!1,dataset:[],stops:[],gradient:{angle:90,x1:50,y1:0,x2:50,y2:100,radialDirection:"center-to-edge"}},I={oneColor:{stops:[{offset:0,color:"#21825C",opacity:.6},{offset:80,color:"#FFFFFF",opacity:0}],angle:90},multipleColors:{stops:[{offset:0,color:"#FF3757",opacity:.9},{offset:20,color:"#FF715A",opacity:.7},{offset:40,color:"#FFA974",opacity:.6},{offset:60,color:"#FFDE74",opacity:.4},{offset:100,color:"#FFFFFF",opacity:.2}],angle:90},coolTones:{stops:[{offset:0,color:"#1E90FF",opacity:.8},{offset:50,color:"#87CEEB",opacity:.5},{offset:100,color:"#E0F6FF",opacity:.1}],angle:90},warmTones:{stops:[{offset:0,color:"#FF6B35",opacity:.8},{offset:50,color:"#F7931E",opacity:.5},{offset:100,color:"#FFFACD",opacity:.1}],angle:90}},h={area:O,bar:R,pie:N};window.addEventListener("DOMContentLoaded",function(){k(),E(),v("oneColor"),u()});function E(){d3.json("data.json",function(a,e){if(a){console.error("Error loading data:",a);return}t.dataset=e;const o=d3.time.format("%Y-%m-%d").parse,r=d3.time.format("%m/%d");t.dataset.forEach(function(n){n.date=o(n.date),n.dateLabel=r(n.date)}),y()})}function A(a){if(!h[a]){console.warn("Unsupported chart type:",a);return}t.previousChartType=t.chartType,t.chartType=a,$(),u(),y()}function v(a){const e=I[a];if(!e)return;t.stops=JSON.parse(JSON.stringify(e.stops)),t.gradient.angle=e.angle;const o=x(t.gradient.angle);Object.assign(t.gradient,o),$(),u(),y()}function x(a){a=(a%360+360)%360;const e=a*Math.PI/180,o=Math.cos(e),r=Math.sin(e),n=100,s=f(50-o*n/2,0,100),i=f(50-r*n/2,0,100),l=f(50+o*n/2,0,100),p=f(50+r*n/2,0,100);return{x1:s,y1:i,x2:l,y2:p}}function w(a){const e=a.x2-a.x1,o=a.y2-a.y1;let r=Math.atan2(-o,e)*180/Math.PI;return r=(r%360+360)%360,r}function C(){t.gradient.x1=parseFloat(document.getElementById("x1Input").value),t.gradient.y1=parseFloat(document.getElementById("y1Input").value),t.gradient.x2=parseFloat(document.getElementById("x2Input").value),t.gradient.y2=parseFloat(document.getElementById("y2Input").value),t.gradient.angle=w(t.gradient),u(),y()}function T(a){if(t.chartType==="pie")return;t.gradient.angle=a;const e=x(a);Object.assign(t.gradient,e),u(),y()}function B(a){a!=="center-to-edge"&&a!=="edge-to-center"||(t.gradient.radialDirection=a,u(),y())}function u(){const a=document.getElementById("x1Input"),e=document.getElementById("y1Input"),o=document.getElementById("x2Input"),r=document.getElementById("y2Input"),n=document.getElementById("chartTypeSelect");n&&(n.value=t.chartType);const s=document.getElementById("directionControls"),i=document.getElementById("radialControls"),l=document.getElementById("coordinatesInputs"),p=document.getElementById("addStopButton");s&&(s.style.display=t.chartType==="pie"?"none":"grid"),l&&(l.style.display=t.chartType==="pie"?"none":"grid"),i&&(i.style.display=t.chartType==="pie"?"flex":"none",t.chartType==="pie"&&i.querySelectorAll("button[data-mode]").forEach(c=>{c.getAttribute("data-mode")===t.gradient.radialDirection?c.classList.add("is-active"):c.classList.remove("is-active")})),p&&(p.style.display="inline-block"),a&&e&&o&&r&&(a.value=t.gradient.x1.toFixed(0),e.value=t.gradient.y1.toFixed(0),o.value=t.gradient.x2.toFixed(0),r.value=t.gradient.y2.toFixed(0));const d=document.getElementById("coordinatesDisplay");if(d)if(t.chartType==="pie"){const g=t.gradient.radialDirection==="center-to-edge"?"中心 → 外周":"外周 → 中心";d.innerHTML=`モード: ${g}`}else d.innerHTML=`x1: ${t.gradient.x1.toFixed(0)}%, y1: ${t.gradient.y1.toFixed(0)}%<br>x2: ${t.gradient.x2.toFixed(0)}%, y2: ${t.gradient.y2.toFixed(0)}%`;M(),P(),q()}function G(){const a=t.stops.length>0?t.stops[t.stops.length-1].offset+20:50;t.stops.push({offset:Math.min(100,a),color:"#0000FF",opacity:.5}),u(),y()}function D(a){t.stops.length>2?(t.stops.splice(a,1),u(),y()):alert("最低2つのストップが必要です")}function L(a,e,o){const r=t.stops[a];r&&(e==="offset"?r.offset=f(parseInt(o,10),0,100):e==="color"?r.color=o:e==="opacity"&&(r.opacity=f(parseFloat(o),0,1)),u(),y())}function M(){const a=document.getElementById("stopsContainer");a&&(a.innerHTML="",t.stops.forEach((e,o)=>{const r=document.createElement("div");r.className="stop-item",r.innerHTML=`
			<div class="stop-header">
				<span class="stop-number">ストップ ${o+1}</span>
				${t.stops.length>2?`<button class="btn-danger" onclick="removeStop(${o})">削除</button>`:""}
			</div>
			<div class="color-input-wrapper">
				<input type="color" value="${e.color}" onchange="updateStop(${o}, 'color', this.value)">
					<input type="text" class="color-value" value="${e.color}" onchange="updateStop(${o}, 'color', this.value)">
				</div>
				<div class="stop-controls">
					<div>
						<label class="control-label">オフセット (%)</label>
						<input type="number" min="0" max="100" value="${e.offset}" onchange="updateStop(${o}, 'offset', this.value)">
				</div>
				<div>
					<label class="control-label">不透明度</label>
					<input type="number" min="0" max="1" step="0.1" value="${e.opacity}" onchange="updateStop(${o}, 'opacity', this.value)">
				</div>
			</div>
		`,a.appendChild(r)}))}function P(){const a=document.getElementById("gradientPreview");if(!a)return;let e=`linear-gradient(${t.gradient.angle}deg`;t.stops.forEach(o=>{e+=`, ${o.color} ${o.offset}%`}),e+=")",a.style.background=e}function y(){if(t.dataset.length===0)return;const a=d3.select("#chart");a.selectAll("*").remove();const e={top:30,right:30,bottom:60,left:50},o=800-e.left-e.right,r=400-e.top-e.bottom,n=a.append("svg").attr("width",o+e.left+e.right).attr("height",r+e.top+e.bottom),s=n.append("defs"),i="chartGradient";let l,p=t.stops;t.chartType==="pie"?(l=s.append("radialGradient").attr("id",i).attr("cx","50%").attr("cy","50%").attr("r","75%"),p=j()):l=s.append("linearGradient").attr("id",i).attr("x1",`${t.gradient.x1}%`).attr("y1",`${t.gradient.y1}%`).attr("x2",`${t.gradient.x2}%`).attr("y2",`${t.gradient.y2}%`),l.selectAll("stop").data(p).enter().append("stop").attr("offset",m=>`${m.offset}%`).attr("stop-color",m=>m.color).attr("stop-opacity",m=>m.opacity);const d=n.append("g").attr("transform",`translate(${e.left},${e.top})`),g={margin:e,width:o,height:r,svgRoot:n};(h[t.chartType]||h.area)(d,g,i)}function O(a,e,o){const{width:r,height:n}=e,s=d3.time.scale().domain(d3.extent(t.dataset,c=>c.date)).range([0,r]),i=d3.scale.linear().domain([0,d3.max(t.dataset,c=>c.number)*1.1]).range([n,0]),l=d3.svg.axis().scale(s).orient("bottom").ticks(6),p=d3.svg.axis().scale(i).orient("left").ticks(5),d=d3.svg.area().interpolate("monotone").x(c=>s(c.date)).y0(n).y1(c=>i(c.number)),g=d3.svg.line().interpolate("monotone").x(c=>s(c.date)).y(c=>i(c.number));a.append("g").attr("class","x axis").attr("transform",`translate(0,${n})`).call(l),a.append("g").attr("class","y axis").call(p),a.append("path").attr("class","area").style("fill",`url(#${o})`).attr("d",d(t.dataset)),a.append("path").attr("class","line").attr("d",g(t.dataset)),a.selectAll(".lineDots").data(t.dataset).enter().append("circle").attr("class","lineDots").attr("r",3).attr("cx",c=>s(c.date)).attr("cy",c=>i(c.number))}function R(a,e,o){const{width:r,height:n}=e,s=d3.scale.ordinal().domain(t.dataset.map(d=>d.date)).rangeRoundBands([0,r],.1),i=d3.scale.linear().domain([0,d3.max(t.dataset,d=>d.number)*1.1]).range([n,0]),l=d3.svg.axis().scale(s).orient("bottom").tickFormat(d3.time.format("%m/%d")),p=d3.svg.axis().scale(i).orient("left").ticks(5);a.append("g").attr("class","x axis").attr("transform",`translate(0,${n})`).call(l).selectAll("text").style("text-anchor","end").attr("dx","-0.6em").attr("dy","0.15em").attr("transform","rotate(-40)"),a.append("g").attr("class","y axis").call(p),a.selectAll(".bar").data(t.dataset).enter().append("rect").attr("class","bar").attr("x",d=>s(d.date)).attr("y",d=>i(d.number)).attr("width",s.rangeBand()).attr("height",d=>n-i(d.number)).style("fill",`url(#${o})`)}function N(a,e,o){const{width:r,height:n}=e,s=Math.min(r,n)/2,i=a.append("g").attr("transform",`translate(${r/2},${n/2})`),l=d3.layout.pie().sort(null).value(d=>d.number),p=d3.svg.arc().outerRadius(s).innerRadius(0);i.selectAll(".slice").data(l(t.dataset)).enter().append("path").attr("class","slice").attr("d",p).style("fill",`url(#${o})`)}function j(){const a=t.stops.map(e=>({offset:f(e.offset,0,100),color:e.color,opacity:f(e.opacity,0,1)}));return t.gradient.radialDirection==="edge-to-center"?a.map(e=>({offset:f(100-e.offset,0,100),color:e.color,opacity:e.opacity})).sort((e,o)=>e.offset-o.offset):a.sort((e,o)=>e.offset-o.offset)}function q(){const a=t.gradient,e=t.stops.map(s=>`  { offset: "${s.offset}%", color: "${s.color}", opacity: ${s.opacity} }`).join(`,
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
  .style("fill", "url(#chartGradient)");`};document.getElementById("exportCode").textContent=o,document.getElementById("svgCode").textContent=r[t.chartType]||"",document.getElementById("applyCode").textContent=n[t.chartType]||""}function $(){if(t.chartType==="bar"&&F(t.gradient.angle,270))b(),t.barRotationApplied=!0;else if(t.chartType==="bar")t.barRotationApplied=!1;else if(t.chartType==="area")t.previousChartType==="bar"&&t.barRotationApplied&&F(t.gradient.angle,90)&&b(),t.barRotationApplied=!1;else if(t.chartType==="pie"){const a=t.stops[0],e=t.stops[t.stops.length-1];a&&(a.offset=0),e&&(e.offset=100),t.barRotationApplied=!1}}function k(){document.querySelectorAll("[data-accordion]").forEach(e=>{const o=e.querySelector("[data-accordion-toggle]"),r=e.querySelector("[data-accordion-content]");if(!o||!r)return;const n=s=>{s?(e.classList.add("is-open"),r.style.display="block"):(e.classList.remove("is-open"),r.style.display="none"),o.setAttribute("aria-expanded",s?"true":"false")};n(e.classList.contains("is-open")),o.addEventListener("click",()=>{const s=!e.classList.contains("is-open");n(s)})})}function b(){t.gradient.angle=S(t.gradient.angle+180);const a=x(t.gradient.angle);Object.assign(t.gradient,a)}function S(a){return(a%360+360)%360}function F(a,e){return Math.abs(S(a)-e)<.1}function f(a,e,o){return isNaN(a)?e:Math.max(e,Math.min(o,a))}window.setChartType=A;window.applyPreset=v;window.setDirection=T;window.setPieDirection=B;window.updateFromCoordinates=C;window.addStop=G;window.removeStop=D;window.updateStop=L;
