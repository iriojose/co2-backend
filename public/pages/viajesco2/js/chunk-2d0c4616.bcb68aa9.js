(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c4616"],{"3b1b":function(n,e,t){"use strict";t("99af");var r=function(n){return function(e){return e&&e.length>0||"Debe ingresar un ".concat(n)}},u=function(n){return function(e){return e&&1==e||"Debe aceptar ".concat(n)}},o=function(n){return function(e){return e&&null!==e||"Debe ingresar un ".concat(n)}},c=function(n,e){return function(t){return t&&t.length>=e||"".concat(n," debe tener al menos ").concat(e)}},a=function(n,e){return function(t){return t&&t.length<=e||"".concat(n," debe ser menor que ").concat(e)}},i=function(){var n=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;return function(e){return e&&n.test(e)||"Debe ingresar un email válido"}},f=function(n){var e=/^[1-9]\d$/;return function(t){return t&&e.test(t)||"".concat(n," debe ser solo numerico")}},s=function(n){var e=/^[V|E|J|P][0-9]{5,9}$/;return function(t){return t&&e.test(t)||"".concat(n," incorrecta")}},l=function(){var n=/^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi;return function(e){return e&&n.test(e)||"Debe ser una URL valida"}},b=function(n){var e=/^[+]?([1-9][0-9]*(?:[\.][0-9]*)?|0*\.0*[1-9][0-9]*)(?:[eE][+-][0-9]+)?$/;return function(t){return t&&e.test(t)||"".concat(n," Debe ser mayor a cero")}},d=function(){var n=/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;return function(e){return e&&n.test(e)||"debe ser un numero de telefono válido"}};e["a"]={required:r,requiredObject:o,minLength:c,maxLength:a,emailFormat:i,urlFormat:l,number:f,cedula:s,positivo:b,requiredBoolean:u,telefonoFormat:d}}}]);
//# sourceMappingURL=chunk-2d0c4616.bcb68aa9.js.map