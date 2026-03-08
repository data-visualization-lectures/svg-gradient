// i18next initialization
i18next.init({
	lng: navigator.language.startsWith('ja') ? 'ja' : 'en',
	fallbackLng: 'en',
	resources: {
		ja: {
			translation: {
				appTitle: 'SVG グラデーションエディタ',
				appSubtitle: 'リアルタイムにグラデーションを調整し、SVGコードとして出力できます。',
				chartTypeLabel: 'チャートタイプ',
				presetTitle: 'プリセット',
				preset1: 'シンプルグラデ（2色）',
				preset2: '複雑グラデ（5色）',
				preset3: 'クール系（3色）',
				preset4: 'ウォーム系（3色）',
				directionTitle: 'グラデーション方向',
				coordinatesLabel: '座標:',
				upBtn: '↑ 上',
				rightBtn: '→ 右',
				downBtn: '↓ 下',
				leftBtn: '← 左',
				centerToEdgeBtn: '中心 → 外周',
				edgeToCenterBtn: '外周 → 中心',
				x1Label: '開始点 X (%)',
				y1Label: '開始点 Y (%)',
				x2Label: '終点 X (%)',
				y2Label: '終点 Y (%)',
				colorStopsTitle: 'カラーストップ',
				addStopBtnLabel: '+ ストップを追加',
				previewLabel: 'プレビュー',
				exportCodeLabel: 'エクスポートコード',
				createdGradientLabel: '作成したグラデーション',
				gradientDefLabel: 'コード例：グラデーション定義',
				applyExampleLabel: 'コード例：チャートへの適用',
				areaChartOption: 'エリアチャート',
				barChartOption: '棒グラフ',
				pieChartOption: '円グラフ',
				minStopsRequired: '最低2つのストップが必要です',
				stopLabel: 'ストップ',
				removeLabel: '削除',
				offsetLabel: 'オフセット (%)',
				opacityLabel: '不透明度',
				modeLabel: 'モード',
				centerToEdge: '中心 → 外周',
				edgeToCenter: '外周 → 中心'
			}
		},
		en: {
			translation: {
				appTitle: 'SVG Gradient Editor',
				appSubtitle: 'Adjust gradients in real-time and export them as SVG code.',
				chartTypeLabel: 'Chart Type',
				presetTitle: 'Presets',
				preset1: 'Simple Gradient (2 colors)',
				preset2: 'Complex Gradient (5 colors)',
				preset3: 'Cool Tones (3 colors)',
				preset4: 'Warm Tones (3 colors)',
				directionTitle: 'Gradient Direction',
				coordinatesLabel: 'Coordinates:',
				upBtn: '↑ Up',
				rightBtn: '→ Right',
				downBtn: '↓ Down',
				leftBtn: '← Left',
				centerToEdgeBtn: 'Center → Edge',
				edgeToCenterBtn: 'Edge → Center',
				x1Label: 'Start X (%)',
				y1Label: 'Start Y (%)',
				x2Label: 'End X (%)',
				y2Label: 'End Y (%)',
				colorStopsTitle: 'Color Stops',
				addStopBtnLabel: '+ Add Stop',
				previewLabel: 'Preview',
				exportCodeLabel: 'Export Code',
				createdGradientLabel: 'Created Gradient',
				gradientDefLabel: 'Code Example: Gradient Definition',
				applyExampleLabel: 'Code Example: Apply to Chart',
				areaChartOption: 'Area Chart',
				barChartOption: 'Bar Chart',
				pieChartOption: 'Pie Chart',
				minStopsRequired: 'At least 2 stops are required',
				stopLabel: 'Stop',
				removeLabel: 'Remove',
				offsetLabel: 'Offset (%)',
				opacityLabel: 'Opacity',
				modeLabel: 'Mode',
				centerToEdge: 'Center → Edge',
				edgeToCenter: 'Edge → Center'
			}
		}
	}
});

function initializeUI() {
	// Update page title
	document.title = i18next.t('appTitle');

	// Update all HTML text elements
	const textElements = {
		'appTitle': 'appTitle',
		'appSubtitle': 'appSubtitle',
		'chartTypeLabel': 'chartTypeLabel',
		'presetTitle': 'presetTitle',
		'preset1': 'preset1',
		'preset2': 'preset2',
		'preset3': 'preset3',
		'preset4': 'preset4',
		'directionTitle': 'directionTitle',
		'coordinatesLabel': 'coordinatesLabel',
		'upBtn': 'upBtn',
		'rightBtn': 'rightBtn',
		'downBtn': 'downBtn',
		'leftBtn': 'leftBtn',
		'centerToEdgeBtn': 'centerToEdgeBtn',
		'edgeToCenterBtn': 'edgeToCenterBtn',
		'x1Label': 'x1Label',
		'y1Label': 'y1Label',
		'x2Label': 'x2Label',
		'y2Label': 'y2Label',
		'colorStopsTitle': 'colorStopsTitle',
		'addStopButton': 'addStopBtnLabel',
		'previewLabel': 'previewLabel',
		'exportCodeLabel': 'exportCodeLabel',
		'createdGradientLabel': 'createdGradientLabel',
		'gradientDefLabel': 'gradientDefLabel',
		'applyExampleLabel': 'applyExampleLabel',
		'areaChartOption': 'areaChartOption',
		'barChartOption': 'barChartOption',
		'pieChartOption': 'pieChartOption'
	};

	Object.entries(textElements).forEach(([elementId, translationKey]) => {
		const element = document.getElementById(elementId);
		if (element) {
			element.textContent = i18next.t(translationKey);
		}
	});
}


// アプリケーション状態
const state = {
	chartType: 'area',
	previousChartType: null,
	barRotationApplied: false,
	dataset: [],
	stops: [],
	gradient: {
		angle: 90,
		x1: 50,
		y1: 0,
		x2: 50,
		y2: 100,
		radialDirection: 'center-to-edge'
	}
};

// プリセット定義
const presets = {
	oneColor: {
		stops: [
			{ offset: 0, color: "#21825C", opacity: 0.6 },
			{ offset: 80, color: "#FFFFFF", opacity: 0 }
		],
		angle: 90
	},
	multipleColors: {
		stops: [
			{ offset: 0, color: "#FF3757", opacity: 0.9 },
			{ offset: 20, color: "#FF715A", opacity: 0.7 },
			{ offset: 40, color: "#FFA974", opacity: 0.6 },
			{ offset: 60, color: "#FFDE74", opacity: 0.4 },
			{ offset: 100, color: "#FFFFFF", opacity: 0.2 }
		],
		angle: 90
	},
	coolTones: {
		stops: [
			{ offset: 0, color: "#1E90FF", opacity: 0.8 },
			{ offset: 50, color: "#87CEEB", opacity: 0.5 },
			{ offset: 100, color: "#E0F6FF", opacity: 0.1 }
		],
		angle: 90
	},
	warmTones: {
		stops: [
			{ offset: 0, color: "#FF6B35", opacity: 0.8 },
			{ offset: 50, color: "#F7931E", opacity: 0.5 },
			{ offset: 100, color: "#FFFACD", opacity: 0.1 }
		],
		angle: 90
	}
};

// 描画関数マップ
const chartRenderers = {
	area: renderAreaChart,
	bar: renderBarChart,
	pie: renderPieChart
};

// Setup language
function setupLanguage() {
	document.documentElement.lang = i18next.language;
	initializeUI();
}

// 初期化
window.addEventListener('DOMContentLoaded', function() {
	setupLanguage();
	initAccordions();
	loadData();
	applyPreset('oneColor');
	updateUI();
});

// データ読み込み
function loadData() {
	d3.json("data.json", function(error, data) {
		if (error) {
			console.error("Error loading data:", error);
			return;
		}
		state.dataset = data;
		const parseDate = d3.time.format("%Y-%m-%d").parse;
		const formatShortDate = d3.time.format("%m/%d");
		state.dataset.forEach(function(d) {
			d.date = parseDate(d.date);
			d.dateLabel = formatShortDate(d.date);
		});
		drawChart();
	});
}

// チャートタイプ切り替え
function setChartType(type) {
	if (!chartRenderers[type]) {
		console.warn("Unsupported chart type:", type);
		return;
	}
	state.previousChartType = state.chartType;
	state.chartType = type;
	adjustChartGradientDefaults();
	updateUI();
	drawChart();
}

// プリセット適用
function applyPreset(presetName) {
	const preset = presets[presetName];
	if (!preset) return;
	state.stops = JSON.parse(JSON.stringify(preset.stops));
	state.gradient.angle = preset.angle;
	const coords = angleToCoordinates(state.gradient.angle);
	Object.assign(state.gradient, coords);
	adjustChartGradientDefaults();
	updateUI();
	drawChart();
}

// 角度から座標に変換
function angleToCoordinates(angle) {
	angle = ((angle % 360) + 360) % 360;
	const radian = (angle * Math.PI) / 180;
	const cos = Math.cos(radian);
	const sin = Math.sin(radian);
	const distance = 100;

	const x1 = clamp(50 - (cos * distance / 2), 0, 100);
	const y1 = clamp(50 - (sin * distance / 2), 0, 100);
	const x2 = clamp(50 + (cos * distance / 2), 0, 100);
	const y2 = clamp(50 + (sin * distance / 2), 0, 100);

	return { x1, y1, x2, y2 };
}

// 座標から角度に変換
function coordinatesToAngle(gradient) {
	const dx = gradient.x2 - gradient.x1;
	const dy = gradient.y2 - gradient.y1;
	let angle = Math.atan2(-dy, dx) * 180 / Math.PI;
	angle = ((angle % 360) + 360) % 360;
	return angle;
}

// 角度スライダーの変更
function updateFromAngle(angle) {
	state.gradient.angle = parseInt(angle, 10);
	const coords = angleToCoordinates(state.gradient.angle);
	Object.assign(state.gradient, coords);
	updateUI();
	drawChart();
}

// 座標入力の変更
function updateFromCoordinates() {
	state.gradient.x1 = parseFloat(document.getElementById('x1Input').value);
	state.gradient.y1 = parseFloat(document.getElementById('y1Input').value);
	state.gradient.x2 = parseFloat(document.getElementById('x2Input').value);
	state.gradient.y2 = parseFloat(document.getElementById('y2Input').value);
	state.gradient.angle = coordinatesToAngle(state.gradient);
	updateUI();
	drawChart();
}

// 方向ボタンの設定
function setDirection(angle) {
	if (state.chartType === 'pie') return;
	state.gradient.angle = angle;
	const coords = angleToCoordinates(angle);
	Object.assign(state.gradient, coords);
	updateUI();
	drawChart();
}

// 円グラフ用グラデーション方向
function setPieDirection(mode) {
	if (mode !== 'center-to-edge' && mode !== 'edge-to-center') return;
	state.gradient.radialDirection = mode;
	updateUI();
	drawChart();
}

// UIの更新
function updateUI() {
	const x1Input = document.getElementById('x1Input');
	const y1Input = document.getElementById('y1Input');
	const x2Input = document.getElementById('x2Input');
	const y2Input = document.getElementById('y2Input');
	const chartTypeSelect = document.getElementById('chartTypeSelect');

	if (chartTypeSelect) {
		chartTypeSelect.value = state.chartType;
	}

	const directionControls = document.getElementById('directionControls');
	const radialControls = document.getElementById('radialControls');
	const coordinatesInputs = document.getElementById('coordinatesInputs');
	const addStopButton = document.getElementById('addStopButton');

	if (directionControls) {
		directionControls.style.display = state.chartType === 'pie' ? 'none' : 'grid';
	}

	if (coordinatesInputs) {
		coordinatesInputs.style.display = state.chartType === 'pie' ? 'none' : 'grid';
	}

	if (radialControls) {
		radialControls.style.display = state.chartType === 'pie' ? 'flex' : 'none';
		if (state.chartType === 'pie') {
			const buttons = radialControls.querySelectorAll('button[data-mode]');
			buttons.forEach(button => {
				const mode = button.getAttribute('data-mode');
				if (mode === state.gradient.radialDirection) {
					button.classList.add('is-active');
				} else {
					button.classList.remove('is-active');
				}
			});
		}
	}

	if (addStopButton) {
		addStopButton.style.display = 'inline-block';
	}

	if (x1Input && y1Input && x2Input && y2Input) {
		x1Input.value = state.gradient.x1.toFixed(0);
		y1Input.value = state.gradient.y1.toFixed(0);
		x2Input.value = state.gradient.x2.toFixed(0);
		y2Input.value = state.gradient.y2.toFixed(0);
	}

	const display = document.getElementById('coordinatesDisplay');
	if (display) {
		if (state.chartType === 'pie') {
			const label = state.gradient.radialDirection === 'center-to-edge' ? i18next.t('centerToEdge') : i18next.t('edgeToCenter');
			display.innerHTML = `${i18next.t('modeLabel')}: ${label}`;
		} else {
			display.innerHTML = `x1: ${state.gradient.x1.toFixed(0)}%, y1: ${state.gradient.y1.toFixed(0)}%<br>x2: ${state.gradient.x2.toFixed(0)}%, y2: ${state.gradient.y2.toFixed(0)}%`;
		}
	}

	renderStops();
	updateGradientPreview();
	updateExportCode();
}

// ストップを追加
function addStop() {
	const newOffset = state.stops.length > 0 ? state.stops[state.stops.length - 1].offset + 20 : 50;
	state.stops.push({
		offset: Math.min(100, newOffset),
		color: "#0000FF",
		opacity: 0.5
	});
	updateUI();
	drawChart();
}

// ストップを削除
function removeStop(index) {
	if (state.stops.length > 2) {
		state.stops.splice(index, 1);
		updateUI();
		drawChart();
	} else {
		alert(i18next.t('minStopsRequired'));
	}
}

// ストップを更新
function updateStop(index, field, value) {
	const stop = state.stops[index];
	if (!stop) return;

	if (field === 'offset') {
		stop.offset = clamp(parseInt(value, 10), 0, 100);
	} else if (field === 'color') {
		stop.color = value;
	} else if (field === 'opacity') {
		stop.opacity = clamp(parseFloat(value), 0, 1);
	}
	updateUI();
	drawChart();
}

// ストップのレンダリング
function renderStops() {
	const container = document.getElementById('stopsContainer');
	if (!container) return;

	container.innerHTML = '';

	state.stops.forEach((stop, index) => {
		const stopElement = document.createElement('div');
		stopElement.className = 'stop-item';
		stopElement.innerHTML = `
			<div class="stop-header">
				<span class="stop-number">${i18next.t('stopLabel')} ${index + 1}</span>
				${state.stops.length > 2 ? `<button class="btn-danger" onclick="removeStop(${index})">${i18next.t('removeLabel')}</button>` : ''}
			</div>
			<div class="color-input-wrapper">
				<input type="color" value="${stop.color}" onchange="updateStop(${index}, 'color', this.value)">
					<input type="text" class="color-value" value="${stop.color}" onchange="updateStop(${index}, 'color', this.value)">
				</div>
				<div class="stop-controls">
					<div>
						<label class="control-label">${i18next.t('offsetLabel')}</label>
						<input type="number" min="0" max="100" value="${stop.offset}" onchange="updateStop(${index}, 'offset', this.value)">
				</div>
				<div>
					<label class="control-label">${i18next.t('opacityLabel')}</label>
					<input type="number" min="0" max="1" step="0.1" value="${stop.opacity}" onchange="updateStop(${index}, 'opacity', this.value)">
				</div>
			</div>
		`;
		container.appendChild(stopElement);
	});
}

// グラデーションプレビューの更新
function updateGradientPreview() {
	const preview = document.getElementById('gradientPreview');
	if (!preview) return;

	let gradientString = `linear-gradient(${state.gradient.angle}deg`;
	state.stops.forEach(stop => {
		gradientString += `, ${stop.color} ${stop.offset}%`;
	});
	gradientString += ')';

	preview.style.background = gradientString;
}

// チャート描画エントリ
function drawChart() {
	if (state.dataset.length === 0) return;

	const chart = d3.select("#chart");
	chart.selectAll("*").remove();

	const margin = { top: 30, right: 30, bottom: 60, left: 50 };
	const width = 800 - margin.left - margin.right;
	const height = 400 - margin.top - margin.bottom;

	const svgRoot = chart.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);

	const defs = svgRoot.append("defs");
	const gradientId = "chartGradient";

	let gradient;
	let stopsData = state.stops;

	if (state.chartType === 'pie') {
		gradient = defs.append("radialGradient")
			.attr("id", gradientId)
			.attr("cx", "50%")
			.attr("cy", "50%")
			.attr("r", "75%");
		stopsData = getPieGradientStops();
	} else {
		gradient = defs.append("linearGradient")
			.attr("id", gradientId)
			.attr("x1", `${state.gradient.x1}%`)
			.attr("y1", `${state.gradient.y1}%`)
			.attr("x2", `${state.gradient.x2}%`)
			.attr("y2", `${state.gradient.y2}%`);
	}

	gradient.selectAll("stop")
		.data(stopsData)
		.enter()
		.append("stop")
		.attr("offset", d => `${d.offset}%`)
		.attr("stop-color", d => d.color)
		.attr("stop-opacity", d => d.opacity);

	const svg = svgRoot.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	const dims = { margin, width, height, svgRoot };
	const renderer = chartRenderers[state.chartType] || chartRenderers.area;
	renderer(svg, dims, gradientId);
}

// エリアチャート描画
function renderAreaChart(svg, dims, gradientId) {
	const { width, height } = dims;

	const xScale = d3.time.scale()
		.domain(d3.extent(state.dataset, d => d.date))
		.range([0, width]);

	const yScale = d3.scale.linear()
		.domain([0, d3.max(state.dataset, d => d.number) * 1.1])
		.range([height, 0]);

	const xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(6);

	const yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5);

	const areaFunction = d3.svg.area()
		.interpolate("monotone")
		.x(d => xScale(d.date))
		.y0(height)
		.y1(d => yScale(d.number));

	const lineFunction = d3.svg.line()
		.interpolate("monotone")
		.x(d => xScale(d.date))
		.y(d => yScale(d.number));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", `translate(0,${height})`)
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	svg.append("path")
		.attr("class", "area")
		.style("fill", `url(#${gradientId})`)
		.attr("d", areaFunction(state.dataset));

	svg.append("path")
		.attr("class", "line")
		.attr("d", lineFunction(state.dataset));

	svg.selectAll(".lineDots")
		.data(state.dataset)
		.enter()
		.append("circle")
		.attr("class", "lineDots")
		.attr("r", 3)
		.attr("cx", d => xScale(d.date))
		.attr("cy", d => yScale(d.number));
}

// 棒グラフ描画
function renderBarChart(svg, dims, gradientId) {
	const { width, height } = dims;

	const xScale = d3.scale.ordinal()
		.domain(state.dataset.map(d => d.date))
		.rangeRoundBands([0, width], 0.1);

	const yScale = d3.scale.linear()
		.domain([0, d3.max(state.dataset, d => d.number) * 1.1])
		.range([height, 0]);

	const xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.tickFormat(d3.time.format("%m/%d"));

	const yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5);

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", `translate(0,${height})`)
		.call(xAxis)
		.selectAll("text")
		.style("text-anchor", "end")
		.attr("dx", "-0.6em")
		.attr("dy", "0.15em")
		.attr("transform", "rotate(-40)");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	svg.selectAll(".bar")
		.data(state.dataset)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", d => xScale(d.date))
		.attr("y", d => yScale(d.number))
		.attr("width", xScale.rangeBand())
		.attr("height", d => height - yScale(d.number))
		.style("fill", `url(#${gradientId})`);
}

// 円グラフ描画
function renderPieChart(svg, dims, gradientId) {
	const { width, height } = dims;
	const radius = Math.min(width, height) / 2;

	const pieGroup = svg.append("g")
		.attr("transform", `translate(${width / 2},${height / 2})`);

	const pie = d3.layout.pie()
		.sort(null)
		.value(d => d.number);

	const arc = d3.svg.arc()
		.outerRadius(radius)
		.innerRadius(0);

	pieGroup.selectAll(".slice")
		.data(pie(state.dataset))
		.enter()
		.append("path")
		.attr("class", "slice")
		.attr("d", arc)
		.style("fill", `url(#${gradientId})`);
}

// 円グラフ用ストップ配列
function getPieGradientStops() {
	const baseStops = state.stops.map(stop => ({
		offset: clamp(stop.offset, 0, 100),
		color: stop.color,
		opacity: clamp(stop.opacity, 0, 1)
	}));

	if (state.gradient.radialDirection === 'edge-to-center') {
		return baseStops
			.map(stop => ({
				offset: clamp(100 - stop.offset, 0, 100),
				color: stop.color,
				opacity: stop.opacity
			}))
			.sort((a, b) => a.offset - b.offset);
	}

	return baseStops.sort((a, b) => a.offset - b.offset);
}

// エクスポートコードの更新
function updateExportCode() {
	const gradient = state.gradient;
	const stopsArray = state.stops.map(stop =>
		`  { offset: "${stop.offset}%", color: "${stop.color}", opacity: ${stop.opacity} }`
	).join(',\n');

	let gradientCode;
	if (state.chartType === 'pie') {
		gradientCode = `const gradient = {
  type: "radial",
  direction: "${state.gradient.radialDirection}",
  stops: [
${stopsArray}
  ]
};`;
	} else {
		gradientCode = `const gradient = {
  x1: "${gradient.x1.toFixed(0)}%",
  y1: "${gradient.y1.toFixed(0)}%",
  x2: "${gradient.x2.toFixed(0)}%",
  y2: "${gradient.y2.toFixed(0)}%",
  stops: [
${stopsArray}
  ]
};`;
	}

	const svgSnippets = {
		area: `const chartGradient = svg.append('defs')
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
  .attr("stop-opacity", d => d.opacity);`,
		bar: `const chartGradient = svg.append('defs')
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
  .attr("stop-opacity", d => d.opacity);`,
		pie: `const chartGradient = svg.append('defs')
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
  .attr("stop-opacity", d => d.opacity);`
	};

	const applySnippets = {
		area: `svg.append("path")
  .attr("class", "area")
  .style("fill", "url(#chartGradient)")
  .attr("d", areaFunction(dataset));`,
		bar: `svg.selectAll(".bar")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d.date))
  .attr("y", d => yScale(d.number))
  .attr("width", xScale.rangeBand())
  .attr("height", d => height - yScale(d.number))
  .style("fill", "url(#chartGradient)");`,
		pie: `svg.selectAll(".slice")
  .data(pie(dataset))
  .enter()
  .append("path")
  .attr("class", "slice")
  .attr("d", arc)
  .style("fill", "url(#chartGradient)");`
	};

	document.getElementById('exportCode').textContent = gradientCode;
	document.getElementById('svgCode').textContent = svgSnippets[state.chartType] || '';
	document.getElementById('applyCode').textContent = applySnippets[state.chartType] || '';
}

function adjustChartGradientDefaults() {
	if (state.chartType === 'bar' && isAngleApproximately(state.gradient.angle, 270)) {
		rotateGradientBy180();
		state.barRotationApplied = true;
	} else if (state.chartType === 'bar') {
		state.barRotationApplied = false;
	} else if (state.chartType === 'area') {
		if (state.previousChartType === 'bar' && state.barRotationApplied && isAngleApproximately(state.gradient.angle, 90)) {
			rotateGradientBy180();
		}
		state.barRotationApplied = false;
	} else if (state.chartType === 'pie') {
		const firstStop = state.stops[0];
		const lastStop = state.stops[state.stops.length - 1];
		if (firstStop) firstStop.offset = 0;
		if (lastStop) lastStop.offset = 100;
		state.barRotationApplied = false;
	}
}

function initAccordions() {
	const accordions = document.querySelectorAll('[data-accordion]');
	accordions.forEach(acc => {
		const toggle = acc.querySelector('[data-accordion-toggle]');
		const content = acc.querySelector('[data-accordion-content]');
		if (!toggle || !content) return;

		const applyState = (isOpen) => {
			if (isOpen) {
				acc.classList.add('is-open');
				content.style.display = 'block';
			} else {
				acc.classList.remove('is-open');
				content.style.display = 'none';
			}
			toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		};

		applyState(acc.classList.contains('is-open'));

		toggle.addEventListener('click', () => {
			const willOpen = !acc.classList.contains('is-open');
			applyState(willOpen);
		});
	});
}

function rotateGradientBy180() {
	state.gradient.angle = normalizeAngle(state.gradient.angle + 180);
	const coords = angleToCoordinates(state.gradient.angle);
	Object.assign(state.gradient, coords);
}

function normalizeAngle(angle) {
	return ((angle % 360) + 360) % 360;
}

function isAngleApproximately(angle, target) {
	return Math.abs(normalizeAngle(angle) - target) < 0.1;
}

// ユーティリティ
function clamp(value, min, max) {
	if (isNaN(value)) return min;
	return Math.max(min, Math.min(max, value));
}

// Expose functions to window for HTML event handlers
window.setChartType = setChartType;
window.applyPreset = applyPreset;
window.setDirection = setDirection;
window.setPieDirection = setPieDirection;
window.updateFromCoordinates = updateFromCoordinates;
window.addStop = addStop;
window.removeStop = removeStop;
window.updateStop = updateStop;
