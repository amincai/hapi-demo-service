const Hapi = require("hapi");
let mongoose = require('mongoose');
let RestHapi = require('rest-hapi');
 
 
async function api(){
    try {
      let server = Hapi.Server({ 
        //Amin: host is important for IOS system. If missing host, the in IOS, it would use machinename.local to replace localhost
        //, if post or get request raised ,  there's no response.
        host: 'localhost',
        port: 3001 }
      );

      let config = {
          appTitle: "hapi-demo-service",
          version: '1.0.0',
          authStrategy: false ,
          mongo: {
            URI: 'mongodb://localhost/hapi-demo-service'
          }
      }; 
 
     config.embedAssociations = false;

      await server.register({
        plugin: RestHapi,
        options: {
          mongoose,
          config
        }
      });

      await server.start();

      console.log("Server ready", server.info);

      return server;
    } catch (err) {
      console.log("Error starting server:", err);
    }
  }

  module.exports = api();