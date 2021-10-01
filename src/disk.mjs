// Generate (roughly) equal points on a circular plane.

import { Vec2 } from "./vector.mjs";
import Utils from "./utils.mjs";


class Disk {
	#array = null;

	#vertex_count = 0;
	#vertices = null;
	#indices = null;

	constructor(center, rings, spacing, dimensions=2, array=Float32Array) {
		if(!(center instanceof Vec2)) throw new TypeError("Invalid Vec2 passed to Cube()");
		if(rings < 0 || dimensions < 2 || dimensions > 3) throw new RangeError("Invalid range for Disk() parameters");

		this.rings = rings;
		this.spacing = spacing;
		this.dimensions = dimensions;
		this.#array = array;
	}

	get vertex_count() {
		if(this.#vertex_count > 0) return this.#vertex_count;

		this.#vertex_count = 1;
		for(let r = 1; r <= this.rings; r++)
			this.#vertex_count += r * 6;

		return this.#vertex_count;
	}

	get index_count() {
		if(this.rings === 0) return 1;
		return this.vertex_count * 6 - 18 * this.rings - 6;
	}

	// Generate / fetch vertices
	get vertices() {
		if(this.#vertices !== null) return this.#vertices;
		this.#vertices = new this.#array(this.vertex_count * this.dimensions);

		this.#vertices[0] = 0;
		this.#vertices[1] = 0;

		let ring_start = this.dimensions;

		for(let r = 1; r <= this.rings; r++) {
			const vertex_num = r * 6;

			for(let p = 0; p < vertex_num; p++) {
				const vertex = Utils.polar_to_cart(r * this.spacing, p / vertex_num * Math.PI * 2);

				this.#vertices[ring_start + p * this.dimensions] = vertex.x;
				this.#vertices[ring_start + p * this.dimensions + 1] = vertex.y;
			}

			ring_start += vertex_num * this.dimensions;
		}

		return this.#vertices;
	}

	// Generate indices (TODO: Change these back to normal (not x2) because WebGL indexing doesn't work like this)
	get indices() {
		if(this.#indices !== null) return this.#indices;
		if(this.#vertices === null) this.vertices; // Generate vertices first
		if(this.rings === 0) return new this.#array(0);

		const indices = new Utils.IndexedArray(new this.#array(this.index_count));

		// Middle 6 triangles
		for(let i = 0; i < 6; i++) {
			indices.push(0, i * 2 + 2, i * 2 + 4);
		}

		indices.set(17, 2);

		// Other triangles
		let ring_start = 7 * 2;

		for(let r = 2; r <= this.rings; r++) {
			const vertex_num = 6 * (r - 1);
			const sixth = vertex_num / 6;

			for(let s = 0; s < 6; s++) {
				for(let p = 0; p <= sixth; p++) {
					const offset = p * 2 + (s * 2) * sixth + s * 2;

					let p1 = ring_start + offset;
					let p2 = ring_start + offset + 2;
					let p3 = ring_start + offset - vertex_num * 2 - s * 2;
					let p4 = p3 + 2;

					if(p1 >= ring_start + 6 * (r * 2) - 2) {
						p1 = ring_start;
						p2 = ring_start + 6 * (r * 2) - 2;
						p3 = ring_start - vertex_num * 2;
					}
					else if(p === sixth - 1 && p1 >= ring_start + 6 * r * 2 - 4) {
						p4 -= vertex_num * 2;
					}

					indices.push(p1, p2, p3);
					if(p !== sixth) indices.push(p4, p2, p3);
				}
			}

			ring_start += 6 * r * 2;
		}

		this.#indices = indices.inner;
		return this.#indices;
	}
}


export default Disk;
