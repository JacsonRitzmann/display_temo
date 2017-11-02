<?php
include "simple_html_dom.php";

// Create DOM from URL or file

$html = file_get_html('http://waves.terra.com.br/surf/ondas/santa-catarina/florianopolis/novo-campeche');

$wave_tamanho     = 'Onda '.$html->find('div.info div.wave div', 0)->plaintext;
$wave_formacao    = $html->find('div.info div.wave div', 1)->plaintext;
$wave_direcao     = 'Ondulação '.$html->find('div.info div.wave div', 2)->plaintext;
$wind_direcao     = 'Vento '.$html->find('div.info div.wind div', 0)->plaintext;
$wind_intensidade = $html->find('div.info div.wind div', 1)->plaintext;
$temperature      = $html->find('div.info div.temperature div', 0)->plaintext;
$weather          = $html->find('div.info div.weather div', 0)->plaintext;

echo $wave_tamanho.'|'.$wave_formacao.'|'.$wave_direcao.'|'.$wind_direcao.'|'.$wind_intensidade.'|'.$temperature.'|'.$weather;

?>