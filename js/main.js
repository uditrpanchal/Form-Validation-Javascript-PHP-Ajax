/*
Udit Panchal
*/

$(document).ready(function()
{

  $("#InsertDefault").click(function()
  {  	 
  	 // make an AJAX call here, and place outputs into the form
		$.ajax({
			url:"backend.php?act=default",
			
			
			success: function(output){
				console.log($.parseJSON(output));
				data=$.parseJSON(output);
				document.getElementById("name").value = data["name"];
				document.getElementById("postal").value = data["postal"];
				document.getElementById("phone").value = data["phone"];
				document.getElementById("address").value = data["address"];
			},

		});
    // prevents link click default behaviour
    return false;
  });


  $("#PersonForm").submit(function()
  {
     // Clear any success or error messages
     $("#success").html("");
     $("#errors").empty();
     
 			data 			= {name:"",postal:"",phone:"",address:""};
 			data["name"] 	= document.getElementById("name").value;
 			data["postal"] 	= document.getElementById("postal").value;
 			data["phone"] 	= document.getElementById("phone").value;
 			data["address"] = document.getElementById("address").value;
 			message 		= true;
 			error_message 	= "";
 			error 			= [];
 			i=0;
$.ajax({
  type: "POST",
  url: "backend.php?act=validate",
  data: data,
  success: function (output){
	console.log(output)
	data = $.parseJSON(output)
	
	for(key in data){
		if(data[key] == 0){
			message = false;
			if(key=="name"){
				error_message = "<li class=\"list-group-item\">Name is invalid !!!</li>";
			}
			else if(key == "postal"){
				error_message = error_message + "<li class=\"list-group-item\">Postal Code is invalid !!!</li>";
			}
			else if(key=="phone"){
				error_message = error_message + "<li class=\"list-group-item\">Phone number is invalid !!!</li>";
			}
			else if(key=="address"){
				error_message = error_message + "<li class=\"list-group-item\">Address is invalid !!!</li>";
			}
		}
	}
					if(message){
						$("#success").html("Success!!!!");
						}
						else{
								$("#errors").html(error_message);
							}
  },
});
	
	 
  	 // make an AJAX call here, and set error or success accordingly

    // prevents submit button default behaviour
    return false;
  });  

});