function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(i){pug_rethrow(n,null,r)}var a=3,o=t.split("\n"),h=Math.max(r-a,0),s=Math.min(o.length,r+a),a=o.slice(h,s).map(function(n,e){var t=e+h+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+a+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;pug_debug_line = 1;pug_debug_filename = "C:\\Users\\Wendel\\Documents\\GitHub\\wendelnascimento.github.io\\client\\pug\\index.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "C:\\Users\\Wendel\\Documents\\GitHub\\wendelnascimento.github.io\\client\\pug\\index.pug";
pug_html = pug_html + "\u003Chtml lang=\"pt-BR\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "C:\\Users\\Wendel\\Documents\\GitHub\\wendelnascimento.github.io\\client\\pug\\index.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 4;pug_debug_filename = "C:\\Users\\Wendel\\Documents\\GitHub\\wendelnascimento.github.io\\client\\pug\\index.pug";
pug_html = pug_html + "\u003Cmeta charset=\"UTF-8\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "C:\\Users\\Wendel\\Documents\\GitHub\\wendelnascimento.github.io\\client\\pug\\index.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "C:\\Users\\Wendel\\Documents\\GitHub\\wendelnascimento.github.io\\client\\pug\\index.pug";
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 6;pug_debug_filename = "C:\\Users\\Wendel\\Documents\\GitHub\\wendelnascimento.github.io\\client\\pug\\index.pug";
pug_html = pug_html + "Wendel Nascimento\u003C\u002Ftitle\u003E";
;pug_debug_line = 7;pug_debug_filename = "C:\\Users\\Wendel\\Documents\\GitHub\\wendelnascimento.github.io\\client\\pug\\index.pug";
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\"build\u002Fcss\u002Fstyle.css\"\u003E\u003C\u002Fhead\u003E\u003C\u002Fhtml\u003E";} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}