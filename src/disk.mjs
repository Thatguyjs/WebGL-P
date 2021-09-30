// Generate (roughly) equal points on a circular plane.

import Utils from "./utils.mjs";


class Disk {
	#array = null;

	#point_count = 0;
	#points = null;
	#indices = [];

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

	get index_count() {
		if(this.rings === 1) return 1;
		return this.point_count * 6 - 12 * this.rings - 6 * (this.rings - 1);
	}

	// Generate / fetch points
	get points() {
		if(this.#points !== null) return this.#points;
		this.#points = new this.#array(this.point_count * this.dimensions);

		this.#points[0] = 0;
		this.#points[1] = 0;

		let ring_start = this.dimensions;

		for(let r = 1; r <= this.rings; r++) {
			const point_num = r * 6;

			for(let p = 0; p < point_num; p++) {
				const point = Utils.polar_to_cart(r * this.spacing, p / point_num * Math.PI * 2);

				this.#points[ring_start + p * this.dimensions] = point.x;
				this.#points[ring_start + p * this.dimensions + 1] = point.y;
			}

			ring_start += point_num * this.dimensions;
		}

		return this.#points;
	}

	// Generate indices
	get indices() {
		if(this.#points === null) this.points; // Generate points first
		if(this.rings === 0) return new this.#array(0);

		const indices = new Utils.IndexedArray(new this.#array(this.index_count * this.dimensions));

		// Middle 6 triangles
		for(let i = 0; i < 6; i++) {
			indices.push(0, i + 1, i + 2);
		}

		indices.set(5 * this.dimensions + 2, 1);

		// Other triangles
		let ring_start = 7 * this.dimensions;

		for(let r = 2; r < this.rings; r++) {
			const point_num = 6 * (r - 1);
			const sixth = point_num / 6;

			for(let s = 0; s < 6; s++) {
				for(let p = 0; p <= sixth; p++) {
					const offset = p + s * sixth + s;

					let p1 = ring_start + offset;
					let p2 = ring_start + offset + 1;
					let p3 = ring_start + offset - point_num - s;
					let p4 = p3 + 1;

					if(p1 >= ring_start + 6 * r - 1) {
						p1 = ring_start;
						p2 = ring_start + 6 * r - 1;
						p3 = ring_start - point_num;
					}
					else if(p === sixth - 1 && p1 >= ring_start + 6 * r - 2) {
						p4 -= point_num;
					}

					indices.push(p1, p2, p3);
					if(p !== sixth) indices.push(p4, p2, p3);
				}
			}

			ring_start += 6 * r * this.dimensions;
		}

		this.#indices = indices.inner;
		return this.#indices;
	}
};


export default Disk;
