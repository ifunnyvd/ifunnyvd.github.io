var val_link = /https:\/\/(br\x2e)?ifunny.co\/(gif|fun|picture|video)\/(.+?)/;

resize=function(){
  document.getElementById("link").style = "width: "+(window.innerWidth-65)+"px;"
}
function conv_tam(x){
	kb = 1024;
	mb = kb**2;
	if (x < kb){
		return x+" B"
	}else if (x >= kb && x < mb){
		return (x/kb).toFixed(1)+" KB"
	}else{
		return (x/mb).toFixed(1)+" MB"
	}
}
function download(){
	url = document.getElementById('link').value;
	if (!val_link.test(url)){
		alert("Por favor, insira um link válido de um vídeo/imagem/GIF do iFunny!");
		return;
	}
	proc = document.getElementById("proc");
	btns = document.getElementById("baixar_agora");

	proc.innerHTML = "Procurando o arquivo...";
	proc.style.display = "block";
	btns.style.display = "none";

	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			resp = JSON.parse(this.responseText);
			link = resp.video;
			tam = resp.tamanho;
			k = link.split("/");
			fname = k[k.length-1];
			fname = fname.replace(/.mp4|.jpg|.gif/, "")

			proc.innerHTML = "Arquivo encontrado! (Tamanho: "+conv_tam(tam)+")";
			btns.style.display = "block";
			btns.onclick = function (){window.open(link, "_blank")};
		}
		else if (this.readyState == 4 && this.status == 406){
			resp = JSON.parse(this.responseText);
			proc.innerHTML = "Erro: "+resp.erro;
		}
	}
	xhttp.open("POST", "https://ifunny-getlink.herokuapp.com/getlink", true);
	xhttp.setRequestHeader("Content-type", "application/json")
	xhttp.send(JSON.stringify({"link": url}))
}
window.onload=resize;
window.onresize=resize;
window.onorientationchange=resize;