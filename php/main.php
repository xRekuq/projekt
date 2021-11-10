<?php
	error_reporting(~E_ALL);
	$baza = mysqli_connect('localhost', 'root', '', 'aplikacje2p');
	$good=false;
	if (isset($_POST['name'])) {
		if (!empty($_POST['name'])) {
			mysqli_query($baza,"INSERT INTO `kontakty` (`imie`,`nazwisko`,`plec`,`tresc`,`email`) 
			VALUES ('{$_POST['name']}','{$_POST['lastname']}','{$_POST['sex']}','{$_POST['content']}',  
			'{$_POST['email']}');") or die ("Błąd zapytania");
			echo '<p>Dodano informacje do bazy danych</p>';
			$good=true;
		}
	}
	if (!$good)
		echo '<p>Nastąpił nieoczekiwany błąd - dane nie zostały dodane do bazy.</p>';
	
	mysqli_close($baza);
	//echo 'Odpowiedź z PHP ' . $_POST['email'];
	
	//dzięki php możemy połączyć strone internetową z bazą danych i wprowadzić  dane użytkownika do bazy danych