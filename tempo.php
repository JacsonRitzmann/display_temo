<?php
// Sua chave de API HG Braisl
$woeid = $_GET['woeid'];
//'455861';
$dados = hg_request($woeid);
// Formata dos dados recebidos
echo json_encode(array(
		'temperature'   => $dados->results->temp.' ºC',
		'data'          => $dados->results->date,
		'time'          => $dados->results->time,
		'umidade'       => $dados->results->humidity.' % Umidade',
		'descricao'     => $dados->results->description,
		'local'         => $dados->results->city,
		'nascer_do_sol' => $dados->results->sunrise,
		'por_do_sol'    => $dados->results->sunset,
		'vento'         => $dados->results->wind_speedy,
		'sunrise'       => $dados->results->sunrise,
		'sunset'        => $dados->results->sunset,
		'imagem'        => 'imagens/'.$dados->results->img_id.'.png',
		'forecast'      => $dados->results->forecast,
	));

function hg_request($woeid) {
	$url = 'https://api.hgbrasil.com/weather/?format=json&woeid='.$woeid.'';
	if ($woeid) {
		$resposta = file_get_contents($url);
		return json_decode($resposta);
	} else {
		return false;
	}
}
?>