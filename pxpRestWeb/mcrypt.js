/**
 * Created by LapBK17 on 15/04/2015.
 */
/*
 *  jsmcrypt version 0.1  -  Copyright 2012 F. Doering
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License as
 *  published by the Free Software Foundation; either version 2 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307 USA
 */


//this creates a static class mcrypt that is already initialized
var Rijn = require("./rijndael");
var Serp = require("./Serpent");
var Big  =  require("./BigInt");
var Bar  =  require("./Barrett");

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? module.exports = factory(global)
        : typeof define === 'function' && define.amd
        ? define(factory) : factory(global)
}((
    typeof self !== 'undefined' ? self
        : typeof window !== 'undefined' ? window
        : typeof global !== 'undefined' ? global
            : this
),function(global){

    //this allows the user to create instances of this class that keep
    //track of their own key, cipher, and mode
    //calling syntax becomes var myMcrypt=new mcrypt();
    //var mcrypt=function(){
    /**********
     * Private *
     **********/
    global = global || {};
    /************************
     * START OF CIPHER DEFFS *
     ************************/

    /* Cipher Data
     * This is an object, keyed with the cipher name whose value is an
     * array containing the number of octets (bytes) in the block size,
     * and the number of octets in the key.
     */
    var ciphers={		//	block size,	key size
        "rijndael-128"	:[	16,			32],
        "rijndael-192"	:[	24,			32],
        "rijndael-256"	:[	32,			32],
        "serpent"			:[	16,			32],
    }

    /* blockCipherCalls
     * This object is keyed by the cipher names and the vaules are
     * functions that calls external block ciphers to encypt or
     * decrypt a single block. These functions must have the arguments:
     * function(cipher_name,block,key,encrypt)
     * where: chipher_name is the text of the cipher name,
     * block is an array of inegers representing octets
     * key is a string
     * and encrypt indicates whether it should encrypt or decrypt
     * the block.
     * the function should modify the block as its output
     */
    var blockCipherCalls={};
    blockCipherCalls['rijndael-128']=function(cipher,block,key,encrypt){
        if(key.length<32)
            key+=Array(33-key.length).join(String.fromCharCode(0));
        if(encrypt)
            Rijndael.Encrypt(block,key);
        else
            Rijndael.Decrypt(block,key);
        return block;
    };
    blockCipherCalls['rijndael-192']=blockCipherCalls['rijndael-128'];
    blockCipherCalls['rijndael-256']=blockCipherCalls['rijndael-128'];
    blockCipherCalls.serpent=function(cipher,block,key,encrypt){
        if(encrypt)
            Serpent.Encrypt(block);
        else
            Serpent.Decrypt(block);
        return block;
    };
    blockCipherCalls.serpent.init=function(cipher,key,encrypt){
        var keyA=[];
        for(var i=0;i<key.length;i++)
            keyA[i]=key.charCodeAt(i);
        Serpent.Init(keyA);
    };
    blockCipherCalls.serpent.deinit=function(cipher,key,encrypt){
        Serpent.Close();
    };

    /**********************
     * END OF CIPHER DEFFS *
     **********************/

    /*********
     * Public *
     *********/

    /* Encrypt
     * This function encypts a plaintext message with an IV, key,  ciphertype, and mode
     * The message, key, and IV should be extended ascii strings
     * the ciphertype should be a string that is a supported cipher (see above)
     * the mode should be a string that is a supported mode of operation
     * the key, cipher type, and mode will default to the last used
     * these can be set without encypting by "encrypting" a null message
     */
    var Encrypt=function(message,IV,key, cipher, mode){
        //console.log('parametros', uniqid('pxp')+'$$'+message,IV,key, cipher, mode);
        return Crypt(true,uniqid('pxp')+'$$'+message,IV,key, cipher, mode);
    };
    
    var prueba = function() {
        alert('llega');
    }
    /* Decrypt
     * See Encrypt for usage
     */

    var Decrypt=function(ctext,IV,key, cipher, mode){
        return Crypt(false,ctext,IV,key, cipher, mode);
    };
    /* Crypt
     * This function can encrypt or decrypt text
     */

    var Crypt=function(encrypt,text,IV,key, cipher, mode){
        if(key) cKey=key; else key=cKey;
        if(cipher) cCipher=cipher; else cipher=cCipher;
        if(mode) cMode=mode; else mode=cMode;
        if(!text)
            return true;
        if(blockCipherCalls[cipher].init)
            blockCipherCalls[cipher].init(cipher,key,encrypt);
        var blockS=ciphers[cipher][0];
        var chunkS=blockS;
        var iv=new Array(blockS);
        switch(mode){
            case 'cfb':
                chunkS=1;//8-bit
            case 'cbc':
            case 'ncfb':
            case 'nofb':
            case 'ctr':
                if(!IV)
                    throw "mcrypt.Crypt: IV Required for mode "+mode;
                if(IV.length!=blockS)
                    throw "mcrypt.Crypt: IV must be "+blockS+" characters long for "+cipher;
                for(var i = blockS-1; i>=0; i--)
                    iv[i] = IV.charCodeAt(i);
                break;
            case 'ecb':
                break;
            default:
                throw "mcrypt.Crypt: Unsupported mode of opperation"+cMode;
        }
        var chunks=Math.ceil(text.length/chunkS);
        var orig=text.length;
        text+=Array(chunks*chunkS-orig+1).join(String.fromCharCode(0));//zero pad the end
        var out='';
        switch(mode){
            case 'ecb':
                for(var i = 0; i < chunks; i++){
                    for(var j = 0; j < chunkS; j++)
                        iv[j]=text.charCodeAt((i*chunkS)+j);
                    blockCipherCalls[cipher](cipher,iv, cKey,encrypt);
                    for(var j = 0; j < chunkS; j++)
                        out+=String.fromCharCode(iv[j]);
                }
                break;
            case 'cbc':
                if(encrypt){
                    for(var i = 0; i < chunks; i++){
                        for(var j = 0; j < chunkS; j++)
                            iv[j]=text.charCodeAt((i*chunkS)+j)^iv[j];
                        blockCipherCalls[cipher](cipher,iv, cKey,true);
                        for(var j = 0; j < chunkS; j++)
                            out+=String.fromCharCode(iv[j]);
                    }
                }
                else{
                    for(var i = 0; i < chunks; i++){
                        var temp=iv;
                        iv=new Array(chunkS);
                        for(var j = 0; j < chunkS; j++)
                            iv[j]=text.charCodeAt((i*chunkS)+j);
                        var decr=iv.slice(0);
                        blockCipherCalls[cipher](cipher,decr, cKey,false);
                        for(var j = 0; j < chunkS; j++)
                            out+=String.fromCharCode(temp[j]^decr[j]);
                    }
                }
                break;
            case 'cfb':
                for(var i = 0; i < chunks; i++){
                    var temp=iv.slice(0);
                    blockCipherCalls[cipher](cipher,temp, cKey,true);
                    temp=temp[0]^text.charCodeAt(i);
                    iv.push(encrypt?temp:text.charCodeAt(i));
                    iv.shift();
                    out+=String.fromCharCode(temp);
                }
                out=out.substr(0,orig);
                break;
            case 'ncfb':
                for(var i = 0; i < chunks; i++){
                    blockCipherCalls[cipher](cipher,iv, cKey,true);
                    for(var j = 0; j < chunkS; j++){
                        var temp=text.charCodeAt((i*chunkS)+j);
                        iv[j]=temp^iv[j];
                        out+=String.fromCharCode(iv[j]);
                        if(!encrypt)
                            iv[j]=temp;
                    }
                }
                out=out.substr(0,orig);
                break;
            case 'nofb':
                for(var i = 0; i < chunks; i++){
                    blockCipherCalls[cipher](cipher,iv, cKey,true);
                    for(var j = 0; j < chunkS; j++)
                        out+=String.fromCharCode(text.charCodeAt((i*chunkS)+j)^iv[j]);
                }
                out=out.substr(0,orig);
                break;
            case 'ctr':
                for(var i = 0; i < chunks; i++){
                    temp=iv.slice(0);
                    blockCipherCalls[cipher](cipher,temp, cKey,true);
                    for(var j = 0; j < chunkS; j++)
                        out+=String.fromCharCode(text.charCodeAt((i*chunkS)+j)^temp[j]);
                    var carry=1;
                    var index=chunkS;
                    do{
                        index--;
                        iv[index]+=1;
                        carry=iv[index]>>8;
                        iv[index]&=255;
                    }while(carry)
                }
                out=out.substr(0,orig);
                break;
        }
        if(blockCipherCalls[cipher].deinit)
            blockCipherCalls[cipher].deinit(cipher,key,encrypt);
        return out;
    };

//Gets the block size of the specified cipher
    var get_block_size=function(cipher,mode){
        if(!cipher) cipher=cCipher;
        if(!ciphers[cipher])
            return false;
        return ciphers[cipher][0];
    }

//Gets the name of the specified cipher
    var get_cipher_name=function(cipher){
        if(!cipher) cipher=cCipher;
        if(!ciphers[cipher])
            return false;
        return cipher;
    }

//Returns the size of the IV belonging to a specific cipher/mode combination
    var get_iv_size=function(cipher,mode){
        if(!cipher) cipher=cCipher;
        if(!ciphers[cipher])
            return false;
        return ciphers[cipher][0];
    }

//Gets the key size of the specified cipher
    var get_key_size=function(cipher,mode){
        if(!cipher) cipher=cCipher;
        if(!ciphers[cipher])
            return false;
        return ciphers[cipher][1];
    }

//Gets an array of all supported ciphers
    var list_algorithms=function(){
        var ret=[];
        for(var i in ciphers)
            ret.push(i);
        return ret;
    }

    var list_modes=function(){
        return ['ecb','cbc','cfb','ncfb','nofb','ctr'];
    }

    var uniqid = function (prefix, more_entropy) {
        //  discuss at: http://phpjs.org/functions/uniqid/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //  revised by: Kankrelune (http://www.webfaktory.info/)
        //        note: Uses an internal counter (in php_js global) to avoid collision
        //        test: skip
        //   example 1: uniqid();
        //   returns 1: 'a30285b160c14'
        //   example 2: uniqid('foo');
        //   returns 2: 'fooa30285b1cd361'
        //   example 3: uniqid('bar', true);
        //   returns 3: 'bara20285b23dfd1.31879087'

        if (typeof prefix === 'undefined') {
            prefix = '';
        }

        var retId;
        var formatSeed = function(seed, reqWidth) {
            seed = parseInt(seed, 10)
                .toString(16); // to hex str
            if (reqWidth < seed.length) { // so long we split
                return seed.slice(seed.length - reqWidth);
            }
            if (reqWidth > seed.length) { // so short we pad
                return Array(1 + (reqWidth - seed.length))
                    .join('0') + seed;
            }
            return seed;
        };

        // BEGIN REDUNDANT
        /*if (!this.php_js) {
            this.php_js = {};
        }*/
        php_js = {};
        // END REDUNDANT
        if (!php_js.uniqidSeed) { // init seed with big random int
            php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }
        php_js.uniqidSeed++;

        retId = prefix; // start with prefix, add current milliseconds hex string
        retId += formatSeed(parseInt(new Date()
            .getTime() / 1000, 10), 8);
        retId += formatSeed(php_js.uniqidSeed, 5); // add seed hex string
        if (more_entropy) {
            // for more entropy we add a float lower to 10
            retId += (Math.random() * 10)
                .toFixed(8)
                .toString();
        }

        return retId;
    }


    /**********
     * Private *
     **********/

    var cMode='cbc';
    var cCipher='rijndael-128';
    var cKey='12345678911234567892123456789312';


    global.MCrypt = {
        Encrypt         : Encrypt,
        Decrypt         : Decrypt,
        list_modes      : list_modes,
        list_algorithms : list_algorithms,
        uniqid          : uniqid
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports.MCrypt = global.MCrypt;
    }
    else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function(){ return global.MCrypt });
    }
    // that's it!
    return {MCrypt: global.MCrypt}
}));