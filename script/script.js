async function getRates() {
	try {
		const response = await fetch('https://v6.exchangerate-api.com/v6/1374f891e9b21c34a5c72d79/latest/USD');
		const data = await response.json();
		const taux = data.conversion_rates
		return taux; // tu peux retourner les données ici
	} catch (error) {
		console.error('Erreur :', error);
	}
}

getRates().then(taux=> {
	let all_devise = Object.keys(taux)
	var select_ref = document.getElementById("choice_ref_dev")
	var select_target = document.getElementById("choice_targ_dev")
	all_devise.forEach(options => {
		let option_choice = document.createElement('option');
		option_choice.innerText = `${options}`;
		option_choice.value = `${options}`;
		let option_target = document.createElement('option');
		option_target.innerText = `${options}`;
		option_target.value = `${options}`;
		select_ref.appendChild(option_choice);
		select_target.appendChild(option_target);
	});
	select_ref.addEventListener('change', () => {
		let	value = taux[select_ref.value]
		let	value_tar = taux[select_target.value]
		let render_value_tar = document.getElementById("targ_dev")
		let res = (value_tar) / value
		render_value_tar.value = `${res.toFixed(2)}`
	});
	select_target.addEventListener('change', () => {
		let	value_tar = taux[select_target.value]
		let render_value_tar = document.getElementById("targ_dev")
		let nb = taux[select_ref.value]
		let res = (value_tar) / nb
		render_value_tar.value = `${res.toFixed(2)}`
	});
})
