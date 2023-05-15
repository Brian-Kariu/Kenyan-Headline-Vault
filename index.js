const authentication = require("./auth/index")
const { initializeApp } = require('firebase/app');
const scraperRoutes = require("./app/scraper");
const port = 4000;

const firebaseConfig = {
  apiKey:process.env.APIKEY,
  authDomain:process.env.AUTHDOMAIN,
  projectId:process.env.PROJECTID,
  storageBucket:process.env.STORAGEBUCKET,
  messagingSenderId:process.env.MESSAGINGSENDERID,
  appId:process.env.APPID,
  measurementId:process.env.MEASUREMENTID
}

const app = initializeApp(firebaseConfig);
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/scrape", scraperRoutes.scraperRoute);
