<?php

  //mysqli_num_rows conta il numero di righe in un particolare risultato di una query

  //e funzioni mysqli_query ritorna true se è andato a buon fine l'inserimento
  function dbConnect()//CONNESSIONE AL DATABASE
  {
    $servername= "localhost";
    $username ="captainTeemo";
    $password="onDuty";
    $database="maqsystem";
    $connection = mysqli_connect($servername,$username,$password,$database)
      or die("Errore nella connessione al database: " . mysqli_connect_error());
    return $connection;
  }

  function insert($titolo,$testo)//valori generici da inserire
  {
    $connection = dbConnect();
    $titolo = nl2br(htmlentities($titolo));//controllo degli input prima di metterli nel database
    $testo = nl2br(htmlentities($testo));
    $data = date("Y-m-d H:i:s");
    //creo la query sql nometabella=post (data,titolo)=colonne della tabella VALUES(rispettivi valori)
    $sql = "INSERT INTO post (data,titolo,testo) VALUES(\"" . $data . "\", \"" . $titolo . "\", \"" . $testo . "\")";
    mysqli_query($connection, $sql) or die("Errore nella query: " . $sql . "\n" . mysqli_error());
    mysqli_close($connection);//chiusura della connessione
  }

  function numeroApp()
  {
    $connection=dbConnect();
    $sql= "SELECT * FROM applicazioni";
    $risultato= mysqli_query($connection,$sql) or die("Errore nella query: " . $sql . "\n" . mysqli_error());
    $conteggio=mysql_num_rows($risultato);
    mysql_close($connessione);
    return $conteggio;
  }  


  function utenteValido($utente,$password)//CONTROLLO UTENTE NEL DATABASE 
  {
    $connection = dbConnect();
    $sql = "SELECT password FROM users WHERE username = '" . $utente . "'";
    
    $risposta = mysqli_query($connection,$sql) or die("Errore nella query: " . $sql . "\n" . mysqli_error($connection));
    
    if(mysqli_num_rows($risposta) == 0)
      return FALSE;
    $riga = mysqli_fetch_row($risposta);//c'è n'è solamente una, il risultato potrebbe però essere composto
    // da più righe
    mysqli_close($connection);
    
    return ($password == $riga[0]);
  }


  function update($id)
  {
    $connection= dbConnect();
    $sql = "UPDATE applicazioni SET Installata=1 WHERE id=".$id;
    mysqli_query($connection,$sql) or die("Errore nella query: " . $sql . "\n" . mysql_error());
    mysqli_close();  

  }

 
  function find_project_name($project_name)
  {
    $connection = dbConnect();
    $sql ='SELECT * FROM project_names WHERE Name= "'.$project_name.'" ';
    $risposta=mysqli_query($connection,$sql) or die("Errore nella query: " . $sql . "\n" . mysqli_error($connection));
    $risultato=mysqli_fetch_row($risposta);//ritorna Null nel caso non trova nulla
    mysqli_close($connection);
    return $risultato[0];
  }

  function leggi($da, $n)
  {
    $connection = dbConnect();
    //questo di solito era segnato
    //$da = $da - 1;
    
    $sql = "SELECT * FROM applicazioni ORDER BY id LIMIT " . $da . ", " . $n;
    $risposta = mysqli_query($connection,$sql) or die("Errore nella query: " . $sql . "\n" . mysql_error());
    
    $risultato = array();
    while($riga = mysqli_fetch_row($risposta))
        $risultato[] = $riga;
    
    mysqli_close($conn);
    return $risultato;   
  }
?>