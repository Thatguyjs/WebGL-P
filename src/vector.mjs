// 2D, 3D, and 4D vector implementations


class Vector {
	constructor(components, ...args) {
		const init_value = args.length === 1 ? args[0] : 0;

		for(let c in components)
			this[components[c]] = init_value;

		if(args.length > components.length)
			throw new Error(`Too many parameters for Vector(): expected ${components.length}, got ${args.length}`);

		if(init_value === 0) {
			for(let a = 0; a < args.length; a++) {
				if(typeof args[a] !== 'number')
					throw new TypeError(`Expected a number for Vector(), got ${typeof args[a]}`);
				this[components[a]] = args[a];
			}
		}
	}

	static add(v1, v2) { return v1.add(v2); }
	static sub(v1, v2) { return v1.sub(v2); }
	static mult(v1, v2) { return v1.mult(v2); }
	static div(v1, v2) { return v1.div(v2); }

	static clone(vec) { return vec.clone(); }
}


class Vec2 extends Vector {
	constructor(...args) {
		super(['x', 'y'], ...args);
	}

	add(other) {
		this.x += other.x;
		this.y += other.y;
	}

	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
	}

	mult(other) {
		this.x *= other.x;
		this.y *= other.y;
	}

	div(other) {
		this.x /= other.x;
		this.y /= other.y;
	}

	clone() {
		return new Vec2(this.x, this.y);
	}
}


class Vec3 extends Vector {
	constructor(...args) {
		super(['x', 'y', 'z'], ...args);
	}

	add(other) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
	}

	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
	}

	mult(other) {
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;
	}

	div(other) {
		this.x /= other.x;
		this.y /= other.y;
		this.z /= other.z;
	}

	clone() {
		return new Vec3(this.x, this.y, this.z);
	}
}


class Vec4 extends Vector {
	constructor(...args) {
		super(['x', 'y', 'z', 'w'], ...args);
	}

	add(other) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		this.w += other.w;
	}

	sub(other) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		this.w -= other.w;
	}

	mult(other) {
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;
		this.w *= other.w;
	}

	div(other) {
		this.x /= other.x;
		this.y /= other.y;
		this.z /= other.z;
		this.w /= other.w;
	}

	clone() {
		return new Vec4(this.x, this.y, this.z, this.w);
	}
}


export { Vec2, Vec3, Vec4 };
