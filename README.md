# danitrips

Precisa resolver essa do update, sem depender do frontend, ou entender melhor sem repetir o schema nos controllers

   // o updateOne precisa trazer todos os campos, na doc do mongo achei uma alternatira pra tentar o spread
    // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
    // troquei a linha do updateOne por FindAndUPdateOne, e adicionei no server.js a linha 23 find and modify
    // mesmo assim não rola, se não passar todos os campos os que não foram grava null