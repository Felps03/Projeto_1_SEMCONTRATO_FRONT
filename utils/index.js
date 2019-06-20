export function hasNumber(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux).match(/^[0-9]$/)) {
			return true;
		}
	}
}

export function hasSpace(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux).match(/^\s$/)) {
			return true;
		}
	}
};

export function hasSolitaryChar(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux - 1).match(/^\s$/) && value.charAt(aux).match(/^[a-z0.9]$/) && value.charAt(aux + 1).match(/^\s$/)) {
			return true;
		}
	}
};

export function hasMoreSpace(value) {
	for (let aux = 0; aux <= value.length; aux++) {
		if (value.charAt(aux).match(/^\s$/) && value.charAt(aux - 1).match(/^\s$/)) {
			return true;
		}
	}
}