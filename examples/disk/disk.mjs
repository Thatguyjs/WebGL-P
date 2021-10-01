import { Disk } from "../src/include.mjs";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const disk = new Disk(10, 20);
const vertices = disk.vertices;
const indices = disk.indices;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stroke_width = 4;

function color(...args) {
	args = args.filter(arg => arg !== undefined && arg !== null);

	if(args.length === 0)
		return `#000`;
	if(args.length === 1)
		return `rgb(${args[0]}, ${args[0]}, ${args[0]})`;
	if(args.length === 2)
		return `rgba(${args[0]}, ${args[0]}, ${args[0]}, ${args[1]})`;
	if(args.length === 3)
		return `rgb(${args[0]}, ${args[1]}, ${args[2]})`;
	if(args.length === 4)
		return `rgba(${args[0]}, ${args[1]}, ${args[2]}, ${args[3]})`;
}

function fill(...args) {
	if(typeof args[0] === 'string')
		ctx.fillStyle = args[0];
	else
		ctx.fillStyle = color(...args);
}

function random(min=1, max=0) {
	if(min > max) {
		let temp = min;
		min = max;
		max = temp;
	}

	return Math.random() * (max - min) + min;
}

function point(x, y) {
	ctx.beginPath();
	ctx.arc(x, y, stroke_width / 2, 0, Math.PI * 2, false);
	ctx.fill();
}


for(let p = 0; p < vertices.length; p += 2) {
	point(vertices[p] + canvas.width / 2, vertices[p + 1] + 1 + canvas.height / 2);
}

for(let i = 0; i < indices.length; i += 3) {
	const verts = [
		vertices[indices[i]], vertices[indices[i] + 1],
		vertices[indices[i + 1]], vertices[indices[i + 1] + 1],
		vertices[indices[i + 2]], vertices[indices[i + 2] + 1]
	];

	fill(random(255), random(255), random(255));

	ctx.beginPath();
	ctx.moveTo(verts[0] + canvas.width / 2, verts[1] + canvas.height / 2);
	ctx.lineTo(verts[2] + canvas.width / 2, verts[3] + canvas.height / 2);
	ctx.lineTo(verts[4] + canvas.width / 2, verts[5] + canvas.height / 2);
	ctx.lineTo(verts[0] + canvas.width / 2, verts[1] + canvas.height / 2);
	ctx.fill();
}
