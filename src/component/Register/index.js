import React from 'react'

function Register() {
    return (
        <>
        <div className='container main-contant'>
     
     <div id="login" class="container">
       <div class="row-fluid">
         <div class="span12">
           <div class="login well well-small main-form" id="input-size" style={{width:"22rem"}}>
             <div class="center">
             <h4>Sign Up</h4>
             </div>
             <form action="/users/login"  class="login-form" id="UserLoginForm" method="post" accept-charset="utf-8">
               <div class="control-group">
                 <div class="input-prepend"  >
                   <span class="add-on" style={{padding:"1rem"}}><i class="icon-user" ></i></span>
                   <input name="data" style={{padding:"1rem"}} required="required" placeholder="Username" maxlength="255" 
                   type="text"
                   id="UserUsername" 
                   className='input-controll' />
                 </div>
               </div>
               <div class="control-group">
                 <div class="input-prepend"  >
                   <span class="add-on" style={{padding:"1rem"}}><i class="icon-user" ></i></span>
                   <input name="data" style={{padding:"1rem"}} required="required"
                    placeholder="Email" 
                   maxlength="255" 
                   type="text"
                   id="UserUsername" 
                   className='input-controll' />
                 </div>
               </div>
               <div class="control-group">
                 <div class="input-prepend">
                   <span class="add-on" style={{padding:"1rem"}}><i class="icon-lock"></i></span>
                   <input name="" required="required"  placeholder="Password" 
                   type="password" id="UserPassword" style={{padding:"1rem"}} className='my-input'/>
                 </div>
               </div>
               {/* <div class="control-group">
                 <label id="remember-me">
                   <input type="checkbox" name="data[User][remember_me]" value="1" id="UserRememberMe"/> Remember Me?</label>
                   
               </div> */}
               <div class="control-group">
                 <input class="btn  btn-large btn-block" style={{background:"#f33f3f",color:"white"}} type="submit" value="Sign in"/>
                 <p className='text'>already have an account? <a href="/login">SignIn</a></p>
               </div>
             </form>
           </div>
         </div>
       </div>
     </div>
   </div>
        </>
    )
}

export default Register;