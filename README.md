# Certificates on Blockchain


This POC is started in order to minimize background verification of students by verifying its details from University, College and student itself. It's a two-way verification of details that can help in bringing transperancy and tamper proof certificates.




## Blockchain Background


Before we talk about architecture of our POC, lets get some definitions out of the way first.



* **Blockchain** - A blockchain is a digital ledger that is shared with many different computers. When a transaction occurs, that event is recorded into the “blocks.” However, for the transactions to be successfully recorded into the ledger, they must be validated by a preset number of computers within the blockchain network.



* **Blocks** - Blocks contain transactions and a hash to verify integrity.



* **Transactions or Proposals** - These represent interactions to the blockchain ledger. A read or write request of the ledger is sent as a transaction/proposal.





## Architecture

### Information Ingestion / Point of Entry

![Architecture](https://raw.githubusercontent.com/mbzama/certificates-on-blockchain/master/ui/sreenshots/architecture.png)




## Verification Process

![Verification](https://raw.githubusercontent.com/mbzama/certificates-on-blockchain/master/ui/sreenshots/verification.png)




## Setup using Docker


To run the application using docker. Follow the instructions below to create a local Docker container:


   1. Clone this repository
   
          git clone https://github.com/mbzama/certificates-on-blockchain.git
          

   2. Start the container

          docker-compose up 
          

   3. To stop the container,

          docker-compose down 
          
   
   

   
## Setup using npm


   1. Get the code:

          git clone https://github.com/mbzama/certificates-on-blockchain.git
          

   2. Change directory to ui:

          cd ui
          

   3. Install dependencies:

          npm install
          

   4. After succesfully installation of node modules, run the server:

          npm start
          
          
  
  
  
## Web UI (Screenshots)



### 1. Home Screen

   ![Home](https://raw.githubusercontent.com/mbzama/certificates-on-blockchain/master/ui/sreenshots/home.png)



 ### 2. For student login

   ![Student Login](https://raw.githubusercontent.com/mbzama/certificates-on-blockchain/master/ui/sreenshots/student.png)




 ### 3.For verification by student


   Below student data is confirmed by college and based on it student can verify information before submitting.


   ![Student verification](https://raw.githubusercontent.com/mbzama/certificates-on-blockchain/master/ui/sreenshots/student2.png)





## Code Structure



This application has 3 coding environments.



* **Web UI Part** - This is angular 6 code and user interface interactions happen here:
                     
                     /ui/src/app
                     
                     
                     
* **Server Part** - This is JavaScript code running our application's backend. ie Node.js code. This code resides in:

                    /backend/app.js
                    
                    
                    
* **Blockchain Part** - This is ethereum project and all blockchain transactions happen here

                    /blockchain/app
   
   
 
 ## Validation of Certificate (Screenshot)
 
 
   ![validation](https://raw.githubusercontent.com/mbzama/certificates-on-blockchain/master/ui/sreenshots/validateCertificate.png)
 
   
   
 ## Sample output from blockchain
   
   
     {
    blockHash: "0x7649ba863f9210cfa8ff4a1ace57f14191278d53c8f8f7527497c0c865d31720",
    blockNumber: 7938,
    from: "0x42ef66ce1f155807b838147e2e6b96b4fd2dc8ee",
    gas: 200000,
    gasPrice: 18000000000,
    hash: "0x8bcf4f35d65de5061e9ecb34b55e4b9dbea099aeda70cf05ed21aa03152e327d",
    input: "0x900cf5820000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004033313232663166656461616631343232323136383230633937373433643431363138396266363735363334343438383166333836616365396433376162656136",
    nonce: 43,
    r: "0xa5168c64fb14c224b951c550c716e6c25e2f2f86c034ba76a3685a9924c317e3",
    s: "0x786724a3e6777eca7ae8d4497f1a1d46647f7be47ba3ce01d7b9adb83f836278",
    to: "0x197beca5d29a965452d5b66d3353aefe5991fc5d",
    transactionIndex: 0,
    v: "0x65",
    value: 0
  }
   
 ### Dockers
 
 To run the application, use the following command,
 
 `
 docker-compose up 
        (or)
 docker-compose up -d ( to run as a daemon)
 `
 
   
 ## Feedback
 
 
 We are very interested in your feedbacks. This is a POC and a demo build and we will continue to improve it. If you have any  ideas on how to improve this POC, please reach to us!
 
 Use the https://github.com/mbzama/certificates-on-blockchain/issues section to communicate any improvements/bugs and pain points!
 
 
