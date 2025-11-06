// グローバル変数
let dataset = [];
let stops = [];
let gradientAngle = 270;
let x1 = 0, y1 = 100, x2 = 0, y2 = 0;

// プリセット定義
const presets = {
	oneColor: {
		stops: [
			{ offset: 0, color: "#21825C", opacity: 0.6 },
			{ offset: 80, color: "#FFFFFF", opacity: 0 }
		],
		angle: 270
	},
	multipleColors: {
		stops: [
			{ offset: 0, color: "#FF3757", opacity: 0.9 },
			{ offset: 20, color: "#FF715A", opacity: 0.7 },
			{ offset: 40, color: "#FFA974", opacity: 0.6 },
			{ offset: 60, color: "#FFDE74", opacity: 0.4 },
			{ offset: 100, color: "#FFFFFF", opacity: 0.2 }
		],
		angle: 270
	},
	coolTones: {
		stops: [
			{ offset: 0, color: "#1E90FF", opacity: 0.8 },
			{ offset: 50, color: "#87CEEB", opacity: 0.5 },
			{ offset: 100, color: "#E0F6FF", opacity: 0.1 }
		],
		angle: 270
	},
	warmTones: {
		stops: [
			{ offset: 0, color: "#FF6B35", opacity: 0.8 },
			{ offset: 50, color: "#F7931E", opacity: 0.5 },
			{ offset: 100, color: "#FFFACD", opacity: 0.1 }
		],
		angle: 270
	}
};

// 初期化
window.addEventListener('DOMContentLoaded', function() {
	loadData();
	applyPreset('oneColor');
});

// データ読み込み
function loadData() {
	d3.json("data.json", function(error, data) {
		if (error) {
			console.error("Error loading data:", error);
			return;
		}
		dataset = data;
		// 日付をパース
		const parseDate = d3.time.format("%Y-%m-%d").parse;
		dataset.forEach(function(d) {
			d.date = parseDate(d.date);
		});
		drawChart();
	});
}

// プリセット適用
function applyPreset(presetName) {
	const preset = presets[presetName];
	stops = JSON.parse(JSON.stringify(preset.stops));
	gradientAngle = preset.angle;
	angleToCoordinates(gradientAngle);
	updateUI();
	drawChart();
}

// 角度から座標に変換
function angleToCoordinates(angle) {
	// 角度を正規化 (0-360)
	angle = ((angle % 360) + 360) % 360;

	// ラジアンに変換
	const radian = (angle * Math.PI) / 180;

	// 単位円上の点
	const cos = Math.cos(radian);
	const sin = Math.sin(radian);

	// グラデーション開始点と終点を計算（中心から外側へ）
	const distance = 100;
	x1 = 50 - (cos * distance / 2);
	y1 = 50 - (sin * distance / 2);
	x2 = 50 + (cos * distance / 2);
	y2 = 50 + (sin * distance / 2);

	// 値を0-100の範囲にクリップ
	x1 = Math.max(0, Math.min(100, x1));
	y1 = Math.max(0, Math.min(100, y1));
	x2 = Math.max(0, Math.min(100, x2));
	y2 = Math.max(0, Math.min(100, y2));
}

// 座標から角度に変換
function coordinatesToAngle() {
	const dx = x2 - x1;
	const dy = y2 - y1;
	let angle = Math.atan2(-dy, dx) * 180 / Math.PI;
	angle = ((angle % 360) + 360) % 360;
	return angle;
}

// 角度スライダーの変更
function updateFromAngle(angle) {
	gradientAngle = parseInt(angle);
	angleToCoordinates(gradientAngle);
	updateUI();
	drawChart();
}

// 座標入力の変更
function updateFromCoordinates() {
	x1 = parseFloat(document.getElementById('x1Input').value);
	y1 = parseFloat(document.getElementById('y1Input').value);
	x2 = parseFloat(document.getElementById('x2Input').value);
	y2 = parseFloat(document.getElementById('y2Input').value);
	gradientAngle = coordinatesToAngle();
	updateUI();
	drawChart();
}

// 方向ボタンの設定
function setDirection(angle) {
	gradientAngle = angle;
	angleToCoordinates(angle);
	updateUI();
	drawChart();
}

// UIの更新
function updateUI() {
	document.getElementById('x1Input').value = x1.toFixed(0);
	document.getElementById('y1Input').value = y1.toFixed(0);
	document.getElementById('x2Input').value = x2.toFixed(0);
	document.getElementById('y2Input').value = y2.toFixed(0);
	document.getElementById('coordinatesDisplay').innerHTML =
		`x1: ${x1.toFixed(0)}%, y1: ${y1.toFixed(0)}%<br>x2: ${x2.toFixed(0)}%, y2: ${y2.toFixed(0)}%`;

	renderStops();
	updateGradientPreview();
	updateExportCode();
}

// ストップを追加
function addStop() {
	const newOffset = stops.length > 0 ? stops[stops.length - 1].offset + 20 : 50;
	stops.push({
		offset: Math.min(100, newOffset),
		color: "#0000FF",
		opacity: 0.5
	});
	updateUI();
	drawChart();
}

// ストップを削除
function removeStop(index) {
	if (stops.length > 2) {
		stops.splice(index, 1);
		updateUI();
		drawChart();
	} else {
		alert("最低2つのストップが必要です");
	}
}

// ストップを更新
function updateStop(index, field, value) {
	if (field === 'offset') {
		stops[index].offset = Math.max(0, Math.min(100, parseInt(value)));
	} else if (field === 'color') {
		stops[index].color = value;
	} else if (field === 'opacity') {
		stops[index].opacity = Math.max(0, Math.min(1, parseFloat(value)));
	}
	updateUI();
	drawChart();
}

// ストップのレンダリング
function renderStops() {
	const container = document.getElementById('stopsContainer');
	container.innerHTML = '';

	stops.forEach((stop, index) => {
		const stopElement = document.createElement('div');
		stopElement.className = 'stop-item';
		stopElement.innerHTML = `
			<div class="stop-header">
				<span class="stop-number">ストップ ${index + 1}</span>
				${stops.length > 2 ? `<button class="btn-danger" onclick="removeStop(${index})">削除</button>` : ''}
			</div>
			<div class="color-input-wrapper">
				<input type="color" value="${stop.color}" onchange="updateStop(${index}, 'color', this.value)">
				<input type="text" class="color-value" value="${stop.color}" onchange="updateStop(${index}, 'color', this.value)">
			</div>
			<div class="stop-controls">
				<div>
					<label class="control-label">オフセット (%)</label>
					<input type="number" min="0" max="100" value="${stop.offset}" onchange="updateStop(${index}, 'offset', this.value)">
				</div>
				<div>
					<label class="control-label">不透明度</label>
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
	let gradientString = `linear-gradient(${gradientAngle}deg`;

	stops.forEach(stop => {
		gradientString += `, ${stop.color} ${stop.offset}%`;
	});
	gradientString += ')';

	preview.style.background = gradientString;
}

// チャートの描画
function drawChart() {
	if (dataset.length === 0) return;

	// 既存のチャートをクリア
	d3.select("#chart").selectAll("*").remove();

	// 寸法設定
	const margin = {top: 30, right: 30, bottom: 30, left: 50};
	const width = 800 - margin.left - margin.right;
	const height = 400 - margin.top - margin.bottom;

	// スケール設定
	const xScale = d3.time.scale()
		.domain(d3.extent(dataset, function(d) { return d.date; }))
		.range([0, width]);

	const yScale = d3.scale.linear()
		.domain([0, d3.max(dataset, function(d) { return d.number; }) * 1.1])
		.range([height, 0]);

	// 軸設定
	const xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(6);

	const yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left")
		.ticks(5);

	// 線関数
	const lineFunction = d3.svg.line()
		.interpolate("monotone")
		.x(function(d) { return xScale(d.date); })
		.y(function(d) { return yScale(d.number); });

	// エリア関数
	const areaFunction = d3.svg.area()
		.interpolate("monotone")
		.x(function(d) { return xScale(d.date); })
		.y0(height)
		.y1(function(d) { return yScale(d.number); });

	// SVG作成
	const svg = d3.select("#chart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// グラデーション定義
	const areaGradient = svg.append('defs')
		.append("linearGradient")
		.attr('id', 'areaGradient')
		.attr("x1", x1 + "%").attr("y1", y1 + "%")
		.attr("x2", x2 + "%").attr("y2", y2 + "%");

	// ストップの追加
	areaGradient.selectAll("stop")
		.data(stops)
		.enter().append("stop")
		.attr("offset", function(d) { return d.offset + "%"; })
		.attr("stop-color", function(d) { return d.color; })
		.attr("stop-opacity", function(d) { return d.opacity; });

	// X軸
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// Y軸
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

	// エリアチャート（グラデーション付き）
	svg.append("path")
		.attr("class", "area")
		.style("fill", "url(#areaGradient)")
		.attr("d", areaFunction(dataset));

	// ライン
	svg.append("path")
		.attr("class", "line")
		.attr("d", lineFunction(dataset));

	// ドット
	svg.selectAll(".lineDots")
		.data(dataset)
		.enter().append("circle")
		.attr("class", "lineDots")
		.attr("r", 3)
		.attr("cx", function(d) { return xScale(d.date); })
		.attr("cy", function(d) { return yScale(d.number); });
}

// エクスポートコードの更新
function updateExportCode() {
	// ストップをJavaScript配列として生成
	const stopsArray = stops.map(stop =>
		`  { offset: "${stop.offset}%", color: "${stop.color}", opacity: ${stop.opacity} }`
	).join(',\n');

	// ====== 1. グラデーション定義 ======
	const code = `const gradient = {
  x1: "${x1.toFixed(0)}%",
  y1: "${y1.toFixed(0)}%",
  x2: "${x2.toFixed(0)}%",
  y2: "${y2.toFixed(0)}%",
  stops: [
${stopsArray}
  ]
};`;

	// ====== 2. グラデーション定義をSVGに追加 ======
	const svgCode = `const areaGradient = svg.append('defs').append("linearGradient").attr('id', 'areaGradient').attr("x1", gradient.x1).attr("y1", gradient.y1).attr("x2", gradient.x2).attr("y2", gradient.y2);

areaGradient.selectAll("stop").data(gradient.stops).enter().append("stop").attr("offset", d => d.offset).attr("stop-color", d => d.color).attr("stop-opacity", d => d.opacity);`;

	// ====== 3. グラデーションをエリアチャートに適用 ======
	const applyCode = `svg.append("path").attr("class", "area").style("fill", "url(#areaGradient)").attr("d", areaFunction(dataset));`;

	document.getElementById('exportCode').textContent = code;
	document.getElementById('svgCode').textContent = svgCode;
	document.getElementById('applyCode').textContent = applyCode;
}
