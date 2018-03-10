$(document).ready(function(){
   
    $("#user-data-row").hide();
	$("#recent-post-row").hide();
	$(".goBackBtn").hide();


	$("#submit" ).click(function(  ) { //call api token from webpage
			$("#api-row").fadeOut();
			$("#user-data-row").fadeIn();
			$("#profile-pic-tab").fadeOut();
		    $("#about-tab").fadeOut();	
	      	$("#user-info").fadeIn();
	     	$("#recent-post").fadeIn();
			var userFbToken= $( "#api-id" ).val();
		
		
  // Part-1- To display user's facebook information

    $("#show-info-btn").on('click',function(){

    	$("body").css('background-image', 'none');
		$("body").css({"background-color":"#2F2F2F"});
	    $("#user-info").fadeOut();
	    $("#recent-post").fadeOut();
	    $("#api-row").fadeOut();
	    $("#profile-pic-tab").fadeIn();
	    $("#about-tab").fadeIn();
	    $(".goBackBtn").fadeIn();
	      
	
	    $.ajax('https://graph.facebook.com/me?fields=picture.width(300).height(300),name,website,email,birthday,gender,hometown,languages,relationship_status,education,work&access_token='+userFbToken,{

	        success : function(response){
	             
           		console.log(response);
	        	console.log(typeof(response));
	          
	            // Profile photo
	            $("#profile-pic").attr("src", "" + response.picture.data.url + "");
	          
	            //About me tab         
	            $("#userName").text(response.name);
	            $("#userEmail").text(response.email);            
	            $("#userWebsite").text(response.website);
	            $("#userBirthday").text(response.birthday);
	            $("#userGender").text(response.gender); 
	            $("#userRelation").text(response.relationship_status);

	            hometownName = Object.values(response.hometown)[1];     
				$("#userHomeTown").text(hometownName);

	            var userLanguage = $.map(response.languages, function(index) {
	                return index.name;
	            });
	            $("#userLanguage").text(userLanguage);
	          
	  
	            var userWork = $.map(response.work, function(index) {
	                return index.employer.name;
	            });
	            $("#userWork").text(userWork);

	         
	            var userEducation = $.map(response.education, function(index) {
	                return index.school.name;
	            });
	            $("#userEducation").text(userEducation);
	  
	        }, //success function ends 
	                
            //error handling
            error: function(jqXHR) {
            	alert(jqXHR.responseJSON.error.message + " Please Reload the Page and Enter Valid User Access Token");
            },

	    });//ajax call ends

	});// show-info-btn ends



  // Part-2- To display user's facebook posts

    $("#show-post-btn").on('click',function(){// show-post-btn starts

    	$("body").css('background-image', 'none');
		$("body").css({"background-color":"#2F2F2F"});       
        $("#api-row").fadeOut();
        $("#user-data-row").fadeOut();
        $("#recent-post-row").fadeIn();
        $(".goBackBtn").fadeIn();
		
        
        $.ajax('https://graph.facebook.com/me?fields=posts.limit(5){created_time,type,full_picture,story,message,source}&date_format=F j, Y, g:i a&access_token='+userFbToken,{

            success : function(response){  //success function starts

                console.log(response);
                console.log(typeof(response));
   
                // Sending the post data to feed ids in HTML
                $(response.posts).each(function(index,value){//outer each function ends

                	$(value.data).each(function(index1,value1){ //inner each function starts
                		
                		// Assigning an additional ID to every post in the order the post was originally published
                		$(this).attr('id', "post" + (index1 + 1));

                	    if (value1.type == "photo" && value1.id =="post"+(index1 + 1)) {
                	    	if(typeof(value1.message)  != "undefined" && typeof(value1.story) !="undefined")  {         	    	
		                    	$("#feed"+ (index1 + 1)).html(value1.message  + "<img src=" + value1.full_picture+ " " +"class=my-image" + ">"  + value1.story+ "</br>" +value1.created_time+ "</br></br></br>");
		                    }

		                    else if(typeof(value1.message)  == "undefined" && typeof(value1.story) !="undefined"){              	    	
		                    	$("#feed"+ (index1 + 1)).html("<img src=" + value1.full_picture+ " " +"class=my-image" + ">"  +value1.story+ "</br>" +value1.created_time+ "</br></br></br>");
		                    }
		                    else if(typeof(value1.message)  == "undefined" && typeof(value1.story) !="undefined"){              	    	
		                    	$("#feed"+ (index1 + 1)).html(value1.message  + "<img src=" + value1.full_picture+ " " +"class=my-image" + ">"  +value1.created_time+ "</br></br></br>");
		                    }
		                }

		                else if(value1.type == "video" && value1.id =="post"+(index1 + 1)){		
		                	if(typeof(value1.message)  != "undefined" && typeof(value1.story) !="undefined"){	                
		                   		$("#feed"+ (index1 + 1)).html(value1.message + "<video controls class=my-image> <source  src=" + value1.source + " " + "type= " + "video/mp4" + "></video>"  + value1.story+ "</br>" +value1.created_time + "</br></br></br>");
		                	}
		                	else if(typeof(value1.message)  == "undefined" && typeof(value1.story) !="undefined"){  
		                		$("#feed"+ (index1 + 1)).html("<video controls class=my-image> <source  src=" + value1.source + " " + "type= " + "video/mp4" + "></video>"  + value1.story+ "</br>" +value1.created_time + "</br></br></br>");
		                	}
		                	else if(typeof(value1.message)  != "undefined" && typeof(value1.story) =="undefined"){  
		                		$("#feed"+ (index1 + 1)).html(value1.message  +"<video controls class=my-image> <source  src=" + value1.source + " " + "type= " + "video/mp4" + "></video>" +value1.created_time + "</br></br></br>");
		                	}

		                }

		                else{               		
		                	$("#feed"+ (index1 + 1)).html(value1.message  + "</br>" +value1.created_time+ "</br></br></br>" );
	                	}
	
		            });	//inner each function ends
                		
                }); //outer each function ends

			}, // success function ends

			  //error handling
            error: function(jqXHR) {
            	alert(jqXHR.responseJSON.error.message + " Please Reload the Page and Enter Valid User Access Token");
            },

		}); // ajax call ends	

	}); // show-post-btn ends

	    
    // goBackBtn starts
	$(".goBackBtn").on("click",function(){
		$("body").css('background-image', 'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)) ,url(img/bg.jpg)','height','100vh','background-size','cover','background-position','center');
		$(".goBackBtn").fadeOut();
 		$("#profile-pic-tab").fadeOut();
    	$("#about-tab").fadeOut();
		$("#recent-post-row").fadeOut();
		
        $("#user-data-row").fadeIn();	
      	$("#user-info").fadeIn();
     	$("#recent-post").fadeIn();

    });// goBackBtn ends

	});// submit function ends

});