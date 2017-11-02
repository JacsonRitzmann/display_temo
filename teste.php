<?php
/**
 * Created by PhpStorm.
 * User: jacsonritzmann
 * Date: 19/07/17
 * Time: 23:33
 */


$json_file = file_get_contents("https://api.hgbrasil.com/weather/?format=json&lat=-27.6338094&lon=-48.4823010&user_ip=2804:07f5:f080:8601:75bb:b3f9:b546:db14&key=83b6d326");

$dados = json_decode($json_file, true);



echo json_encode(array(
    'temperature'   => $dados->results->temp.' ºC',
    'data'          => $dados->results->date,
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
/*
$itens = $json_str['nodes'];

foreach ( $itens as $e )
{ echo $e['title']."<br>"; }
*/
?>