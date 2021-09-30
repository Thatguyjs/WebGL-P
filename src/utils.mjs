// Provide some extra math functions

const Utils = {
	polar_to_cart(radius, angle) {
		return {
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius
		};
	},


	IndexedArray: class {
		#array = null;
		#length = 0;
		#index = 0;

		constructor(array, start=0) {
			this.#array = array;
			this.#length = this.#array.length;
			this.#index = start ?? 0;
		}

		get length() {
			return this.#length;
		}

		get inner() {
			return this.#array;
		}

		get(index) {
			return this.#array[index];
		}

		set(index, value) {
			return this.#array[index] = value;
		}

		move_to(index) {
			if(index >= this.#length) return false;

			this.#index = index;
			return true;
		}

		push(...values) {
			const ind_start = this.#index;
			const ind_end = this.#index + values.length;

			if(ind_end > this.#length) return false;

			while(this.#index < ind_end) {
				this.#array[this.#index++] = values[this.#index - ind_start];
			}

			return true;
		}
	}
};


export default Utils;
