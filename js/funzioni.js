function  check_project_name(project_name)//nel caso la risposta sia false devo disabilitare il pulsante upload
{
	var xhttp = new XMLHttpRequest();
	var url= "projectName.php?name=" + project_name;
	xhttp.open("GET",url,true);
	xhttp.onreadystatechange= function()
	{
		if(xhttp.readyState === 4 && xhttp.status ===200)
		{
      		if(!(xhttp.responseText==""))
      		{
				var suggested_name= document.getElementById("error_project_name");
      			suggested_name.innerHTML = xhttp.responseText;//se il campo è vuoto dopo un reset
      			$("#upload_submit").prop("disabled",true);
      		}
      		else
      		{
      			$("#upload_submit").prop("disabled",false);
      			var suggested_name= document.getElementById("error_project_name");
      			suggested_name.innerHTML="";
      		}
		      		

		}
	}
	xhttp.send(null);
};
	
function reset_all_input()
{
	var inputs = document.getElementsByTagName("input");
	alert(inputs.length);
	for(var i=0; i<inputs.length-1;i++)//fino a -1 per evitare di eliminare ultimo bottone
	{//posso racchiudere tutti gli input in un div e controllare ed eliminare solamente quelli con quel padre
		inputs[i].value="";
	}
	$("#error_project_name").empty();
	$("#upload_submit").prop("disabled",false);
	var percent_complete=40;

	$("#progressbar1").css("width",percent_complete.toString()+ '%');

	
		
};

function load_language(name_page)
{
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","json/"+name_page+".json",true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.onreadystatechange= function ()
	{
		if(xhttp.readyState === 4 && xhttp.status ===200)
		{
			var json = JSON.parse(xhttp.responseText);
			recursive_scan(json);
		}
	}
	xhttp.send(null);
	
};

function recursive_scan(json_obj)
{
   	if (json_obj instanceof Object) 
   	{
        for (var k in json_obj)//per ciascuna proprietà che c'è nell'oggetto
        {
        	if (json_obj.hasOwnProperty(k))
            {             
            	if (typeof json_obj[k] == "object")//se la proprietà è oggetto procedo con la ricerca	
           		{
           			recursive_scan( json_obj[k] );	//ricorsivamente
           		}
           		else
           		{//è una foglia e vado a mettere il risultato nella pagina
           			$("#"+k).append(json_obj[k]);
            	}                
           	}
        }
    } 
    else 
    {
   		//not an Object 
    }
};

function file_selected(input_data) 
{
  var file = input_data.files[0];
  if (file) {
    var file_size = 0;
    if (file.size > 1024 * 1024)//controlli
      file_size = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
    else
      file_size = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
          
    //alert("Name: " + file.name+", Size: "+ file_size+", Tyepe:"+ file.type) ;
  }
};

function upload_file() //dopo avere fatto l'upload devo resettare tutto
{
	if(check_input() == true)
	{
		var xhttp = new XMLHttpRequest();
		var form_data = new FormData(document.getElementById("project_creation"));
		xhttp.upload.addEventListener("progress", upload_progress, false);
		xhttp.addEventListener("load", upload_complete, false);
		xhttp.addEventListener("error", upload_failed, false);
		xhttp.addEventListener("abort", upload_canceled, false);
		xhttp.open("POST", "upload.php",true);
		xhttp.send(form_data);		
	}

	return false;// per non far ricaricare la pagina??
};

function upload_progress(evt) 
{
  	if (evt.lengthComputable) 
  	{
  		var progress_bar= $("#progressbar_population");
  		
    	var percent_complete = Math.round(evt.loaded * 100 / evt.total);
    	//ora qui devo andare a selezionare la progress bar corretta, risalendo dall'evento al chi ha scaturito 'evento'
    	progress_bar.css("width",percent_complete.toString()+ '%');
  	}
  	else 
  	{
  		alert("unable to compute");
  	}
};

function upload_complete(evt) 
{
	/*
	var progress_bars=$(".progress-bar");
  	for(var i=0;i<progress_bars.length;i++)
  	{
  		progress_bars[i].style.width="100%";
  		var node = document.createTextNode("100%");
  		progress_bars[i].append(node);
  	}*/
};

function upload_failed(evt) 
{
  alert("There was an error attempting to upload the file.");
};

function upload_cancelled(evt) 
{
  alert("The upload has been canceled by the user or the browser dropped the connection.");
  var progress_bars=$(".progress-bar");
  	for(var i=0;i<progress_bars.length;i++)
  	{
  		progress_bars[i].style.width="100%";
  		var node = document.createTextNode("100%");
  		progress_bars[i].append(node);
  	}
};

function check_input()
{
	var inputs = document.getElementsByTagName("input");
	if($("#project_name").val()=="")
	{
		alert("Attenzione Inserire un nome al progetto prima di fare l'upload dei file");
		return false;
	}
	else
	{
		var erroriRiscontrati="Errori :\n";
		var erroriTrovati=false;
		for(var i=1; i<inputs.length;i++)//fino a -1 per evitare di eliminare ultimo bottone
		{//posso racchiudere tutti gli input in un div e controllare ed eliminare solamente quelli con quel padre
			if(inputs[i].value=="")
			{
				erroriRiscontrati=erroriRiscontrati+" file: "+inputs[i].id+" non presente \n";
				erroriTrovati=true;
			}
		}
		if(erroriTrovati)
		{
			alert(erroriRiscontrati);
			return false;
		}
		else
		{
			return true;
		}
	}
};