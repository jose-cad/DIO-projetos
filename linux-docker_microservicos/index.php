<?php
// Configurações iniciais (devem vir antes de qualquer HTML)
ini_set("display_errors", 1);
header('Content-Type: text/html; charset=utf-8');

$servername = "db";
$username = "root";
$password = "Senha123";
$database = "meubanco";

// Criar conexão
$link = new mysqli($servername, $username, $password, $database);

/* Check connection */
if (mysqli_connect_errno()) {
    printf("Falha na conexão: %s\n", mysqli_connect_error());
    exit();
}

// Lógica de dados
$valor_rand1 = rand(1, 999);
$valor_rand2 = strtoupper(substr(bin2hex(random_bytes(4)), 1));
$host_name = gethostname();

$query = "INSERT INTO dados (AlunoID, Nome, Sobrenome, Endereco, Cidade, Host) VALUES ('$valor_rand1' , '$valor_rand2', '$valor_rand2', '$valor_rand2', '$valor_rand2','$host_name')";

$status_msg = "";
if ($link->query($query) === TRUE) {
    $status_msg = "Registro inserido com sucesso!";
} else {
    $status_msg = "Erro ao inserir: " . $link->error;
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Projeto DIO - Microserviços</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #1e1e2f;
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .card {
            background-color: #2a2a40;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            text-align: center;
            border: 1px solid #44475a;
            max-width: 500px;
        }
        h1 { color: #50fa7b; margin-bottom: 0.5rem; }
        h2 { color: #8be9fd; font-weight: 300; margin-top: 0; }
        .info { background: #383a59; padding: 10px; border-radius: 8px; margin: 15px 0; }
        .host-id { color: #ff79c6; font-family: monospace; font-size: 1.2rem; }
        .status { font-size: 0.9rem; color: #bd93f9; }
        .footer { font-size: 0.8rem; color: #6272a4; margin-top: 20px; }
    </style>
</head>
<body>

    <div class="card">
        <h1>PROJETO DIO</h1>
        <h2>Docker Microserviços</h2>

        <div class="info">
            <p><strong>Desenvolvedor:</strong> Jota</p>
            <p><strong>PHP Versão:</strong> <?php echo phpversion(); ?></p>
        </div>

        <div class="info">
            <p>Processado pelo Container:</p>
            <span class="host-id"><?php echo $host_name; ?></span>
        </div>

        <p class="status"><?php echo $status_msg; ?></p>

        <div class="footer">
            Dê F5 para testar o Balanceamento de Carga (Round Robin)
        </div>
    </div>

</body>
</html>
