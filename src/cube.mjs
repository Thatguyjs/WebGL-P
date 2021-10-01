// Generate vertices & indices for a cube

import { Vec2 } from "./vector.mjs";
import Utils from "./utils.mjs";


class Cube {
	#array = null;

	#vertices = null;
	#indices = null;

	constructor(center, radius, array=Float32Array) {
		if(!(center instanceof Vec2)) throw new TypeError("Invalid Vec2 passed to Cube()");

		this.center = center;
		this.radius = radius;

		this.#array = array;
	}

	get vertex_count() {
		return 8;
	}

	get index_count() {
		return 36;
	}

	get vertices() {
		if(this.#vertices !== null) return this.#vertices;
		this.#vertices = new this.#array(this.vertex_count * 3);

		this.#vertices[0] = -this.radius; // near bottom left
		this.#vertices[1] = -this.radius;
		this.#vertices[2] = this.radius;

		this.#vertices[3] = -this.radius; // near top left
		this.#vertices[4] = this.radius;
		this.#vertices[5] = this.radius;

		this.#vertices[6] = this.radius; // near bottom right
		this.#vertices[7] = -this.radius;
		this.#vertices[8] = this.radius;

		this.#vertices[9] = this.radius; // near top right
		this.#vertices[10] = this.radius;
		this.#vertices[11] = this.radius;

		this.#vertices[12] = -this.radius; // far bottom left
		this.#vertices[13] = -this.radius;
		this.#vertices[14] = -this.radius;

		this.#vertices[15] = -this.radius; // far top left
		this.#vertices[16] = this.radius;
		this.#vertices[17] = -this.radius;

		this.#vertices[18] = this.radius; // far bottom right
		this.#vertices[19] = -this.radius;
		this.#vertices[20] = -this.radius;

		this.#vertices[21] = this.radius; // far top right
		this.#vertices[22] = this.radius;
		this.#vertices[23] = -this.radius;

		return this.#vertices;
	}

	get indices() {
		if(this.#indices !== null) return this.#indices;
		if(this.#vertices === null) this.vertices; // Generate vertices first

		const indices = new Utils.IndexedArray(new this.#array(this.index_count));

		// front
		indices.push(0, 1, 3);
		indices.push(0, 2, 3);

		// back
		indices.push(4, 5, 7);
		indices.push(4, 6, 7);

		// top
		indices.push(1, 5, 7);
		indices.push(1, 3, 7);

		// bottom
		indices.push(0, 4, 6);
		indices.push(0, 2, 6);

		// left
		indices.push(0, 1, 5);
		indices.push(0, 4, 5);

		// right
		indices.push(2, 3, 7);
		indices.push(2, 6, 7);

		this.#indices = indices.inner;
		return this.#indices;
	}
}


export default Cube;
