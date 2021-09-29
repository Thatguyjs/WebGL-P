// Provide some extra math functions

const MathUtils = {
	polar_to_cart(radius, angle) {
		return {
			x: Math.cos(angle) * radius,
			y: Math.sin(angle) * radius
		};
	}
};


export default MathUtils;
