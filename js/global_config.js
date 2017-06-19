function load_language(name_page)
{
	var url="json/"+name_page+".json";
	var xhttp=$.getJSON(url,null,function(data,status)
	{
		if(status=="success")
		{
			recursive_scan(data);
		}
	});
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