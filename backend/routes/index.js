var express = require('express');
var router = express.Router();
var db = require('../connection.js');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
const {wrap} = require('co');
const {join} = require('path');
const moment = require('moment');
const pdf = require('html-pdf');
const thunkify = require('thunkify');
const read = thunkify(require('fs').readFile);
const handlebars = require('handlebars');
var path = "../certificateddocs/";
const pdf_options = {format: 'A4', quality: 150, orientation: "landscape",  zoomFactor: "0.5"};
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var fs = require('fs');
var nodemailer = require('nodemailer');

//web3 configuration
var Web3 = require('web3');
// var web3 = new Web3();
var web3 = new Web3(
  new Web3.providers.HttpProvider('https://rinkeby.infura.io/01430c533dcd4c42bd9cc98cff3eb0a4')
);
var address = '0xaBe93970E0F305142629D40e49797b6894d03CbA';
var key = 'df83bc5744bf6d7ec9f5dc716c7f2123041b871126109d59a95d90a7a4699ebc';
var interface = [ { "constant": false, "inputs": [ { "name": "ob", "type": "string" } ], "name": "setdata", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "get", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
var bytecode = '608060405234801561001057600080fd5b506102d7806100206000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636d4ce63c14610051578063900cf582146100e1575b600080fd5b34801561005d57600080fd5b5061006661014a565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100a657808201518184015260208101905061008b565b50505050905090810190601f1680156100d35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100ed57600080fd5b50610148600480360381019080803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506101ec565b005b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101e25780601f106101b7576101008083540402835291602001916101e2565b820191906000526020600020905b8154815290600101906020018083116101c557829003601f168201915b5050505050905090565b8060009080519060200190610202929190610206565b5050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061024757805160ff1916838001178555610275565b82800160010185558215610275579182015b82811115610274578251825591602001919060010190610259565b5b5090506102829190610286565b5090565b6102a891905b808211156102a457600081600090555060010161028c565b5090565b905600a165627a7a7230582049aa3febaf103699a7314fb49849a7b1e42e465b551e4fd4c5b48e2a4d9b1b940029'



// web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
// const contractAbi = [ { "constant": true, "inputs": [], "name": "get", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6d4ce63c" }, { "constant": false, "inputs": [ { "name": "ob", "type": "string" } ], "name": "setdata", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x900cf582" } ]
// var contract_addr = "0x197beCA5d29A965452D5B66D3353aEFe5991FC5d";
// var contract_instance = web3.eth.contract(contractAbi).at(contract_addr);
//Input Decoder
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(interface); 

//crypto
var sha256 = require('sha256');
var Cryptr = require('cryptr'),
cryptr = new Cryptr('myTotalySecretKey');

//mail
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
      user:'dummytest471@gmail.com',
      pass:'dummytest3296'
  }
})

//lodash

var lodash = require('lodash');

//multer configuration
var name_file;
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname +'./../verificationdocs/')
    },
    filename: function (req, file, cb) {
        
      time = Date.now();
      cb(null, file.fieldname + '-' + time)
      name_file = file.fieldname + '-' + time;
    }
  })

const upload = multer({ storage: storage });


//transaction sending method
var tx = require('ethereumjs-tx');
var r;
function sendRaw(rawTx,callback) {
  var privateKey = new Buffer(key, 'hex');
  var transaction = new tx(rawTx);
  transaction.sign(privateKey);
  var serializedTx = transaction.serialize().toString('hex');
  web3.eth.sendRawTransaction(
  '0x' + serializedTx, async(err, result)=> {
      if(err) {
          console.log(err);
      } else {      
        console.log(result);
         callback(result);

      }
  });
}


router.post('/createcertificate', async(req, res) => {
 
  //Generating PDF
    const generatePDF =  wrap(function * () {

    const data = {
      student: {
        name: req.body.name,
        course: req.body.branch,
        year: req.body.year,
        Degree: req.body.Degree
      }
    };
  
    const source = yield read(join(`${__dirname}/certificate.html`), 'utf-8');
    const template = handlebars.compile(source);
    const html = template(data);  
    const p = pdf.create(html, pdf_options);
    p.toFile = thunkify(p.toFile);
    var pa = '../certificateddocs/'+req.body.Debtor_Mailing_Address+'document.pdf';
    //console.log(pa);
    yield p.toFile(`${join(__dirname, '../certificatedocs/'+ req.body.email +'document.pdf')}`);
   // res.send("Document submited successfully");


  });
   
  await generatePDF();


  var filepath = '../certificateddocs/'+req.body.email+'document.pdf';
  //Saving Record
  var ID = req.body.collegeID+req.body.email;
  var txID = "0zd322ff";

  await db.query('insert into certificates.Docs values("'+ID+'","'+req.body.email+'","'+req.body.name+'","'+req.body.branch+'","'+req.body.year+'","'+req.body.Degree+'","'+req.body.collegeID+'","'+txID+'","'+filepath+'","1","","");', function(err, result) {
    if (err) throw err;
    else
    console.log(result);
    res.send(result);
  });


});



//college Flag update
router.post('/collegeverify', async(req, res, next) => {

 

  await db.query('update certificates.Docs set cf="'+req.body.cf+'" where ID="'+req.body.ID+'";', function(err, result) {
    if (err) throw err;
    else
    console.log(result);
  });

   

  await db.query('SELECT cf,sf from certificates.Docs where ID="'+req.body.ID+'";', function(err, result) {
    if (err) throw err;
    else
    console.log(result);
    console.log(result[0].sf);
    if(result[0].sf == 1 && result[0].cf == 1){

   

   fs.readFile(__dirname + './certificatedocs/'+req.body.email +'document.pdf', async(err, buf) => {
      
    if(err){
        console.log(err)
    }        
    else{
        console.log(buf);

        //  await web3.personal.unlockAccount(web3.eth.accounts[0],'hari');
          var d = await sha256(buf);
          
           var rawTx = {
                nonce: web3.toHex(web3.eth.getTransactionCount(address)),
                gasLimit: web3.toHex(800000),
                gasPrice: web3.toHex(20000000000),
                data: d
                         };
          var txhash = await sendRaw(rawTx,async(result)=>{
            console.log(result+"*******************************");
        
              var td = result;
           

          // var val = await contract_instance.setdata(d,{from:web3.eth.accounts[0],gas:200000},async(error,result) => {
          //   if(error){
          //       console.log(error);
          //   }
          //   else{
            
              
               await db.query('update certificates.Docs set Txid="'+td+'" where ID="'+req.body.ID+'";', function(err, result) {
                if (err) throw err;
                else
                  
              

                 var mailoptions = {
                  from:'dummytest471@gmail.com',
                  to:"imhari213@gmail.com",
                  subject:'Blochain certificate',
                  text:'Hi please check your ccertificate Thank you.....!!!!!!! :)   AND your TRANSACTION ID IS  '+td,
                  attachments: [
                      {   
                         
                          'path': "./certificatedocs/"+req.body.email+"document.pdf" // stream this file
                      },
                  ]
          
              }
          
          
              transporter.sendMail(mailoptions,function(err,info){
                  if(err){
                      console.log(err);
                          res.send({"status" : "0","message":"failed while creating certificate.....!"});
                  }
                  else{
          
                            res.send({"status" : "1","message":"Certificate Created Successfully"});
          
                  }
                })


                
                  
              });
            
      
            
          //   }

     });
   
     
    }

  });

}
    
    else{
    //  console.log(result);
      res.send({"msg":"Student need to approve certificate"});
    }
    
  
  });


});



//Student Flag update
router.post('/studentverify', async(req, res, next) => {

  await db.query('update certificates.Docs set sf="'+req.body.sf+'"where ID="'+req.body.ID+'";', function(err, result) {
    if (err) throw err;
    else
    console.log(result);
    //res.send(result);
  });

  await db.query('SELECT cf,sf from certificates.Docs where ID="'+req.body.ID+'";', function(err, result){
    if (err) throw err;
    else
    //console.log(result[0].sf);
    if(result[0].sf == 1 && result[0].cf == 1){

   

      fs.readFile( './certificatedocs/'+req.body.email +'document.pdf', async(err, buf) => {
      
          if(err){
              console.log(err)
          }        
          else{
              console.log(buf);
            //  await web3.personal.unlockAccount(web3.eth.accounts[0],'hari');
              var d = sha256(buf);


              var rawTx = {
                nonce: web3.toHex(web3.eth.getTransactionCount(address)),
                gasLimit: web3.toHex(800000),
                gasPrice: web3.toHex(20000000000),
                data: d
                         };
              var txhash = await sendRaw(rawTx,async(result)=>{
              console.log(result+"*******************************");
        
              var td = result;





              // var val = await contract_instance.setdata(d,{from:web3.eth.accounts[0],gas:200000},async(error,result) => {
              //   if(error){
              //       console.log(error);
              //   }
              //   else{
                
              //      var txhash = result;
                  
                   //

                   await db.query('update certificates.Docs set Txid="'+td+'" where ID="'+req.body.ID+'";', function(err, result) {
                    if (err) throw err;
                    else
                      

    
                     var mailoptions = {
                      from:'dummytest471@gmail.com',
                      to:req.body.email,
                      subject:'Blochain certificate',
                      text:'Hi please check your ccertificate Thank you.....!!!!!!! :)   AND your TRANSACTION ID IS  '+td,
                      attachments: [
                          {   
                             
                              'path': "./certificatedocs/"+req.body.email+"document.pdf" // stream this file
                          },
                      ]
              
                  }
              
              
                  transporter.sendMail(mailoptions,function(err,info){
                      if(err){
                          console.log(err);
                              res.send({"status" : "0","message":"failed while creating certificate.....!"});
                      }
                      else{
              
                                res.send({"status" : "1","message":"Certificate Created Successfully"});
              
                      }
                    })
    
    
                    
                      
                  });





               // }

              });

     
          }

        });

     
    }
    else{
      res.send("college need to approve certificate");
    }
    
  });





});


router.post('/validate',upload.single('file-to-upload'), async(req, res, next) => {
  
  var trid = req.body.transaction_id;

  fs.readFile('./verificationdocs/'+name_file, async(err, buf) => {
    if(err){
        console.log(err)
    }        
    else{

      var b = sha256(buf);
      console.log(buf);
      //getting block data
      //console.log(trid);
      var d = await web3.eth.getTransaction(trid);
      //var i = web3.toAscii(d.input);
      console.log(d);
      const rsult = decoder.decodeData(d.input);
       const z = await web3.toAscii(d.input);
      console.log(z+"***********************************");
      const check_value = rsult.inputs[0];

      console.log(b);
      console.log(d.input);
      console.log(rsult);
      if(lodash.isEqual(b,z)){

        res.send([{"status" : "1","data":"A valid Document"}]);
       }else{
              res.send([{"status" : "0","data":"Invalid Document or Transaction ID.....!"}]);
       }


    }

  });


});




router.get('/verifiedstudents',async(req, res, next) => {

  

  await db.query('SELECT * FROM certificates.Docs where UF="1";', function(err, result) {
    if (err) throw err;
    else{
      res.send(result);
    }
  });

});

router.get('/unverifiedstudents',async(req, res, next) => {

  

  await db.query('SELECT * FROM certificates.Docs where UF="0";', function(err, result) {
    if (err) throw err;
    else{
      res.send(result);
    }
  });

});


router.post('/collegestudents',async(req, res, next) => {

  

  await db.query('SELECT * FROM certificates.Docs where CollegeID = "'+req.body.CID+'";', function(err, result) {
    if (err) throw err;
    else{
      res.send(result);
    }
  });

});


router.post('/getstudent',async(req, res, next) => {

  

  await db.query('SELECT * FROM certificates.Docs where email="'+req.body.email+'";', function(err, result) {
    if (err) throw err;
    else{
      res.send(result);
    }
  });

});




router.post('/universityverify', async(req, res, next) => {

  var obj = req.body;

  var n = obj.length;

  var i;

  for(i = 0;i<n;i++){

    await db.query("update certificates.Docs set uf='"+1+"' where ID ='"+obj[i].ID+"';", function(err, result) {
      if (err) throw err;
      else
      console.log(result);
         });


  }




  await db.query('SELECT * FROM certificates.Docs where UF="0";', function(err, result) {
    if (err) throw err;
    else{
      res.send(result);
    }
  });
  // res.send({"msg":"Verified successfully"});


});



module.exports = router;
