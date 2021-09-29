// Generate (roughly) equal points on a circular plane.

import MathUtils from "./math.mjs";


class Disk {
	#array = null;

	#point_count = 0;
	#points = null;
	#incides = [];

	constructor(rings, spacing, dimensions=2, array=Float32Array) {
		if(rings < 0 || dimensions < 2 || dimensions > 3) throw new RangeError("Invalid range for Disk() parameters");

		this.rings = rings;
		this.spacing = spacing;
		this.dimensions = dimensions;
		this.#array = array;
	}

	get point_count() {
		if(this.#point_count > 0) return this.#point_count;

		this.#point_count = 1;
		for(let r = 1; r <= this.rings; r++)
			this.#point_count += r * 6;

		return this.#point_count;
	}

	// Generate / fetch points
	get points() {
		if(this.#points !== null) return this.#points;
		this.#points = new this.#array(this.point_count * 2);

		this.#points[0] = 0;
		this.#points[1] = 0;

		let ring_start = 2;

		for(let r = 1; r <= this.rings; r++) {
			const point_num = r * 6;

			for(let p = 0; p < point_num; p++) {
				const point = MathUtils.polar_to_cart(r * this.spacing, p / point_num * Math.PI * 2);

				this.#points[ring_start + p * 2] = point.x;
				this.#points[ring_start + p * 2 + 1] = point.y;
			}

			ring_start += point_num * 2;
		}

		return this.#points;
	}

	// Generate indices
	get indices() {
		if(this.#points === null) this.points; // Generate points first


		if(this.rings >= 1) {

		}
	}
};


export default Disk;
