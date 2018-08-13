CREATE TABLE `Docs` (
  `ID` varchar(45) NOT NULL,
  `Email` varchar(65) DEFAULT NULL,
  `sname` varchar(45) DEFAULT NULL,
  `Sbranch` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `Degree` varchar(45) DEFAULT NULL,
  `CollegeID` varchar(45) DEFAULT NULL,
  `Txid` varchar(95) DEFAULT NULL,
  `PDFpath` varchar(95) DEFAULT NULL,
  `UF` varchar(45) DEFAULT NULL,
  `CF` varchar(45) DEFAULT NULL,
  `SF` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Txid_UNIQUE` (`Txid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1; 