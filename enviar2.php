<?php

  // Destinatário
  $para = "wabner.augusto@gmail.com";

  // Assunto do e-mail
  $assunto = "Quero desenvolver um projeto contigo!";

  // Campos do formulário de contato
  $name = $_POST['name'];
  $email = $_POST['email'];
  $mensagem = $_POST['message'];

  // Monta o corpo da mensagem com os campos
  $corpo = "Nome: $name \n";
  $corpo .= "E-mail: $email\nMensagem: $message";

  // Cabeçalho do e-mail
  $header = "From: $name <$para> Reply-to: $email ";
  $header .= "Content-Type: text/html; charset=iso-8859-1 ";

  mail($para, $assunto, $corpo, $header);

  // Mostra a mensagem acima e redireciona para index.html
  echo "<script>location.href=`sucesso.html`; alert(`$msg`);</script>";
