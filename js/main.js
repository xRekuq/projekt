function getDocument(address, source, post, destName) {
	if (destName===undefined)
		destName='#content'
	if (post===undefined)
		post=''
	const comm = new XMLHttpRequest()
	comm.onreadystatechange= function(e) {
		console.log('OPERACJA')
		if (comm.readyState === 4) {
			if (comm.status === 200) {
				window.history.replaceState('', '', "?site="+source);
				document.querySelector(destName).innerHTML = comm.responseText				
				if (source==='kontakt')
					addFormEvents()
			}
		}
	}
	//deklaracja funkcji przewiduje 4 parametry żadna z nich nie ma wartości domyślnych zatem jeśli przywywołaniu funkcji nie będzie podany 
	//któryś z argumentów to wtedy ten parametr przyjmnie undefine
	//wywołujemy konstruktor XMLhttpRequest który zwraca obiekt XMLhttpRequest przechowujemy go w stałej comm
	//do obiektu przechowanego  w stałej comm dołączamy Event Handler (onreadystatechange)
	//event handler ten zostanie wywołany kiedy atrybut readyState ulegnie zmianie
	//w tej funkcji sprawdzane jest readyState czy jest równy 4 (DONE) jeśli jest równy 4 to wtedy sprawdzamy
	//status code odpowiedzi i sprawdzamy czy jest równy 200 jeśli jest równe 200 to 
	//wybieramy queryselectorem element o id równym content nadajemy mu innerHTML 
	//równy tekstowi który przyszedł w odpowiedzi na żądanie  
	//sprawdzamy następnie czy source jest równy napisowi kontakt jeśli jest wykonujemy funkcje addFormEvents
	//windowhistoryreplacestate Zmienia nam adres url strony na równe ?site=( + w zaleznosci w ktory guzik kliknelismy - galeria/onas/kontakt)
	
	comm.open('POST',address)
	comm.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	comm.send(post)

}


function addEvents(){
	document.querySelectorAll(".button").forEach( v => {

		v.onclick = (e) => {
			getDocument('./sites/'+v.dataset.link+'.html', v.dataset.link)
			//document.location='./sites/'+v.dataset.link+'.html'
			//document.location=v.dataset.link	
		}
	})		
}
//querySEelctorall wybiera wszystkie elementy o klasie button i przechowuje je w nodeliście na tej nodeliście wykonujemy pętle forEach która pozwala wykonać funkcje na każdym z elementów 
//każdemu guzikowi na kliknięcie przypisujemy wykonanie funkcji GetDocument 
//(przekazujemy 2 argumenty, a deklaracji funkcji getDocument podane są 4 parametry zatem wywoałanie funkcji z dwoma spowoduje że 3 i 4 parametr będą undefined - nie maja wartosci domyslnych)

function setSite() {
	console.log(document.location);
	const site = document.location.search.substr(1).split('=')[1]
	getDocument(`./sites/${site}.html`, site)
}
//tworzymy stałą o nazwie site zyskujemy dostęp do obiektu location które zawiera informacje o url naszego dokumentu - między innymi ma property o nazwie search, ktory jest stringiem
//wyciągamy z tego stringa metodą substr wyciągamy wszystko oprócz pierwszej litery następnie na tym napisie bez pierwszej litery wywołujemy funkcje split z argumentem =
// co powoduje że wszystkie napisy które odzielone są znakiem = będą przechowywane w tablicy. następnie sięgamy do elementu pod indexem 1 czyli defakto 2 elementu i przechowywujemy go w tej zmiennej której utworzyliśmy 
//wywołujemy funkcje getdocument z dwoma argumentami. site bedzie rowne galeria/onas/kontakt


function addFormEvents() {
	document.querySelector("#form button").onclick=function() {
		let name = document.querySelector('input[name=name]').value
		let lname = document.querySelector('input[name=lastname]').value
		let email = document.getElementsByName('email')[0].value
		let content = document.getElementsByName('content')[0].value
		var sex ='';
		document.querySelectorAll('input[name=sex]').forEach((v) => {
			if (v.checked) 
				sex=v.value
		})
		//wybieramy element button który jest zawarty w elemencie o id form . reagujemy na jedno kliknięcie - wywołujemy funkcje która 
		//wybiera element typu input z atrybutem name równym name pobiera z niego wartosc i przechowuje go w zmiennej o nazwie name 
		//wybiera element typu input z atrybutem name równym lastname pobiera z niego wartosc i przechowuje go w zmiennej o nazwie lname
		// w dwoch pierwszych przypadkach uzywany jest selektor cssowy
		//wybiera kolekcje z atrybutem name rownym email. sięga do zerowego elementu tej kolekcji pobiera z niego wartość i przechowuje w zmiennej email
		//wybiera kolekcje z atrybutem name rownym content. sięga do zerowego elementu tej kolekcji pobiera z niego wartość i przechowuje w zmiennej content
		//tworzy zmienna sex i przypisuje wartość pustego stringa
		// queryselectorall wybiera wszystkie elementy typu input z atrybutem name o wartości równej sex zwraca node liste a następnie wywołuje na niej pętle forEach
		// v jest równy w każdej interacji pętli kolejnym elementom z nodelisty
		// następnie sprawdzany jest warunek v jest zaznaczony jeżeli jest zaznaczony wtedy przypisuje wczesnie utworzonej zmiennej sex wartość atrybutu 
		//value elementu v
		//czyli funckja ta pobiera wartosci formularza i przechowuje je w utworzonych zmiennych

		
		/*let name = `<p>${document.querySelector('input[name=name]').value}</p>`
		//let name = `<p>${document.getElementsByName('name')[0].value}</p>`
		let lname = `<p>${document.querySelector('input[name=lastname]').value}</p>`
		//let lname = `<p>${document.getElementsByName('lastname')[0].value}</p>`
		let email = `<p>${document.getElementsByName('email')[0].value}</p>`
		let content = `<p>${document.getElementsByName('content')[0].value}</p>`
		var sex ='';
		document.querySelectorAll('input[name=sex]').forEach((v) => {
			if (v.checked) 
				sex=`<p>${v.value}</p>`
		})*/
		/*document.getElementsByName('sex').forEach((v) => {
			if (v.checked) 
				sex=`<p>${v.value}</p>`
		})*/
		//let sex = `<p>${document.getElementsByName('sex')[2].value}</p>`
		
		//document.querySelector('#output').innerHTML=name+lname+email+content+sex
		post=`name=${name}&lastname=${lname}&email=${email}&content=${content}&sex=${sex}`
		getDocument('./php/main.php','kontakt',post,'#output')

		//tworzona jest zmienna post o wartości `name=(wartość zmiennej name )&lastname=(wartość zmiennej lname)&email=(wartość zmiennej email)&content=(wartość zmiennej content)
		//&sex=(wartość zmiennej sex)` jest to łańcuch znaków (string)
		//dopisane w formularzu wypełnione przez użytkownika
		//wykonywana jest funkcja getDocument z 4 argumentami 3 z nich jest to zmienna utworzona linijke wcześniej post
	}
}
