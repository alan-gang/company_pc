(function(){

  var nVer = navigator.appVersion;
  var nAgt = navigator.userAgent;
  var browserName  = navigator.appName;
  var fullVersion  = ''+parseFloat(navigator.appVersion); 
  var majorVersion = parseInt(navigator.appVersion,10);
  var nameOffset,verOffset,ix;

  // In Opera, the true version is after "Opera" or after "Version"
  if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
   browserName = "opera";
   fullVersion = nAgt.substring(verOffset+6);
   if ((verOffset=nAgt.indexOf("Version"))!=-1) 
     fullVersion = nAgt.substring(verOffset+8);
  }
  // In MSIE, the true version is after "MSIE" in userAgent
  else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
   browserName = "ie";
   fullVersion = nAgt.substring(verOffset+5);
  }
  // In Chrome, the true version is after "Chrome" 
  else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
   browserName = "chrome";
   fullVersion = nAgt.substring(verOffset+7);
  }
  // In Safari, the true version is after "Safari" or after "Version" 
  else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
   browserName = "safari";
   fullVersion = nAgt.substring(verOffset+7);
   if ((verOffset=nAgt.indexOf("Version"))!=-1) 
     fullVersion = nAgt.substring(verOffset+8);
  }
  // In Firefox, the true version is after "Firefox" 
  else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
   browserName = "firefox";
   fullVersion = nAgt.substring(verOffset+8);
  }
  // In most other browsers, "name/version" is at the end of userAgent 
  else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
            (verOffset=nAgt.lastIndexOf('/')) ) 
  {
   browserName = nAgt.substring(nameOffset,verOffset);
   fullVersion = nAgt.substring(verOffset+1);
   if (browserName.toLowerCase()==browserName.toUpperCase()) {
    browserName = navigator.appName;
   }
  }
  // trim the fullVersion string at semicolon/space if present
  if ((ix=fullVersion.indexOf(";"))!=-1)
     fullVersion=fullVersion.substring(0,ix);
  if ((ix=fullVersion.indexOf(" "))!=-1)
     fullVersion=fullVersion.substring(0,ix);

  majorVersion = parseInt(''+fullVersion,10);
  if (isNaN(majorVersion)) {
   fullVersion  = ''+parseFloat(navigator.appVersion); 
   majorVersion = parseInt(navigator.appVersion,10);
  }

  // console.log(''
  //  +'Browser name  = '+browserName+'<br>'
  //  +'Full version  = '+fullVersion+'<br>'
  //  +'Major version = '+majorVersion+'<br>'
  //  +'navigator.appName = '+navigator.appName+'<br>'
  //  +'navigator.userAgent = '+navigator.userAgent+'<br>'
  // )

  var OSName="Unknown OS";
  if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
  if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
  if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
  if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

  // console.log('Your OS: '+OSName);
  // console.log('Your Browser: '+browserName);
  // console.log('Your Browser version: '+majorVersion);

  window.userPlatInfo = {
    OS: OSName,
    browser: browserName,
    v: majorVersion,
    fv: fullVersion
  }
  // other things
console.log(`_________________________$____$$s___________s$$s_________
_________________________s$$$$s$$$$$$s________$$$___s$________________
_______________s$$$$$$$$s___s$$$$ss$$$$s________$$$__$$_______________
________________________s$$$s__$$$$$s_$$$s___s$__s$$s_$$______________
__________s$$$$$$$$$$$$$$$$$$$$sss$$$$s_$$$s__$$$__s$$s$______________
_____s$$$$$$$$$s_____s$$$$$$$$$$$$$$h$$$__$$$s__$$___$$$s_____________
___s$$$$$s_____________________ss$$$$$$$$s_s$$$s$$$__s$$$_____________
__________________________s$$$s____s$$$$$$$$s$$$$$$$__$$$_____________
_________s$$$$$$$$$$$$$$$s$$$$$$$$$$s$$$$$$$$$ss$$$$s_$$$_____________
_____________________s$$$$$$$$$$s$$$s____s$$$$$$__$$$__$$_____________
________________s$$$$$$$$$$$$$$$$$$$$$$s_____s$$$s_$$__$$_____________
________s$$$$$$$$$$$$$$$$$$$$$$$s$s__s$$$$$$s___$$s_$s$$$_____________
_____s$$$$$s$$$$$$$$$$$$$$s____$$s$$$$$$$$$$$$$s____$$$$s_____________
___s$$$$__s$$$$$$$$$s_____s$$$$$s$$$$$$$$$$$$$$$$$s__$$$______________
___s$___$$$$$$______s$$$$$$$s_s$$$$$$$$$$$$$$$$$$$$$____$$$___________`)
console.log(`______s$$$s___s$$$$$$$$$$$___$$$$$$$%c906`, 'color: transparent; font-weight: bold;border: 2px solid currentColor; padding: 2px', '$$$$$$$$$$$s$$$$$$$$_________')
console.log(`_____$$$__s$$$$$$$$$$$$$$__$$$$$%c5646146`, 'color: transparent; font-weight: bold;border: 2px solid currentColor; padding: 2px', '$$$$$s$s$_$$$$$$$$$$$$_______')
console.log(`____$$$_$$$$$$i$$$$$s_$$__$$$$$$$$$$$$$$$$$$$ss$$$s$$$$$$$$s$$________
___$$__$$$__s$$$$ss__$$_$$$$$$$$$$$$$$$$$$$$s$$$$$_$$$$e$$s$__________
__$$_s$$___$$$$s_$$_$$s$$$$$$$$$$$$$$$$$$$$s$$$$$s_$$$$$$s$___________
_s$s$$$___$$$$_s$$__$$__$$$$$$$$$$$$$$$$$$_$$$$$$$_s_$$$______________
_$$s$s__s$$$__$$____s$$__$$$$$$$$$$$$$$$$$_$$$$$$$$__$$$______________
$$_$___$$$$_s$$__$$__$$$s__s$$$$$$$$$$$$$$_$$$$$$$$$$$$s______________
$$____$$$s_$$$__$$$_$_s$$$$s___s$s$$$$$$$$_$$$$$$$$s$$$_______________
$____$$$__$$sss$$$$__$_s$$$$$$$$$$s$s$$$$$___s$$$$s$$$s_______________
____$$$_s$$$_$s$$$$s_s$__$$$$$$___s$$s_$$$s___s$$$_$$$________________
____$$_s$$$_$$_s$$$$$_s$$___$$$$$________$_____$$$s$$s________________
___s$$_$$$__$$__$$$$$$$$$$s____s$$$$$_________s$$$$$$_________________
___$$$s$$$__$$___$$ss$$$$$$$$s____s$$$$$s______$$$$$$_________________
___$s$$$$$_s$$__s_$$$_s$$$$$$$$$$s___s$$$$$$$s___sss__________________
___$$$$$$$_$$$__$s_$$$$s__s$$$$$$$$$s___$$$$$$$s______________________
__s$$$$$$$_$$$s_s$__$$$$$$s__s$$$$$$$$$s__$__$$$$s____________________
__$_$$$$s$_s$$$__$$__$$$$$$$$s__$$s$$$$$$$_____$$$$___________________
____s$$$_$$_$$$___$$__$s$$$$$$$$_s__s$$$s$$$____$$$$__________________
_____$$$__$_$$$$___$$_ss_$$$$$$$$$____$$$$_s$____$$$s_________________
_____$$$s_$_s$$$s__$$$____s$$$$$$$$$___s$$$______$$$$_________________
_____s$$$_ss_$$$$___$$s____$$$$$$$$$$___$$$$_____s$$$_________________
______$k$__$__$$$$__s$$____$$$$$$$h$$____$$$$_____$$s_________________
______$$$______$$$s__$$$___$$_$$$$$$$$___s$$$$____$$__________________
_______$$s______$$$__s$$$___$_s$$$$$s____s$$$$____$s__________________
_______$$$_______$$$_s$$_$__$__$$$$$s____s$$$$___$$___________________
________$$_______s$$__$$_______$$$$$s____$$$$$___$s___________________
________$$________s$$_$$______s$$$$$_____$$_$$___$____________________
___________________$$_$$s_____$$$$$_____$$s_$s________________________
____________________$$s$$_____$$$$_____s$$__$_________________________
____________________s$_$$____$$$s_____s$$_____________________________
_____________________$_$$___$$$______s$$______________________________
_______________________$$__s$$______$$$_______________________________
________________________$__$$______$$$________________________________
________________________$_$$s____$$$s_________________________________
__________________________$$___s$$s___________________________________
__________________________$$__$$s_____________________________________`)
console.log(`======================================================================`)
console.log(`%cpowerd by vue cmeateye!`, 'color: pink;')
console.log(`======================================================================`)
Object.defineProperty(window, 'author', {
  get: function () {
    return 'tel: 9065646146, email: joey.ren.huang@gmail.com'
  }
})


})()
