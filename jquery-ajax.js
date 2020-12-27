
var service = 'https://5fe757ae010a6700178037e0.mockapi.io/api/crud';

$(document).ready(function(){

    var $name=$('#name');
    var $surname=$('#surname');
    var $phoneNumber=$('#phoneNumber');
    $.ajax(
    {
        type: "GET",
        url: service + '/users/',
        
        success: function (users) {
               
        $.each(users, function (i, user) {
            
            $('#location').append('<tr id='+user.id+'><td><span class="custom-checkbox"><input type="checkbox" id="checkbox4" name="options[]" value="1"><label for="checkbox4"></label></span></td><td>' + user.id + '</td><td>' + user.name + '</td><td>' + user.surname + '</td><td>' + user.phoneNumber + '</td><td><div id="HASH"><button class="btn btn-secondary update" id='+ user.id+' type="button" href="#editUserModal"  data-toggle="modal">update</button><button  id=' +user.id + ' class="btn delete" style="background-color: firebrick; margin-left: 2px;"  type="button" > delete </button></div></td></tr>'); 
        });
        },
        
    });
    $('#add_user').on('click', function(){
        var user ={
            name: $name.val(),
            surname: $surname.val(),
            phoneNumber: $phoneNumber.val()
        };

        $.ajax(
            {
                type: "POST",
                url: service + '/users/',
               // data: JSON.stringify({ Users: user }),
                success: function (newUser) {
                    $('#location').append('<tr id=tr'+newUser.id+'><td><span class="custom-checkbox"><input type="checkbox" id="checkbox4" name="options[]" value="1"><label for="checkbox4"></label></span></td><td>' + newUser.id + '</td><td>' + newUser.name + '</td><td>' + newUser.surname + '</td><td>' + newUser.phoneNumber + '</td><td><div id="HASH"><button id='+ newUser.id+'class="btn btn-secondary update"  type="button" > <a href="#editUserModal" class="edit" data-toggle="modal">update</a></button><button  class="btn delete" style="background-color: firebrick; margin-left: 2px;"  type="button" > <a href="#deleteEmployeeModal"  data-toggle="modal">delete</a></button></div></td></tr>'); 
                
                },
                
            });
    });

    $(document).on('click','.update',function(){
        
        var upid= $(this).attr('id');
        $.ajax(
            {
                type: "GET",
                url: service + '/users/'+upid,
                success: function (user) {
                       
                    $('#update_form').append('<div class="modal-header"><h4 class="modal-title">Edit details</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button></div><div class="modal-body"><div class="form-group"><label>Name</label><input type="text" value="'+user.name+'"class="form-control" required></div><div class="form-group"><label>surname</label><input type="text" value="'+user.surname+ '"class="form-control" required></div><div class="form-group"><label>phoneNumber</label><input type="number" value="' +user.phoneNumber +'" class="form-control" required></div></div><div class="modal-footer"><input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"><input type="submit" id ="'+upid+'" class="btn btn-info save_user" value="Save"></div>'); 
                
                },
                
            });
    });

    $(document).on('click','.save_user',function(){
        var upid= $(this).attr('id');
        var user ={
            name: $name.val(),
            surname: $surname.val(),
            phoneNumber: $phoneNumber.val()
        };

        $.ajax(
            {
                type: "PUT",
                url: service + '/users/'+upid,
               // data: JSON.stringify({ Users: user }),
                success: function (newUser) {
                    $('#location').append('<tr id=tr'+newUser.id+'><td><span class="custom-checkbox"><input type="checkbox" id="checkbox4" name="options[]" value="1"><label for="checkbox4"></label></span></td><td>' + newUser.id + '</td><td>' + newUser.name + '</td><td>' + newUser.surname + '</td><td>' + newUser.phoneNumber + '</td><td><div id="HASH"><button id='+ newUser.id+'class="btn btn-secondary update"  type="button" > <a href="#editUserModal" class="edit" data-toggle="modal">update</a></button><button  class="btn delete" style="background-color: firebrick; margin-left: 2px;"  type="button" > <a href="#deleteEmployeeModal"  data-toggle="modal">delete</a></button></div></td></tr>'); 
                
                },
                
            });
        });


    $(document).on('click','.delete',function(){
        if (confirm('are you sure?')){
            var uid= $(this).attr('id');
       
        
    $.ajax(
        {
            type: "DELETE",
            url: service + '/users/'+uid,
            //data: {id:uid},
            success: function (data) {
                
                if(data.success == true){ 
                    $("#tr"+uid).remove();
                    alert('Post Deleted!');
                    window.location.reload();
                    console.log(data)
                     
                 }
                
            },
            
            
        });
    };
    
    
    //window.location.reload();
    
    });
   
});

