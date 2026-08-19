/**
 * scripts/script.js
 * Calculadora de Carbono v5.1 - Dados embutidos, Custo de Compensação e nova exibição.
 * CORREÇÃO: Símbolo de CO₂ corrigido para exibição em HTML.
 */

// --- DADOS EMBUTIDOS (Conteúdo do distancia.txt) ---
const DISTANCIA_DATA = `
aracaju,belem,1641,2079
aracaju,belo horizonte,1248,1578
aracaju,boa vista,3022,6000
aracaju,brasilia,1292,1652
aracaju,campo grande,2155,2765
aracaju,cuiaba,2121,2775
aracaju,curitiba,2061,2595
aracaju,florianopolis,2207,2892
aracaju,fortaleza,815,1183
aracaju,goiania,1461,1848
aracaju,joao pessoa,486,611
aracaju,macapa,1967,
aracaju,maceio,201,294
aracaju,manaus,2673,5215
aracaju,natal,604,788
aracaju,palmas,1235,1662
aracaju,porto alegre,2580,3296
aracaju,porto velho,2946,4230
aracaju,recife,398,501
aracaju,rio branco,3359,4763
aracaju,rio de janeiro,1482,1855
aracaju,salvador,277,356
aracaju,sao luis,1226,1578
aracaju,sao paulo,1731,2187
aracaju,teresina,903,1142
aracaju,vitoria,1102,1408
belem,belo horizonte,2111,2824
belem,boa vista,1432,6083
belem,brasilia,1592,2120
belem,campo grande,2212,2942
belem,cuiaba,1778,2941
belem,curitiba,2665,3193
belem,florianopolis,2904,3500
belem,fortaleza,1133,1610
belem,goiania,1693,2017
belem,joao pessoa,1636,2161
belem,macapa,329,
belem,maceio,1680,2173
belem,manaus,1292,5298
belem,natal,1550,2108
belem,palmas,973,1283
belem,porto alegre,3188,3852
belem,porto velho,1886,4397
belem,recife,1676,2074
belem,rio branco,2333,4931
belem,rio de janeiro,2450,3250
belem,salvador,1687,2100
belem,sao luis,481,806
belem,sao paulo,2463,2933
belem,teresina,750,947
belem,vitoria,2275,3108
belo horizonte,boa vista,3117,4736
belo horizonte,brasilia,624,716
belo horizonte,campo grande,1118,1453
belo horizonte,cuiaba,1372,1594
belo horizonte,curitiba,820,1004
belo horizonte,florianopolis,973,1301
belo horizonte,fortaleza,1893,2528
belo horizonte,goiania,666,906
belo horizonte,joao pessoa,1726,2171
belo horizonte,macapa,2349,
belo horizonte,maceio,1439,1854
belo horizonte,manaus,2556,3951
belo horizonte,natal,1831,2348
belo horizonte,palmas,1178,1690
belo horizonte,porto alegre,1341,1712
belo horizonte,porto velho,2477,3050
belo horizonte,recife,1639,2061
belo horizonte,rio branco,2786,3584
belo horizonte,rio de janeiro,339,434
belo horizonte,salvador,964,1372
belo horizonte,sao luis,1932,2738
belo horizonte,sao paulo,489,586
belo horizonte,teresina,1652,2302
belo horizonte,vitoria,378,524
boa vista,brasilia,2496,4275
boa vista,campo grande,2667,3836
boa vista,cuiaba,2107,3142
boa vista,curitiba,3370,4821
boa vista,florianopolis,3620,5128
boa vista,fortaleza,2562,6548
boa vista,goiania,2503,4076
boa vista,joao pessoa,3067,6593
boa vista,macapa,1110,
boa vista,maceio,3089,6279
boa vista,manaus,661,785
boa vista,natal,2983,6770
boa vista,palmas,1988,4926
boa vista,porto alegre,3785,5348
boa vista,porto velho,1335,1686
boa vista,recife,3103,6483
boa vista,rio branco,1626,2230
boa vista,rio de janeiro,3428,5159
boa vista,salvador,3009,5794
boa vista,sao luis,1913,6120
boa vista,sao paulo,3300,4756
boa vista,teresina,2169,6052
boa vista,vitoria,3394,5261
brasilia,campo grande,878,1134
brasilia,cuiaba,873,1133
brasilia,curitiba,1081,1366
brasilia,florianopolis,1314,1673
brasilia,fortaleza,1687,2200
brasilia,goiania,173,209
brasilia,joao pessoa,1716,2245
brasilia,macapa,1791,
brasilia,maceio,1485,1930
brasilia,manaus,1932,3490
brasilia,natal,1775,2422
brasilia,palmas,620,973
brasilia,porto alegre,1619,2027
brasilia,porto velho,1900,2589
brasilia,recife,1657,2135
brasilia,rio branco,2246,3123
brasilia,rio de janeiro,933,1148
brasilia,salvador,1060,1446
brasilia,sao luis,1524,2157
brasilia,sao paulo,873,1015
brasilia,teresina,1313,1789
brasilia,vitoria,947,1239
campo grande,cuiaba,559,694
campo grande,curitiba,780,991
campo grande,florianopolis,1007,1298
campo grande,fortaleza,2547,3407
campo grande,goiania,705,935
campo grande,joao pessoa,2593,3357
campo grande,macapa,2309,
campo grande,maceio,2352,3040
campo grande,manaus,2013,3051
campo grande,natal,2654,3534
campo grande,palmas,1320,1785
campo grande,porto alegre,1119,1518
campo grande,porto velho,1634,2150
campo grande,recife,2530,3247
campo grande,rio branco,1827,2684
campo grande,rio de janeiro,1212,1444
campo grande,salvador,1905,2568
campo grande,sao luis,2284,2979
campo grande,sao paulo,894,1014
campo grande,teresina,2132,2911
campo grande,vitoria,1490,1892
cuiaba,curitiba,1302,1679
cuiaba,florianopolis,1543,1986
cuiaba,fortaleza,2329,3406
cuiaba,goiania,740,934
cuiaba,joao pessoa,2495,3366
cuiaba,macapa,1822,
cuiaba,maceio,2302,3049
cuiaba,manaus,1453,2357
cuiaba,natal,2524,3543
cuiaba,palmas,1029,1784
cuiaba,porto alegre,1679,2206
cuiaba,porto velho,1137,1456
cuiaba,recife,2452,3255
cuiaba,rio branco,1414,1990
cuiaba,rio de janeiro,1575,2017
cuiaba,salvador,1915,2566
cuiaba,sao luis,1942,2978
cuiaba,sao paulo,1326,1614
cuiaba,teresina,1862,2910
cuiaba,vitoria,1745,2119
curitiba,florianopolis,251,300
curitiba,fortaleza,2670,3541
curitiba,goiania,972,1186
curitiba,joao pessoa,2545,3188
curitiba,macapa,2836,
curitiba,maceio,2259,2871
curitiba,manaus,2734,4036
curitiba,natal,2645,3365
curitiba,palmas,1693,2036
curitiba,porto alegre,546,711
curitiba,porto velho,2412,3135
curitiba,recife,2459,3078
curitiba,rio branco,2601,3669
curitiba,rio de janeiro,675,852
curitiba,salvador,1784,2385
curitiba,sao luis,2599,3230
curitiba,sao paulo,338,408
curitiba,teresina,2362,3143
curitiba,vitoria,1076,1300
florianopolis,fortaleza,2857,3838
florianopolis,goiania,1215,1493
florianopolis,joao pessoa,2693,3485
florianopolis,macapa,3082,
florianopolis,maceio,2402,3168
florianopolis,manaus,2981,4443
florianopolis,natal,2802,3662
florianopolis,palmas,1931,2336
florianopolis,porto alegre,376,476
florianopolis,porto velho,2641,3442
florianopolis,recife,2603,3375
florianopolis,rio branco,2809,3976
florianopolis,rio de janeiro,748,1144
florianopolis,salvador,1930,2682
florianopolis,sao luis,2821,3537
florianopolis,sao paulo,489,705
florianopolis,teresina,2573,3450
florianopolis,vitoria,1160,1597
fortaleza,goiania,1854,2482
fortaleza,joao pessoa,555,688
fortaleza,macapa,1451,
fortaleza,maceio,730,1075
fortaleza,manaus,2383,5763
fortaleza,natal,435,537
fortaleza,palmas,1300,2035
fortaleza,porto alegre,3213,4242
fortaleza,porto velho,2855,4862
fortaleza,recife,629,800
fortaleza,rio branco,3300,5396
fortaleza,rio de janeiro,2190,2805
fortaleza,salvador,1028,1389
fortaleza,sao luis,652,1070
fortaleza,sao paulo,2368,3127
fortaleza,teresina,495,634
fortaleza,vitoria,1855,2397
goiania,joao pessoa,1889,2442
goiania,macapa,1868,
goiania,maceio,1656,2125
goiania,manaus,1912,3291
goiania,natal,1948,2618
goiania,palmas,724,874
goiania,porto alegre,1497,1847
goiania,porto velho,1813,2390
goiania,recife,1829,2332
goiania,rio branco,2138,2924
goiania,rio de janeiro,936,1338
goiania,salvador,1225,1643
goiania,sao luis,1662,2054
goiania,sao paulo,810,926
goiania,teresina,1467,1986
goiania,vitoria,1022,1428
joao pessoa,macapa,1964,
joao pessoa,maceio,299,611
joao pessoa,manaus,2819,6593
joao pessoa,natal,151,185
joao pessoa,palmas,1521,2253
joao pessoa,porto alegre,3066,3889
joao pessoa,porto velho,3200,4822
joao pessoa,recife,104,120
joao pessoa,rio branco,3632,5356
joao pessoa,rio de janeiro,1968,2448
joao pessoa,salvador,763,949
joao pessoa,sao luis,1162,1660
joao pessoa,sao paulo,2216,2770
joao pessoa,teresina,905,1224
joao pessoa,vitoria,1581,2001
macapa,maceio,2009,
macapa,manaus,1054,5808
macapa,natal,1874,
macapa,palmas,1177,
macapa,porto alegre,3341,3889
macapa,porto velho,1724,
macapa,recife,2005,1831
macapa,rio branco,2159,5356
macapa,rio de janeiro,2687,
macapa,salvador,2000,949
macapa,sao luis,803,
macapa,sao paulo,2664,2770
macapa,teresina,1079,1224
macapa,vitoria,2545,2001
maceio,manaus,2778,5491
maceio,natal,434,572
maceio,palmas,1383,1851
maceio,porto alegre,2775,3572
maceio,porto velho,3090,4505
maceio,recife,202,285
maceio,rio branco,3510,5039
maceio,rio de janeiro,1671,2131
maceio,salvador,475,632
maceio,sao luis,1234,1672
maceio,sao paulo,1928,2453
maceio,teresina,929,1236
maceio,vitoria,1282,1684
manaus,natal,2765,5985
manaus,palmas,1509,4141
manaus,porto alegre,3132,4563
manaus,porto velho,761,901
manaus,recife,2833,5698
manaus,rio branco,1149,1445
manaus,rio de janeiro,2849,4374
manaus,salvador,2605,5009
manaus,sao luis,1746,5335
manaus,sao paulo,2689,3971
manaus,teresina,1921,5267
manaus,vitoria,2865,4476
natal,palmas,1527,2345
natal,porto alegre,3172,4066
natal,porto velho,3179,4998
natal,recife,253,297
natal,rio branco,3616,5533
natal,rio de janeiro,2085,2625
natal,salvador,875,1126
natal,sao luis,1071,1607
natal,sao paulo,2320,2947
natal,teresina,843,1171
natal,vitoria,1706,2178
palmas,porto alegre,2222,2747
palmas,porto velho,1711,
palmas,recife,1498,2058
palmas,rio branco,2127,3764
palmas,rio de janeiro,1512,2124
palmas,salvador,1114,1454
palmas,sao luis,964,1386
palmas,sao paulo,1493,1776
palmas,teresina,835,1401
palmas,vitoria,1413,2214
porto alegre,porto velho,2706,3662
porto alegre,recife,2977,3779
porto alegre,rio branco,2814,4196
porto alegre,rio de janeiro,1123,1553
porto alegre,salvador,2303,3090
porto alegre,sao luis,3142,3891
porto alegre,sao paulo,852,1109
porto alegre,teresina,2909,3804
porto alegre,vitoria,1536,2001
porto velho,recife,3190,4712
porto velho,rio branco,449,544
porto velho,rio de janeiro,2707,3473
porto velho,salvador,2808,4023
porto velho,sao luis,2274,4434
porto velho,sao paulo,2463,3070
porto velho,teresina,2362,4366
porto velho,vitoria,2835,3575
recife,rio branco,3618,5243
recife,rio de janeiro,1874,2338
recife,salvador,675,839
recife,sao luis,1209,1573
recife,sao paulo,2128,2660
recife,teresina,934,1137
recife,vitoria,1483,1831
rio branco,rio de janeiro,2982,4007
rio branco,salvador,3206,4457
rio branco,sao luis,2726,4968
rio branco,sao paulo,2704,3604
rio branco,teresina,2806,4900
rio branco,vitoria,3156,4109
rio de janeiro,salvador,1209,1649
rio de janeiro,sao luis,2266,3015
rio de janeiro,sao paulo,357,429
rio de janeiro,teresina,1979,2579
rio de janeiro,vitoria,412,521
salvador,sao luis,1323,1599
salvador,sao paulo,1453,1962
salvador,teresina,994,1163
salvador,vitoria,839,1202
sao luis,sao paulo,2348,2970
sao luis,teresina,329,446
sao luis,vitoria,2023,2607
sao paulo,teresina,2091,2792
sao paulo,vitoria,741,882
teresina,vitoria,1713,2171
`;


// Mapa para armazenar as distâncias: { "origem_destino": { aerea: 1234, rodoviaria: 5678 } }
const distanciasMap = {};

// --- Constantes de Mercado ---

// Valor de referência para compensação (R$ por 1000 kg CO2 ou R$ por 1 tonelada CO2)
const CUSTO_POR_TONELADA_CO2 = 20.00;

// Taxas de emissão (kg CO2 por km) - Valores de referência atualizados
const taxas = {
  bicicleta: { taxa: 0.00, tipoDistancia: 'rodoviaria' },
  moto: { taxa: 0.08, tipoDistancia: 'rodoviaria' },
  carro: { taxa: 0.14, tipoDistancia: 'rodoviaria' },
  onibus: { taxa: 0.03, tipoDistancia: 'rodoviaria' },
  caminhao: { taxa: 0.40, tipoDistancia: 'rodoviaria' },
  aviao: { taxa: 0.18, tipoDistancia: 'aerea' }
};


// --- Funções de Normalização e Carregamento ---

/**
 * Normaliza o nome da cidade para a chave de busca (minúsculo, sem acento, snake_case).
 * Ex: "São Paulo" -> "sao_paulo"
 */
function normalizarParaChave(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .trim()
    .replace(/\s+/g, '_'); // Converte espaços em underline (snake_case)
}

/**
 * Normaliza o nome da capital de volta para um formato legível (para o Datalist).
 * Ex: "sao_paulo" -> "Sao Paulo"
 */
function formatarNomeParaExibicao(nomeNormalizado) {
    const comEspacos = nomeNormalizado.replace(/_/g, ' ');
    // Capitaliza a primeira letra de cada palavra
    return comEspacos.split(' ')
                     .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
                     .join(' ');
}


/**
 * Carrega e parseia os dados embutidos (DISTANCIA_DATA).
 */
function carregarDistancias() {
    try {
        const texto = DISTANCIA_DATA;
        const linhas = texto.trim().split('\n').filter(line => line.trim() !== '');

        for (const linha of linhas) {
            const [origem, destino, aereaStr, rodoviariaStr] = linha.split(',');
            
            const origemSnake = normalizarParaChave(origem);
            const destinoSnake = normalizarParaChave(destino);

            const chaveIda = `${origemSnake}-${destinoSnake}`;
            distanciasMap[chaveIda] = {
                aerea: parseInt(aereaStr) || 0,
                rodoviaria: parseInt(rodoviariaStr) || 0
            };
            
            const chaveVolta = `${destinoSnake}-${origemSnake}`;
            distanciasMap[chaveVolta] = {
                aerea: parseInt(aereaStr) || 0,
                rodoviaria: parseInt(rodoviariaStr) || 0
            };
        }
        console.log("Distâncias carregadas (dados embutidos) e mapa criado com sucesso.");
        popularDatalist(); 
    } catch (error) {
        document.getElementById("resultado_emissao").textContent = "ERRO: Falha na leitura dos dados embutidos. Verifique o console.";
        console.error("Falha fatal ao carregar os dados de distâncias:", error);
    }
}

/**
 * Popula o elemento <datalist> com os nomes das capitais formatados.
 */
function popularDatalist() {
    const datalist = document.getElementById('capitais-list');
    if (!datalist) return;

    const capitaisSet = new Set();
    
    for (const chave in distanciasMap) {
        if (distanciasMap.hasOwnProperty(chave)) {
            const [origemSnake] = chave.split('-');
            capitaisSet.add(origemSnake);
        }
    }

    capitaisSet.forEach(capitalSnake => {
        const option = document.createElement('option');
        option.value = formatarNomeParaExibicao(capitalSnake);
        datalist.appendChild(option);
    });
    
    console.log("Lista de autocompletar populada.");
}

/**
 * Busca a distância entre duas cidades no mapa.
 */
function getDistance(origem, destino) {
  const origemSnake = normalizarParaChave(origem);
  const destinoSnake = normalizarParaChave(destino);
  
  const chave = `${origemSnake}-${destinoSnake}`;
  
  return distanciasMap[chave] || null;
}


// --- Lógica de Cálculo e Eventos ---

document.getElementById("calcular").addEventListener("click", () => {
  const origem = document.getElementById("origem").value.trim();
  const destino = document.getElementById("destino").value.trim();
  const transporteElement = document.querySelector("input[name='transporte']:checked");
  
  // Limpa resultados anteriores
  document.getElementById("resultado_emissao").textContent = "";
  document.getElementById("resultado_custo").textContent = "";


  if (!origem || !destino || !transporteElement) {
    document.getElementById("resultado_emissao").textContent = "Preencha todos os campos.";
    return;
  }

  const tipoTransporte = transporteElement.value;
  const infoTaxa = taxas[tipoTransporte];
  
  const distancias = getDistance(origem, destino);
  
  if (!distancias) {
    document.getElementById("resultado_emissao").textContent = "Distância entre as capitais não encontrada. Use o autocompletar para garantir o nome correto.";
    return;
  }
  
  const tipoDistancia = infoTaxa.tipoDistancia;
  let distancia = 0;

  if (tipoDistancia === 'aerea') {
      distancia = distancias.aerea;
  } else {
      distancia = distancias.rodoviaria;
  }
  
  if (distancia === 0) {
      document.getElementById("resultado_emissao").textContent = `A distância ${tipoDistancia} entre as cidades não está disponível na tabela.`;
      return;
  }
  
  // 4. Cálculo da Emissão
  const taxa = infoTaxa.taxa;
  const emissaoKg = distancia * taxa; // Emissão em kg CO₂
    
  // 5. Cálculo do Custo em Reais
  const emissaoToneladas = emissaoKg / 1000; 
  const custoReais = emissaoToneladas * CUSTO_POR_TONELADA_CO2;
  
  // 6. Exibição do Resultado
  const tipoDistanciaLabel = tipoDistancia === 'aerea' ? 'Aérea' : 'Rodoviária';
  
  // Resultado da Distância e Emissão (Primeiro campo)
  document.getElementById("resultado_emissao").innerHTML =
    `Distância (${tipoDistanciaLabel}): ${distancia} km | 
     Emissão estimada: ${emissaoKg.toFixed(2)} kg CO₂`; /* CORRIGIDO AQUI */

  // Resultado do Custo de Compensação (Segundo campo)
  document.getElementById("resultado_custo").innerHTML =
    `Valor para Compensação: R$ ${custoReais.toFixed(2)}`;
});


// Inicializa o carregamento dos dados
carregarDistancias();
