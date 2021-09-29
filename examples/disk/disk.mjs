import { Disk } from "../src/include.mjs";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const disk = new Disk(5, 20);
const points = disk.points;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stroke_width = 4;

function point(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, stroke_width / 2, 0, Math.PI * 2, false);
	ctx.fill();
}


for(let p = 0; p < points.length; p += 2) {
	point(points[p] + canvas.width / 2, points[p + 1] + 1 + canvas.height / 2);
}
